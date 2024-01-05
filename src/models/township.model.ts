import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '.';
import Region from './region.model';

export default class Township extends Model<
  InferAttributes<Township>,
  InferCreationAttributes<Township>
> {
  declare id: CreationOptional<number>;

  declare region_id: number;

  declare name: string;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

Township.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'region',
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
    modelName: 'Township',
    tableName: 'township',
    timestamps: true,
    paranoid: false,
  },
);

/*  */
Township.belongsTo(Region, {
  foreignKey: 'region_id',
  as: 'region',
});

Region.hasMany(Township, {
  foreignKey: 'region_id',
  as: 'townships',
});
