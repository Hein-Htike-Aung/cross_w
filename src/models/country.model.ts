import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '.';

export default class Country extends Model<
  InferAttributes<Country>,
  InferCreationAttributes<Country>
> {
  declare id: CreationOptional<number>;

  declare name: string;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

Country.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'Country',
    tableName: 'country',
    timestamps: true,
    paranoid: false,
  },
);
