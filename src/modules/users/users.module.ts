import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { DatabaseModule } from "../../core/database/database.module";
import { getModelToken } from "@nestjs/sequelize";
import { User } from "../../core/database/documents/user/user.model";
import { UsersController } from './users.controller';

@Module({
  imports: [

  ],
  controllers: [UsersController],

  providers: [
    UsersService,
    {provide: getModelToken(User), useValue: User},
  ],
  exports:[
    UsersService,
    {provide: getModelToken(User), useValue: User},
  ]
})
export class UsersModule {

}