import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '.';
import Place from './place.model';

export default class ObtainDetails extends Model<
  InferAttributes<ObtainDetails>,
  InferCreationAttributes<ObtainDetails>
> {
  declare id: CreationOptional<number>;

  declare place_id: number;

  declare owner_type: string;
  declare contact: string;
  declare long: number;
  declare lat: number;
  declare near_market: boolean;
  declare near_hospital: boolean;
  declare near_bus_stop: boolean;
  declare is_deposit: boolean;
  declare image_base_url: CreationOptional<string>;
  declare price: CreationOptional<number>;
  declare building_info: CreationOptional<string>;
  declare payment_term: CreationOptional<string>;
  declare square_feet: CreationOptional<string>;
  declare floor: CreationOptional<number>;
  declare house_holding_size: number;
  declare air_con: CreationOptional<number>;
  declare parking: CreationOptional<string>;
  declare bedroom: CreationOptional<number>;
  declare bath_toilet: CreationOptional<number>;
  declare photos: CreationOptional<any>;
  declare bus_stop: CreationOptional<any>;
  declare deposit_amt: CreationOptional<number>;
  declare contract_term: CreationOptional<string>;
  declare description: CreationOptional<string>;
  declare agent_fee: CreationOptional<string>;
  declare contact_channel: CreationOptional<any>;
  declare payment: CreationOptional<any>;
  declare near_image: CreationOptional<string>;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

ObtainDetails.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    owner_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    long: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    building_info: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    payment_term: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    square_feet: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    floor: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    house_holding_size: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    air_con: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    parking: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    bedroom: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    bath_toilet: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    photos: {
      type: DataTypes.JSON,
      defaultValue: null,
    },
    near_bus_stop: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    bus_stop: {
      type: DataTypes.JSON,
      defaultValue: null,
    },
    near_market: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    near_hospital: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_deposit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    deposit_amt: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    contract_term: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    place_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'place',
        key: 'id',
      },
    },
    agent_fee: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    contact_channel: {
      type: DataTypes.JSON,
      defaultValue: null,
    },
    payment: {
      type: DataTypes.JSON,
      defaultValue: null,
    },
    image_base_url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://nayar-fs.sgp1.digitaloceanspaces.com',
    },
    near_image: {
      type: DataTypes.STRING,
      defaultValue: null,
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
    modelName: 'ObtainDetail',
    tableName: 'obtain_detail',
    timestamps: true,
    paranoid: false,
  },
);

/*  */
ObtainDetails.belongsTo(Place, {
  foreignKey: 'place_id',
  as: 'place',
});

Place.hasMany(ObtainDetails, {
  foreignKey: 'place_id',
  as: 'obtainDetails',
});
