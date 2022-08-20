import {
  BelongsTo,
  Column,
  DataType, ForeignKey, HasOne,
  Index, Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';

import {Source} from '../source/source.model';
import {User} from '../user/user.model';

@Table({
  tableName: 'report',
  timestamps: true
})
export class Report extends Model<Report> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
  })
  day: number

  @Column({
    type: DataType.INTEGER,
  })
  month: number

  @Column({
    type: DataType.INTEGER,
  })
  year: number

  @Column({
    type: DataType.DECIMAL,
    defaultValue: 0
  })
  sum: number;

  @ForeignKey(()=> Source)
  @Column({
    type: DataType.INTEGER,
  })
  source_id: number
  @BelongsTo(() => Source)
  source: Source

  @ForeignKey(()=> User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number
  @BelongsTo(() => User)
  user: User

  @Column({
    type: DataType.STRING,
  })
  description: string;



}



// Report.hasMany(User,{
//   //as: 'FK_user_lang',
//   foreignKey:'user_id',
// });



