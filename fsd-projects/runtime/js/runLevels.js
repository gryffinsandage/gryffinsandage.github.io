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
    

    function createObstacle(x, y, damage, rotation, image, scaleX, scaleY, offsetX, offsetY){
      var hitZoneSize = 25;//size of collision area of obstacle
      var damageFromObstacle = damage;//amount of damage taken from obstacle
      var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);//creates obstacles with size and hitzone
      obstacleHitZone.x = x;//sets obstacles x position
      obstacleHitZone.y = y;//sets obstackes y position
      game.addGameItem(obstacleHitZone);//adds game item to game
      var obstacleImage = draw.bitmap(image);//draws sawblade as a bitmap and stores it to obstacleImage
      obstacleHitZone.addChild(obstacleImage);//adds picture as a child to hitzone
      obstacleImage.x = offsetX;//offsets image horizontally relative to the hitzone
      obstacleImage.y = offsetY;//offsets image vertically relative to the hitzone
      obstacleImage.scaleX = scaleX;
      obstacleImage.scaleY = scaleY;

      obstacleHitZone.rotationalVelocity = rotation;  



    } 
    function createEnemy(x,y, image,scaleX,scaleY,offsetX,offsetY) {
    var enemy = game.createGameItem("enemy", 25);
    var enemyImage = draw.bitmap(image);//creates image of enemy and stores it to the enemyImage variable
    enemyImage.x = offsetX;//horizontal offset to hitzone
    enemyImage.y = offsetY;//vertical offset to hitzone
    enemy.addChild(enemyImage);//attaches image to enemy object
    enemy.x = x;//set x position of enemy
    enemy.y = y;//set y position of enemy
    enemyImage.scaleX = scaleX;
    enemyImage.scaleY = scaleY;

    game.addGameItem(enemy);//makes the enemy visible in the game

    enemy.velocityX -= 3// sets the speed of the enemy

      //handles when halle collides with enemy
    enemy.onPlayerCollision = function(){
      game.changeIntegrity(-100)// player loses 100 health if they touches the enemy
    };

    //handles the death of the enemy
    enemy.onProjectileCollision = function(){
    game.increaseScore(750);// gives player 100 points if the enemy is killed
    enemy.fadeOut();// effect of the enemy death, fading
    };
    }



  function createReward(x,y, image, scaleX, scaleY, offsetX, offsetY, points) {
    var reward = game.createGameItem("reward", 25);
    var rewardImage = draw.bitmap(image);//creates image of enemy and stores it to the enemyImage variable
    rewardImage.x = offsetX;//horizontal offset to hitzone
    rewardImage.y = offsetY;//vertical offset to hitzone
    reward.addChild(rewardImage);//attaches image to enemy object
    reward.x = x;//set x position of enemy
    reward.y = y;//set y position of enemy
    rewardImage.scaleX = scaleX
    rewardImage.scaleY = scaleY
    game.addGameItem(reward);//makes the enemy visible in the game

    reward.velocityX -= 3// sets the speed of the enemy

      //handles when halle collides with enemy
    reward.onPlayerCollision = function(){
      game.changeIntegrity(10)// player gains 10 health if it touches the reward
      game.increaseScore(points);// gives player 100 points if the enemy is killed
      reward.fadeOut();// effect of the enemy death, fading
    };
  }


      function createLevelMarker(x,y, offsetX, offsetY, image, scaleX, scaleY) {
        var levelMarker = game.createGameItem("level", 25);
        var levelImage = draw. bitmap(image);//creates image of enemy and stores it to the enemyImage variable
        levelImage.x = offsetX;//horizontal offset to hitzone
        levelImage.y = offsetY;//vertical offset to hitzone
        levelMarker.addChild(levelImage);//attaches image to enemy object
        levelMarker.x = x;//set x position of enemy
        levelMarker.y = y;//set y position of enemy
        levelImage.scaleX = scaleX
        levelImage.scaleY = scaleY
        game.addGameItem(levelMarker);//makes the enemy visible in the game

        levelMarker.velocityX -= 3// sets the speed of the enemy
          
          //handles when halle collides with enemy
        levelMarker.onPlayerCollision = function(){
          game.changeIntegrity(100)// player gains 100 health if it touches the marker
          game.increaseScore(1900);// gives player 100 points if the marker is touched
          levelMarker.fadeOut();// effect of the marker death, fading
          startLevel();
        };
      };



    

      function startLevel() {
      // TODO 13 goes below here
        var level = levelData[currentLevel];//fetches current level from levelData array, and stores it inside level variable
        var levelObjects =level.gameItems;// retrieves the array of game itemsand stores it in the level objects variable.
        
        
        for(var i = 0; i < levelObjects.length; i++){
          var element = levelObjects[i];

          if(element.type === "obstacle"){
            createObstacle(element.x, element.y,element.damage, element.rotation, element.image, element.scaleX, element.scaleY,element.offsetX, element.offsetY);
          }
          if(element.type === "enemy"){
            createEnemy(element.x, element.y, element.image, element.scaleX, element.scaleY,element.offsetX,element.offsetY);
          }
          if(element.type === "reward"){
            createReward(element.x, element.y,element.image, element.scaleX, element.scaleY, element.offsetX, element.offsetY, element.points);
          }
          if(element.type === "levelMarker"){
            createLevelMarker(element.x, element.y, element.offsetX, element.offsetY, element.image, element.scaleX, element.scaleY);
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
