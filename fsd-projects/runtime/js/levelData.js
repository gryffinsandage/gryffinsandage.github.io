
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
          { type: "obstacle", x: 600, y: groundY - 5, damage: 50, rotation: 0, image: "img/cannon2.png",scaleX:0.5, scaleY:0.5,offsetX:-62, offsetY: -65},
          { type: "obstacle", x: 800, y: groundY - 120, damage: 100, rotation: 0,  image:"img/flight.png",scaleX:0.25,scaleY:0.25, offsetX:-25 ,offsetY: -25},
          { type: "obstacle", x: 1000, y: groundY - 5, damage: 50, rotation: 0, image: "img/tesla.png",scaleX:0.5, scaleY:0.5,offsetX:-45, offsetY: -40},
          { type: "obstacle", x: 1200, y: groundY - 120, damage: 100, rotation: 0,  image:"img/flight.png",scaleX:0.25,scaleY:0.25, offsetX:-25 ,offsetY: -25},
          { type: "obstacle", x: 1400, y: groundY - 5, damage: 50, rotation: 0, image: "img/cage.png",scaleX:0.25, scaleY:0.25,offsetX:-30, offsetY: -40},
          { type: "obstacle", x: 1800, y: groundY - 120, damage: 100, rotation: 0,  image:"img/flight.png",scaleX:0.25,scaleY:0.25, offsetX:-25 ,offsetY: -25},
          { type: "enemy", x: 700, y: groundY - 50, image:"img/firesprit2.png",scaleX:0.25,scaleY:0.25, offsetX:-25 ,offsetY: -25},
          { type: "enemy", x: 1500, y: groundY - 50, image:"img/electro.png",scaleX:0.25,scaleY:0.25, offsetX:-25 ,offsetY: -25},
          { type: "enemy", x: 2000, y: groundY - 50, image:"img/ice.png",scaleX:0.25,scaleY:0.25, offsetX:-25 ,offsetY: -25},
          { type: "enemy", x: 2500, y: groundY - 50, image:"img/pekka.png",scaleX:2,scaleY:2, offsetX:-220 ,offsetY: -220},
          { type: "reward", x: 650, y: groundY - 110, image: "img/coin.png",scaleX:0.3,scaleY:0.3, offsetX: -40, offsetY: -30, points: 200},
          { type: "reward", x: 1250, y: groundY - 110, image: "img/coin.png",scaleX:0.3,scaleY:0.3, offsetX: -40, offsetY: -30, points: 200},
          { type: "reward", x: 1600, y: groundY - 110, image: "img/coin.png",scaleX:0.3,scaleY:0.3, offsetX: -40, offsetY: -30, points: 200},
          { type: "levelMarker", x: 3050, y: groundY - 110, offsetX: -35, offsetY: -25, image: "img/chest.png", scaleX: 0.3, scaleY: 0.3}
        ],
      },
      
      
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "obstacle", x: 600, y: groundY - 5, damage: 50, rotation: 0, image: "img/cannon2.png",scaleX:0.5, scaleY:0.5,offsetX:-62, offsetY: -65},
          { type: "obstacle", x: 800, y: groundY - 120, damage: 100, rotation: 0,  image:"img/flight.png",scaleX:0.25,scaleY:0.25, offsetX:-25 ,offsetY: -25},
          { type: "obstacle", x: 1000, y: groundY - 5, damage: 50, rotation: 0, image: "img/tesla.png",scaleX:0.5, scaleY:0.5,offsetX:-45, offsetY: -40},
          { type: "obstacle", x: 1200, y: groundY - 120, damage: 100, rotation: 0,  image:"img/flight.png",scaleX:0.25,scaleY:0.25, offsetX:-25 ,offsetY: -25},
          { type: "obstacle", x: 1400, y: groundY - 5, damage: 50, rotation: 0, image: "img/cage.png",scaleX:0.25, scaleY:0.25,offsetX:-30, offsetY: -40},
          { type: "obstacle", x: 1800, y: groundY - 120, damage: 100, rotation: 0,  image:"img/flight.png",scaleX:0.25,scaleY:0.25, offsetX:-25 ,offsetY: -25},
          { type: "obstacle", x: 2000, y: groundY - 120, damage: 100, rotation: 0,  image:"img/flight.png",scaleX:0.25,scaleY:0.25, offsetX:-25 ,offsetY: -25},
          { type: "enemy", x: 700, y: groundY - 50, image:"img/ice.png",scaleX:0.25,scaleY:0.25, offsetX:-25 ,offsetY: -25},
          { type: "enemy", x: 1500, y: groundY - 50, image:"img/electro.png",scaleX:0.25,scaleY:0.25, offsetX:-25 ,offsetY: -25},
          { type: "enemy", x: 2000, y: groundY - 50, image:"img/firesprit2.png",scaleX:0.25,scaleY:0.25, offsetX:-25 ,offsetY: -25},
          { type: "enemy", x: 2500, y: groundY - 50, image:"img/mk.png",scaleX:2,scaleY:2, offsetX:-220 ,offsetY: -220},
          { type: "reward", x: 650, y: groundY - 110, image: "img/coin.png",scaleX:0.3,scaleY:0.3, offsetX: -40, offsetY: -30, points: 200},
          { type: "reward", x: 1250, y: groundY - 110, image: "img/coin.png",scaleX:0.3,scaleY:0.3, offsetX: -40, offsetY: -30, points: 200},
          { type: "reward", x: 1600, y: groundY - 110, image: "img/coin.png",scaleX:0.3,scaleY:0.3, offsetX: -40, offsetY: -30, points: 200},
          { type: "reward", x: 1900, y: groundY - 110, image: "img/coin.png",scaleX:0.3,scaleY:0.3, offsetX: -40, offsetY: -30, points: 200},
          { type: "levelMarker", x: 3050, y: groundY - 110, offsetX: -35, offsetY: -25, image: "img/chest.png", scaleX: 0.3, scaleY: 0.3}
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
