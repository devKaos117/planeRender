/**
 * 
 */
class Plane {
    //------- properties
    _interface;
    //------- constructor
    constructor(canvas) {
        //--- verifying parameter
        if (typeof canvas != "object" || canvas.tagName != "CANVAS") {
            throw "Parameter must be a canvas";
        }
        // setting planeInterface
        this._interface = new planeInterface(canvas);
    }
    //------- planeScaling methods
    /**
     *  Sets the pixel ratio for the canvas scaling
     *  @param { number } ration pixel ratio
     */
    setPixelRatio(ratio) {
        this._interface.scalingInterface.setPixelRatio(ratio);
    }
    //------- planeAesthetics methods
    /**
     *  Sets the rgba color for the main axis
     *  @param { number } r red chanel value
     *  @param { number } g green chanel value
     *  @param { number } b blue chanel value
     *  @param { number } a alpha chanel value
     */
    setAxisColor(r, g, b, a) {
        this._interface.aestheticsInterface.setAxisColor(r, g, b, a);
    }
    /**
     *  Sets the rgba color for the secondary grid and grid numbers
     *  @param { number } r red chanel value
     *  @param { number } g green chanel value
     *  @param { number } b blue chanel value
     *  @param { number } a alpha chanel value
     */
    setGridColor(r, g, b, a) {
        this._interface.aestheticsInterface.setGridColor(r, g, b, a);
    }
    /**
     *  Sets the font used in the grid numbers
     *  @param { string } font font name
     */
    setFont(font) {
        this._interface.aestheticsInterface.setFont(font);
    }
    /**
     *  Sets the font size used in the grid numbers
     *  @param { number } size font size
     */
    setFontSize(size) {
        this._interface.aestheticsInterface.setFontSize(size);
    }
    //------- planeCoordinates methods
    /**
     *  Sets the growth index for the main axis
     *  @param { number } n growth index
     */
    setNumberStep(n) {
        this._interface.coordinatesInterface.setNumberStep(n);
    }
    /**
     *  Sets the pixel distance between each secondary grid line
     *  @param { number } n distance in pixels
     */
    setPixelStep(n) {
        this._interface.coordinatesInterface.setPixelStep(n);
    }
    /**
     *  Converts the given number from it from pixel coordinates to plane coordinates in the X axis
     *  @param { number } x x pixel coordinate
     *  @returns { number } x plane coordinates
     */
    pixelsToGridX(x) {
        return this._interface.coordinatesInterface.pixelsToGridX(x);
    }
    /**
     *  Converts the given number from it from pixel coordinates to plane coordinates in the Y axis
     *  @param { number } y y pixel coordinate
     *  @returns { number } y plane coordinates
     */
    pixelsToGridY(y) {
        return this._interface.coordinatesInterface.pixelsToGridY(y);
    }
    //------- planePoints methods
    /**
     *  Adds a point in the plane
     *  @param { number } x x coordinate
     *  @param { number } y y coordinate
     */
    addPoint(x, y) {
        this._interface.pointsInterface.addPoint(x, y);
    }
    /**
     *  Removes a point from the plane
     *  @param { number } x x coordinate
     *  @param { number } y y coordinate
     */
    removePoint(x, y) {
        this._interface.pointsInterface.removePoint(x, y);
    }
    /**
     *  Clear out all the points of the plane
     */
    clearPoints() {
        this._interface.pointsInterface.clearPoints();
    }
    //------- planeInterface methods
    /**
     *  Draws the main axis lines, secondary grid lines and the grid numbers
     */
    drawGrid() {
        this._interface.drawAxis();
        this._interface.drawGrid();
        this._interface.writeGridNumbers();
    }
    /**
     *  Draws the points in the plane
     */
    drawPoints() {
        this._interface.drawPoints();
    }
    /**
     *  Connects the plane points with lines
     */
    connectPoints() {
        this._interface.connectPoints();
    }
    /**
     *  Clear the plane and re-draw the axis and grid lines and numbers
     */
    clearAll() {
        this._interface.clearAll();
    }
//------- end of class Plane
}
/**
 *  Class responsible for re-scaling and dealing with the canvas DPI
 *  @param { object } canvas canvas access
 *  @param { object } ctx canvas context
 *  @param { number } ratio canvas pixel ratio
 */
