var startValue = 120000, 
    time = new Date(0),
    total,
    fromT,
    upTo;

function done(){
    alert("Timer reached 00:00!");
}

$(function(){

    displayTime();
    $(".start").on("click", function(){

        if( model.start === false){

            fromT = new Date() - 0;
            total = ( fromT + startValue );
            upTo  = new Date(total);

            io.socket.put('/users/'+urlName+'/start', 
                { start: true, fromT : fromT, upTo : total }, 
                    function (data) {
                        model.start = true;
                        model.upTo = data[0].upTo;
                        model.fromT = data[0].fromT;
            });
         
         }
         else if( model.pause == true ){

            io.socket.put('/users/'+urlName+'/pause', 
                { pause : false }, 
                    function (data){
                       model.pause = data[0].pause;
                       fromT = model.fromT;
            });    

        }
        else{

             fromT = model.fromT;
             upTo  = model.upTo;
             
             if (model.wat === undefined){
               time = new Date() - fromT; 
               fromT += time; 
             } 
        }

        model.interv = setInterval(function() {
        
            time = new Date( (time - 0) + 1000 );
            fromT = fromT + 1000;
        
            if( (upTo-fromT)/1000 <= 0 ){

                done();
                clearInterval(model.interv);
            }
        
            displayTime();
         
         }, 1000);
          
    });

    $(".stop").on("click", function(){
        
        if(model.start)
            io.socket.put('/users/'+urlName+'/start', 
                {start : false}, 
                     function (data) {
                        model.start = false;
                });
    
        clearInterval(model.interv);
        time = new Date(0);
        displayTime();
        
    });

    $(".pause").on("click", function(){
    
        if( model.pause == false)
            io.socket.put('/users/'+urlName+'/pause', 
                {pause : true, fromT: (new Date - 0), upTo: total}, 
                     function (data) {
                        model.pause = true;
                        model.fromT = data[0].fromT;
                });

        clearInterval(model.interv);        
    });
    
    $(".reset").on("click", function(){
        if ( model.reset == false)
            io.socket.put('/users/'+urlName+'/reset', 
                    {reset : true}, 
                         function (data) {
                        model.reset = data[0].reset;
                    });
        else
            model.reset = false;
        
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