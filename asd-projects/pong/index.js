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
  //creates control for each key that is pressed down
  function handleKeyDown(event){
    var keycode = event.which;
    console.log(keycode);

    if (keycode === KEYCODE.UP) {
      rightPaddle.speedY = -10;//the up key makes the right padde go up
    }else if (keycode === KEYCODE.DOWN) {
      rightPaddle.speedY =  10;//the down key makes the right padde go down
    }
    if (keycode === KEYCODE.W) {
      leftPaddle.speedY =  -10;//the w key makes the left padde go up
    }else if (keycode === KEYCODE.S) {
      leftPaddle.speedY =  10;//the s key makes the left padde go down
    }  
  }//when the key is no longer pressed, the paddles stop moving
  function handleKeyUp(event){
    var keycode = event.which
    if (keycode === KEYCODE.UP) {
      rightPaddle.speedY = 0;//release of the up key stops the right paddle's movement
    }else if (keycode === KEYCODE.DOWN) {
      rightPaddle.speedY = 0;//release of the down key stops the right paddle's movement
    }
    if (keycode === KEYCODE.W) {
      leftPaddle.speedY =  0;//release of the w key stops the left paddle's movement
    }else if (keycode === KEYCODE.S) {
      leftPaddle.speedY =  0;//release of the s key stops the left paddle's movement
    }

  }//causes events to happen after every time the ball hits a wall
  function collision(obj){
    if(obj.x >= BOARD_WIDTH){
      leftPaddleScore += 1;//every time the ball hits the right wall, the left paddle's score increases by 1
      redrawPoints(leftPaddle);
      reset();//resets the ball's and paddles' positions after the ball hits the right wall
    }else if(obj.x <= 0){
      rightPaddleScore += 1;//every time the ball hits theleft wall, the right paddle's score increases by 1
      redrawPoints(rightPaddle);
      reset()//resets the ball's and paddles' positions after the ball hits the left wall
    }else if(obj.y >= BOARD_HEIGHT - ball.height){
      obj.speedY = -obj.speedY;//every time the ball hits the top of the wall, its y speed is reversed so it bounces away
    }else if(obj.y <= 0 + ball.height){
      obj.speedY = -obj.speedY;//every time the ball hits the bottom of the wall, its y speed is reversed so it bounces away
    }
  }
  //stops the paddles from leaving the board
  function paddleCollide(paddle){
    if(paddle.y < 0){
      paddle.y = 0//sets the paddles' y position to 0 to stop it from going any higher, out of the board
    }
    if(paddle.y > BOARD_HEIGHT - paddle.height){
      paddle.y = BOARD_HEIGHT - paddle.height//sets the paddles' y position to be right above the bottom of the board to stop it from going any lower, out of the board
    }
  }
  function doCollide(a,b){
   return (
      a.x < b.x + b.width &&      // left side of a is left of b's right edge
      a.x + a.width > b.x &&      // right side of a is right of b's left edge
      a.y < b.y + b.height &&     // top of a is above b's bottom edge
      a.y + a.height > b.y        // bottom of a is below b's top edge
    )
}//after every reset, these parameters set the start position of each paddle and the ball
  function reset(){
    ball = GameItems(BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -10 : 10), (Math.random() > 0.5 ? -1 : 1), "#ball")
    leftPaddle = GameItems(20, BOARD_HEIGHT / 2 - 125, 0, 0, "#leftPaddle"  );
    rightPaddle = GameItems(BOARD_WIDTH - 30, BOARD_HEIGHT / 2 - 125, 0, 0, "#rightPaddle"  );
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function resetGame(){
    window.location.reload();//each reset reloads the page
  }

//ends the game after either paddle has 10 points
  function handleEndGame(){
      if(leftPaddleScore === 10){
        $("#game-end").text("Player 1 Wins!")//if the left player/paddle gets 10 points, a message is showed to show the winner
        endGame();//the game is reset after a player gets 10 points
      }else if(rightPaddleScore === 10){
        $("#game-end").text("Player 2 Wins!")//if the right player/paddle gets 10 points, a message is showed to show the winner
        endGame();//the game is reset after a player gets 10 points
      }


  }
  function redrawPoints(player){
    if(player.id === "#leftPaddle"){
      $("#player-one").text("Player 1 score: " + leftPaddleScore)//adds a point for the left player to the text
    }
    if(player.id === "#rightPaddle"){
      $("#player-two").text("Player 2 score: " + rightPaddleScore)//adds a point for the right player to the text
    }
  }
  function handleCollision(){
    if(doCollide(ball, leftPaddle)){
      ball.speedX = -ball.speedX;//makes the ball bounce right if it hits the left paddle by reversing the ball's x speed
      ball.speedY = Math.random() * 15;//gives the ball a random Y speed
    }else if(doCollide(ball, rightPaddle)){
      ball.speedX = -ball.speedX;//makes the ball bounce left if it hits the rightt paddle by reversing the ball's x speed
      ball.speedY = Math.random() * 15;//gives the ball a random  Y speed
    }
  }

  function drawObject(gameItem){
    $(gameItem.id).css("top", gameItem.y);//spawns each object based off of their y/top position
    $(gameItem.id).css("left", gameItem.x);//spawns each object based off of their x/left position

  }
  function moveObj(gameItem){
    gameItem.x += gameItem.speedX;//moves each object based off of the set x (left/right) speed
    gameItem.y += gameItem.speedY;//moves each object based off of the set y (up/down) speed
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
