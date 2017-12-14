import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Restaurants } from '/imports/api/restaurant/RestaurantCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.Add_Restaurant_Page.onCreated(function onCreated() {
  this.subscribe(Restaurants.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = Restaurants.getSchema().namedContext('Add_Restaurant_Page');
});

Template.Add_Restaurant_Page.helpers({
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
});

Template.Add_Restaurant_Page.events({
  'submit .restaurant-data-form'(event, instance) {
    event.preventDefault();
    const name = event.target.Name.value;
    const location = event.target.Location.value;
    // const selectedTags = _.filter(event.target.Tags.selectedOptions, (option) => option.selected);
    const picture = event.target.Picture.value;
    const description = event.target.Description.value;
    // const tags = _.map(selectedTags, (option) => option.value);
    const tags = ['Sample', 'Tags', 'Here'];
    const items = [{ name: 'Item1', price: 6.99 }, { name: 'Item2', price: 4.99 }];
    const restaurantData = { name, location, tags, items, description, picture };

    // Clear out any old validation errors.
    instance.context.reset();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    const cleanData = Restaurants.getSchema().clean(restaurantData);
    // Determine validity.
    instance.context.validate(cleanData);
    if (instance.context.isValid()) {
      Restaurants.define(restaurantData);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Today_Page');
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
