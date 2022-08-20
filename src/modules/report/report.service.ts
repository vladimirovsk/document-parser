import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import csvParser from 'csv-parser';
import { CreateReportDto, IRowCSV } from './report.dto';
import { SourceService } from '../source/source.service';
import { UsersService } from '../users/users.service';
import { ERROR_USER_NOT_FOUND } from '../users/users.constant';
import { InjectModel } from '@nestjs/sequelize';
import { Report } from '../../core/database/documents/report/report.model';
import sequelize, { Op } from 'sequelize';
import { Source } from '../../core/database/documents/source/source.model';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report)
    private readonly reportModel: typeof Report,
    private sourceService: SourceService,
    private usersService: UsersService
  ) {
  }

  async formatReport(email:string){
    const sourceList = await this.sourceService.fetchAll();
    const resultData:{}[] = [];
    for(const row of sourceList){
      const fetchDataSource = await this.fetchReportBySource(email, row.id);
      resultData.push({[row.name]:fetchDataSource})
    }

    return resultData;
  }
  async fetchReportBySource(email:string, source_id: number=1){
    const userId = await this.usersService.fetchIdByEmail(email).catch(err=>{
      throw new Error(ERROR_USER_NOT_FOUND)
    });

    return await this.reportModel.findAll({
      attributes:[
        [sequelize.fn('CONCAT', sequelize.col('month'), '-',sequelize.col('year')), 'period'],
        [sequelize.fn('SUM', sequelize.col('sum')), 'total'],
      ],
      group: ['month', 'year'],
      where:{
          user_id:userId,
          source_id
      },
      raw:true
    },
    ).catch(err=>{
      throw new Error('ERROR FETCH REPORT '+err)
    })
  }

  async create(dto: CreateReportDto){
    const report = new this.reportModel();
    report.day = dto.day;
    report.month = dto.month;
    report.year = dto.year;
    report.sum = dto.sum;
    report.source_id = dto.sourceId;
    report.user_id =dto.userId;
    report.description = dto.description;

    const newReport = await report.save().catch(err=>{
      throw new Error('ERROR CREATE REPORT RECORD '+ err)
    })
    return newReport;
  }

  async convertFileToDB(pathFile:string, email: string){
    const fetchJSON:IRowCSV[] = await this.convertStreamToJson(pathFile);
    for (const row of fetchJSON ){
      const sourceId = await this.sourceService.fetchOrAddSource(row.source).catch(err=>{
        throw new Error('Error find source '+err);
      })

      const userId = await this.usersService.fetchIdByEmail(email).catch(err=>{
        throw new Error(ERROR_USER_NOT_FOUND)
      });

      const [day, month, year] = row.date.split('-');

      const newReport = await this.create({
        day: Number(day),
        month: Number(month),
        year: Number(year),
        sum: parseFloat(row.sum),
        userId,
        sourceId,
        description: row.description,
      });
    }
    return fetchJSON;
  }

  async convertStreamToJson(pathFile:string): Promise<IRowCSV[]>{
    return new Promise((resolve, reject)=>{
      const fetchData: IRowCSV[] = [];
      createReadStream(pathFile)
        .pipe(csvParser())
        .on('data', (row) => fetchData.push(row))
        .on('end', () => {
          resolve(fetchData)
        })
        .on('error', reject)
    })
  }
}