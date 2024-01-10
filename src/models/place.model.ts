import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '.';
import NayarUser from './nayar_user.model';

export default class Place extends Model<
  InferAttributes<Place>,
  InferCreationAttributes<Place>
> {
  declare id: CreationOptional<number>;

  declare user_id: number;

  declare owner_name: string;
  declare price: CreationOptional<number>;
  declare contact: CreationOptional<string>;
  declare image: CreationOptional<string>;
  declare address: string;
  declare owner_type: string;
  declare available: boolean;
  declare type: boolean;
  declare is_public: boolean;
  declare location_type: CreationOptional<string>;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

Place.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'nayar_user',
        key: 'id',
      },
    },
    owner_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(65, 2),
    },
    contact: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.TEXT,
    },
    address: {
      type: DataTypes.TEXT,
      defaultValue: false,
    },
    owner_type: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    type: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    location_type: {
      type: DataTypes.STRING,
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
    modelName: 'Place',
    tableName: 'place',
    timestamps: true,
    paranoid: false,
  },
);

Place.belongsTo(NayarUser, {
  foreignKey: 'user_id',
  as: 'nayar_user',
});

NayarUser.hasMany(Place, {
  foreignKey: 'user_id',
  as: 'places',
});
