/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height() ;
  const KEYCODE = {
      UP: 38,
      DOWN: 40,
      W: 87,
      S: 83,
      ENTER: 13,
    }
  // Game Item Objects
  function GameItems(x, y, speedX, speedY, id){
    return {
      x: x,
      y: y,
      speedX: speedX,
      speedY: speedY,
      width: $(id).width(),
      height:$(id).height(),
      id: id,
    }
  }
  var ball = GameItems(BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -10 : 10), (Math.random() > 0.5 ? -1 : 1), "#ball")
  var leftPaddle = GameItems(20, BOARD_HEIGHT / 2 - 125, 0, 0, "#leftPaddle"  );
  var rightPaddle = GameItems(BOARD_WIDTH - 30, BOARD_HEIGHT / 2 - 125, 0, 0, "#rightPaddle"  );
  //other variables
  var leftPaddleScore = 0;
  var rightPaddleScore = 0;

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    drawObject(ball);
    drawObject(leftPaddle);
    drawObject(rightPaddle);
    moveObj(ball);
    moveObj(leftPaddle);
    moveObj(rightPaddle);
    collision(ball);
    paddleCollide(leftPaddle);
    paddleCollide(rightPaddle);
    handleCollision();
    handleEndGame();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event){
    var keycode = event.which;
    console.log(keycode);

    if (keycode === KEYCODE.UP) {
      rightPaddle.speedY = -10;
    }else if (keycode === KEYCODE.DOWN) {
      rightPaddle.speedY =  10;
    }
    if (keycode === KEYCODE.W) {
      leftPaddle.speedY =  -10;
    }else if (keycode === KEYCODE.S) {
      leftPaddle.speedY =  10;
    }  
  }
  function handleKeyUp(event){
    var keycode = event.which
    if (keycode === KEYCODE.UP) {
      rightPaddle.speedY = 0;
    }else if (keycode === KEYCODE.DOWN) {
      rightPaddle.speedY = 0;
    }
    if (keycode === KEYCODE.W) {
      leftPaddle.speedY =  0;
    }else if (keycode === KEYCODE.S) {
      leftPaddle.speedY =  0;
    }

  }
  function collision(obj){
    if(obj.x >= BOARD_WIDTH){
      leftPaddleScore += 1;
      redrawPoints(leftPaddle);
      reset();
    }else if(obj.x <= 0){
      rightPaddleScore += 1;
      redrawPoints(rightPaddle);
      reset()
    }else if(obj.y >= BOARD_HEIGHT - ball.height){
      obj.speedY = -obj.speedY;
    }else if(obj.y <= 0 + ball.height){
      obj.speedY = -obj.speedY;
    }
  }
  function paddleCollide(paddle){
    if(paddle.y < 0){
      paddle.y = 0
    }
    if(paddle.y > BOARD_HEIGHT - paddle.height){
      paddle.y = BOARD_HEIGHT - paddle.height
    }
  }
  function doCollide(a,b){
   return (
      a.x < b.x + b.width &&
      a.x + b.width > b.x &&
      a.y < b.y + b.height &&
      a.y + b.height > b.y
    )
}
  function reset(){
    ball = GameItems(BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -10 : 10), (Math.random() > 0.5 ? -1 : 1), "#ball")
    leftPaddle = GameItems(20, BOARD_HEIGHT / 2 - 125, 0, 0, "#leftPaddle"  );
    rightPaddle = GameItems(BOARD_WIDTH - 30, BOARD_HEIGHT / 2 - 125, 0, 0, "#rightPaddle"  );
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function handleEndGame(){
      if(leftPaddleScore === 10){
        $("#game-end").text("Player 1 Wins!")
        endGame();
      }else if(rightPaddleScore === 10){
        $("#game-end").text("Player 2 Wins!")
        endGame();
      }


  }
  function redrawPoints(player){
    if(player.id === "#leftPaddle"){
      $("#player-one").text("Player 1 score: " + leftPaddleScore)
    }
    if(player.id === "#rightPaddle"){
      $("#player-two").text("Player 2 score: " + rightPaddleScore)
    }
  }
  function handleCollision(){
    if(doCollide(ball, leftPaddle)){
      ball.speedX = -ball.speedX;
      ball.speedY = Math.random() * 15;
    }else if(doCollide(ball, rightPaddle)){
      ball.speedX = -ball.speedX;
      ball.speedY = Math.random() * 15;
    }
  }


  function drawObject(gameItem){
    $(gameItem.id).css("top", gameItem.y);
    $(gameItem.id).css("left", gameItem.x);

  }
  function moveObj(gameItem){
    gameItem.x += gameItem.speedX;
    gameItem.y += gameItem.speedY;
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
