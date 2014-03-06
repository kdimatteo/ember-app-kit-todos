export default DS.Adapter.extend({
  orbitSource: undefined,
  
  _generateSchema: function(){
    var schema = {idField:'id', models:{}};

    var ds = App.__container__.lookup('store:main');
    // this probably needs to be an iterable if > 1 model
    // instanceKey is an ember-internal reference, something like "ember331"
    var instanceKey = Ember.keys(ds.typeMaps).toString();
    var modelType = Ember.get(ds.typeMaps[instanceKey].type, 'typeKey');
    
    //Ember.get($E.store.modelFor('todo'), 'attributes');
    //var mySchema = Ember.get(ds.modelFor(modelType), 'attributes').keys.list;
    var modelToAppend = {};
    //modelType: {models: {}}};

    var o = Ember.get(ds.modelFor(modelType), 'transformedAttributes');
    ds.modelFor(modelType).eachTransformedAttribute(function(name, type) {
      modelToAppend[name] = {type: type};
      //modelToAppend.models[name] = {type: type}
      //console.log(name, type);
    });

    console.log("???", modelToAppend);
    $.extend(schema.models, modelToAppend)
    //this.schema.models.push(modelToAppend);
    return schema;
    //this.schema.models[modelType] = mySchema
  },

  init: function() {
    this._super();

    console.log("adapter init");

    //this is a much more logical place to set this (was index.html in orbit demo)
    Orbit.Promise = Ember.RSVP.Promise;
    
    var foo_schema = this._generateSchema();
    console.log("!!!!!", foo_schema);
 	
 		//ember.__container__.lookup
		//console.log(App.__container__);
 		/*
		var ds = App.__container__.lookup('store:main');

 		// this probably needs to be an iterable if > 1 model
    // instanceKey is an ember-internal reference, something like "ember331"
 		var instanceKey = Ember.keys(ds.typeMaps).toString();
 		 
    var modelType = Ember.get(ds.typeMaps[instanceKey].type, 'typeKey');

    //Ember.get($E.store.modelFor('todo'), 'attributes');

    var someSchema = Ember.get(ds.modelFor(modelType), 'attributes').keys.list;

    //console.log(ds.typeMaps[key]);
    //console.log(ds.typeMaps[key].type);
    console.log("!!", someSchema);
    // someSchema.keys.list, someSchema.keys['list']);
    */

	  // TODO - autogenerate schema from DS models
    /**/var _schema = {
      idField: 'id',
      models: {
        todo: {
        	attributes: {
        		//id : {type: 'string'},
        		title: {type: 'string'},
        		isCompleted: {type: 'boolean'}
        	}
        }
        
      }
    };

    var schema = new OC.Schema(_schema);
 
    var orbitSource = new OC.LocalStorageSource(schema);

    this.set('orbitSource', orbitSource);
  },
 
  find: function(store, type, id) {
    return this.get('orbitSource').find(type.typeKey, id);
  },
 
  findAll: function(store, type) {
    return this.get('orbitSource').find(type.typeKey);
  },
 
  createRecord: function(store, type, record) {	
  	var serializer = store.serializerFor(type.typeKey);
    var data = serializer.serialize(record, {includeId: true});
    return this.get('orbitSource').add(type.typeKey, data);
  },
 
  updateRecord: function(store, type, record) {
    var serializer = store.serializerFor(type.typeKey);
    var data = serializer.serialize(record, {includeId: true});
    return this.get('orbitSource').update(type.typeKey, data);
  },
 
  deleteRecord: function(store, type, record) {
    var serializer = store.serializerFor(type.typeKey);
    var data = serializer.serialize(record, {includeId: true});
    return this.get('orbitSource').remove(type.typeKey, data);
  },
});

//export default DS.FixtureAdapter.extend();
