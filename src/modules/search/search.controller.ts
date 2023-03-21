import {
	Controller,
	Get,
	Delete,
	Param,
	UseGuards,
	Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { SearchService } from './search.service';

@Controller('search')
@UseGuards(RolesGuard)
export class SearchController {
	constructor(private readonly searchService: SearchService) {}

	@Get('/article')
	async searchArticle(@Query('keyword') keyword) {
		const data = await this.searchService.searchArticle('article', keyword);
		return data;
	}

	@Get('/')
	@UseGuards(JwtAuthGuard)
	async findAll(@Query() queryParam) {
		return this.searchService.findAll(queryParam);
	}

	@Delete(':id')
	@Roles('admin')
	@UseGuards(JwtAuthGuard)
	deleteById(@Param('id') id) {
		return this.searchService.deleteById(id);
	}
}
