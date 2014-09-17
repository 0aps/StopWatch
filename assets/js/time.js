var startValue = 120000, //Number of milliseconds
    time = new Date(0),
    total,
    upto;

function done(){
    alert("Timer reached 00:00!");
}

$(function(){

    displayTime();
    $(".start").on("click", function(){


        if(model.hasStarted === false){

            from = new Date() - 0;
            total = ( from + startValue );
            upto = new Date(total);

            io.socket.put('/users/'+urlName+'/started', 
            {hasStarted: true, timeS : from, timeU : total}, 
                function (data) {
                    model.hasStarted = true;
                    model.upTo = upto;
                    model.fromT = from;
            });
         }
         else if( model.pause == true && model.hasStarted){
            io.socket.put('/users/'+urlName+'/started', 
                {pause : false}, 
                     function (data) {
                       model.pause = false;
                });    
            //time = new Date() - from; 
            //from += time;
  
        }
        else{

             from = model.fromT;
             upto = model.upTo;
             
             if (model.wat == undefined){
               time = new Date() - from; 
               from += time; 
             } 
        }

        //console.log((upto-from)/1000)
        model.interv = setInterval(function() {
            time = new Date( (time - 0) + 1000 );
            from = from + 1000;
            if( (upto-from)/1000 <= 0 ){
                done();
                clearInterval(model.interv);
            }
            displayTime();
         }, 1000);
          
    });

    $(".stop").on("click", function(){
        
        if(model.hasStarted)
            io.socket.put('/users/'+urlName+'/started', 
                {hasStarted : false}, 
                     function (data) {
                        model.hasStarted = false;
                });
    
        clearInterval(model.interv);
        time = new Date(0);
        displayTime();
        
    });

    $(".pause").on("click", function(){
    
        if( model.pause == false)
            io.socket.put('/users/'+urlName+'/started', 
                {pause : true, timeS: (new Date - 0), timeU: total}, 
                     function (data) {
                        model.pause = true;
                        from = data[0].fromT;
                });
        clearInterval(model.interv);        

    });
    
    $(".reset").on("click", function(){
        if ( model.reset == false)
            io.socket.put('/users/'+urlName+'/started', 
                    {reset : true}, 
                         function (data) {
                    });
        
        time = new Date(0);
        displayTime();
    });
});

function displayTime(){
    $(".time").text(fillZeroes(time.getMinutes()) + ":" + fillZeroes(time.getSeconds()));
}

function fillZeroes(t){
    t = t+"";
    if(t.length==1)
        return "0" + t;
    else
        return t;
}

function generate(){
    $.post( "genURL", function( data ) {
       $( "input" ).val( data ); });
}