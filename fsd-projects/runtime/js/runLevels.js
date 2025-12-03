var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    

    function createObstacle(x, y, damage){
      var hitZoneSize = 25;//size of collision area of obstacle
      var damageFromObstacle = damage;//amount of damage taken from obstacle
      var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);//creates obstacles with size and hitzone
      obstacleHitZone.x = x;//sets obstacles x position
      obstacleHitZone.y = y;//sets obstackes y position
      game.addGameItem(obstacleHitZone);//adds game item to game
      var obstacleImage = draw.bitmap("img/sawblade.png");//draws sawblade as a bitmap and stores it to obstacleImage
      obstacleHitZone.addChild(obstacleImage);//adds picture as a child to hitzone
      obstacleImage.x = -25;//offsets image horizontally relative to the hitzone
      obstacleImage.y = -25;//offsets image vertically relative to the hitzone

      obstacleHitZone.rotationalVelocity = 50;  



    } 
    function createEnemy(x,y) {
    var enemy = game.createGameItem("enemy", 25);
    var enemyImage = draw.rect(50, 50, "red");//creates image of enemy and stores it to the enemyImage variable
    enemyImage.x = -25;//horizontal offset to hitzone
    enemyImage.y = -25;//vertical offset to hitzone
    enemy.addChild(enemyImage);//attaches image to enemy object
    enemy.x = x;//set x position of enemy
    enemy.y = y;//set y position of enemy
    game.addGameItem(enemy);//makes the enemy visible in the game

    enemy.velocityX -= 3// sets the speed of the enemy

      //handles when halle collides with enemy
    enemy.onPlayerCollision = function(){
      game.changeIntegrity(-10)// player loses 10 health if it touches the enemy
    };

    //handles the death of the enemy
    enemy.onProjectileCollision = function(){
    game.increaseScore(100);// gives player 100 points if the enemy is killed
    enemy.fadeOut();// effect of the enemy death, fading
    };
    }

    createEnemy(400, groundY-50);
    createEnemy(2000, groundY-50);

  function createReward(x,y) {
    var reward = game.createGameItem("reward", 25);
    var rewardImage = draw.rect(50, 50, "blue");//creates image of enemy and stores it to the enemyImage variable
    rewardImage.x = -25;//horizontal offset to hitzone
    rewardImage.y = -25;//vertical offset to hitzone
    reward.addChild(rewardImage);//attaches image to enemy object
    reward.x = x;//set x position of enemy
    reward.y = y;//set y position of enemy
    game.addGameItem(reward);//makes the enemy visible in the game

    reward.velocityX -= 3// sets the speed of the enemy

      //handles when halle collides with enemy
    reward.onPlayerCollision = function(){
      game.changeIntegrity(10)// player gains 10 health if it touches the reward
      game.increaseScore(100);// gives player 100 points if the enemy is killed
      reward.fadeOut();// effect of the enemy death, fading
    };
  }
    createReward(1000, groundY- 50);

      function createLevelMarker(x,y) {
        var levelMarker = game.createGameItem("level", 25);
        var levelImage = draw.rect(50, 50, "yellow");//creates image of enemy and stores it to the enemyImage variable
        levelImage.x = -25;//horizontal offset to hitzone
        levelImage.y = -25;//vertical offset to hitzone
        levelMarker.addChild(levelImage);//attaches image to enemy object
        levelMarker.x = x;//set x position of enemy
        levelMarker.y = y;//set y position of enemy
        game.addGameItem(levelMarker);//makes the enemy visible in the game

        levelMarker.velocityX -= 3// sets the speed of the enemy
          
          //handles when halle collides with enemy
        levelMarker.onPlayerCollision = function(){
          game.changeIntegrity(100)// player gains 10 health if it touches the reward
          game.increaseScore(500);// gives player 100 points if the enemy is killed
          levelMarker.fadeOut();// effect of the enemy death, fading
          startLevel();
        };
      };
      createLevelMarker(1600, groundY-50);

    createObstacle(600, groundY - 110, 10);
    createObstacle(1000, groundY - 110, 10);
    createObstacle(1400, groundY - 110, 10);

    

      function startLevel() {
      // TODO 13 goes below here
        var level = levelData[currentLevel];//fetches current level from levelData array, and stores it inside level variable
        var levelObjects =level.gameItems;// retrieves the array of game itemsand stores it in the level objects variable.
        for(var i = 0; i < levelObjects.length; i++){
          var element = levelObjects[i];
          if(element.type === "obstacle"){
            createObstacle(element.x, element.y, damage);
          }

        }


      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
