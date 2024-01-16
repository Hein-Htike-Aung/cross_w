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
import Township from './township.model';

export default class UserPlace extends Model<
  InferAttributes<UserPlace>,
  InferCreationAttributes<UserPlace>
> {
  declare id: CreationOptional<number>;

  declare user_id: CreationOptional<number>;

  declare type: CreationOptional<PLACE_TYPE>;
  declare owner_type: CreationOptional<PLACE_OWNER_TYPE>;
  declare building_info: CreationOptional<string>; // flat, villa, condo, hoste>;

  declare price: CreationOptional<number>;
  declare has_deposit: CreationOptional<boolean>;
  declare deposit_amount: CreationOptional<number>;
  declare agent_fee: CreationOptional<string>;

  declare contact_channel: CreationOptional<JSON>;
  declare payment: CreationOptional<JSON>;
  declare home_no: CreationOptional<string>;
  declare street: CreationOptional<string>;
  declare township_id: CreationOptional<number>;
  declare ward: CreationOptional<string>;
  declare division: CreationOptional<string>;
  declare floor: CreationOptional<number>;
  declare house_holding_size: CreationOptional<number>;
  declare sqft: CreationOptional<string>;

  declare lat: CreationOptional<number>;
  declare long: CreationOptional<number>;

  declare parking: CreationOptional<number>;
  declare bus_stop: CreationOptional<string>;
  declare near_bus_stop: CreationOptional<string>;
  declare near_market: CreationOptional<string>;
  declare near_hospital: CreationOptional<string>;

  declare aircon: CreationOptional<string>;
  declare bath_toilet: CreationOptional<string>;
  declare bedroom: CreationOptional<string>;

  declare description: CreationOptional<string>;
  declare contract_term: CreationOptional<string>;
  declare payment_term: CreationOptional<string>;

  /* 
    images json
    address string
    contact array
    image_url string
    town_name string
    location_type string
    floor attribute json
    apartment_attribute json
  */
  declare images: CreationOptional<JSON>;
  declare address: CreationOptional<string>;
  declare contact: CreationOptional<JSON>;
  declare image_url: CreationOptional<string>;
  declare town_name: CreationOptional<string>;
  declare location_type: CreationOptional<string>;
  declare floor_attribute: CreationOptional<JSON>;
  declare apartment_attribute: CreationOptional<JSON>;

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
      type: DataTypes.DECIMAL(),
    },
    type: {
      type: DataTypes.ENUM('Hostel', 'Rent', 'Sell'),
    },
    owner_type: {
      type: DataTypes.ENUM('Agent', 'Private_owner', 'Company_agent'),
    },
    contact: {
      type: DataTypes.JSON,
    },
    home_no: {
      type: DataTypes.STRING,
    },
    street: {
      type: DataTypes.STRING,
    },
    township_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'township',
        key: 'id',
      },
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
      type: DataTypes.STRING,
      defaultValue: false,
    },
    near_market: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
    near_hospital: {
      type: DataTypes.STRING,
      defaultValue: false,
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
    images: {
      type: DataTypes.JSONB,
    },
    address: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    town_name: {
      type: DataTypes.STRING,
    },
    location_type: {
      type: DataTypes.STRING,
    },
    floor_attribute: {
      type: DataTypes.JSONB,
    },
    apartment_attribute: {
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

UserPlace.belongsTo(NayarUser, {
  foreignKey: 'user_id',
  as: 'nayar_user',
});

NayarUser.hasMany(UserPlace, {
  foreignKey: 'user_id',
  as: 'user_places',
});

UserPlace.belongsTo(Township, {
  foreignKey: 'township_id',
  as: 'township',
});

Township.hasMany(UserPlace, {
  foreignKey: 'township_id',
  as: 'user_places',
});
