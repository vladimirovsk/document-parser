import { BadRequestException, Body, Controller, Headers, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthUserDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

import { ALREADY_REGISTERED_ERROR, ERROR_VALIDATE_USER } from './auth.constant';
import { ApiTags } from '@nestjs/swagger';
import { ResponseLoginDto } from './dto/response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async loginUser(@Body() dto: AuthUserDto, @Res() res: Response,
    @Headers('Authorization') loginToken: string) {
    await this.authService.validateUser(dto).catch((err) => {
      throw new BadRequestException(ERROR_VALIDATE_USER);
    });
    const token = await this.authService.getJwtToken(dto);
    res.setHeader('Authorization', [token.secret]);
    return res.send({
      secret: token.secret,
      refresh: token.refreshToken
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() dto: AuthUserDto, @Res() res: Response) {
    const user = await this.userService.findByEmail(dto.email);
    if (user) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    } else {
      const auth = await this.authService.register(dto);
      res.setHeader('Authorization', [auth.token]);
      return res.send(auth);
    }
  }

// @UseGuards(JwtAuthGuard)
}