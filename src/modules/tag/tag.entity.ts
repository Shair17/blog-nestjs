import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
} from 'typeorm';
import { Article } from '../article/article.entity';

@Entity()
export class Tag {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	label: string;

	@Column()
	value: string;

	@ManyToMany(() => Article, (article) => article.tags)
	articles: Array<Article>;

	@CreateDateColumn({
		type: 'datetime',
		name: 'create_at',
	})
	createAt: Date;

	@UpdateDateColumn({
		type: 'datetime',
		name: 'update_at',
	})
	updateAt: Date;
}
