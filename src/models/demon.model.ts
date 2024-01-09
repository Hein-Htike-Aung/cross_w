import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '.';

export default class Demo extends Model<
  InferAttributes<Demo>,
  InferCreationAttributes<Demo>
> {
  declare id: CreationOptional<number>;

  declare data: JSON;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

Demo.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    data: {
      type: DataTypes.JSONB,
    },
    created_at: {
      type: DataTypes.DATE(6),
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE(6),
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'Demo',
    tableName: 'demo',
    timestamps: true,
    paranoid: false,
  },
);
