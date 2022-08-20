import {Module} from '@nestjs/common';
import {documentDatabaseProviders} from './documents/database.provider';

@Module({
	providers: [
		...documentDatabaseProviders,
	],
	exports: [
		...documentDatabaseProviders,
	],
})

export class DatabaseModule {
}