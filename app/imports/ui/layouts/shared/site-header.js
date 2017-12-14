import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.Site_Header.helpers({
  userRedirect() {
    const username = Meteor.user().profile.name;
    return `${username}/profile`;
  },
});
