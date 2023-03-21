import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SMTP {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'text', default: null })
	from: string;

	@Column({ type: 'text', default: null })
	to: string;

	@Column({ type: 'text', default: null })
	subject: string;

	@Column({ type: 'text', default: null })
	text: string;

	@Column({ type: 'text', default: null })
	html: string;

	@CreateDateColumn({
		type: 'datetime',
		name: 'create_at',
	})
	createAt: Date;
}
