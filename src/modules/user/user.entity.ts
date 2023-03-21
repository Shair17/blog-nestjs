import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
	static async comparePassword(password0, password1) {
		return bcrypt.compareSync(password0, password1);
	}

	static encryptPassword(password) {
		return bcrypt.hashSync(password, 10);
	}

	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column({ length: 500 })
	name: string;

	@Exclude()
	@Column({ length: 500 })
	password: string;

	@Column({ length: 500, default: null })
	avatar: string;

	@Column({ length: 500, default: null })
	email: string;

	@Column('simple-enum', { enum: ['admin', 'visitor'], default: 'visitor' })
	role: string;

	@Column('simple-enum', { enum: ['locked', 'active'], default: 'active' })
	status: string;

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

	@BeforeInsert()
	encrypt() {
		this.password = bcrypt.hashSync(this.password, 10);
	}
}
