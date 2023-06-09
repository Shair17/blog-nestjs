import {
	Controller,
	HttpStatus,
	HttpCode,
	Post,
	Body,
	UseInterceptors,
	ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseInterceptors(ClassSerializerInterceptor)
	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(@Body() user) {
		return await this.authService.login(user);
	}
}
