import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DepartmentEntity } from './department.entity';

@Table({
  tableName: 'users',
})
export class UserEntity extends Model {
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
  public name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  public email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public password: string;

  @ForeignKey(() => DepartmentEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  public departmentId: number | null;

  @BelongsTo(() => DepartmentEntity, {
    foreignKey: 'departmentId',
  })
  public department: DepartmentEntity;
}
