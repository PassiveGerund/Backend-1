import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserEntity } from './user.entity';

@Table({
  tableName: 'tasks',
})
export class TaskEntity extends Model {
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
  public description: string;

  // исполнитель задачи
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  public assignId: number | null;

  @BelongsTo(() => UserEntity, {
    foreignKey: 'assignId',
    as 'assignUser', })
  public assignUser: UserEntity;

  // автор задачи
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public authorId: number;

  @BelongsTo(() => UserEntity, {
    foreignKey: 'authorId',
    as: 'authorUser',
  })
  public authorUser: UserEntity;
}
