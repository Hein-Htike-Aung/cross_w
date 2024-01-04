import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '.';
import Township from './township.model';
import Place from './place.model';

export default class Address extends Model<
  InferAttributes<Address>,
  InferCreationAttributes<Address>
> {
  declare id: CreationOptional<number>;

  declare township_id: number;
  declare place_id: number;

  declare home_no: CreationOptional<string>;
  declare ward: CreationOptional<string>;
  declare division: CreationOptional<string>;
  declare street: CreationOptional<string>;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

Address.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    township_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'township',
        key: 'id',
      },
    },
    place_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'place',
        key: 'id',
      },
    },
    home_no: {
      type: DataTypes.TEXT,
    },
    ward: {
      type: DataTypes.TEXT,
    },
    division: {
      type: DataTypes.TEXT,
    },
    street: {
      type: DataTypes.TEXT,
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
    modelName: 'Address',
    tableName: 'address',
    timestamps: true,
    paranoid: false,
  },
);

/*  */
Address.belongsTo(Township, {
  foreignKey: 'township_id',
  as: 'township',
});

Township.hasMany(Address, {
  foreignKey: 'township_id',
  as: 'addresses',
});

/*  */
Address.belongsTo(Place, {
  foreignKey: 'place_id',
  as: 'place',
});

Place.hasMany(Address, {
  foreignKey: 'place_id',
  as: 'addresses',
});
