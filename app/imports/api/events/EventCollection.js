import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

/** @module Events */

/**
 * Events provide event data for our event page.
 * @extends module:Base~BaseCollection
 */
class EventCollection extends BaseCollection {

  /**
   * Creates the Event collection.
   */
  constructor() {
    super('Event', new SimpleSchema({
      eventname: { type: String },
      // Remainder are optional
      duration: { type: String, optional: true },
      location: { type: String, optional: true },
      description: { type: String, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Profile.
   * @example
   * Profiles.define({ firstName: 'Philip',
   *                   lastName: 'Johnson',
   *                   username: 'johnson',
   *                   bio: 'I have been a professor of computer science at UH since 1990.',
   *                   interests: ['Application Development', 'Software Engineering', 'Databases'],
   *                   title: 'Professor of Information and Computer Sciences',
   *                   location: 'Honolulu, HI',
   *                   picture: 'http://philipmjohnson.org/headshot.jpg',
   *                   github: 'https://github.com/philipmjohnson',
   *                   facebook: 'https://facebook.com/philipmjohnson',
   *                   instagram: 'https://instagram.com/philipmjohnson' });
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * Interests is an array of defined interest names.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more interests are not defined, or if github, facebook, and instagram are not URLs.
   * @returns The newly created docID.
   */
  define({ eventname, duration, location, description }) {
    // make sure required fields are OK.
    const checkPattern = { eventname: String, duration: String, location: String, description: String };
    check({ eventname, duration, location, description }, checkPattern);

    if (this.find({ eventname }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Event`);
    }

    return this._collection.insert({ firstName, lastName, username, bio, interests, picture, title, github,
      facebook, instagram, location });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const username = doc.username;
    const bio = doc.bio;
    const interests = doc.interests;
    const picture = doc.picture;
    const title = doc.title;
    const location = doc.location;
    const github = doc.github;
    const facebook = doc.facebook;
    const instagram = doc.instagram;
    return { firstName, lastName, username, bio, interests, picture, title, github, facebook, instagram, location };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Profiles = new ProfileCollection();
