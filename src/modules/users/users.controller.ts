import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { UserEmail } from '../../decorators/user-email.decorator';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('list')
  async fetchListUser(@UserEmail() email: string){
    return await this.usersService.fetchListAllUsers();
  }

}