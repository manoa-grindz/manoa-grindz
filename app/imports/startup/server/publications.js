import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Restaurants } from '/imports/api/restaurant/RestaurantCollection';
import { Events } from '/imports/api/event/EventCollection';

Interests.publish();
Profiles.publish();
Restaurants.publish();
Events.publish();

