import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { CATEGORY } from '../types';
import { sequelize } from '.';
import User from './user.model';
import Place from './place.model';

export default class Notification extends Model<
  InferAttributes<Notification>,
  InferCreationAttributes<Notification>
> {
  declare id: CreationOptional<number>;

  declare from_user_id: number;
  declare to_user_id: number;
  declare place_id: number;

  declare title: any;
  declare body: any;
  declare is_read: boolean;
  declare category: CATEGORY;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

Notification.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    from_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    to_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
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
    title: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    body: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    category: {
      type: DataTypes.ENUM('CONTACT', 'NEW_ESTATE'),
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
    modelName: 'Notification',
    tableName: 'notification',
    timestamps: true,
    paranoid: false,
  },
);

/*  */
Notification.belongsTo(User, {
  foreignKey: 'from_user_id',
  as: 'from_user',
});

User.hasMany(Notification, {
  foreignKey: 'from_user_id',
  as: 'from_user_notifications',
});

/*  */
Notification.belongsTo(User, {
  foreignKey: 'to_user_id',
  as: 'to_user',
});

User.hasMany(Notification, {
  foreignKey: 'to_user_id',
  as: 'to_user_notifications',
});

/*  */
Notification.belongsTo(Place, {
  foreignKey: 'place_id',
  as: 'place',
});

Place.hasMany(Notification, {
  foreignKey: 'place_id',
  as: 'notifications',
});