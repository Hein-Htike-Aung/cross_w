import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { LOGIN_PROVIDER, USER_LEVEL, USER_TYPE } from '../types';
import { sequelize } from '.';
import Township from './township.model';

export default class NayarUser extends Model<
  InferAttributes<NayarUser>,
  InferCreationAttributes<NayarUser>
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
  declare user_level: USER_LEVEL;
  declare long: CreationOptional<number>;
  declare lat: CreationOptional<number>;
  declare device_token: CreationOptional<string>;
  declare address: CreationOptional<string>;
  declare email: CreationOptional<string>;
  declare is_update: boolean;
  declare provider_id: CreationOptional<string>;
  declare provider: CreationOptional<LOGIN_PROVIDER>;
  declare notification_on: boolean;
  declare system_notification: boolean;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

NayarUser.init(
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
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
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
      defaultValue: false,
    },
    type: {
      type: DataTypes.ENUM(
        'ADMIN',
        'SUPER ADMIN',
        'COMPANY_AGENT',
        'USER',
        'AGENT',
      ),
    },
    user_level: {
      type: DataTypes.ENUM('LEVEL_1', 'LEVEL_2'),
    },
    long: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    device_token: {
      type: DataTypes.TEXT,
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
    is_update: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    provider_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    provider: {
      type: DataTypes.ENUM('google', 'apple', 'facebook', 'phone'),
      allowNull: true,
    },
    notification_on: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    system_notification: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: 'NayarUser',
    tableName: 'nayar_user',
    timestamps: true,
    paranoid: false,
  },
);

NayarUser.belongsTo(Township, {
  foreignKey: 'township_id',
  as: 'township',
});

Township.hasMany(NayarUser, {
  foreignKey: 'township_id',
  as: 'users',
});
