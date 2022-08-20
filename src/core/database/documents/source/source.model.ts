import {
  Column,
  DataType,
  Index, Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";

@Table({
  tableName: 'source',
  timestamps: false
})
export class Source extends Model<Source> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    defaultValue: 0
  })
  name: string
}


