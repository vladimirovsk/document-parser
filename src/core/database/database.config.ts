import * as dotenv from 'dotenv';
import { IDatabaseConfig } from "./database.interface";
dotenv.config();

export const dbConfig:IDatabaseConfig = {
	documents: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: parseInt(String(process.env.DB_PORT)),
		dialect: 'mysql'
	}
};
