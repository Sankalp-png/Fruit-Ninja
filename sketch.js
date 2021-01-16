//Game States
var PLAY = 1
var END = 0
var gameState = 1
var fruit1Image,fruit2Image,fruit3Image, fruit4Image,fruit5Image
var gameOverImage, restartImage 
var cutSound, gameOverSound
var monster
var monsterAnimation
var swordImage
var backgroundImage
var fruitGroup
var enemyGroup
var fruitNinjaImage

function preload(){
  backgroundImage = loadImage("fruit.jpg")
  swordImage = loadImage("sword.png")
  monsterAnimation = loadAnimation("alien1.png","alien2.png")
  fruit1Image = loadImage("fruit1.png")
  fruit2Image = loadImage("fruit2.png")
  fruit3Image = loadImage("fruit3.png")
  fruit4Image = loadImage("fruit4.png")
  fruit5Image = loadImage("mango.png")
  gameOverImage =loadImage("gameOver.png");
  restartImage = loadImage("restart.png")
  cutSound = loadSound("swoosh1.mp3")
  gameOverSound = loadSound("gameOver.mp3");
  fruitNinjaImage = loadImage("fruitNinja.png")
 }
function setup(){
  //creating canvas
  createCanvas(600,600)
  
  Background = createSprite(300,300,20,20)
  Background.addImage(backgroundImage)
  Background.scale = 1
  
  fruitNinja = createSprite(300,80,20,20)
  fruitNinja.addImage(fruitNinjaImage)
  fruitNinja.scale = 0.5
  
  //creating sword
  sword = createSprite(530,300,20,20);
  sword.addImage(swordImage)
  
  //To game over
  gameOver=createSprite(300,330,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.scale=1;
  gameOver.visible = false;
  
  //To restart 
  restart=createSprite(300,440,10,10);
  restart.addImage(restartImage);
  restart.scale=0.3;
  restart.visible = false;
  
  fruitGroup = new Group();
  enemyGroup = new Group(); 
 
}
//creating score
score = 0
health = 3

function draw(){
  
  sword.y = mouseY
  sword.x = mouseX
  
 if(gameState === PLAY){
  
    
    if(fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
      score = score+1
      
   }
    if(enemyGroup.isTouching(sword)) {
      enemyGroup.destroyEach();
      health = health-1
    }
  
  }
 if(health === 0) {
    
    gameState = END
    
   
    fruitGroup.setVelocityEach(0);
    enemyGroup.setVelocityEach(0);
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
     
    sword.x = 300;
    sword.y=250;
    gameOver.visible = true;
    restart.visible = true;
  
    //Reset the game once it gets over
    if(mousePressedOver(restart)) {
    gameState=PLAY;
    gameOver.visible = false;
    restart.visible = false;
    score = 0;
    health = 3;
  } 
    //End
    
 }
 drawSprites();
 spawnFruits();
 spawnEnemies();
  
  //score
  fill("white");
  textSize(25);
  textFont("Comic Sans MS");
  text("Score: "+ score, 480,50);
  //health
  fill("white");
  textSize(25);
  textFont("Comic Sans MS");
  text("Health: "+ health, 30,50);
}
function spawnFruits() {
  if(World.frameCount%80 === 0) {
    fruit = createSprite(600,200,20,20)
    fruit.scale = 0.2
    //fruit.debug = true
    f = Math.round(random(1,5));
    if(f == 1) {
      fruit.addImage(fruit1Image)
    }
    else if(f == 2) {
      fruit.addImage(fruit2Image)
    }
    else if(f == 3) {
      fruit.addImage(fruit3Image)
    }
    else if(f == 4) {
      fruit.addImage(fruit4Image)
    }
     else if(f == 5) {
      fruit.addImage(fruit5Image)
    }
    fruit.y = Math.round(random(50,540));
    
    fruit.velocityX = -(6 + score/5)
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
    
  }
  
}
function spawnEnemies() {
  if(World.frameCount%200 === 0) {
    monster = createSprite(600,300,20,20)
    monster.addAnimation("moving", monsterAnimation)
    monster.y = Math.round(random(100,500))
    monster.velocityX = -(6 + score/5)
    monster.setLifetime = 50
    
    enemyGroup.add(monster);
  }
}