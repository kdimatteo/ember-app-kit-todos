export default DS.Adapter.extend({
  orbitSource: undefined,
  dataStore: undefined,

  _getModelAttributes: function(modelType){
    var modelToAppend = {};
      modelToAppend[modelType] = {};
      modelToAppend[modelType]['attributes'] = {};

    this.dataStore.modelFor(modelType).eachTransformedAttribute(function(name, type) {
      modelToAppend[modelType]['attributes'][name] = {type: type};
    });
    return modelToAppend;
  },
  
  _generateSchema: function(){    
    var schema = {idField:'id', models:{}};
    var modelInstanceKeys = Ember.keys(this.dataStore.typeMaps);
    var that = this;

    $.each(modelInstanceKeys, function(i, instanceKey){
   
      var modelType = Ember.get(that.dataStore.typeMaps[instanceKey].type, 'typeKey');
      $.extend(schema.models, that._getModelAttributes(modelType));
      
    });
    return schema;
  },

  init: function() {
    this._super();

    //NB: this is a much more logical place to set this (was index.html in orbit demo)
    Orbit.Promise = Ember.RSVP.Promise;
    this.set('dataStore', App.__container__.lookup('store:main'));
    	
    var schema = new OC.Schema(this._generateSchema());
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
