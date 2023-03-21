import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class File {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	originalname: string;

	@Column()
	filename: string;

	@Column()
	type: string;

	@Column()
	size: number;

	@Column()
	url: string;

	@CreateDateColumn({
		type: 'datetime',
		name: 'create_at',
	})
	createAt: Date;
}
