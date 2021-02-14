var ball1,database,position;

function preload() {
   backgroundImg = loadImage("GamingBackground.png");
   ball1_flying =loadAnimation("Ballon-02.png","Ballon-03.png","Ballon-04.png")
}
  
function setup(){
    database=firebase.database();
    createCanvas(1000,550);
    ball1 = createSprite(500,275,10,10);
    ball1.addAnimation("flying", ball1_flying);
    ball1.scale=0.5

    var ball1position=database.ref("ball/position");

    //listener
    ball1position.on("value",readPosition,showError);
}

function draw(){
    background(backgroundImg);
    
    if(position!==undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
            }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}}
//ball.x=ball.x+1
/*function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}*/

function readPosition(data)
{
position=data.val();
ball1.x=position.x;
ball1.y=position.y;
}

function writePosition(x,y)
{
database.ref("ball/position").set({
    x:position.x+x,
    y:position.y+y
})
}

function showError()
{
console.log("Hi Mautik,error in db");
}
