import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserEntity } from './user.entity';

@Table({
  tableName: 'departments',
})
export class DepartmentEntity extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  public id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  public description: string | null;

  // автор департамента
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  public authorId: number;

  @BelongsTo(() => UserEntity, {
    foreignKey: 'authorId',
    as: 'authorUser',
  })
  public authorUser: UserEntity;
}
