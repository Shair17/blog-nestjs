import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	OneToMany,
} from 'typeorm';
import { Article } from '../article/article.entity';

@Entity()
export class Category {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	label: string;

	@Column()
	value: string;

	@OneToMany(() => Article, (article) => article.category)
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
