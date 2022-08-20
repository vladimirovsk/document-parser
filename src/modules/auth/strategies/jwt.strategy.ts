import {PassportStrategy} from '@nestjs/passport';
import {ConfigService} from '@nestjs/config';
import {Injectable} from '@nestjs/common';
import {ExtractJwt, Strategy} from 'passport-jwt';

import {User} from '../../../core/database/documents/user/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	constructor(
		private readonly configService: ConfigService,
) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET'),
			signOptions: {expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`}
		});
	}

	async validate({email}: Pick<User, 'email'>) {
		return email;
	}
}
