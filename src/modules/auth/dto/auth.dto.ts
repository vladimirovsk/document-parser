import {IsEmail, IsString} from 'class-validator';
import { User } from "../../../core/database/documents/user/user.model";

export class AuthUserDto extends User{
	@IsEmail()
	email: string;

	@IsString()
	password: string;

	token? : string;
}
