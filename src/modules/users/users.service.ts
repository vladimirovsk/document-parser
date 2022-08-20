import { User } from "../../core/database/documents/user/user.model";
import {InjectModel} from '@nestjs/sequelize';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_USER_NOT_FOUND } from './users.constant';
import { CreateUserDto } from "./dto";
import { genSalt, hash } from "bcryptjs";

export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,

  ) {
  }

  async fetchListAllUsers(){
    const data = await this.userModel.findAll({
      attributes: {exclude: ['password']},
      raw: true
    });
    return data;
  }
  async fetchIdByEmail(email:string): Promise<number>{
    const data:User | null = await this.findByEmail(email);
    if (data!=null){
      return data.id;
    }
    else {
      throw new Error(ERROR_USER_NOT_FOUND)
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.userModel.findOne({
      attributes: {exclude: ['password']},
      where: {
        email: email,
      },
      raw: true
    });
    return data;
  }

  async createUser(dto: CreateUserDto): Promise<User | null> {
    const salt = await genSalt(10);
    const user = new this.userModel();
    user.username = dto.username;
    user.email = dto.email;
    user.password = await hash(dto.password, salt);
    const newUser = await user.save();

    return newUser;
  }

  async findByEmailAddFieldPassword(email: string): Promise<User | null> {
    const data = await this.userModel.findOne({
      where: {
        email: email,
      },
    });
    if (data === null) {
      throw new HttpException(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return data;
  }
}