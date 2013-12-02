
describe('Raffler application', function() {
  it('has a raffler object', function() {
    return expect(window.Raffler).toBeDefined();
  });
  it('has a raffler.Models', function() {
    return expect(window.Raffler.Models).toBeDefined();
  });
  it('has a raffler.Collections', function() {
    return expect(window.Raffler.Collections).toBeDefined();
  });
  it('has a raffler.Routers', function() {
    return expect(window.Raffler.Routers).toBeDefined();
  });
  it('has a raffler.Views', function() {
    return expect(window.Raffler.Views).toBeDefined();
  });
  describe('Model', function() {
    var model;
    model = new window.Raffler.Models.Entry;
    it('should have a defined Raffler model', function() {
      return expect(model).toBeDefined();
    });
    it('can set a name', function() {
      model.set({
        name: "test"
      });
      return expect(model.get("name")).toEqual("test");
    });
    it('defaults to not being a winner', function() {
      return expect(model.get("winner")).toEqual(false);
    });
    it('can set winner to true', function() {
      model.set({
        winner: true
      });
      return expect(model.get("winner")).toEqual(true);
    });
    return it('can set winner back to false', function() {
      model.set({
        winner: false
      });
      return expect(model.get("winner")).toEqual(false);
    });
  });
  describe('Collection', function() {
    var collection;
    collection = new window.Raffler.Collections.Entries;
    it('should be defined', function() {
      return expect(collection).toBeDefined();
    });
    it('starts with no entries', function() {
      return expect(collection.length).toEqual(0);
    });
    it('can create entries', function() {
      var currLength;
      currLength = collection.length;
      collection.create({
        name: "test"
      });
      return expect(collection.length).toEqual(currLength + 1);
    });
    it('can find entries that are not winners', function() {
      var item;
      item = collection.find(function(model) {
        return model.get("winner") === false;
      });
      return expect(item.get("name")).toEqual("test");
    });
    it('can find entries that are winners', function() {
      var item;
      collection.create({
        name: "test winner",
        winner: true
      });
      item = collection.find(function(model) {
        return model.get("winner") === true;
      });
      return expect(item.get("name")).toEqual("test winner");
    });
    return it('should have no entries after reset', function() {
      collection.create({
        name: "test three"
      });
      collection.reset();
      return expect(collection.length).toEqual(0);
    });
  });
  describe('Router', function() {
    var entries;
    entries = null;
    beforeEach(function() {
      return entries = new window.Raffler.Routers.Entries;
    });
    it('should have a collection of entries', function() {
      return expect(entries.collection).toBeDefined();
    });
    it('should provide a default route to index', function() {
      return expect(entries.routes['']).toEqual('index');
    });
    return it('should provide a route to show information on a specific entry', function() {
      return expect(entries.routes['entries/:id']).toEqual('show');
    });
  });
  return describe('View', function() {
    var entries, view;
    view = null;
    entries = null;
    beforeEach(function() {
      entries = new window.Raffler.Routers.Entries;
      return view = new window.Raffler.Views.EntriesIndex({
        collection: entries.collection
      });
    });
    it('can be generated', function() {
      return expect(view).toBeDefined();
    });
    it('can reset all winners', function() {
      var winner;
      view.resetWinner();
      winner = view.collection.find(function(model) {
        return model.get("winner") === true;
      });
      return expect(winner).toBeUndefined();
    });
    return it('can draw a winner', function() {
      var winner;
      view.drawWinner();
      winner = view.collection.find(function(model) {
        return model.get("winner") === true;
      });
      return expect(winner).toBeDefined();
    });
  });
});