class planeScaling {
    //------- properties
    canvas;
    ctx;
    viewportRect;
    pixelRatio;
    //------- constructor
    constructor(canvas, ctx, ratio) {
        // saving canvas and canvas.context access
        this.canvas = canvas;
        this.ctx = ctx;
        // setting initial values
        this.viewportRect = this.canvas.getBoundingClientRect();
        this.setPixelRatio(ratio);
    }
    //------- methods
    /**
     *  Verifies if the given value is a number and the ascribes it to the pixelRatio property, then re-scaling the canvas
     *  @param { number } The pixel ratio for scaling
     */
    setPixelRatio(ratio) {
        if (isNaN(parseFloat(ratio))) {
            throw "Parameter must be a number for the canvas pixel ratio";
        }
        this.pixelRatio = parseFloat(ratio);
        this.scaleCanvas();
    }
    /**
     *  Sets the canvas width and height according to the scaling resolution set up and then re-scale it
     */
    scaleCanvas() {
        this.canvas.width = this.viewportRect.width * this.pixelRatio;
        this.canvas.height = this.viewportRect.height * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
    }
//------- end of class planeScaling
}
/**
 *  Class responsible for dealing with the colors and font for the plane
 */
class planeAesthetics {
    //------- properties
    axisColor;
    gridColor;
    font;
    fontSize;
    //------- constructor
    constructor() {
        // setting colors
        this.setAxisColor(0, 0, 0, 1)
        this.setGridColor(0, 0, 0, 0.5);
        // setting font properties
        this.setFont("arial");
        this.setFontSize(8);
    }
    //------- methods
    /**
     *  Verifies the validity of the given parameters and then ascribes the new rgba color to the axisColor property
     *  @param { number } r red chanel value
     *  @param { number } g green chanel value
     *  @param { number } b blue chanel value
     *  @param { number } a alpha chanel value
     */
    setAxisColor(r, g, b, a) {
        if (r < 0 || r > 255 || isNaN(Math.ceil(r))) {
            throw "Red chanel parameter for axis color is not valid";
        }
        if (g < 0 || g > 255 || isNaN(Math.ceil(g))) {
            throw "Green chanel parameter for axis color is not valid";
        }
        if (b < 0 || b > 255 || isNaN(Math.ceil(b))) {
            throw "Blue chanel parameter for axis color is not valid";
        }
        if (a < 0 || a > 1) {
            throw "Alpha chanel parameter for axis color is not valid";
        }
        this.axisColor = "rgba(" + Math.ceil(r) + ", " + Math.ceil(g) + ", " + Math.ceil(b) + ", " + a + ")";
    }
    /**
     *  Verifies the validity of the given parameters and then ascribes the new rgba color to the gridColor property
     *  @param { number } r red chanel value
     *  @param { number } g green chanel value
     *  @param { number } b blue chanel value
     *  @param { number } a alpha chanel value
     */
    setGridColor(r, g, b, a) {
        if (r < 0 || r > 255 || isNaN(Math.ceil(r))) {
            throw "Red chanel parameter for grid color is not valid";
        }
        if (g < 0 || g > 255 || isNaN(Math.ceil(g))) {
            throw "Green chanel parameter for grid color is not valid";
        }
        if (b < 0 || b > 255 || isNaN(Math.ceil(b))) {
            throw "Blue chanel parameter for grid color is not valid";
        }
        if (a < 0 || a > 1) {
            throw "Alpha chanel parameter for grid color is not valid";
        }
        this.gridColor = "rgba(" + Math.ceil(r) + ", " + Math.ceil(g) + ", " + Math.ceil(b) + ", " + a + ")";
    }
    /**
     *  Verifies if the given parameter is a string and then ascribes it to the font property
     *  @param { string } font font name
     */
    setFont(font) {
        if (typeof font !== "string") {
            throw "Parameter must be a string for the font name";
        }
        this.font = font;
    }
    /**
     *  Verifies if the given parameter is an integer and then ascribes it to the fontSize property
     *  @param { number } size new font size
     */
    setFontSize(size) {
        if (isNaN(parseInt(size))) {
            throw "Parameter must be an integer for the font size";
        }
        this.fontSize = parseInt(size);
    }
//------- end of class planeAesthetics
}
/**
 *  Class responsible for dealing with the plane coordinates and measurements
 *  @param { object } canvas canvas access
 *  @param { number } numberStep main axis growth index
 *  @param { number } pixelStep distance between each secondary grid line
 */
