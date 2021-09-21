const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backg, bgImg;
var enemy, bunny, mouse, unicorn;
var player, PF;
var invisibleGround;
var platform, platformGroup;

function preload() {
    bgImg = loadImage("backgroundImg.png");
    bunnyImg = loadImage("bunny.png");
    coinImg = loadImage("coin.png");
    enemyImg = loadImage("enemy.png");
    PF = loadImage("PF.png");
    playerRunning = loadAnimation("P1.PNG", "P2.PNG", "P3.PNG");
    loser = loadImage("L1.png");
    grassImg = loadImage("grass.png");
    platformImg = loadImage("platform.png");
    appleImg = loadImage("apple.png");
    avocadoImg = loadImage("avocado.png");
    bananaImg = loadImage("banana.png");
    grapesImg = loadImage("grapes.png");
    greenAppleImg = loadImage("greenApple.png");
    lemonImg = loadImage("lemon.png");
    mangoImg = loadImage("mango.png");
    orangeImg = loadImage("orange.png");
    peachImg = loadImage("peach.png");
    pearImg = loadImage("pear.png");
    pineappleImg = loadImage("pineapple.png");
    strawberryImg = loadImage("strawberry.png");
    watermelonImg = loadImage("watermelon.png");
}

function setup() {
    createCanvas(displayWidth,500);

    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);

    //backg = createSprite(500,190);
    //backg.addImage("bground",bgImg);
    //backg.scale = 0.27;
    //backg.x = backg.width/2;
    //backg.velocityX = -4;

    gro = createSprite(width/2,height,width,2);
    gro.addImage("ground",grassImg);
    gro.scale = 5;
    gro.x = width/2
    gro.velocityX = -6;

    player = createSprite(70,290,30,30);
    player.addAnimation("running", playerRunning);
    player.scale = 0.5;

    enemy = createSprite(1050,350,30,30);
    enemy.addImage(enemyImg);
    enemy.scale = 0.7;

    bunny = createSprite(1230,380,30,30);
    bunny.addImage(bunnyImg);
    bunny.scale = 0.3;

    invisibleGround = createSprite(10,460,2500,15);
    invisibleGround.visible = false;

    platformGroup = createGroup();
    standGroup = createGroup();
    fruitGroup = createGroup();

    fruitGroup.Visibility = 255;
}

function draw() {
    background(bgImg);

    player.collide(invisibleGround);
    //enemy.collide(invisibleGround);
    //bunny.collide(invisibleGround);

    if(gameState === PLAY) {
      if(gro.x < 0) {
        gro.x = gro.width/2;
      }

      if(keyDown("up_arrow")) {
          player.velocityY = -15;
        }
      
      //add gravity
      player.velocityY = player.velocityY + 1

      if(player.x > 3500) {
        gameState = END;
      }

      spawnPlatform();
      spawnFruits();

      if(standGroup.isTouching(player)) {
        player.velocityY = 0;
      }

      if(player.isTouching(fruitGroup)) {
        fruitGroup.destroyEach();
      }
  }
  else if(gameState === END) {
    gro.velocityX = 0;
  }

    console.log(player.x);

    drawSprites();
}

function spawnPlatform() {
  //write code here to spawn the clouds
  if (frameCount % 85 === 0) {
    var platform = createSprite(1320,80,150,10);
    var stand = createSprite(1320,150);
    stand.width = platform.width;
    stand.height = 2;

    platform.y = Math.round(random(150,250));
    platform.addImage(platformImg);
    platform.scale = 0.3;
    stand.y = platform.y;

    platform.velocityX = -5;
    stand.velocityX = -5;
    stand.visible = false;

    //adjust the depth
    platform.depth = player.depth;
    player.depth = player.depth + 1;

     //assign lifetime to the variable
     platform.lifetime = -1;
     stand.lifetime = -1;
    
    //add each cloud to the group
    platformGroup.add(platform);
    standGroup.add(stand);
  }
}

function spawnFruits() {
  if (frameCount % 85 === 0){
    var fruit = createSprite(1320,200,10,40);
    fruit.velocityX = -5;
    fruit.debug = true;
    
     //generate random obstacles
     var rand = Math.round(random(1,13));
     switch(rand) {
       case 1: fruit.addImage(appleImg);
               break;
       case 2: fruit.addImage(avocadoImg);
               break;
       case 3: fruit.addImage(grapesImg);
               break;
       case 4: fruit.addImage(bananaImg);
               break;
       case 5: fruit.addImage(greenAppleImg);
               break;
       case 6: fruit.addImage(lemonImg);
               break;
       case 7: fruit.addImage(orangeImg);
               break;
       case 8: fruit.addImage(mangoImg);
               break;
       case 9: fruit.addImage(pearImg);
               break;
       case 10: fruit.addImage(pineappleImg);
               break;
       case 11: fruit.addImage(strawberryImg);
               break;
       case 12: fruit.addImage(watermelonImg);
               break;
       case 13: fruit.addImage(peachImg);
               break;
       default: break;
     }

     fruit.y = Math.round(random(130,200));
    
     //assign scale and lifetime to the obstacle
     fruit.scale = 0.18;
     fruit.lifetime = 300;

    fruit.depth = player.depth;
    player.depth =+1;

    //add each obstacle to the group
     fruitGroup.add(fruit);
  }
}