import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { config } from '../../config';
import { User } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {
		const { name, password } = config.admin;
		// this.createUser({ name, password, role: 'admin' });
	}

	async findAll(queryParams: any = {}): Promise<[User[], number]> {
		const query = this.userRepository
			.createQueryBuilder('user')
			.orderBy('user.createAt', 'DESC');

		const { page = 1, pageSize = 12, status, ...otherParams } = queryParams;

		query.skip((+page - 1) * +pageSize);
		query.take(+pageSize);

		if (status) {
			query.andWhere('user.status=:status').setParameter('status', status);
		}

		if (otherParams) {
			Object.keys(otherParams).forEach((key) => {
				query
					.andWhere(`user.${key} LIKE :${key}`)
					.setParameter(`${key}`, `%${otherParams[key]}%`);
			});
		}

		return query.getManyAndCount();
	}

	async createUser(user: Partial<User>): Promise<User> {
		const { name } = user;
		const existUser = await this.userRepository.findOne({ where: { name } });

		if (existUser) {
			throw new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST);
		}

		const newUser = await this.userRepository.create(user);
		await this.userRepository.save(newUser);
		return newUser;
	}

	async login(user: Partial<User>): Promise<User> {
		const { name, password } = user;
		const existUser = await this.userRepository.findOne({ where: { name } });

		if (
			!existUser ||
			!(await User.comparePassword(password, existUser.password))
		) {
			throw new HttpException(
				'Bad Request',
				// tslint:disable-next-line: trailing-comma
				HttpStatus.BAD_REQUEST
			);
		}

		if (existUser.status === 'locked') {
			throw new HttpException(
				'Bad Request',
				// tslint:disable-next-line: trailing-comma
				HttpStatus.BAD_REQUEST
			);
		}

		return existUser;
	}

	async findById(id): Promise<User> {
		return this.userRepository.findOne(id);
	}

	async updateById(id, user): Promise<User> {
		const oldUser = await this.userRepository.findOne(id);
		delete user.password;
		const newUser = await this.userRepository.merge(oldUser, user);
		return this.userRepository.save(newUser);
	}

	async updatePassword(id, user): Promise<User> {
		const existUser = await this.userRepository.findOne(id);
		const { oldPassword, newPassword } = user;

		if (
			!existUser ||
			!(await User.comparePassword(oldPassword, existUser.password))
		) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		let hashNewPassword = User.encryptPassword(newPassword);
		const newUser = this.userRepository.merge(existUser, {
			password: hashNewPassword,
		});
		return this.userRepository.save(newUser);
	}
}