class planeCoordinates {
    //------- properties
    canvas;
    originX;
    originY;
    numberStep;
    pixelStep;
    //------- constructor
    constructor(canvas, numberStep, pixelStep) {
        // saving canvas access
        this.canvas = canvas;
        // calculating the inicial values for the origin position
        this.findOrigin();
        // setting inicial values
        this.setNumberStep(numberStep);
        this.setPixelStep(pixelStep);
    }
    //------- methods
    /**
     *  Calculates the pixel coordinates for the plane origin and ascribes it to the originX and originY properties
     */
    findOrigin() {
        this.originX = (this.canvas.width / 2);
        this.originY = (this.canvas.height / 2);
    }
    /**
     *  Checks if the given coordinates are inside the visible plane
     *  @param { number } x x coordinates
     *  @param { number } y y coordinates
     *  @param { number } margin margin of error
     *  @returns { boolean } result
     */
    isLeaking(x, y, margin = 0) {
        let viewport = this.canvas.getBoundingClientRect();
        let w = viewport.width; 
        let h = viewport.height;
        return (x > w + margin || y > h + margin);
    }
    //------- setting methods
    /**
     *  Verifies if the given value is a number and then ascribes it to the numberStep property
     *  @param { number } lenght Default value = 1
     */
    setNumberStep(lenght = 1) {
        if (isNaN(parseFloat(lenght))) {
            throw "Parameter must be a number for the main axis growth index";
        }
        this.numberStep = parseFloat(lenght);
    }
    /**
     *  Verifies if the given value is a number and then ascribes it to the pixelStep property
     *  @param { number } lenght Default value = 25
     */
    setPixelStep(lenght = 25) {
        if (isNaN(parseInt(lenght))) {
            throw "Parameter must be a number for the pixel distance between the secondary grid lines";
        }
        this.pixelStep = parseInt(lenght);
    }
    //------- unit conversion tools
    /**
     *  Verifies if the given value is a number and then converts it from plane coordinates to pixel coordinates in the X axis
     *  @param { number } x x plane coordinate
     *  @returns { number } x pixel coordinates
     */
    gridToPixelsX(x) {
        if (isNaN(parseFloat(x))) {
            throw "Parameter must be a number to be converted from x-grid to x-pixel";
        }
        return (((x / this.numberStep) * this.pixelStep) + this.originX);
    }
    /**
     *  Verifies if the given value is a number and then converts it from plane coordinates to pixel coordinates in the Y axis
     *  @param { number } y y plane coordinate
     *  @returns { number } y pixel coordinates
     */
    gridToPixelsY(y) {
        if (isNaN(parseFloat(y))) {
            throw "Parameter must be a number to be converted from y-grid to y-pixel";
        }
        return (this.originY - ((y / this.numberStep) * this.pixelStep));
    }
    /**
     *  Verifies if the given value is a number and then converts it from pixel coordinates to plane coordinates in the X axis
     *  @param { number } x x pixel coordinate
     *  @returns { number } x plane coordinates
     */
    pixelsToGridX(x) {
        if (isNaN(parseFloat(x))) {
            throw "Parameter must be a number to be converted from x-pixel to x-grid";
        }
        return (((x - this.originX) / this.pixelStep) * this.numberStep);
    }
    /**
     *  Verifies if the given value is a number and then converts it from pixel coordinates to plane coordinates in the Y axis
     *  @param { number } y y pixel coordinate
     *  @returns { number } y plane coordinates
     */
    pixelsToGridY(y) {
        if (isNaN(parseFloat(y))) {
            throw "Parameter must be a number to be converted from y-pixel to y-grid";
        }
        return (((this.originY - y) / this.pixelStep) * this.numberStep);
    }
//------- end of class planeCoordinates
}
/**
 *  Class responsible for dealing with the plane points
 */
