import { Module } from '@nestjs/common';
import { SourceService } from './source.service';
import { getModelToken } from '@nestjs/sequelize';
import { Source } from '../../core/database/documents/source/source.model';

@Module({
  imports:[],
  providers:[
    SourceService,
    {provide: getModelToken(Source), useValue: Source},
  ],
  exports: [
    SourceService,
    {provide: getModelToken(Source), useValue: Source},
  ]
})
export class SourceModule {

}