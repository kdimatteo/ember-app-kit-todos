export default Ember.Object.extend({
	
	orbitConnector: null,

	init: function(){
		
    this._super.apply(this, arguments);

		this.set('orbitConnector', new Orbit.TransformConnector({
			name:'foo', 
			source: this.get('target'), 
			target: this.get('source')
		}));


	}

});