io.socket.get('/users/'+urlName+'/suscribe', function (data) {

      model = data;
      if(model.start){
           $( ".start" ).trigger( "click" ); 
      }

});  

io.socket.on('users', function (socketEvent){
      
      console.log('Something happened with a users.');
      console.log(socketEvent);

      if(socketEvent.verb == "created")
          console.log("created");
      else{ 
        
        if (socketEvent.data.start !== undefined)
            model.start = socketEvent.data.start;      
        
        if( socketEvent.data.fromT !== undefined)
            model.fromT = socketEvent.data.fromT;

        if( socketEvent.data.upTo  !== undefined )
            model.upTo =  socketEvent.data.upTo;

        if(socketEvent.data.pause !== undefined)
            model.pause = socketEvent.data.pause;
        
        if(socketEvent.data.reset !== undefined)
            model.reset = socketEvent.data.reset;

        
        if( model.start == false )
          $( ".stop" ).trigger( "click" );

        else if( model.reset )
          $( ".reset" ).trigger( "click" );
        
        else if( model.pause )
          clearInterval(model.interv);
        
        else if(model.start || !model.pause){
        
            if(model.pause == false && socketEvent.data.start === undefined) model.wat = true;
         
            $( ".start" ).trigger( "click" );
        }
      }

  });
