class Game{
    constructor(){}

    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data){
            gameState = data.val();
        })
    }


    update(state){
        database.ref('/').update({
            gameState: state
        })
        
    }

    async start(){
        if(gameState===0){
            player = new Player();
            var playerCountRef=await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
             playerCount=playerCountRef.val();
             player.getCount();   
            }
            form = new Form();
            form.display();
        }
    }
    
    car1=createSprite(100,200);
    car2=createSprite(300,200);
    car3=createSprite(500,200);
    car4=createSprite(700,200);
    cars=[car1,car2,car3,car4]

    play(){
     form.hide();
     //textSize(30);
     //text("Comienzo del juego",120,100);
     Player.getPlayerInfo();
     if(allPlayers!==undefined){
         var index=0;
         //posision de los coches en x y y
         var x=0;
         var y;

        // var display_position=130;
         for(var plr in allPlayers){
         //aumenta 1 al indice de la matris cada vez
         index=index+1;
         //separacion de los coches
         x=x+200;
         //usa el formulario de la base de datos para mostrar los autos en su coordenada y
         y=displayHeight-allPlayers[plr].distance;
         cars[index-1].x=x;
         cars[index-1].y=y;
          if(index===player.index){
              cars[index-1].shapeColor="red";
              camera.position.x = displayWidth/2; 
              camera.position.y = cars[index-1].y;

            //  fill("red");
        
          //else{
           //fill("black");   
          }
          //display_position+=20;
          //textSize(15);
          //text(allPlayers[plr].name+": "+allPlayers[plr].distance,120,display_position);   
         }
        }
     if(keyIsDown(UP_ARROW)&&player.index!==null){
         player.distance+=10;
         player.update();
     }
     drawSprites();
    }

}