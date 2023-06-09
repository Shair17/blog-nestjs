import {
	CanActivate,
	ExecutionContext,
	Injectable,
	SetMetadata,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly jwtService: JwtService
	) {}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.get<string[]>('roles', context.getHandler());
		if (!roles) {
			return true;
		}
		const request = context.switchToHttp().getRequest();

		let token = request.headers.authorization;

		if (/Bearer/.test(token)) {
			token = token.split(' ').pop();
		}

		const user = this.jwtService.decode(token) as any;
		const hasRole = roles.some((role) => role === user.role);
		return user && user.role && hasRole;
	}
}
