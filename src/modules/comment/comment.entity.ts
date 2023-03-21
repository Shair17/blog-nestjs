import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' })
	content: string;

	@Column({ type: 'boolean', default: false })
	pass: boolean;

	@Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' })
	userAgent: string;

	@Column()
	hostId: string;

	@Column({ type: 'boolean', default: false })
	isHostInPage: boolean;

	@Column({ default: null })
	parentCommentId: string;

	@Column({ default: null })
	replyUserName: string;

	@Column({ default: null })
	replyUserEmail: string;

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
