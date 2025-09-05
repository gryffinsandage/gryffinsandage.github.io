$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid



    // TODO 2 - Create Platforms
createPlatform(475,603,300,25,"rgba(0, 0, 0, 1)");
createPlatform(250,465,300,25,"rgba(0, 0, 0, 1)");
createPlatform(325,335,25,130,"rgba(0, 0, 0, 1)");
createPlatform(1125,605,25,150,"rgba(0, 0, 0, 1)");
createPlatform(1300,495,25,25,"rgba(0, 0, 0, 1)");
createPlatform(1100,360,30,30,"rgba(0, 0, 0, 1)");
createPlatform(1,120,800,25,"rgba(0, 0, 0, 1)");
createPlatform(900,235,67,25,"rgba(0, 0, 0, 1)");

    // TODO 3 - Create Collectables

createCollectable("JB", 550,550,0.4,0.9);
createCollectable("HR", 275,275,0.4,0.9);
createCollectable("MD", 1295,275,0.4,0.9);
createCollectable("67", 200,50,0.4,0.9);
createCollectable("LB2", 900,50,0.4,0.9);

    // TODO 4 - Create Cannons

createCannon("left", 200, 1000);
createCannon("top", 625, 2050);  
createCannon("left", 450, 1200);
    
    
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
