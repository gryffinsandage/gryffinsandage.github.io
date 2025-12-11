var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
       var tree;
       var buildings = [];
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundImage = draw.bitmap("img/wp.png");//draws a rectangle and stores it in the backgroundFill
            background.addChild(backgroundImage);// adds backgroundFill to the background object
            // Scale image to fit width
            backgroundImage.scaleX = canvasWidth / backgroundImage.image.width;
            backgroundImage.scaleY = canvasHeight / backgroundImage.image.height;
        

            // After scaling, compute its new height
            var scaledHeight = backgroundImage.image.height * backgroundImage.scaleY;

            // Position it so the BOTTOM of the image touches the ground
            backgroundImage.x = 0;
            backgroundImage.y = groundY - scaledHeight;

            // TODO 2: - Add a moon and starfield
              for(var i = 0; i < 123; i++){
                var circle = draw.circle(3, "white", "LightGray", 2);//creates a circle with a specified radius with a border, fill, alpha, and store it in the variable circle
                circle.x = canvasWidth * Math.random();//randomly determines the x coordinate of the stars within the canvas
                circle.y = groundY * Math.random();//randomly determines the y coordinate of the stars within the canvas above the ground
               // background.addChild(circle);//adds stars to the background container
            }
            var moon = draw.bitmap("img/moon.png");//draws a bitmap using the moon image and stores it in the variable moon
            moon.x = canvas.width-700;//sets moon's x position
            moon.y = canvas.height-900;//sets moon's y position
            moon.scaleX = 0.75;//scales the moon's width
            moon.scaleY = 0.75;//scales the moon's height
            //background.addChild(moon);// add moon to the background container
            
          

            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for (var i = 0; i < 120; ++i) {//creates 5 buildings
                var buildingColors=["pink","Blue","Red","White","Green","Purple","pink","Blue","Red","White","Green","Purple","pink","Blue","Red","White","Green","Purple","pink","Blue","Red","White","Green","Purple","pink","Blue","Red","White","Green","Purple","pink","Blue","Red","White","Green","Purple","pink","Blue","Red","White","Green","Purple","pink","Blue","Red","White","Green","Purple","pink","Blue","Red","White","Green","Purple","pink","Blue","Red","White","Green","Purple","pink","Blue","Red","White","Green","Purple","pink","Blue","Red","White","Green","Purple","pink","Blue","Red","White","Green","Purple","pink","Blue","Red","White","Green","Purple","pink","Blue","Red","White","Green","Purple","pink","Blue","Red","White","Green","Purple","pink","Blue","Red","White","Green","Purple","pink","Blue","Red","White","Green","Purple","pink","Blue","Red","White","Green","Purple","pink","Blue","Red","White","Green","Purple"];
                var buildingHeight = 300* Math.random();//stores a value of building's height
                var building = draw.rect(75, buildingHeight, buildingColors[i], "Black", 1);//draws a rectangle with changable heights, colors, widths, and outlines
                building.x = 200 * i;//gives the buildings' x values where they're each 200 units apart
                building.y = groundY - buildingHeight;//gives y value of building where the look like they are held up by the ground
                //background.addChild(building);//makes it visible in the background
                //buildings.push(building);//pushe it to the buildings array for it to star over again
            }
            
            // TODO 3: Part 1 - Add a tree
            tree = draw.bitmap("img/tree.png");//creates a bitmap object using the tree image
            tree.x =650;// sets the x value of the tree
            tree.y = groundY-230;//sets the y value of the tree
            //background.addChild(tree);//adds tree to the background container


            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            tree.x = tree.x - 5;//moves the tree to the left by subtreacting from its current x position
            if (tree.x < -200) {
                tree.x = canvasWidth;//moves the tree to the right side of the canvas if it crosses the left border of the canvas
            }
            
            // TODO 4: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++) {
                var building = buildings[i];//assigns the length of the buildings to the variable building
                building.x -=1;//takes x value of building and subtracts one from it to move it to the left
                if(building.x<-200){//checks if the building has gone off the elft side of the screen
                    building.x = canvasWidth;//moves the building to the right side of the screen
                }
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
