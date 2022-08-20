import { InjectModel } from '@nestjs/sequelize';
import { Source } from '../../core/database/documents/source/source.model';

export class SourceService {
  constructor(
    @InjectModel(Source)
    private readonly sourceModel: typeof Source,
  ) {
  }

  async fetchAll():Promise<Source[]>{
    return this.sourceModel.findAll({
      raw:true
    });
  }
  async fetchOrAddSource(name:string):Promise<number>{
    const fetchSource: Source | null = await this.sourceModel.findOne({
      where:{
        name
      },
      raw: true
    });
    if (fetchSource=== null){
      const newSource:Source = await this.create(name);
      return newSource.id
    }else{
      return fetchSource.id
    }
  }

  async create(name: string): Promise<Source> {
    const source = new this.sourceModel();
    source.name = name;
    const newSource = await source.save().catch(err=>{
      throw new Error('ERROR CREATE SOURCE '+ err)
    })
    return newSource;
  }
}