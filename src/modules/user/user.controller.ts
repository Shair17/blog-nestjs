import {
	Controller,
	Get,
	HttpStatus,
	HttpCode,
	Post,
	Query,
	Body,
	Request,
	UseGuards,
	UseInterceptors,
	HttpException,
	ClassSerializerInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
	constructor(
		private readonly userService: UserService,

		private readonly jwtService: JwtService
	) {}

	@UseInterceptors(ClassSerializerInterceptor)
	@Get()
	@Roles('admin')
	@UseGuards(JwtAuthGuard)
	findAll(@Query() query) {
		return this.userService.findAll(query);
	}

	@UseInterceptors(ClassSerializerInterceptor)
	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() user: Partial<User>): Promise<User> {
		return await this.userService.createUser(user);
	}

	async checkPermission(req, user) {
		let token = req.headers.authorization;

		if (!token) {
			throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
		}

		if (/Bearer/.test(token)) {
			token = token.split(' ').pop();
		}
		const tokenUser = this.jwtService.decode(token) as any;
		const id = tokenUser.id;

		if (!id) {
			throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
		}

		const exist = await this.userService.findById(id);
		if (exist.id !== user.id && exist.role !== 'admin') {
			throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
		}
	}

	@UseInterceptors(ClassSerializerInterceptor)
	@Post('update')
	@HttpCode(HttpStatus.CREATED)
	async update(@Request() req, @Body() user: Partial<User>): Promise<User> {
		await this.checkPermission(req, user);
		return await this.userService.updateById(user.id, user);
	}

	@UseInterceptors(ClassSerializerInterceptor)
	@Post('password')
	@HttpCode(HttpStatus.CREATED)
	async updatePassword(
		@Request() req,
		@Body() user: Partial<User>
	): Promise<User> {
		await this.checkPermission(req, user);
		return await this.userService.updatePassword(user.id, user);
	}
}
