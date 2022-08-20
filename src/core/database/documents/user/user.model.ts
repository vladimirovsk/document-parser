import {
	Column,
	DataType,
	Index, Model,
	PrimaryKey,
	Table
} from "sequelize-typescript";

@Table({
	tableName: 'user',
	timestamps: false
})
export class User extends Model<User> {
	@PrimaryKey
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
	})
	id: number;

	@Column({
		type: DataType.STRING(128),
	})
	username: string;

	@Index({
		name: 'user_email_uniq',
		type: 'UNIQUE',
		unique: true,
		using: 'BTREE',
	})
	@Column({
		type: DataType.STRING(128),
		allowNull: false,
		unique: true,
	})
	email: string;

	@Column({
		type: DataType.STRING(156),
		allowNull: true
	})
	password: string;


}