class planePoints {
    //------- properties
    pointsList;
    //------- constructor
    constructor() {
        // setting points list
        this.pointsList = [];
    }
    //------- methods
    /**
     *  Verifies if the given values are numbers and then adds a point to the array property pointsList
     *  @param { number } x x coordinate
     *  @param { number } y y coordinate
     */
    addPoint(x, y) {
        if (isNaN(parseFloat(x)) || isNaN(parseFloat(y))) {
            throw "Parameter must be a number for the point coordinates";
        }
        if (this.pointsList.indexOf({"x": parseFloat(x), "y": parseFloat(y)}) != -1) {
            return null;
        }
        this.pointsList.push({"x": parseFloat(x), "y": parseFloat(y)});
    }
    /**
     *  Verifies if the given values are numbers and then removes the corresponding point from the array property pointsList
     *  @param { number } x x coordinate
     *  @param { number } y y coordinate
     */
    removePoint(x, y) {
        if (isNaN(parseFloat(x)) || isNaN(parseFloat(y))) {
            throw "Parameter must be a number for the point coordinates";
        }
        this.pointsList.splice(this.pointsList.indexOf({"x": parseFloat(x), "y": parseFloat(y)}), 1);
    }
    /**
     *  Orders the points in the array property pointsList
     */
    orderPoints() {
        this.pointsList.sort((a, b) => {
            if (a["x"] != b["x"]) {
                return a["x"] - b["x"];
            } else {
                return a["y"] - b["y"];
            }
        });
    }
    /**
     *  Empties the array property pointsList
     */
    clearPoints() {
        this.pointsList = [];
    }
//------- end of class planePoints
}
/**
 *  Class responsible for drawing in the canvas and calling out other classes methods
 *  @param { object } canvas canvas access
 */
