import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { USER_TYPE } from '../types';
import { sequelize } from '.';
import Township from './township.model';

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;

  declare township_id: CreationOptional<number>;

  declare name: string;
  declare phone: string;
  declare home_no: CreationOptional<string>;
  declare ward: CreationOptional<string>;
  declare street: CreationOptional<string>;
  declare password: string;
  declare image_url: CreationOptional<string>;
  declare is_disable: boolean;
  declare type: USER_TYPE;
  declare long: CreationOptional<number>;
  declare lat: CreationOptional<number>;
  declare favorite: CreationOptional<JSON>;
  declare remember_token: CreationOptional<string>;
  declare device_token: CreationOptional<string>;
  declare role: CreationOptional<number>;
  declare address: CreationOptional<string>;
  declare email: CreationOptional<string>;
  declare facebook_id: CreationOptional<string>;
  declare facebook_token: CreationOptional<string>;
  declare is_update: boolean;
  declare provider_id: CreationOptional<string>;
  declare provider: CreationOptional<string>;
  declare country: string;
  declare notification_on: boolean;
  declare system_notification: boolean;
  declare image_base_url: string;
  declare email_verified_at: CreationOptional<Date>;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    township_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'township',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    home_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ward: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_disable: {
      type: DataTypes.BOOLEAN,
    },
    type: {
      type: DataTypes.ENUM('COMPANY_AGENT', 'USER', 'AGENT'),
    },
    long: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    favorite: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    remember_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    device_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facebook_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facebook_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_update: {
      type: DataTypes.BOOLEAN,
    },
    provider_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    provider: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
    },
    notification_on: {
      type: DataTypes.BOOLEAN,
    },
    system_notification: {
      type: DataTypes.BOOLEAN,
    },
    image_base_url: {
      type: DataTypes.STRING,
    },
    email_verified_at: {
      type: DataTypes.DATE(6),
      allowNull: true,
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
    modelName: 'User',
    tableName: 'user',
    timestamps: true,
    paranoid: false,
  },
);

User.belongsTo(Township, {
  foreignKey: 'township_id',
  as: 'township',
});

Township.hasMany(User, {
  foreignKey: 'township_id',
  as: 'users',
});
