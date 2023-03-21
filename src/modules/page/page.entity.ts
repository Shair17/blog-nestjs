import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Page {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ default: null })
	cover: string;

	@Column()
	name: string;

	@Column()
	path: string;

	@Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' })
	content: string;

	@Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' })
	html: string;

	@Column({ type: 'mediumtext', default: null })
	toc: string;

	@Column('simple-enum', { enum: ['draft', 'publish'] })
	status: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	publishAt: Date;

	@Column({ type: 'int', default: 0 })
	views: number;

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
