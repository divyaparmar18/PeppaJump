var PLAY = 1;
var END = 0;
var gameState = PLAY;

var peppaPig, peppaPig_RUnning, peppaPigCollide;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var StoneGroup, stone;
var appleImg, apple;

var score;

var gameOver, restart;


function preload() {
    peppaPig_RUnning = loadAnimation("peppapig.png");
    peppaPigCollide = loadAnimation("pig.png");
    groundImage = loadImage("brick.jpeg");


    cloudImage = loadImage("cloud.png");
    stone = loadImage("stone.png");
    appleImg = loadImage("apple.png");

    gameOverImg = loadImage("ove.png");
    restartImg = loadImage("restart.png");

    jumpSound = loadSound("jump.wav");
    dieSound = loadSound("die.wav");
    pointSound = loadSound("1-up.wav");
}

function setup() {
    createCanvas(600, 400);

    peppaPig = createSprite(50, 10, 20, 40);
    peppaPig.addAnimation("running", peppaPig_RUnning);
    peppaPig.addAnimation("collided", peppaPigCollide);
    peppaPig.scale = 0.6;

    apple = createSprite(200, 200);
    apple.addImage("coin", appleImg);
    apple.scale = 0.3;
    apple.velocityX = -5;

    ground = createSprite(250, 495, 400, 20);
    ground.addImage("ground", groundImage);
    ground.x = ground.width / 2;
    ground.velocityX = -5;

    gameOver = createSprite(300, 130);
    gameOver.addImage(gameOverImg);

    restart = createSprite(300, 240);
    restart.addImage(restartImg);

    gameOver.scale = 0.4;
    restart.scale = 0.2;

    gameOver.visible = false;
    restart.visible = false;

    invisibleGround = createSprite(200, 330, 400, 10);
    invisibleGround.visible = false;

    cloudsGroup = new Group();
    StoneGroup = new Group();


    score = 0;
}

function draw() {
    background("#00e6e6");

    fill("black");
    textSize(20);
    text("Score: " + score, 450, 50);

    if (gameState === PLAY) {
        peppaPig.scale = 0.7;


        if (StoneGroup.isTouching(peppaPig)) {
            dieSound.play();
            gameState = END;
        }

        if (World.frameCount % 90 === 0) {
            apple = createSprite(400, 50, 40, 10);

            apple.y = Math.round(random(150, 200));
            apple.addImage(appleImg);
            apple.scale = 0.3;
            apple.velocityX = -5;
            apple.lifetime = 134;
        }

        if (keyDown("space") && peppaPig.y >= 100) {
            jumpSound.play();
            peppaPig.velocityY = -14;
        }
        peppaPig.velocityY = peppaPig.velocityY + 0.8;

        if (ground.x < 0) {
            ground.x = ground.width / 2;
        }

        peppaPig.collide(invisibleGround);
        spawnClouds();
        spawnObstacles();

        if (apple.isTouching(peppaPig)) {
            apple.destroy();
            score = score + 2;
        }


        if (score > 0 && score % 100 === 0) {
            pointSound.play();
        }

    } else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;

        ground.velocityX = 0;
        peppaPig.velocityY = 0;
        StoneGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);
        apple.velocityX = 0;


        peppaPig.changeAnimation("collided", peppaPigCollide);
        peppaPig.scale = 0.2;

        StoneGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(1);

        if (mousePressedOver(restart)) {
            reset();
        }
    }
    drawSprites();
}

function spawnClouds() {
    if (frameCount % 60 === 0) {
        var cloud = createSprite(600, 320, 40, 10);
        cloud.y = 100;
        cloud.addImage(cloudImage);
        cloud.scale = 0.1;
        cloud.velocityX = -3;
        cloud.lifetime = 200;

        cloud.depth = peppaPig.depth;
        peppaPig.depth = peppaPig.depth + 1;

        cloudsGroup.add(cloud);
    }

}

function spawnObstacles() {
    if (frameCount % 60 === 0) {
        var obstacle = createSprite(600, 295, 10, 40);
        obstacle.velocityX = -(6 + 3 * score / 100);
        obstacle.addImage(stone);

        obstacle.scale = 0.30;
        obstacle.lifetime = 300;

        StoneGroup.add(obstacle);
    }
}


function reset() {
    gameState = PLAY;
    ground.velocityX = -(6 + 3 * score / 100);
    gameOver.visible = false;
    restart.visible = false;

    StoneGroup.destroyEach();
    cloudsGroup.destroyEach();

    peppaPig.changeAnimation("running", peppaPig_RUnning);

    score = 0;
}