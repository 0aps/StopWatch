/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

 	attributes: {
		name: {
				type: 'string'
		},
		
		start: {
				type: 'boolean',
				defaultsTo: false
		},

		pause: {
				type: 'boolean',
				defaultsTo: false
		},

		reset: {
				type: 'boolean',
				defaultsTo: false
		},

		upTo: {
				type: 'integer',
				defaultsTo: 0
		},

		fromT: {
				type: 'integer',
				defaultsTo: 0
		} 

	},
  
  	getURL: function(callback) {

	  	Users.find().sort("id DESC").exec(function(err, names) {

	  		callback(err, names);

  		});
  	}

};
