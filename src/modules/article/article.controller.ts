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
	Request,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { UserService } from '../user/user.service';
import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Controller('article')
@UseGuards(RolesGuard)
export class ArticleController {
	constructor(
		private readonly articleService: ArticleService,

		private readonly jwtService: JwtService,
		private readonly userService: UserService
	) {}

	@Post()
	@Roles('admin')
	@UseGuards(JwtAuthGuard)
	create(@Body() article) {
		return this.articleService.create(article);
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	findAll(@Query() queryParams) {
		return this.articleService.findAll(queryParams);
	}

	@Get('/category/:id')
	@HttpCode(HttpStatus.OK)
	findArticlesByCategory(@Param('id') category, @Query() queryParams) {
		return this.articleService.findArticlesByCategory(category, queryParams);
	}

	@Get('/tag/:id')
	@HttpCode(HttpStatus.OK)
	findArticlesByTag(@Param('id') tag, @Query() queryParams) {
		return this.articleService.findArticlesByTag(tag, queryParams);
	}

	@Get('/archives')
	@HttpCode(HttpStatus.OK)
	getArchives(): Promise<{ [key: string]: Article[] }> {
		return this.articleService.getArchives();
	}

	@Get('/recommend')
	@HttpCode(HttpStatus.OK)
	recommend(@Query('articleId') articleId) {
		return this.articleService.recommend(articleId);
	}

	@Get(':id')
	async findById(@Request() req, @Param('id') id, @Query('status') status) {
		let token = req.headers.authorization;

		if (/Bearer/.test(token)) {
			token = token.split(' ').pop();
		}

		try {
			const tokenUser = this.jwtService.decode(token) as any;
			const userId = tokenUser.id;
			const exist = await this.userService.findById(userId);
			const isAdmin = userId && exist.role === 'admin';
			return this.articleService.findById(id, status, isAdmin);
		} catch (e) {
			return this.articleService.findById(id, status);
		}
	}

	@Post(':id/checkPassword')
	@HttpCode(HttpStatus.OK)
	checkPassword(@Param('id') id, @Body() article) {
		return this.articleService.checkPassword(id, article);
	}

	@Post(':id/views')
	@HttpCode(HttpStatus.OK)
	updateViewsById(@Param('id') id) {
		return this.articleService.updateViewsById(id);
	}

	@Patch(':id')
	@Roles('admin')
	@UseGuards(JwtAuthGuard)
	@HttpCode(HttpStatus.OK)
	updateById(@Param('id') id: string, @Body() article) {
		return this.articleService.updateById(id, article);
	}

	@Delete(':id')
	@Roles('admin')
	@UseGuards(JwtAuthGuard)
	deleteById(@Param('id') id: string) {
		return this.articleService.deleteById(id);
	}
}
