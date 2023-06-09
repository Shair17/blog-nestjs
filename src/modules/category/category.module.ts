import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Category]), AuthModule],
	exports: [CategoryService],
	providers: [CategoryService],
	controllers: [CategoryController],
})
export class CategoryModule {}
