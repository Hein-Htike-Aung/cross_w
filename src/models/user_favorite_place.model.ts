import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '.';
import UserPlace from './user_place.model';
import User from './user.model';

export default class UserFavoritePlace extends Model<
  InferAttributes<UserFavoritePlace>,
  InferCreationAttributes<UserFavoritePlace>
> {
  declare id: CreationOptional<number>;

  declare user_id: number;
  declare user_place_id: number;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

UserFavoritePlace.init(
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
        model: 'user',
        key: 'id',
      },
    },
    user_place_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_place',
        key: 'id',
      },
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
    modelName: 'UserFavoritePlace',
    tableName: 'user_favorite_place',
    timestamps: true,
    paranoid: false,
  },
);

/*  */
UserFavoritePlace.belongsTo(UserPlace, {
  foreignKey: 'user_place_id',
  as: 'user_place',
});

UserPlace.hasMany(UserFavoritePlace, {
  foreignKey: 'user_place_id',
  as: 'user_favorite_places',
});

/*  */
UserFavoritePlace.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

User.hasMany(UserFavoritePlace, {
  foreignKey: 'user_id',
  as: 'user_favorite_places',
});
