io.socket.get('/users/'+urlName+'/suscribe', function (data) {
      console.log("I just suscribed.");

      model = data;
      if(model.hasStarted){
           $( ".start" ).trigger( "click" ); 
      }
});  

io.socket.on('users', function (socketEvent){
      
      console.log('Something happened with a users.');
      console.log(socketEvent);

      if(socketEvent.verb == "created")
        console.log("created");
      else{ 
        
        if( socketEvent.data.upTo || socketEvent.data.fromT )
              model.fromT = socketEvent.data.fromT,
              model.upTo =  socketEvent.data.upTo;

        model.hasStarted = socketEvent.data.hasStarted;      
        model.pause = socketEvent.data.pause;
        model.reset = socketEvent.data.reset;
        
        if( model.reset )
          $( ".reset" ).trigger( "click" );
        else if( model.hasStarted == false )
          $( ".stop" ).trigger( "click" );
        else if(model.hasStarted || !model.pause){
            if(model.pause == false && model.hasStarted == undefined) model.wat = true;
          $( ".start" ).trigger( "click" );
        }
        else if( model.pause )
          clearInterval(model.interv);
        
      }

  });
