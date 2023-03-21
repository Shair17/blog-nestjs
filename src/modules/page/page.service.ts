import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { Page } from './page.entity';

@Injectable()
export class PageService {
	constructor(
		@InjectRepository(Page)
		private readonly pageRepository: Repository<Page>
	) {}

	async create(page: Partial<Page>): Promise<Page> {
		const { name, path } = page;
		const exist = await this.pageRepository.findOne({ where: { path } });

		if (exist) {
			throw new HttpException('页面已存在', HttpStatus.BAD_REQUEST);
		}

		const newPage = await this.pageRepository.create({
			...page,
		});
		await this.pageRepository.save(newPage);
		return newPage;
	}

	async findAll(queryParams: any = {}): Promise<[Page[], number]> {
		const query = this.pageRepository
			.createQueryBuilder('page')
			.orderBy('publishAt', 'DESC');

		const { page = 1, pageSize = 12, status, ...otherParams } = queryParams;
		query.skip((+page - 1) * +pageSize);
		query.take(+pageSize);

		if (status) {
			query.andWhere('page.status=:status').setParameter('status', status);
		}
		if (otherParams) {
			Object.keys(otherParams).forEach((key) => {
				query
					.andWhere(`page.${key} LIKE :${key}`)
					.setParameter(`${key}`, `%${otherParams[key]}%`);
			});
		}

		return query.getManyAndCount();
	}

	async findById(id): Promise<Page> {
		const query = this.pageRepository
			.createQueryBuilder('page')
			.where('page.id=:id')
			.orWhere('page.path=:path')
			.setParameter('id', id)
			.setParameter('path', id);

		return query.getOne();
	}

	async updateViewsById(id): Promise<Page> {
		const old = await this.pageRepository.findOne(id);
		const newData = await this.pageRepository.merge(old, {
			views: old.views + 1,
		});
		return this.pageRepository.save(newData);
	}

	async updateById(id, page: Partial<Page>): Promise<Page> {
		const old = await this.pageRepository.findOne(id);
		let { content, status } = page;

		const newPage = {
			...page,
			publishAt:
				status === 'publish'
					? dayjs().format('YYYY-MM-DD HH:mm:ss')
					: old.publishAt,
		};

		const updatedPage = this.pageRepository.merge(old, newPage);
		return this.pageRepository.save(updatedPage);
	}

	async deleteById(id) {
		const page = await this.pageRepository.findOne(id);
		return this.pageRepository.remove(page);
	}
}
