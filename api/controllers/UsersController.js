/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	'stopWatch' : function(req, res, next) {

		var name = req.param('name');

		 Users.findOneByName(name).exec(function (err, found) {
			  
			  if (err) return res.serverError(err);
			  if (!found) return next();

			  var urlName =  {

			   		urlN : name
			  }

			 return res.view({urlName: urlName });

	      });
	},

    'suscribe': function (req, res, next) {

	    var name = req.param('name');

	   	 Users.findOneByName(name).exec(function (err, found) {

	        if (err) return res.serverError(err);
	        if (!found) return next();
	  		
		    Users.subscribe(req.socket, found);
	    
	    	return res.ok(found);

	      });
    },

	'start': function (req, res, next) {

		var start   = req.param('start'),
			upTo   = req.param('upTo'),
		 	fromT  = req.param('fromT');

		Users.findOneByName(req.param('name')).exec(function findOneCB(err,found){

			if (err) return res.serverError(err);
	        if (!found) return next();

			Users.update( found.id, { start: start, upTo: upTo, fromT: fromT } )
	     		 .exec(function (err, idx) {
				 
				    if (err) return res.negotiate(err);

				    Users.publishUpdate( idx[0].id, 
		   	    	    { start: idx[0].start, upTo:  idx[0].upTo, fromT: idx[0].fromT },
				    	  req);

					return res.ok(idx);
			});

	  	});
	
    },

  	'pause' : function(req, res, next){
    	
		var pause  = req.param('pause'),
			fromT  = req.param('fromT');

		Users.findOneByName(req.param('name')).exec(function findOneCB(err,found){

			if (err) return res.serverError(err);
	        if (!found) return next();

	    	Users.update( found.id, {  pause: pause, fromT: fromT } )
				 .exec(function (err, idx) {
		    
				    if (err) return res.negotiate(err);

				    Users.publishUpdate( idx[0].id, 
				    	 { pause: idx[0].pause, fromT: idx[0].fromT },
				    	  req);

				    return res.ok(idx);	
			});
  		});
  	},

  	'reset' : function(req, res, next){
  		
		reset = req.param('reset');

		Users.findOneByName(req.param('name')).exec(function findOneCB(err,found){

			if (err) return res.serverError(err);
	        if (!found) return next();
	
	  		Users.update(found.id, {reset : false} )
	  			 .exec( function(err, idx) {

					if(err) return res.negotiate(err);
					
					Users.publishUpdate( idx[0].id, 
						 { reset: reset },
						  req);

					return res.ok(idx);
			});	  	
	  	});

  	},

	'genURL': function(req, res, next) {

	   var ord = Math.floor((Math.random() * 1000000) + 1),
	   	   foo = ""+ ord.toString();
	
		Users.create( {name: foo}).exec(function created(err,idx){
	   		
	   	  if(err) return next(err);

	      res.status(201);
      
	      return res.ok( "localhost:1337/users/"+foo );

	   });
	}
	
};

