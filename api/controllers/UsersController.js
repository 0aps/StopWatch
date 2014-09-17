/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	'stopWatch' : function(req, res, next) {

	var name = req.param('name');

	 Users
    .findOneByName(name)
    .exec(function (err, user) {
        if (err) return res.serverError(err);
        if (!user) return next();

  		var urlName =  {
    		urlN : name
   		 }

   	    res.view({urlName: urlName });

      });

	},

    'suscribe': function (req, res, next) {

    var name = req.param('name');

   	 Users
    .findOneByName(name)
    .exec(function (err, user) {
        if (err) return res.serverError(err);
        if (!user) return next();
  		
	    Users.subscribe(req.socket, user);
    
    	return res.ok(user);

      });
  },

	'started': function (req, res) {

	var start  = req.param('hasStarted'),
		pause  = req.param('pause'),
		reset = req.param('reset'),
		timeU  = req.param('timeU'),
	 	timeS  = req.param('timeS');
		
	Users.findOneByName(req.param('name')).exec(function findOneCB(err,found){
    
		if( start !== undefined){

			if( start == true){
			  Users.update( found.id, 
			  		{ hasStarted: start, upTo: timeU, fromT: timeS } )
				     .exec(function (err, idx) {
					    
					    if (err) return res.negotiate(err);

					    // console.log(idx);
					    Users.publishUpdate( idx[0].id, 
					    	 {hasStarted: idx[0].hasStarted, upTo:  idx[0].upTo, fromT: idx[0].fromT
					    }, req);

						return res.ok(idx);
					});
	  		}else{
				Users.update(found.id, {hasStarted : start} ).exec( function(err, idx) {

					if(err) return res.negotiate(err);

					Users.publishUpdate( idx[0].id, {hasStarted: idx[0].hasStarted}, req);

					return res.ok(idx);
				});	  			
	  		}
	  	}
	  	else if( pause == true || pause == false){

	  		Users.update( found.id, 
		  		{  pause: pause, fromT: timeS, upTo: timeU } )
			     .exec(function (err, idx) {
				    
				    if (err) return res.negotiate(err);

				    Users.publishUpdate( idx[0].id, 
				    	 { pause: idx[0].pause, fromT: timeS, upTo: timeU
				    }, req);
				    console.log(idx);
					return res.ok(idx);
				});
	  	}
	  	else if( reset == true){

	  			Users.update(found.id, {reset : true, hasStarted: false} ).exec( function(err, idx) {

					if(err) return res.negotiate(err);

					Users.publishUpdate( idx[0].id, {reset: idx[0].reset, hasStarted: false}, req);

					return res.ok(idx);
				});	  			
	  		
	  	}
	  
  	});
	
  },

	'genURL': function(req, res) {

	   ord = Math.floor((Math.random() * 1000000) + 1);
	   foo = "randomstringgenerated"+ord.toString();
	
		Users.create({name: foo}).exec(function created(err,idx){
	   		
	   	  if(err) return next(err);

	      res.status(201);
      
	      return res.ok( "localhost:1337/users/"+foo	);

	   });
	}

	
};

