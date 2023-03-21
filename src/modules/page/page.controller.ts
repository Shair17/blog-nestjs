import {
	Controller,
	Get,
	HttpStatus,
	HttpCode,
	Post,
	Delete,
	Patch,
	Param,
	Query,
	Body,
	UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { PageService } from './page.service';

@Controller('page')
@UseGuards(RolesGuard)
export class PageController {
	constructor(private readonly pageService: PageService) {}

	@Post()
	@Roles('admin')
	@UseGuards(JwtAuthGuard)
	create(@Body() page) {
		return this.pageService.create(page);
	}

	@Get()
	findAll(@Query() queryParams) {
		return this.pageService.findAll(queryParams);
	}

	@Get(':id')
	findById(@Param('id') id) {
		return this.pageService.findById(id);
	}

	@Patch(':id')
	@Roles('admin')
	@UseGuards(JwtAuthGuard)
	updateById(@Param('id') id, @Body() page) {
		return this.pageService.updateById(id, page);
	}

	@Post(':id/views')
	@HttpCode(HttpStatus.OK)
	updateViewsById(@Param('id') id) {
		return this.pageService.updateViewsById(id);
	}

	@Delete(':id')
	@Roles('admin')
	@UseGuards(JwtAuthGuard)
	deleteById(@Param('id') id) {
		return this.pageService.deleteById(id);
	}
}
