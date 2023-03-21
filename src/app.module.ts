import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';

import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/user.entity';

import { FileModule } from './modules/file/file.module';
import { File } from './modules/file/file.entity';

import { ArticleModule } from './modules/article/article.module';
import { Article } from './modules/article/article.entity';

import { CategoryModule } from './modules/category/category.module';
import { Category } from './modules/category/category.entity';

import { TagModule } from './modules/tag/tag.module';
import { Tag } from './modules/tag/tag.entity';

import { CommentModule } from './modules/comment/comment.module';
import { Comment } from './modules/comment/comment.entity';

import { SettingModule } from './modules/setting/setting.module';
import { Setting } from './modules/setting/setting.entity';

import { SMTPModule } from './modules/smtp/smtp.module';
import { SMTP } from './modules/smtp/smtp.entity';

import { PageModule } from './modules/page/page.module';
import { Page } from './modules/page/page.entity';

import { ViewModule } from './modules/view/view.module';
import { View } from './modules/view/view.entity';

import { Search } from './modules/search/search.entity';
import { SearchModule } from './modules/search/search.module';

import { config } from './config';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			...config.mysql,
			entities: [
				User,
				File,
				Tag,
				Article,
				Category,
				Comment,
				Setting,
				SMTP,
				Page,
				View,
				Search,
			],
			synchronize: true,
		}),
		UserModule,
		FileModule,
		TagModule,
		ArticleModule,
		CategoryModule,
		CommentModule,
		SettingModule,
		SMTPModule,
		AuthModule,
		PageModule,
		ViewModule,
		SearchModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
