
//creating objects
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage;
var ground ;
var bananaGroup, obstacleGroup
var score=0;
var survivalTime=0;


function preload(){
 //loading images
 monkey_running =               loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

 bananaImage = loadImage("banana.png");
 obstacleImage = loadImage("obstacle.png");
}



function setup() {
  //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  //creating monkey
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  //groups
  bananaGroup = new Group();
  obstaclesGroup = new Group();
}


function draw() {
createCanvas(400,400)
  background("aliceblue");  
  
  //survival time text
  stroke("white");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/20)
  text("Survival Time: "+survivalTime,125,50);
  
  ground.x=ground.width/2;
  console.log(ground.x)
  
  //jump if space is pressed
  if(keyDown("space") && monkey.y>300){
    monkey.velocityY=-15;  
  }
  
  monkey.velocityY = monkey.velocityY+0.8;
  
  //destroying fruit if monkey touches it
  if(bananaGroup.isTouching(monkey)){
    score=score+2;
    banana.destroy();
  }
  
  //the game should stop after monkey touches the obstacles
  if(obstaclesGroup.isTouching(monkey)){
    obstaclesGroup.setVelocityEach(0,0);
    bananaGroup.setVelocityEach(0,0);
  }
  
  
  //colliding monkey to the ground
  monkey.collide(ground);
  
  //custom functions
  spawnBanana();
  spawnObstacles();
  
  drawSprites();
}

function spawnBanana(){
  //banana
  if(frameCount % 80 === 0){
    banana = createSprite(400,200,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y=Math.round(random(120,200));
    banana.velocityX=-5;
    banana.lifetime=400;
    
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  //obstacles
  if(frameCount % 300===0){
    obstacle = createSprite(400,327,20,20);
    obstacle.addImage("obstacles",obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-4;
    obstacle.lifetime=300;
    
    obstaclesGroup.add(obstacle);
    
  }
  
}