import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleService } from '../article/article.service';
import { Search } from './search.entity';

@Injectable()
export class SearchService {
	constructor(
		@InjectRepository(Search)
		private readonly searchRepository: Repository<Search>,
		private readonly articleService: ArticleService
	) {}

	async searchArticle(type, keyword) {
		const articles = await this.articleService.search(keyword);
		await this.addRecord(type, keyword);
		return articles;
	}

	async addRecord(type, keyword) {
		const exist = await this.searchRepository.findOne({
			where: { type, keyword },
		});

		if (exist) {
			const count = exist.count;
			const newData = await this.searchRepository.merge(exist, {
				count: count + 1,
			});
			await this.searchRepository.save(newData);
			return newData;
		}

		const newData = await this.searchRepository.create({ type, keyword });
		await this.searchRepository.save(newData);
	}

	async findAll(queryParams: any = {}): Promise<[Search[], number]> {
		const query = this.searchRepository
			.createQueryBuilder('search')
			.orderBy('search.updateAt', 'DESC');

		const { page = 1, pageSize = 12, pass, ...otherParams } = queryParams;

		query.skip((+page - 1) * +pageSize);
		query.take(+pageSize);

		if (otherParams) {
			Object.keys(otherParams).forEach((key) => {
				query
					.andWhere(`search.${key} LIKE :${key}`)
					.setParameter(`${key}`, `%${otherParams[key]}%`);
			});
		}

		return query.getManyAndCount();
	}

	async deleteById(id) {
		const data = await this.searchRepository.findOne(id);
		return this.searchRepository.remove(data);
	}
}
