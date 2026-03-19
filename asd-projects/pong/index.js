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
  var ball = GameItems(BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -5 : 5), (Math.random() > 0.5 ? -1 : 1), "#ball")
  var leftPaddle = GameItems(20, BOARD_HEIGHT / 2 - 125, 0, 0, "#leftPaddle"  );
  var rightPaddle = GameItems(BOARD_WIDTH - 20, BOARD_HEIGHT / 2 - 125, 0, 0, "#rightPaddle"  );


  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle

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
  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {
    var keyCode = {
      player2_up: 38,
      player2_down: 40,
      player1_up: 87,
      player2_down: 83,
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function handleKeyDown(){
    
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
