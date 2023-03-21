import { NestFactory } from '@nestjs/core';
import rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import helmet from 'helmet';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.setGlobalPrefix('/api');
	app.use(
		rateLimit({
			windowMs: 60 * 1000,
			max: 1000,
		})
	);
	app.use(compression());
	app.use(helmet());
	app.useGlobalInterceptors(new TransformInterceptor());
	app.useGlobalFilters(new HttpExceptionFilter());

	await app.listen(4000);
}

bootstrap();
