import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class View {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	ip: string;

	@Column({ type: 'text', default: null })
	userAgent: string;

	@Column({ type: 'text', default: null })
	url: string;

	@Column({ default: 1 })
	count: number;

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
