import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	JoinTable,
	ManyToOne,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Article {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	title: string;

	@Column({ default: null })
	cover: string;

	@Column({ type: 'text', default: null })
	summary: string;

	@Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' })
	content: string;

	@ManyToOne(() => Category, (category) => category.articles, { cascade: true })
	@JoinTable()
	category: Category;

	@ManyToMany(() => Tag, (tag) => tag.articles, { cascade: true })
	@JoinTable()
	tags: Array<Tag>;

	@Column('simple-enum', { enum: ['draft', 'publish'] })
	status: string;

	@Column({ type: 'int', default: 0 })
	views: number;

	@Column({ type: 'text', default: null, select: false })
	password: string;

	@Column({ type: 'boolean', default: false })
	needPassword: boolean;

	@Column({ type: 'boolean', default: true })
	isCommentable: boolean;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	publishAt: Date;

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
