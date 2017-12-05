import { Template } from 'meteor/templating';
import { Restaurants } from '/imports/api/restaurant/RestaurantCollection';

Template.Today_Page.helpers({

  /**
   * @returns {*} All of the Contacts documents.
   */
  restaurants() {
    return Restaurants.find();
  },
});

Template.Today_Page.onCreated(function onCreated() {
  this.subscribe(Restaurants.getPublicationName());
  this.context = Restaurants.getSchema().namedContext('Today_Page');
});
