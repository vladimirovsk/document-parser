import { extname, join } from 'path';


export const csvFileName = (req: any, file: any, callback: any) => {
  const fileExtName = extname(file.originalname);
  callback(null, `data${fileExtName}`);
};

export const getPathFile = () => {
  const filePath = join(__dirname, 'uploads', 'data.csv');
  return filePath;
};