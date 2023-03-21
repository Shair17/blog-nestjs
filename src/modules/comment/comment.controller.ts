import {
	Controller,
	Get,
	Post,
	Patch,
	Delete,
	Param,
	Query,
	Body,
	UseGuards,
	Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { CommentService } from './comment.service';

@Controller('comment')
@UseGuards(RolesGuard)
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Post()
	create(@Request() req, @Body() comment) {
		const userAgent = req.headers['user-agent'];
		return this.commentService.create(userAgent, comment);
	}

	@Get()
	findAll(@Query() queryParams) {
		return this.commentService.findAll(queryParams);
	}

	@Get(':id')
	findById(@Param('id') id) {
		return this.commentService.findById(id);
	}

	@Get('host/:hostId')
	getArticleComments(@Param('hostId') hostId, @Query() qurey) {
		return this.commentService.getArticleComments(hostId, qurey);
	}

	@Patch(':id')
	@Roles('admin')
	@UseGuards(JwtAuthGuard)
	updateById(@Param('id') id, @Body() data) {
		return this.commentService.updateById(id, data);
	}

	@Delete(':id')
	@Roles('admin')
	@UseGuards(JwtAuthGuard)
	deleteById(@Param('id') id) {
		return this.commentService.deleteById(id);
	}
}
