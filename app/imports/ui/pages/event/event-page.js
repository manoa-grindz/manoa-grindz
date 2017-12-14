import { Template } from 'meteor/templating';
import { Events } from '/imports/api/event/EventCollection';

Template.Event_Page.helpers({

  /**
   * @returns {*} All of the Contacts documents.
   */
  events() {
    return Events.find();
  },
});

Template.Event_Page.onCreated(function onCreated() {
  this.subscribe(Events.getPublicationName());
  this.context = Events.getSchema().namedContext('Event_Page');
});
