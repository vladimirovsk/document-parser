import {Sequelize} from 'sequelize-typescript';
import {dbConfig} from '../database.config';
import {SEQUELIZE_DOCUMENTS} from '../../constants';
import {ArrDataBasesModel} from './database.models';
import {Logger} from '@nestjs/common';

const logger = new Logger('DatabaseProviders');

export const documentDatabaseProviders = [{
	provide: SEQUELIZE_DOCUMENTS,
	useFactory: async () => {
		const sequelize = await new Sequelize({
			dialect: 'mysql',
			host: dbConfig.documents.host,
			port: dbConfig.documents.port,
			username: dbConfig.documents.username,
			password: dbConfig.documents.password,
			database: dbConfig.documents.database,
		});
		sequelize.options.logging = false;
		sequelize.addModels(ArrDataBasesModel);
		await sequelize.sync({
		}).catch(err=>{
			logger.error(`ERROR SYNC, ${err.message}`);
		});
		return sequelize;
	},
}];