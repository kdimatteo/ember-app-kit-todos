// controllers/todos.js

var isEmpty  = Ember.isEmpty;
var filterBy = Ember.computed.filterBy;
var notEmpty = Ember.computed.notEmpty;

export default Ember.ArrayController.extend({
  active:    filterBy('@this', 'isCompleted', false),
  completed: filterBy('@this', 'isCompleted', true),
  hasCompleted: notEmpty('completed.[]'),

  inflection: function () {
    var active = this.get('active.length');
    return active === 1 ? 'item' : 'items';
  }.property('active.[]'),

  allAreDone: function (key, value) {
    if (arguments.length === 2) {
      this.setEach('isCompleted', value);
      this.invoke('save');
      return value;
    } else {
      return !isEmpty(this) && this.get('length') === this.get('completed.length');
    }
  }.property('@each.isCompleted'),

  actions: {
    createTodo: function () {
      // Get the todo title set by the "New Todo" text field
      var title = this.get('newTitle');
      
      /*
      // if the title is already set or not a string:
      if (title && !title.trim()) { 
        this.set('newTitle', ''); 
        return; 
      }
      */
      
      this.get('model').save({title:title, isCompleted:false});


      /*
      // Create the new Todo model, DS.Store way:
      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      // Save the new model
      todo.save();
      */

      // Clear the "New Todo" text field
      this.set('newTitle', '');
    },

    clearCompleted: function () {
      var completed = this.get('completed');

      completed.toArray(). // clone the array, so it is not bound while we iterate over and delete.
        invoke('deleteRecord').
        invoke('save');
    }
  }
});
