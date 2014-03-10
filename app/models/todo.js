// models/todo.js
export default = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean'),

});

