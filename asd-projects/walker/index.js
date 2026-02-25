/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  const PLAYER_WIDTH = $(".player").width();
  const PLAYER_HEIGHT = $(".player").height();

const KEY = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  ENTER: 13,

  A: 65,
  W: 87,
  S: 83,
  D:68,

  SPACE: 32,
}

  // Game Item Objects
  let player1 = {

    id: "#player1",
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0
  }
  let player2 = {
    id: "#player2",
    x:  BOARD_WIDTH - PLAYER_WIDTH,
    y: BOARD_HEIGHT - PLAYER_HEIGHT,
    speedX: 0,
    speedY: 0
  }
  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)

  /* 
  This section is where you set up event listeners for user input.
  For example, if you wanted to handle a click event on the document, you would replace 'eventType' with 'click', and if you wanted to execute a function named 'handleClick', you would replace 'handleEvent' with 'handleClick'.

  Note: You can have multiple event listeners for different types of events.
  */
  $(document).on('keydown', handleKeyDown);                          
$(document).on('keyup', handleKeyUp); 
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem(player1);
    repositionGameItem(player2);
    redrawGameItem(player1)
    redrawGameItem(player2)
    wallCollision(player1)
    wallCollision(player2)
    if(doCollide(player1,player2)){
      console.log("Tag!")
      var randomColor = "#000000".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
      });

      $("body").css("backgroundColor", randomColor);
    }
  }

  
  
  
  /* 
  This section is where you set up the event handlers for user input.
  For example, if you wanted to make an event handler for a click event, you should rename this function to 'handleClick', then write the code that should execute when the click event occurs.
  
  Note: You can have multiple event handlers for different types of events.
  */
  function handleKeyDown(event) {
    console.log(event.which);
    if(event.which === KEY.LEFT){
      player1.speedX = -10
      player1.speedY = 0
    }else if(event.which === KEY.RIGHT){
      player1.speedX = 10
      player1.speedY = 0
    }else if(event.which === KEY.UP){
      player1.speedY = -10
      player1.speedX = 0
    }else if(event.which === KEY.DOWN){
      player1.speedY = 10
      player1.speedX = 0
    }         
    if(event.which === KEY.A){
      player2.speedX = -10
      player2.speedY = 0
    }else if(event.which === KEY.D){
      player2.speedX = 10
      player2.speedY = 0
    }else if(event.which === KEY.W){
      player2.speedY = -10
      player2.speedX = 0
    }else if(event.which === KEY.S){
      player2.speedY = 10
      player2.speedX = 0
    }
    if(event.which === KEY.SPACE){
      colorChange(player1);
      colorChange(player2);
      console.log("Party!")
    }
  }

  function handleKeyUp(){
    if(event.which === KEY.LEFT || event.which === KEY.RIGHT){
      player1.speedX = 0
    }else if(event.which === KEY.UP || event.which === KEY.DOWN){
      player1.speedY = 0
    }
    if(event.which === KEY.A || event.which === KEY.D){
      player2.speedX = 0
    }else if(event.which === KEY.W || event.which === KEY.S){
      player2.speedY = 0
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


function repositionGameItem(player){
  player.x += player.speedX;
  player.y += player.speedY;
}

function wallCollision(player){
  if(player.x > BOARD_WIDTH - PLAYER_WIDTH){
    player.x -= player.speedX;
  }else if(player.x < 0){
    player.x -= player.speedX;
  } else if(player.y >BOARD_HEIGHT-PLAYER_HEIGHT){
    player.y -= player.speedY;
  }else if(player.y < 0){
    player.y -= player.speedY;
  }
}

function redrawGameItem(player){
  $(player.id).css("left", player.x);
  $(player.id).css("top", player.y);

}
  function doCollide(a, b){
    return (
      a.x < b.x + PLAYER_WIDTH &&
      a.x + PLAYER_WIDTH > b.x &&
      a.y < b.y + PLAYER_HEIGHT &&
      a.y + PLAYER_HEIGHT > b.y
    )
  }


  function colorChange(player){
    var randomColor = "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });

    $(player.id).css("backgroundColor", randomColor);
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);



    // turn off event handlers
    $(document).off();
  }
  
}




