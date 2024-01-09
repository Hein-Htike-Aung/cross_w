import Address from '../models/address.model';
import Country from '../models/country.model';
import Demo from '../models/demon.model';
import Notification from '../models/notification.model';
import ObtainDetails from '../models/obtain_detail.model';
import Place from '../models/place.model';
import Region from '../models/region.model';
import Township from '../models/township.model';
import NayarUser from '../models/user.model';
import UserFavoritePlace from '../models/user_favorite_place.model';
import UserPlace from '../models/user_place.model';

export const model_list = [
  Country,
  Township,
  Region,
  Address,
  Notification,
  ObtainDetails,
  Place,
  NayarUser,
  UserPlace,
  UserFavoritePlace,
  Demo,
];
