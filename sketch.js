var start, middle, player, floor, ball, hoop, hoop2, enemy, pole, pole2, win, lose;
var gstate = 0;
var ballMode = 1;
var Pscore = 0;
var Escore = 0;
function setup(){
  createCanvas(windowWidth, windowHeight);

  middle = createSprite(600, 400, 1, 1);

  player = createSprite(-400, 500, 100, 200);
  ball = createSprite(player.x, player.y, 100, 100);
  enemy = createSprite(400, 500, 100, 200);

  floor = createSprite(600, 800, 20000, 200);
  hoop = createSprite(800, 200, 100, 100);
  hoop2 = createSprite(-800, 200, 100, 100);
  pole = createSprite(850, 500, 50, 800);
  pole2 = createSprite(-850, 500, 50, 800);
}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
function draw(){
  background("black");
  drawSprites();
  camera.position.x = player.x;
  camera.position.y = middle.y;
  textSize(30);
  text("Player Score: " + Pscore, 0, 400)
  text("Enemy Score: " + Escore, 0, 500)
  if (keyDown("a")){
    player.x += -10;
  }
  if (keyDown("d")){
    player.x += 10;
  }
  if (keyDown("w") && player.collide(floor)){
    player.velocityY = -20;
  }

  if (keyDown("space")){
    if (ballMode === 1){
      if (keyDown("up")){
        ball.velocityY = -40; 
        ballMode = 0;
      }
      if (keyDown("right")){
        ball.velocityY = -30; 
        ball.velocityX = 10; 
        ballMode = 0;
      }
      if (keyDown("left")){
        ball.velocityY = -30; 
        ball.velocityX = -10; 
        ballMode = 0;
      }
      
    }
    
  }
  if (ballMode === 1){
    ball.x = player.x;
    ball.y = player.y
    ball.velocityY = 0; 
    ball.velocityX = 0; 

  }
  if (ballMode === 0){
    ball.velocityY += 0.4;
    if ((ball.isTouching(hoop) || ball.collide(pole) || ball.isTouching(hoop2) || ball.collide(pole2) || ball.collide(floor))){
      if (ball.isTouching(hoop)){
        Pscore += 1;
      }
      if (ball.isTouching(hoop2)){
        Escore += 1;
      }
      ballMode = 1;
    }
  }
  ball.velocityY += 0.8;
  player.velocityY += 0.8;
  enemy.velocityY += 0.8;
  player.collide(floor);
  ball.collide(floor);
  player.collide(pole);
  player.collide(pole2);
  ball.collide(pole);
  ball.collide(pole2);

  enemy.collide(floor);
  enemy.collide(pole);
  enemy.collide(pole2);


  if (player.x < enemy.x){
    enemy.x += -8;
  }
  if (player.x > enemy.x){
    enemy.x += 8;
  }
}