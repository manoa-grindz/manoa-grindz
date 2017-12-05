import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Restaurants } from '/imports/api/restaurant/RestaurantCollection';

Interests.publish();
Profiles.publish();
Restaurants.publish();
