import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'townships', underscored: true })
class Township extends Model<Township> {
  @Column({ allowNull: false })
  name!: string;

  @Column({
    type: DataType.DATE(6),
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  created_at!: Date;
  @Column({
    type: DataType.DATE(6),
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  updated_at!: Date;
}

export default Township;
