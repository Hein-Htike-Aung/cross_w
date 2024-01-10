import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { PLACE_OWNER_TYPE, PLACE_TYPE } from '../types';
import { sequelize } from '.';
import NayarUser from './nayar_user.model';

export default class UserPlace extends Model<
  InferAttributes<UserPlace>,
  InferCreationAttributes<UserPlace>
> {
  declare id: CreationOptional<number>;

  declare user_id: number;

  declare type: PLACE_TYPE;
  declare owner_type: PLACE_OWNER_TYPE;
  declare building_info: string; // flat, villa, condo, hostel

  declare price: number;
  declare has_deposit: boolean;
  declare deposit_amount: number;
  declare agent_fee: string;

  declare contact: string;
  declare contact_channel: JSON;
  declare payment: JSON;
  declare home_no: string;
  declare street: string;
  declare township: string;
  declare ward: string;
  declare division: string;
  declare floor: number;
  declare house_holding_size: number;
  declare sqft: string;

  declare lat: number;
  declare long: number;

  declare parking: number;
  declare bus_stop: string;
  declare near_bus_stop: string;
  declare near_market: string;
  declare near_hospital: string;

  declare aircon: string;
  declare bath_toilet: string;
  declare bedroom: string;

  declare description: string;
  declare contract_term: string;
  declare payment_term: string;

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
        model: 'nayar_user',
        key: 'id',
      },
    },
    price: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.ENUM('Hostel', 'Rent', 'Sell'),
    },
    owner_type: {
      type: DataTypes.ENUM('Agent', 'Private Owner', 'Company Agent'),
    },
    contact: {
      type: DataTypes.STRING,
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
    division: {
      type: DataTypes.STRING,
    },
    parking: {
      type: DataTypes.INTEGER,
    },
    house_holding_size: {
      type: DataTypes.INTEGER,
    },
    floor: {
      type: DataTypes.INTEGER,
    },
    has_deposit: {
      type: DataTypes.BOOLEAN,
    },
    deposit_amount: {
      type: DataTypes.INTEGER,
    },
    bus_stop: {
      type: DataTypes.STRING,
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

UserPlace.belongsTo(NayarUser, {
  foreignKey: 'user_id',
  as: 'nayar_user',
});

NayarUser.hasMany(UserPlace, {
  foreignKey: 'user_id',
  as: 'user_places',
});
