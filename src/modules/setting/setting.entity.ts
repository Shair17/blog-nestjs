import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Setting {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'text', default: null })
	systemUrl: string;

	@Column({ type: 'text', default: null })
	systemTitle: string;

	@Column({ type: 'text', default: null })
	systemLogo: string;

	@Column({ type: 'text', default: null })
	systemFavicon: string;

	@Column({ type: 'text', default: null })
	systemFooterInfo: string;

	@Column({ type: 'text', default: null })
	seoKeyword: string;

	@Column({ type: 'text', default: null })
	seoDesc: string;

	@Column({ type: 'text', default: null })
	ossRegion: string;

	@Column({ type: 'text', default: null })
	ossAccessKeyId: string;

	@Column({ type: 'text', default: null })
	ossAccessKeySecret: string;

	@Column({ type: 'boolean', default: false })
	ossHttps: boolean;

	@Column({ type: 'text', default: null })
	ossBucket: string;

	@Column({ type: 'text', default: null })
	smtpHost: string;

	@Column({ type: 'text', default: null })
	smtpPort: string;

	@Column({ type: 'text', default: null })
	smtpUser: string;

	@Column({ type: 'text', default: null })
	smtpPass: string;

	@Column({ type: 'text', default: null })
	smtpFromUser: string;

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
