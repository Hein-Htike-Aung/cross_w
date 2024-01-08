import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { PLACE_OWNER_TYPE, PLACE_TYPE } from '../types';
import { sequelize } from '.';

export default class UserPlace extends Model<
  InferAttributes<UserPlace>,
  InferCreationAttributes<UserPlace>
> {
  declare id: CreationOptional<number>;

  declare user_id: number;

  declare price: number;
  declare type: PLACE_TYPE;
  declare owner_type: PLACE_OWNER_TYPE;
  declare contact: string;

  declare home_no: string;
  declare street: string;
  declare township: string;
  declare ward: string;

  declare lat: number;
  declare long: number;

  declare near_bus_stop: string;
  declare near_market: string;
  declare near_hospital: string;

  declare aircon: string;
  declare bath_toilet: string;
  declare bedroom: string;

  declare sqft: string;
  declare building_info: string;

  declare description: string;
  declare contract_term: string;
  declare payment_term: string;
  declare agent_fee: string;

  declare contact_channel: JSON;
  declare payment: JSON;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

UserPlace.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('Dorm', 'Rent', 'Sell'),
      allowNull: false,
    },
    owner_type: {
      type: DataTypes.ENUM('Agent', 'Private Owner', 'Company Agent'),
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    home_no: {
      type: DataTypes.STRING,
    },
    street: {
      type: DataTypes.STRING,
    },
    township: {
      type: DataTypes.STRING,
    },
    ward: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.DECIMAL,
    },
    long: {
      type: DataTypes.DECIMAL,
    },
    near_bus_stop: {
      type: DataTypes.BOOLEAN,
    },
    near_market: {
      type: DataTypes.BOOLEAN,
    },
    near_hospital: {
      type: DataTypes.BOOLEAN,
    },
    aircon: {
      type: DataTypes.INTEGER,
    },
    bath_toilet: {
      type: DataTypes.INTEGER,
    },
    bedroom: {
      type: DataTypes.INTEGER,
    },
    sqft: {
      type: DataTypes.STRING,
    },
    building_info: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    contract_term: {
      type: DataTypes.STRING,
    },
    payment_term: {
      type: DataTypes.STRING,
    },
    agent_fee: {
      type: DataTypes.INTEGER,
    },
    contact_channel: {
      type: DataTypes.JSONB,
    },
    payment: {
      type: DataTypes.JSONB,
    },
    created_at: {
      type: DataTypes.DATE(6),
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE(6),
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'UserPlace',
    tableName: 'user_place',
    timestamps: true,
    paranoid: false,
  },
);
