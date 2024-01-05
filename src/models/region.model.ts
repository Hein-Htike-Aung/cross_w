import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '.';
import Country from './country.model';

export default class Region extends Model<
  InferAttributes<Region>,
  InferCreationAttributes<Region>
> {
  declare id: CreationOptional<number>;

  declare country_id: number;

  declare name: string;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

Region.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'country',
        key: 'id',
      },
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
    modelName: 'Region',
    tableName: 'region',
    timestamps: true,
    paranoid: false,
  },
);

/*  */
Region.belongsTo(Country, {
  foreignKey: 'country_id',
  as: 'country',
});

Country.hasMany(Region, {
  foreignKey: 'country_id',
  as: 'regions',
});
