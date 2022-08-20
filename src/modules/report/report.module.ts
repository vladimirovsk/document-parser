import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ReportService } from './report.service';
import { SourceModule } from '../source/source.module';
import { UsersModule } from '../users/users.module';
import { getModelToken } from '@nestjs/sequelize';
import { Source } from '../../core/database/documents/source/source.model';
import { Report } from '../../core/database/documents/report/report.model';

@Module({
  imports:[
    MulterModule.register({
      dest: './upload',
    }),
    SourceModule,
    UsersModule
  ],
  controllers:[
    ReportController,
  ],
  providers:[
    ReportService,
    {provide: getModelToken(Report), useValue: Report},
  ]
})
export class ReportModule{

}