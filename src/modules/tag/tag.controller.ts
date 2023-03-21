import {
	Controller,
	Get,
	Post,
	Patch,
	Delete,
	Param,
	Body,
	UseGuards,
	Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';

@Controller('tag')
@UseGuards(RolesGuard)
export class TagController {
	constructor(private readonly tagService: TagService) {}

	@Post()
	@Roles('admin')
	@UseGuards(JwtAuthGuard)
	create(@Body() tag) {
		return this.tagService.create(tag);
	}

	@Get()
	findAll(@Query() queryParams): Promise<Tag[]> {
		return this.tagService.findAll(queryParams);
	}

	@Get(':id')
	findById(@Param('id') id) {
		return this.tagService.findById(id);
	}

	@Get(':id/article')
	getArticleById(@Param('id') id, @Query('status') status) {
		return this.tagService.getArticleById(id, status);
	}

	@Patch(':id')
	@Roles('admin')
	@UseGuards(JwtAuthGuard)
	updateById(@Param('id') id, @Body() tag) {
		return this.tagService.updateById(id, tag);
	}

	@Delete(':id')
	@Roles('admin')
	@UseGuards(JwtAuthGuard)
	deleteById(@Param('id') id) {
		return this.tagService.deleteById(id);
	}
}
