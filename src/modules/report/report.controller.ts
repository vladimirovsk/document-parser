import {
  Controller, Get,
  HttpCode,
  HttpStatus,
  ParseFilePipeBuilder,
  Put,
  UploadedFile, UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { csvFileName, getPathFile } from './report.helper';
import { ReportService } from './report.service';
import { UserEmail } from '../../decorators/user-email.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@Controller('report')
export class ReportController {

  constructor(
    private reportService: ReportService
  ) {
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Put('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: join(__dirname, './uploads'),
      filename: csvFileName
    })
  }))
  async uploadFile(
    @UserEmail() email: string,
    @UploadedFile(new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: 'csv' })
      .build({ errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE })
    ) file: Express.Multer.File) {
    const pathFile = getPathFile();
    return this.reportService.convertFileToDB(pathFile, email);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchReport(@UserEmail() email: string){
    return this.reportService.formatReport(email);
  }
}