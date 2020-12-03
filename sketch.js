
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime;
var bananaEaten;
var forest,forestImage;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  forestImage=loadImage("forest.jpg")
}



function setup() {
  createCanvas(400,350);
  
  forest=createSprite(0,280,400,350);
  forest.velocityX=-5;
  forest.x=forest.width/2;
  forest.addImage(forestImage);
  forest.scale=0.99;

  
  monkey=createSprite(30,300,20,20);
  monkey.addAnimation("runner monkey",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,330,900,10);
  ground.velocityX=-5;
  ground.x=ground.width/2;
  ground.shapecolor="brown";
  
  
  obstacleGroup=createGroup();
  FoodGroup=createGroup();
  
  survivalTime=0;
  bananaEaten=0;
}


function draw() {
background(255);
  
  fill("red");
  textSize(20);
  text("SurvivalTime:"+survivalTime,20,30);
  survivalTime=Math.ceil(frameCount/frameRate());
  
  fill("darkblue");
  textSize(20);
  text("Banana Eaten:"+bananaEaten,200,30);

  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(forest.x<0){
    forest.x=forest.width/2;
  }
  if(keyDown("space")){
    monkey.velocityY=-12;
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
  
  monkey.collide(ground);
  
  if(FoodGroup.isTouching(monkey)){
    bananaEaten=bananaEaten+1;
    FoodGroup.destroyEach();
    
  }
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    forest.velocityX=0;
    
    obstacleGroup.setVelocityXEach(0); 
    FoodGroup.setVelocityXEach(0); 
    obstacleGroup.setLifetimeEach(-1); 
    FoodGroup.setLifetimeEach(-1);
    FoodGroup.destroyEach(0);
  }
  spawnObstacles();
  spawnBanana();
  
  drawSprites();   
}
function spawnObstacles(){
  if(frameCount%200===0){
    obstacle=createSprite(400,310,10,40); 
    obstacle.velocityX=-4;
    obstacle.lifetime=400;
    obstacle.scale=0.1;
    obstacle.addImage(obstacleImage);
     obstacleGroup.add(obstacle);
  }
}
function spawnBanana(){
  if(frameCount%70===0){
    banana=createSprite(400,150,40,10);
    banana.y=random(100,220);
    banana.velocityX=-4;
    banana.lifetime=400;
    banana.scale=0.1;
    banana.addImage(bananaImage);
    FoodGroup.add(banana);
  }
}





