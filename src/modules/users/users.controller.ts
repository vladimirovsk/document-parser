import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
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

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') user_id: number){
    return await this.usersService.deleteUserById(user_id);
  }

}