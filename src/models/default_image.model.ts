import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { LOGIN_PROVIDER, USER_LEVEL, USER_TYPE } from '../types';
import { sequelize } from '.';

export default class DefaultImage extends Model<
  InferAttributes<DefaultImage>,
  InferCreationAttributes<DefaultImage>
> {
  declare id: CreationOptional<number>;

  declare lat: number;
  declare long: number;
  declare image: string;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

DefaultImage.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    long: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
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
    modelName: 'DefaultImage',
    tableName: 'default_image',
    timestamps: true,
    paranoid: false,
  },
);
