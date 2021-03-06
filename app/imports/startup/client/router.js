import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Restaurants } from '/imports/api/restaurant/RestaurantCollection';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';


/*                        LANDING ROUTE                       */

export const landingPageRouteName = 'Landing_Page';
FlowRouter.route('/', {
  name: landingPageRouteName,
  action() {
    BlazeLayout.render('Landing_Layout', { main: landingPageRouteName });
  },
});


/*                        BROWSE ROUTE                          */ 
export const browsePageRouteName = 'Browse_Page';
FlowRouter.route('/browse', {
  name: browsePageRouteName,
  action() {
    BlazeLayout.render('Browse_Layout', { main: browsePageRouteName });
  },
});

/*                        TODAYS ROUTE                          */
export const todayPageRouteName = 'Today_Page';
FlowRouter.route('/today', {
  name: todayPageRouteName,
  action() {
    BlazeLayout.render('Today_Layout', { main: todayPageRouteName });
  },
});

/*                        EVENTS ROUTE                          */
export const eventPageRouteName = 'Event_Page';
FlowRouter.route('/events', {
  name: eventPageRouteName,
  action() {
    BlazeLayout.render('Event_Layout', { main: eventPageRouteName });
  },
});

/*                        ADD RESTAURANT ROUTE                  */
export const addRestaurantPageRouteName = 'Add_Restaurant_Page';
FlowRouter.route('/add-restaurant', {
  name: addRestaurantPageRouteName,
  action() {
    BlazeLayout.render('Add_Restaurant_Layout', { main: addRestaurantPageRouteName });
  },
});


/*                        DIRECTORY ROUTE                       */

function addDirectoryBodyClass() {
  $('body').addClass('directory-page-body');
}

function removeDirectoryBodyClass() {
  $('body').removeClass('directory-page-body');
}

export const directoryPageRouteName = 'Directory_Page';
FlowRouter.route('/directory', {
  name: directoryPageRouteName,
  action() {
    BlazeLayout.render('Directory_Layout', { main: directoryPageRouteName });
  },
  triggersEnter: [addDirectoryBodyClass],
  triggersExit: [removeDirectoryBodyClass],
});


/*                        USER ROUTES                      */


function addUserBodyClass() {
  $('body').addClass('user-layout-body');
}

function removeUserBodyClass() {
  $('body').removeClass('user-layout-body');
}

const userRoutes = FlowRouter.group({
  prefix: '/:username',
  name: 'userRoutes',
  triggersEnter: [addUserBodyClass],
  triggersExit: [removeUserBodyClass],
});

export const profilePageRouteName = 'Profile_Page';
userRoutes.route('/profile', {
  name: profilePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: profilePageRouteName });
  },
});

export const filterPageRouteName = 'Filter_Page';
userRoutes.route('/filter', {
  name: filterPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: filterPageRouteName });
  },
});


/*                        MISC ROUTES                       */
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('Page_Not_Found');
  },
};
