var gameState = "start";

var mario, mario_running;
var ground, invisibleGround, groundImage;

// var cloudsGroup, cloudImage;
// var obstaclesGroup, obstacle1

var score;

var gameOver, restart;


function preload() {
    mario_running = loadAnimation("Doraemon_blue.png");
    // mario_collide = loadAnimation("mareo.png");
    // groundImage = loadImage("brick.jpeg");

    // cloudImage = loadImage("cloud.png");
    // obstacle1 = loadImage("object1.png");

    gameOverImg = loadImage("over.jpeg");
    restartImg = loadImage("restart.png");

    // jumpSound = loadSound("jump.wav");
    // dieSound = loadSound("die.wav");
    // pointSound = loadSound("1-up.wav");
}

function setup() {
    createCanvas(600, 400);

    mario = createSprite(200, 200);
    mario.addAnimation(mario_running);
    // mario.addAnimation("collided", mario_collide);
    // mario.scale = 0.06;

    // ground = createSprite(200, 500, 400, 20);
    // ground.addImage("ground", groundImage);
    // ground.x = ground.width / 2;
    // ground.velocityX = -5;

    gameOver = createSprite(300, 130);
    gameOver.addImage(gameOverImg);

    restart = createSprite(300, 240);
    restart.addImage(restartImg);

    gameOver.scale = 0.3;
    restart.scale = 0.2;

    gameOver.visible = false;
    restart.visible = false;

    invisibleGround = createSprite(200, 330, 400, 10);
    invisibleGround.visible = false;

    // cloudsGroup = new Group();
    // obstaclesGroup = new Group();

    score = 0;
}

function draw() {
    background("#6699ff");

    // fill("black");
    // textSize(20);
    // text("Score: " + score, 450, 50);

    // if (gameState === PLAY) {
    //     score = score + Math.round(getFrameRate() / 60);

    //     if (obstaclesGroup.isTouching(mario)) {
    //         dieSound.play();
    //         gameState = END;
    //     }

    // if (keyDown("space") && mario.y >= 100) {
    //     jumpSound.play();
    //     mario.velocityY = -14;
    // }
    // mario.velocityY = mario.velocityY + 0.8

    // if (ground.x < 0) {
    //     ground.x = ground.width / 2;
    // }

    // mario.collide(invisibleGround);
    // spawnClouds();
    // spawnObstacles();

    // if (score > 0 && score % 100 === 0) {
    //     pointSound.play();
    // }

    // } else if (gameState === END) {
    //     gameOver.visible = true;
    //     restart.visible = true;

    //     ground.velocityX = 0;
    //     mario.velocityY = 0;
    //     obstaclesGroup.setVelocityXEach(0);
    //     cloudsGroup.setVelocityXEach(0);
    //     mario.changeAnimation("collided", mario_collide);

    //     obstaclesGroup.setLifetimeEach(-1);
    //     cloudsGroup.setLifetimeEach(1);

    //     if (mousePressedOver(restart)) {
    //         reset();
    //     }
    // }
    drawSprites();
}

function spawnClouds() {
    if (frameCount % 60 === 0) {
        var cloud = createSprite(600, 320, 40, 10);
        cloud.y = Math.round(random(80, 120));
        cloud.addImage(cloudImage);
        cloud.scale = 0.1;
        cloud.velocityX = -3;
        cloud.lifetime = 200;

        cloud.depth = mario.depth;
        mario.depth = mario.depth + 1;

        cloudsGroup.add(cloud);
    }

}

function spawnObstacles() {
    if (frameCount % 60 === 0) {
        var obstacle = createSprite(600, 295, 10, 40);
        obstacle.velocityX = -(6 + 3 * score / 100);
        obstacle.addImage(obstacle1);

        obstacle.scale = 0.20;
        obstacle.lifetime = 300;

        obstaclesGroup.add(obstacle);
    }
}

function reset() {
    gameState = PLAY;
    ground.velocityX = -(6 + 3 * score / 100);
    gameOver.visible = false;
    restart.visible = false;

    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();

    mario.changeAnimation("running", mario_running);

    score = 0;
}