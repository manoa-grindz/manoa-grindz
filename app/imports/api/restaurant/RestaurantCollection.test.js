import { Restaurants } from '/imports/api/restaurant/RestaurantCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('RestaurantCollection', function testSuite() {
    const name = 'Testaurant';
    const location = 'Test Avenue';
    const tags = ['Tag1', 'Tag2'];
    const items = [
      {
        name: 'TestItem',
        price: 7.99,
      },
      {
        name: 'TestItem2',
        price: 8.99,
      },
    ];
    const description = 'Testauranting';
    const picture = '/images/bale.jpg';
    const defineObject = { name, location, tags, items, description, picture  };

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Restaurants.define(defineObject);
      expect(Restaurants.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Restaurants.findDoc(docID);
      expect(doc.name).to.equal(name);
      expect(doc.description).to.equal(description);
      // Check that multiple definitions with the same name fail
      expect(function foo() { Restaurants.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Restaurant.
      const dumpObject = Restaurants.dumpOne(docID);
      Restaurants.removeIt(docID);
      expect(Restaurants.isDefined(docID)).to.be.false;
      docID = Restaurants.restoreOne(dumpObject);
      expect(Restaurants.isDefined(docID)).to.be.true;
      Restaurants.removeIt(docID);
    });

    it('#findID, #findIDs', function test() {
      const docID = Restaurants.define(defineObject);
      expect(Restaurants.isDefined(docID)).to.be.true;
      const docID2 = Restaurants.findID(name);
      expect(docID).to.equal(docID2);
      Restaurants.findIDs([name, name]);
      Restaurants.removeIt(docID);
    });
  });
}