class planeInterface {
    //------- properties
    canvas;
    ctx;
    scalingInterface;
    aestheticsInterface;
    coordinatesInterface;
    pointsInterface;
    //------- constructor
    constructor(canvas) {
        // starting the canvas
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        // setting interfaces
        this.scalingInterface = new planeScaling(this.canvas, this.ctx, 1);
        this.aestheticsInterface = new planeAesthetics();
        this.coordinatesInterface = new planeCoordinates(this.canvas, 1, 25);
        this.pointsInterface = new planePoints();
    }
    //------- drawing methods
    /**
     *  Draws a line from 2 given points with the given color
     *  @param { number } x0 x coordinate for the initial point
     *  @param { number } y0 y coordinate for the initial point
     *  @param { number } xf x coordinate for the final point
     *  @param { number } yf y coordinate for the final point
     *  @param { string } color line color
     */
    drawLine(x0, y0, xf, yf, color) {
        // check if the line will be visible
        if (this.coordinatesInterface.isLeaking(x0, y0) && this.coordinatesInterface.isLeaking(xf, yf)) {
            return null;
        }
        // draw the line
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(x0,y0);
        this.ctx.lineTo(xf,yf);
        this.ctx.stroke();
    }
    /**
     *  Draws a point at the given coordinates
     *  @param { number } x x coordinate
     *  @param { number } y y coordinate
     */
    drawPoint(x, y) {
        // check if the point is visible
        if (this.coordinatesInterface.isLeaking(x, y, (this.coordinatesInterface.pixelStep / 10))) {
            return null;
        }
        // draw the point
        this.ctx.fillStyle = this.aestheticsInterface.axisColor;
        this.ctx.beginPath();
        this.ctx.arc(x, y, (this.coordinatesInterface.pixelStep / 10), 0, Math.PI * 2);
        this.ctx.fill();
    }
    /**
     *  Draws the main axis lines
     */
    drawAxis() {
        //--- axis
        this.drawLine(this.coordinatesInterface.originX, 0, this.coordinatesInterface.originX, this.canvas.height, this.aestheticsInterface.axisColor);
        this.drawLine(0, this.coordinatesInterface.originY, this.canvas.width, this.coordinatesInterface.originY, this.aestheticsInterface.axisColor);
    }
    /**
     *  Draws the secondary grid lines
     */
    drawGrid() {
        //--- x-grid
        let gridWidth = this.scalingInterface.viewportRect.width - this.coordinatesInterface.originX;
        for (let i = this.coordinatesInterface.pixelStep; i < gridWidth ; i += this.coordinatesInterface.pixelStep) {
            this.drawLine(gridWidth + i, 0, gridWidth + i, this.scalingInterface.viewportRect.height, this.aestheticsInterface.gridColor);
            this.drawLine(gridWidth - i, 0, gridWidth - i, this.scalingInterface.viewportRect.height, this.aestheticsInterface.gridColor);
        }
        //--- y-grid
        let gridHeight = this.scalingInterface.viewportRect.height - this.coordinatesInterface.originY;
        for (let i = this.coordinatesInterface.pixelStep; i < gridHeight ; i += this.coordinatesInterface.pixelStep) {
            this.drawLine(0, gridHeight + i, this.scalingInterface.viewportRect.width, gridHeight + i, this.aestheticsInterface.gridColor);
            this.drawLine(0, gridHeight - i, this.scalingInterface.viewportRect.width, gridHeight - i, this.aestheticsInterface.gridColor);
        }
    }
    /**
     *  Write the secondary grid numbers
     */
    writeGridNumbers() {
        //--- setting text properties
        this.ctx.font = this.aestheticsInterface.fontSize + "px " + this.aestheticsInterface.font;
        this.ctx.direction = "ltr";
        this.ctx.fillStyle = this.aestheticsInterface.gridColor;
        //--- setting grid size relative to the scale
        let gridWidth = this.scalingInterface.viewportRect.width - this.coordinatesInterface.originX;
        let gridHeight = this.scalingInterface.viewportRect.height - this.coordinatesInterface.originY;
        //--- looping the x-grid
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "top";
        for (let i = this.coordinatesInterface.pixelStep; i < gridWidth ; i += this.coordinatesInterface.pixelStep) {
            this.ctx.fillText((i / this.coordinatesInterface.pixelStep * this.coordinatesInterface.numberStep), (gridWidth + i), gridHeight + 2);
            this.ctx.fillText((-i / this.coordinatesInterface.pixelStep * this.coordinatesInterface.numberStep), (gridWidth - i), gridHeight + 2);
        }
        //--- looping the y-grid
        this.ctx.textAlign = "right";
        this.ctx.textBaseline = "middle";
        for (let i = this.coordinatesInterface.pixelStep; i < gridHeight ; i += this.coordinatesInterface.pixelStep) {
            this.ctx.fillText((-i / this.coordinatesInterface.pixelStep * this.coordinatesInterface.numberStep), gridWidth - 2, (gridHeight + i));
            this.ctx.fillText((i / this.coordinatesInterface.pixelStep * this.coordinatesInterface.numberStep), gridWidth - 2, (gridHeight - i));
        }
    }
    /**
     *  Draws the plane points
     */
    drawPoints() {
        // clear the plane
        this.clearAll();
        // draw the points
        this.pointsInterface.pointsList.forEach(point => {
            this.drawPoint(this.coordinatesInterface.gridToPixelsX(point["x"]), this.coordinatesInterface.gridToPixelsY(point["y"]));
        });
    }
    /**
     *  Draws lines between the plane points
     */
    connectPoints() {
        // clears the plane
        this.clearAll();
        // draw the lines  
        this.pointsInterface.orderPoints();
        this.pointsInterface.pointsList.forEach((point, idx, arr) => {
            if (typeof arr[(idx + 1)] === "undefined") {
                return null;
            }
            this.drawLine(this.coordinatesInterface.gridToPixelsX(point["x"]), this.coordinatesInterface.gridToPixelsY(point["y"]), this.coordinatesInterface.gridToPixelsX(arr[(idx + 1)]["x"]), this.coordinatesInterface.gridToPixelsY(arr[(idx + 1)]["y"]), this.aestheticsInterface.axisColor);
        });
    }
    /**
     *  Clear the plane and re-draw the axis and grid lines and numbers
     */
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawAxis();
        this.drawGrid();
        this.writeGridNumbers();
    }
//------- end of class planeRenderizer
}