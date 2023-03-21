import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Search {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	type: string;

	@Column()
	keyword: string;

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
