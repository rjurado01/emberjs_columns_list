window.App = Ember.Application.create();

App.Browser = DS.Model.extend({
  logo: DS.attr('string'),
  name: DS.attr('string')
});


App.Router.map(function () {
  this.resource('todos', { path: '/' });
});

App.TodosRoute = Ember.Route.extend({
  counter: 0,

  model: function() {
    var store = this.get('store');

    store.push( 'browser', {id: 1, name: 'Firefox', logo: 'imgs/firefox.png'});
    store.push( 'browser', {id: 2, name: 'Chromium/Chrome', logo: 'imgs/chrome.png'});
    store.push( 'browser', {id: 3, name: 'Opera', logo: 'imgs/opera.png'});
    store.push( 'browser', {id: 4, name: 'Internet Exprorer', logo: 'imgs/ie.png'});
    this.set('counter', 4);

    return store.all('browser');
  },

  setupController: function( controller, model ) {
    this._super(controller, model);
  },

});

App.ListView = Em.View.extend({
  templateName: 'list',

  didInsertElement: function() {
    this.get('controller').update();
  }
});

App.ItemView = Em.View.extend({
  templateName: 'item',

  didInsertElement: function() {
    this.get('controller.controllers.todos').update();
  }
});

App.ItemController = Em.ObjectController.extend({
  needs: ['todos'],
});

App.TodosController = Em.ArrayController.extend({
  column1: [],
  column2: [],

  inserted: false,

  update: function() {
    if( this.get('content').get('length') > 0 ) {
      this.addElement( this.get('content').objectAt(0) );
    }
  },

  addElement: function(object) {
    var height1 = $("#list1").height();
    var height2 = $("#list2").height();

    if( height1 > height2 )
      this.get('column2').pushObject(object);
    else
      this.get('column1').pushObject(object);

    this.get('content').removeObject(object);
  },

  actions: {
    insertElement: function() {
      this.set('counter', this.get('counter') + 1);

      this.get('store').push( 'browser',
          {id: this.get('counter'), name: 'Safari', logo: 'imgs/safari.png'});

      Ember.run.next( this, function() {
        this.update();
      });
    }
  }
});
