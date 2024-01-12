import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { CATEGORY } from '../types';
import { sequelize } from '.';
import NayarUser from './nayar_user.model';
import Place from './place.model';
import UserPlace from './user_place.model';

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
  declare is_read: CreationOptional<boolean>;
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
        model: 'nayar_user',
        key: 'id',
      },
    },
    to_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'nayar_user',
        key: 'id',
      },
    },
    place_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_place',
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
Notification.belongsTo(NayarUser, {
  foreignKey: 'from_user_id',
  as: 'from_user',
});

NayarUser.hasMany(Notification, {
  foreignKey: 'from_user_id',
  as: 'from_user_notifications',
});

/*  */
Notification.belongsTo(NayarUser, {
  foreignKey: 'to_user_id',
  as: 'to_user',
});

NayarUser.hasMany(Notification, {
  foreignKey: 'to_user_id',
  as: 'to_user_notifications',
});

/*  */
Notification.belongsTo(UserPlace, {
  foreignKey: 'place_id',
  as: 'place',
});

UserPlace.hasMany(Notification, {
  foreignKey: 'place_id',
  as: 'notifications',
});
