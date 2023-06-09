import {
	Controller,
	Post,
	Body,
	Request,
	UseGuards,
	HttpCode,
	HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SettingService } from './setting.service';
import { Setting } from './setting.entity';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';

@Controller('setting')
@UseGuards(RolesGuard)
export class SettingController {
	constructor(
		private readonly settingService: SettingService,
		private readonly jwtService: JwtService,
		private readonly userService: UserService
	) {}

	@Post()
	@Roles('admin')
	@UseGuards(JwtAuthGuard)
	update(@Body() setting) {
		return this.settingService.update(setting);
	}

	@Post('/get')
	@HttpCode(HttpStatus.OK)
	async findAll(@Request() req): Promise<Setting> {
		let token = req.headers.authorization;

		if (/Bearer/.test(token)) {
			token = token.split(' ').pop();
		}

		try {
			const tokenUser = this.jwtService.decode(token) as any;
			const id = tokenUser.id;
			const exist = await this.userService.findById(id);
			const isAdmin = id && exist.role === 'admin';
			return this.settingService.findAll(false, isAdmin);
		} catch (e) {
			return this.settingService.findAll(false, false);
		}
	}
}
