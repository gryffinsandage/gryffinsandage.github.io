/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;//sets FPS to 60
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();//sets the board width to the width stated in the css
  const BOARD_HEIGHT = $("#board").height();//sets the board height to the height stated in the css
  const KEYCODE = {//sets the keycode of each key to later be used in functions
      UP: 38,
      DOWN: 40,
      W: 87,
      S: 83,
      ENTER: 13,
    }
  // Game Item Objects
  function GameItems(x, y, speedX, speedY, id){//gives paramaters of each value of every object to be customized based on each object
    return {
      x: x,//sets each objects x coordinate based on the value given
      y: y,//sets each objects y coordinate based on the value given
      speedX: speedX,//sets each objects left and right speed based on the value given
      speedY: speedY,//sets each objects up and down speed based on the value given
      width: $(id).width(),//sets each objects width based on the value given in the css
      height:$(id).height(),//sets each objects height based on the value given in the css
      id: id,//sets each objects id based on the id given in the css
    }
  }
  var ball = GameItems(BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -10 : 10), (Math.random() > 0.5 ? -1 : 1), "#ball")//sets the ball to spawn in the center of the board
  var leftPaddle = GameItems(20, BOARD_HEIGHT / 2 - 125, 0, 0, "#leftPaddle"  );//sets the left paddle to spawn in the center of the left side of the board
  var rightPaddle = GameItems(BOARD_WIDTH - 30, BOARD_HEIGHT / 2 - 125, 0, 0, "#rightPaddle"  );//sets the right paddle to spawn in the center of the right side of the board
  //other variables
  var leftPaddleScore = 0;//starts the left paddle's score to start at 0
  var rightPaddleScore = 0;//starts the right paddle's score to start at 0

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);// execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);//allows certain key presses to be used in functions
  $(document).on('keyup', handleKeyUp);//allows certain key releases to be used in functions
  $("#restart-button").on("click", resetGame);//assigns the button to a function that reloads the page
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
    handleCollision();
    collision(ball);
    paddleCollide(leftPaddle);
    paddleCollide(rightPaddle);    
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
      a.x < b.x + b.width &&      // left side of a is left of b's right edge
      a.x + a.width > b.x &&      // right side of a is right of b's left edge
      a.y < b.y + b.height &&     // top of a is above b's bottom edge
      a.y + a.height > b.y        // bottom of a is below b's top edge
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
  function resetGame(){
    window.location.reload();
  }


  function handleEndGame(){
      if(leftPaddleScore === 10){
        $("#game-end").text("Player 1 Wins!")
        endGame();
      }else if(rightPaddleScore === 10){
        $("#game-end").text("Player 2 Wins!")
        endGame();//kljghjkghjkghjkghkgjkg
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
