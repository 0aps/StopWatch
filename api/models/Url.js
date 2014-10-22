/**
* Url.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	code:{
				type: 'string'
		}
  },
  getURL: function(callback) {
  	Url.find().sort("id DESC").exec(function(err, codes) {
  		callback(err, codes);
  	});
  }
};

