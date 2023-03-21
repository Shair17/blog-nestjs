import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { SettingService } from '../setting/setting.service';
import { File } from './file.entity';

let OSS = require('ali-oss');

@Injectable()
export class FileService {
	constructor(
		@InjectRepository(File)
		private readonly fileRepository: Repository<File>,
		private readonly settingService: SettingService
	) {}

	async uploadFile(file: any): Promise<File> {
		const { originalname, mimetype, size, buffer } = file;
		const filename = `/${dayjs().format('YYYY-MM-DD')}/${originalname}`;
		const {
			ossRegion,
			ossAccessKeyId,
			ossBucket,
			ossAccessKeySecret,
			ossHttps,
		} = await this.settingService.findAll(true);
		if (!ossRegion || !ossAccessKeyId || !ossBucket || !ossAccessKeySecret) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}
		let client = new OSS({
			region: ossRegion,
			accessKeyId: ossAccessKeyId,
			accessKeySecret: ossAccessKeySecret,
			bucket: ossBucket,
			secure: ossHttps,
		});
		const { url } = await client.put(filename, buffer);
		const newFile = await this.fileRepository.create({
			originalname,
			filename,
			url,
			type: mimetype,
			size,
		});
		await this.fileRepository.save(newFile);
		return newFile;
	}

	async findAll(queryParams: any = {}): Promise<[File[], number]> {
		const query = this.fileRepository
			.createQueryBuilder('file')
			.orderBy('file.createAt', 'DESC');

		const { page = 1, pageSize = 12, pass, ...otherParams } = queryParams;

		query.skip((+page - 1) * +pageSize);
		query.take(+pageSize);

		if (otherParams) {
			Object.keys(otherParams).forEach((key) => {
				query
					.andWhere(`file.${key} LIKE :${key}`)
					.setParameter(`${key}`, `%${otherParams[key]}%`);
			});
		}

		return query.getManyAndCount();
	}

	async findById(id): Promise<File> {
		return this.fileRepository.findOne(id);
	}

	async findByIds(ids): Promise<Array<File>> {
		return this.fileRepository.findByIds(ids);
	}

	async deleteById(id) {
		const tag = await this.fileRepository.findOne(id);
		const {
			ossRegion,
			ossAccessKeyId,
			ossBucket,
			ossAccessKeySecret,
			ossHttps,
		} = await this.settingService.findAll(true);
		if (!ossRegion || !ossAccessKeyId || !ossBucket || !ossAccessKeySecret) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}
		let client = new OSS({
			region: ossRegion,
			accessKeyId: ossAccessKeyId,
			accessKeySecret: ossAccessKeySecret,
			bucket: ossBucket,
			secure: ossHttps,
		});
		await client.delete(tag.filename);
		return this.fileRepository.remove(tag);
	}
}
