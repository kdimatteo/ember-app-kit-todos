import Todo from "appkit/models/todo"
// routes/todos.js
export default Ember.Route.extend({
  model: function() {
  	var todoModel = Todo.create({name:"sampleTodo"});

  	// why does this need to be an array?
  	return [todoModel];

  	// was:
    //return this.store.find('todo');
  }
});
