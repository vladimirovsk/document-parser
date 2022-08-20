import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	private logger = new Logger(LoggerMiddleware.name);
	use(req: Request, res: Response, next: NextFunction) {
		this.logger.log(`[${res.req.method}] ${res.req.originalUrl}`);
		next();
	}
}
