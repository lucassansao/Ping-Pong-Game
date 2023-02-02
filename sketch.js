
//BALL VARIABLES
let xBall = 300;
let yBall = 200;
let dBall = 13;
let rBall = dBall/2;

//SPEED BALL
let speedXBall = 6; //SPEED BALL IN X-COORDINATE.
let speedYBall = 6; //SPEED BALL IN Y-COORDINATE.

//PADDLE 1
let xPaddle1 =5;
let yPaddle1 =150;
let wPaddle1 =6;
let hPaddle1 =70;
let paddleCollide = false;

//PADDLE 2
let xPaddle2 = 585;
let yPaddle2 = 150;
let wPaddle2 = wPaddle1;
let hPaddle2 = hPaddle1;
let speedYPaddle2;
let errorChance = 0;

//SCORES
let myScore = 0;
let computerScore = 0;
let gameTitle = "Ping Pong Game";

//SOUNDS
let paddleSound;
let scoreSound;
let gameSound;


function preload(){
  gameSound = loadSound("sounds/background_music.mp3");
  paddleSound = loadSound("sounds/paddle_sound.mp3")
  scoreSound = loadSound("sounds/score_sound.mp3")
}


function setup() {
  createCanvas(600, 400);
  gameSound.loop();
}

function showBall() {
    circle(xBall,yBall,dBall)
}

function moveBall() {
    xBall += speedXBall;
    yBall += speedYBall;
}

function edgeCollision() {
    if (xBall+rBall>width || xBall-rBall<0) {
        speedXBall *= -1;
    }
    if (yBall+rBall>height || yBall-rBall<0) {
        speedYBall *= -1;
    }
}


//FUNCTIONS PADDLE
function showPaddle(x,y){
  rect(x,y,wPaddle1,hPaddle1)
}

//FOR ONE PLAYER
//PLAYER ONE
function movePaddle1(){
    if (keyIsDown(UP_ARROW)) {
        yPaddle1 -= 8;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yPaddle1 += 8;
    }
}

//COMPUTER
function movePaddle2(){
  speedYPaddle2 = yBall-yPaddle2-hPaddle2/2-30;
  yPaddle2 += speedYPaddle2 + errorChance;
  errorChanceCalc();
}

function errorChanceCalc() {
  if (computerScore >= myScore) {
    errorChance += 50
    if (errorChance >= 99){
    errorChance = 100
    }
  } else {
    errorChance -= 1
    if (errorChance <= 15){
    errorChance = 15
    }
  }
}

// //FOR TWO PLAYERS
// //PLAYER ONE
// function movePaddle1(){
//     if (keyIsDown(87)) {
//         yPaddle1 -= 8;
//     }
//     if (keyIsDown(83)) {
//         yPaddle1 += 8;
//     }
// }

// //PLAYER TWO
// function movePaddle2(){
//     if (keyIsDown(UP_ARROW)) {
//         yPaddle2 -= 8;
//     }
//     if (keyIsDown(DOWN_ARROW)) {
//         yPaddle2 += 8;
//     }
// }

//COLLISION PADDLE1 AND COLLISION PADDLE 2
function checkCollisionPaddle(x,y){
   paddleCollide = collideRectCircle(x,y,wPaddle1,hPaddle1,xBall,yBall,rBall);
   if(paddleCollide){
     speedXBall *= -1;
     paddleSound.play()

   }
}

function showScore(){
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(130, 10, 40, 20);
    fill(255);
    text(myScore, 150, 26);
    fill(color(255, 140, 0));
    rect(430, 10, 40, 20);
    fill(255);
    text(computerScore, 450, 26);
}

function gameScore(){
  if(xBall>586){
    myScore += 1;
    scoreSound.play();
  }
  if(xBall<8){
    computerScore += 1;
    scoreSound.play();
  } 
}


function trappedBall(){
    if (xBall-rBall<0){
    xBall=23
    }
}




//PING PONG GAME
function draw() {
  background(0);
  showBall();
  moveBall();
  edgeCollision();
  showPaddle(xPaddle1,yPaddle1);
  showPaddle(xPaddle2,yPaddle2);
  movePaddle1();
  movePaddle2();
  checkCollisionPaddle(xPaddle1,yPaddle1);
  checkCollisionPaddle(xPaddle2,yPaddle2)
  showScore();
  gameScore();
  trappedBall();
  errorChanceCalc();
  
}