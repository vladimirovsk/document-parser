import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { AuthUserDto } from './dto/auth.dto';
import { ERROR_VALIDATE_USER } from './auth.constant';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {
  }

  async register(dto: AuthUserDto) {
    const { secret } = await this.getJwtToken(dto);
    const refreshToken = await this.getJwtRefreshToken(dto);
    dto.token = refreshToken;
    const user = await this.userService.createUser(dto);
    return {
      id: user?.id,
      email: user?.email,
      token: secret
    };
  }

  public async getJwtToken(dto: AuthUserDto) {
    const payload = { email: dto.email };
    const expiresIn = `${this.configService.get('JWT_EXPIRATION_TIME')}s`;
    const secret = await this.jwtService.signAsync(payload,{ expiresIn });
    const refreshToken = await this.getJwtRefreshToken(dto);
    return { secret, refreshToken };
  }

  public async getJwtRefreshToken(dto: AuthUserDto) {
    const payload = { email: dto.email };
    const expiresIn = `${this.configService.get('JWT_EXPIRATION_REFRESH_TIME')}s`;
    const secret = this.configService.get('JWT_SECRET');
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn
    });
    dto.token = refreshToken;
    return refreshToken;
  }

  async validateUser(dto: AuthUserDto): Promise<any> {
    const user = await this.userService.findByEmailAddFieldPassword(dto.email);
    if (!user) {
    	throw new UnauthorizedException(ERROR_VALIDATE_USER);
    }
    const isCorrectPassword = await compare(dto.password, user.password);
    if (!isCorrectPassword) {
    	throw new UnauthorizedException(ERROR_VALIDATE_USER);
    }
    return user;
  }

}