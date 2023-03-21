import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
	constructor(
		@InjectRepository(Tag)
		private readonly tagRepository: Repository<Tag>
	) {}

	async create(tag: Partial<Tag>): Promise<Tag> {
		const { label } = tag;
		const existTag = await this.tagRepository.findOne({ where: { label } });

		if (existTag) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		const newTag = await this.tagRepository.create(tag);
		await this.tagRepository.save(newTag);
		return newTag;
	}

	async findAll(queryParams): Promise<Tag[]> {
		const { articleStatus } = queryParams;
		const qb = this.tagRepository
			.createQueryBuilder('tag')
			.orderBy('tag.createAt', 'ASC');

		if (articleStatus) {
			qb.leftJoinAndSelect(
				'tag.articles',
				'articles',
				'articles.status=:status',
				{
					status: articleStatus,
				}
			);
		} else {
			qb.leftJoinAndSelect('tag.articles', 'articles');
		}

		const data = await qb.getMany();

		data.forEach((d) => {
			Object.assign(d, { articleCount: d.articles.length });
			delete d.articles;
		});

		return data;

		// return this.tagRepository.find({ order: { createAt: 'ASC' } });
	}

	async findById(id): Promise<Tag> {
		const data = await this.tagRepository
			.createQueryBuilder('tag')
			.where('tag.id=:id')
			.orWhere('tag.label=:id')
			.orWhere('tag.value=:id')
			.setParameter('id', id)
			.getOne();

		return data;
	}

	async getArticleById(id, status = null): Promise<Tag> {
		const data = await this.tagRepository
			.createQueryBuilder('tag')
			.leftJoinAndSelect('tag.articles', 'articles')
			.orderBy('articles.updateAt', 'DESC')
			.where('tag.id=:id')
			.orWhere('tag.label=:id')
			.orWhere('tag.value=:id')
			.setParameter('id', id)
			.getOne();

		if (status) {
			data.articles = data.articles.filter((a) => a.status === status);
			return data;
		} else {
			return data;
		}
	}

	async findByIds(ids): Promise<Array<Tag>> {
		return this.tagRepository.findByIds(ids);
	}

	async updateById(id, tag: Partial<Tag>): Promise<Tag> {
		const oldTag = await this.tagRepository.findOne(id);
		const updatedTag = await this.tagRepository.merge(oldTag, tag);
		return this.tagRepository.save(updatedTag);
	}

	async deleteById(id) {
		const tag = await this.tagRepository.findOne(id);
		return this.tagRepository.remove(tag);
	}
}
