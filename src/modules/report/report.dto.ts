export class IRowCSV {
  date: string;
  sum: string;
  source: string;
  description: string;
}

export class CreateReportDto{
  day: number;
  month: number;
  year: number;
  sum: number;
  sourceId: number;
  userId: number;
  description: string;

}