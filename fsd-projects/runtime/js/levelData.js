var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "obstacle", x: 600, y: groundY - 15, damage: 10, rotation: 0, image: "img/cannon2.png",scaleX:0.5, scaleY:0.5,offsetX:-62, offsetY: -50},
          { type: "obstacle", x: 1000, y: groundY - 15, damage: 10, rotation: 0, image: "img/cannon2.png",scaleX:0.5, scaleY:0.5,offsetX:-62, offsetY: -50},
          { type: "obstacle", x: 1400, y: groundY - 15, damage: 10, rotation: 0, image: "img/cannon2.png",scaleX:0.5, scaleY:0.5,offsetX:-62, offsetY: -50},
          { type: "enemy", x: 700, y: groundY - 50, image:"img/firesprit2.png",scaleX:0.25,scaleY:0.25},
          { type: "enemy", x: 1500, y: groundY - 50, image:"img/firesprit2.png",scaleX:0.25,scaleY:0.25},
          { type: "enemy", x: 2000, y: groundY - 50, image:"img/firesprit2.png",scaleX:0.25,scaleY:0.25},
          { type: "reward", x: 400, y: groundY - 110, image: "img/coin.png",scaleX:0.3,scaleY:0.3, offsetX: -40, offsetY: -30},
          { type: "reward", x: 1200, y: groundY - 110, image: "img/coin.png",scaleX:0.3,scaleY:0.3, offsetX: -40, offsetY: -30},
          { type: "reward", x: 1600, y: groundY - 110, image: "img/coin.png",scaleX:0.3,scaleY:0.3, offsetX: -40, offsetY: -30},
          { type: "levelMarker",}
        ],
      },

      
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "obstacle", x: 400, y: groundY },
          { type: "obstacle", x: 600, y: groundY },
          { type: "obstacle", x: 900, y: groundY },
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
