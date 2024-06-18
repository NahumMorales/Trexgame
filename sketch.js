var cacturiachis
var nubesnoobs
var catus
var cactus1
var cactus2
var cactus3
var cactus4
var cactus5
var cactus6
var PLAY=1
var END=0
var stateGame=PLAY
var score=0
var trex ,trex_running;
var start;
var restartImg;
var gameoverImg;
var gameover;
var trex_collider;
var jumpsound,deathsound,chetpointsound;
function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
pisomg=loadImage("ground2.png");
nubeimg=loadImage("cloud.png");
cactus1=loadImage("obstacle1.png");
cactus2=loadImage("obstacle2.png");
cactus3=loadImage("obstacle3.png");
cactus4=loadImage("obstacle4.png");
cactus5=loadImage("obstacle5.png");
cactus6=loadImage("obstacle6.png");
restartImg=loadImage("restart.png");
gameoverImg=loadImage("gameOver.png");
trex_collider=loadAnimation("trex_collided.png");
teroImg=loadAnimation("tero1.png","tero2.png");
jumpsound=loadSound("jump.mp3");
deathsound=loadSound("die.mp3");
chetpointsound=loadSound("checkPoint.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  
  //crear sprite de Trex
 trex=createSprite(50,height-70,30,30);
 
 trex.addAnimation("running",trex_running);
 trex.addAnimation("collided",trex_collider);
 trex.scale=0.7;
 piso2=createSprite(width/2,height-10,width,125);
 piso2.visible=false;

 piso=createSprite(width/2,height-80,width,2);
 piso.addImage(pisomg);

 start=createSprite(width/2,height/2,50,20);
 start.addImage(restartImg);
 start.scale=0.4
 gameover=createSprite(width/2,height/2-50,50,20);
 gameover.addImage(gameoverImg);
 gameover.scale=0.4

 cacturiachis=new Group();
 nubesnoobs=new Group();

}

function draw(){
  background("white");
  text ("puntuación:"+score,500,20);


  if(stateGame===PLAY){
 piso.velocityX=-(7+3*score/100);
 score=score+Math.round(frameCount /60);
 if(score>0 && score%100==0){
  chetpointsound.play();
 }
 if(piso.x<0){
  piso.x=piso.width/2;  
  } if(touches.length>0||keyDown("space")&& trex.y>=height-120){ 
jumpsound.play()
   
    trex.velocityY=-10
    touches=[]
    }
    trex.velocityY=trex.velocityY+0.8;
    nubess();
    cactuces();
    Terodones();
    gameover.visible=false;
    start.visible=false; 
if (cacturiachis.isTouching(trex)){
  deathsound.play();
  stateGame=END
}
}

else if(stateGame===END){
piso.velocityX=0; 
cacturiachis.setVelocityXEach(0);
nubesnoobs.setVelocityXEach(0);
gameover.visible=true;
start.visible=true;
trex.changeAnimation("collided",trex_collider);
nubesnoobs.setLifetimeEach(-1);
cacturiachis.setLifetimeEach(-1);
if(touches.length>0||keyDown("space")){
 reset();
 touches=[];
}
trex.velocityY=0;

  }
 
  
  
  trex.collide(piso2);
  if(mousePressedOver(start)){
 reset();
  }
 
  drawSprites();

}
function nubess(){
if (frameCount %50==0){
 var nube=createSprite(width+20,height-300,25,20);
 nube.addImage(nubeimg);
 nube.velocityX=-7;
 nube.y=Math.round(random(5,100)); 
 nube.depth=trex.depth;
 trex.depth=trex.depth+1;
 nube.lifetime=65;
 nubesnoobs.add(nube);  
    
}
}
function cactuces(){
if(frameCount %60==0){
 var cactus=createSprite(600,height-95,1,2);
 cactus.velocityX=-(7+score/100);
 var rand=Math.round(random(1,6));
 switch(rand){
  case 1:cactus.addImage(cactus1);
  break;
  case 2:cactus.addImage(cactus2);
  break;
  case 3:cactus.addImage(cactus3);
  break;
  case 4:cactus.addImage(cactus4);
  break;
  case 5:cactus.addImage(cactus5);
  break;
  case 6:cactus.addImage(cactus6);
  break;
 }
 cactus.scale=0.5;
 cactus.lifetime=80;
 cacturiachis.add(cactus);
 
}

}

function reset(){
stateGame=PLAY
cacturiachis.destroyEach();
nubesnoobs.destroyEach();
score=0
trex.changeAnimation("running",trex_running);
start.visible=false;
}

function Terodones(){
 if(frameCount%60===0){
  teranodon=createSprite(450,50,25,25);
  teranodon.velocityX=-7
  teranodon.addAnimation("volar",teroImg);
 } 
}