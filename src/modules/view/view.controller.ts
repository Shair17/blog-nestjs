import {
	Controller,
	Get,
	Post,
	Delete,
	Param,
	Query,
	UseGuards,
	Body,
	Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { ViewService } from './view.service';

function getClientIP(req) {
	const ip =
		req.headers['x-real-ip'] ||
		req.headers['x-forwarded-for'] ||
		(req.connection && req.connection.remoteAddress) ||
		(req.socket && req.socket.remoteAddress) ||
		(req.connection &&
			req.connection.socket &&
			req.connection.socket.remoteAddress);

	return ip.split(':').pop();
}

@Controller('view')
@UseGuards(RolesGuard)
export class ViewController {
	constructor(private readonly viewService: ViewService) {}

	@Post()
	create(@Request() req, @Body() data) {
		const userAgent = req.headers['user-agent'];
		const url = data.url;
		return this.viewService.create(getClientIP(req), userAgent, url);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	findAll(@Query() queryParam) {
		return this.viewService.findAll(queryParam);
	}

	@Get('/url')
	findByUrl(@Query('url') url) {
		return this.viewService.findByUrl(url);
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findById(@Param('id') id) {
		return this.viewService.findById(id);
	}

	@Delete(':id')
	@Roles('admin')
	@UseGuards(JwtAuthGuard)
	deleteById(@Param('id') id) {
		return this.viewService.deleteById(id);
	}
}
