/**
 * 
 */
class Plane {
    //------- class properties

    //------- class constructor
    constructor(canvas){
        //--- verifying parameter
        if (typeof canvas != "object" || canvas.tagName != "CANVAS") {
            throw "Parameter must be a canvas";
        }
        // starting the canvas
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        // setting interfaces
        this._planeScaling = new planeScaling(this, 1);
        this._measurements = new planeCoordinates(this, 1, 25);
        this._aesthetics = new planeAesthetics();
        // setting points list
        this.points = [];
    }
    //------- planeCoordinates interfaces
    /**
     *  Interface that calls a method to set the main axis growth index
     *  @param { number } n New index in which the axis values will grow
     */
    setNumberStep(n) {
        this._measurements.setNumberStep(n);
    }
    /**
     *  Interface that calls a method to set the pixel distance between each secondary grid line
     * @param { number } n New pixel distance between the grid lines
     */
    setPixelStep(n) {
        this._measurements.setNumberStep(n);
    }
    //------- planeAesthetics interfaces
    /**
     * 
     */
    setAxisColor(r, g, b, a) {
        this._aesthetics.setAxisColor(r, g, b, a);
    }
    /**
     * 
     */
    setGridColor(r, g, b, a) {
        this._aesthetics.setGridColor(r, g, b, a);
    }
    /**
     * 
     */
    setFont(font) {
        this._aesthetics.setFont(font);
    }
    /**
     * 
     */
    setFontSize(n) {
        this._aesthetics.setFontSize(n);
    }
    //------- planeScaling interfaces
    /**
     *  Interface that calls a method to set the plane pixel ratio
     *  @param { number } n pixel ratio
     */
    setPixelRatio(n) {
        this._planeScaling.setPixelRatio(n);
    }
    //------- points control methods
    /**
     * 
     */
    addPoint(x, y) {
        if (isNaN(parseFloat(x)) || isNaN(parseFloat(y))) {
            throw "Parameter must be a number";
        }
        if (this.points.indexOf({"x": parseFloat(x), "y": parseFloat(y)}) != -1) {
            return null;
        }
        this.points.push({"x": parseFloat(x), "y": parseFloat(y)});
    }
    /**
     * 
     */
    removePoint(x, y) {
        if (isNaN(parseFloat(x)) || isNaN(parseFloat(y))) {
            throw "Parameter must be a number";
        }
        this.points.splice(this.points.indexOf({"x": parseFloat(x), "y": parseFloat(y)}), 1);
    }
    /**
     * 
     */
    orderPoints() {
        this.points.sort((a, b) => {
            if (a["x"] != b["x"]) {
                return a["x"] - b["x"];
            } else {
                return a["y"] - b["y"];
            }
        });
    }
    /**
     * 
     */
    clearPoints() {
        this.points = [];
    }
    //------- render methods
    /**
     * 
     */
    drawPoints() {
        this.points.forEach(point => {
            this.drawPoint(this._measurements.gridToPixelsX(point["x"]), this._measurements.gridToPixelsY(point["y"]));
        });
    }
    /**
     * 
     */
    connectPoints() {
        this.orderPoints();
        this.points.forEach((point, idx, arr) => {
            if (typeof arr[(idx + 1)] === "undefined") {
                return null;
            }
            this.drawLine(this._measurements.gridToPixelsX(point["x"]), this._measurements.gridToPixelsY(point["y"]), this._measurements.gridToPixelsX(arr[(idx + 1)]["x"]), this._measurements.gridToPixelsY(arr[(idx + 1)]["y"]), this.axisColor);
        });
    }
    /**
     * 
     */
    drawLine(x0, y0, xf, yf, color) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(x0,y0);
        this.ctx.lineTo(xf,yf);
        this.ctx.stroke();
    }
    /**
     * 
     */
    drawPoint(x, y) {
        this.ctx.fillStyle = this.axisColor;
        this.ctx.beginPath();
        this.ctx.arc(x, y, (this._measurements.pixelStep / 10), 0, Math.PI * 2);
        this.ctx.fill();
    }
    /**
     * 
     */
    writeGridNumbers() {
        //--- setting text properties
        this.ctx.font = this.fontSize + "px " + this.font;
        this.ctx.direction = "ltr";
        this.ctx.fillStyle = this.gridColor;
        //--- setting grid size relative to the scale
        let gridWidth = this._planeScaling.viewportRect.width - this._measurements.originX;
        let gridHeight = this._planeScaling.viewportRect.height - this._measurements.originY;
        //--- looping the x-grid
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "top";
        for (let i = this._measurements.pixelStep; i < gridWidth ; i += this._measurements.pixelStep) {
            this.ctx.fillText((i / this._measurements.pixelStep * this._measurements.numberStep), (gridWidth + i), gridHeight + 2);
            this.ctx.fillText((-i / this._measurements.pixelStep * this._measurements.numberStep), (gridWidth - i), gridHeight + 2);
        }
        //--- looping the y-grid
        this.ctx.textAlign = "right";
        this.ctx.textBaseline = "middle";
        for (let i = this._measurements.pixelStep; i < gridHeight ; i += this._measurements.pixelStep) {
            this.ctx.fillText((-i / this._measurements.pixelStep * this._measurements.numberStep), gridWidth - 2, (gridHeight + i));
            this.ctx.fillText((i / this._measurements.pixelStep * this._measurements.numberStep), gridWidth - 2, (gridHeight - i));
        }
    }
    /**
     * 
     */
    drawGrid() {
        //--- axis
        this.drawLine(this._measurements.originX, 0, this._measurements.originX, this.canvas.height, this.axisColor);
        this.drawLine(0, this._measurements.originY, this.canvas.width, this._measurements.originY, this.axisColor);
        //--- x-grid
        let gridWidth = this._planeScaling.viewportRect.width - this._measurements.originX;
        for (let i = this._measurements.pixelStep; i < gridWidth ; i += this._measurements.pixelStep) {
            this.drawLine(gridWidth + i, 0, gridWidth + i, this._planeScaling.viewportRect.height, this.gridColor);
            this.drawLine(gridWidth - i, 0, gridWidth - i, this._planeScaling.viewportRect.height, this.gridColor);
        }
        //--- y-grid
        let gridHeight = this._planeScaling.viewportRect.height - this._measurements.originY;
        for (let i = this._measurements.pixelStep; i < gridHeight ; i += this._measurements.pixelStep) {
            this.drawLine(0, gridHeight + i, this._planeScaling.viewportRect.width, gridHeight + i, this.gridColor);
            this.drawLine(0, gridHeight - i, this._planeScaling.viewportRect.width, gridHeight - i, this.gridColor);
        }
    }
    /**
     * 
     */
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
        this.writeGridNumbers();
    }
//------- end of Plane class
}



/**
 *  Class to deal with the coordinates and mesurements of the plane calculations
 */
class planeCoordinates {
    //------- class properties
    plane;
    originX;
    originY;
    numberStep;
    pixelStep;
    //------- class constructor
    constructor(plane, numberStep = 1, pixelStep = 25) {
        // saving the plane object access
        if (typeof plane != "object") {
            throw "plane parameter must be an object";
        }
        this.plane = plane;
        // calculating the inicial values for the origin position
        this.findOrigin();
        // setting inicial values
        this.setNumberStep(numberStep);
        this.setPixelStep(pixelStep);
    }
    //------- calculating the origins position
    /**
     *  Calculates the pixel coordinates for the plane origin and ascribes it to the originX and originY properties
     */
    findOrigin() {
        this.originX = (this.plane.canvas.width / 2);
        this.originY = (this.plane.canvas.height / 2);
    }
    //------- setting methods
    /**
     *  Verifies if the given value is a number and then ascribes it to the numberStep property
     *  @param { number } lenght Default value = 1
     */
    setNumberStep(lenght = 1) {
        if (isNaN(parseFloat(lenght))) {
            throw "Parameter must be a number";
        }
        this.numberStep = parseFloat(lenght);
    }
    /**
     *  Verifies if the given value is a number and then ascribes it to the pixelStep property
     *  @param { number } lenght Default value = 25
     */
    setPixelStep(lenght = 25) {
        if (isNaN(parseInt(lenght))) {
            throw "Parameter must be a number";
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
            throw "Parameter must be a number";
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
            throw "Parameter must be a number";
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
            throw "Parameter must be a number";
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
            throw "Parameter must be a number";
        }
        return (((this.originY - y) / this.pixelStep) * this.numberStep);
    }
//------- end of planeMeasurements class
}



/**
 * 
 */
class planeAesthetics {
    //------- class properties
    axisColor;
    gridColor;
    font;
    fontSize;
    //------- class constructor
    constructor() {
        // setting colors
        this.setAxisColor(0, 0, 0, 1)
        this.setGridColor(0, 0, 0, 0.5);
        // setting font properties
        this.setFont("arial");
        this.setFontSize(8);
    }
    //------- aesthetics setting methods
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
            throw "parameter must be a string";
        }
        this.font = font;
    }
    /**
     *  Verifies if the given parameter is an integer and then ascribes it to the fontSize property
     *  @param { number } size new font size
     */
    setFontSize(size) {
        if (isNaN(parseInt(size))) {
            throw "Parameter must be an integer";
        }
        this.fontSize = parseInt(size);
    }
//------- end of planeAesthetics class
}



/**
 * 
 */
class planeScaling {
    //------- class properties
    plane;
    viewportRect;
    _pixelRatio;
    //------- class constructor
    constructor(plane, ratio) {
        // saving the plane object access
        if (typeof plane != "object") {
            throw "plane parameter must be an object";
        }
        this.plane = plane;
        // setting initial values
        this.viewportRect = this.plane.canvas.getBoundingClientRect();
        this.setPixelRatio(ratio);
    }
    //------- canvas scaling methods
    /**
     *  Verifies if the given value is a number and the ascribes it to the pixelRatio property, then re-scaling the canvas
     *  @param { number } The pixel ratio for scaling
     */
    setPixelRatio(ratio) {
        if (isNaN(parseFloat(ratio))) {
            throw "Parameter must be a number";
        }
        this._pixelRatio = parseFloat(ratio);
        this.scaleCanvas();
    }
    /**
     *  Sets the canvas width and height according to the scaling resolution set up and then re-scale it
     */
    scaleCanvas() {
        this.plane.canvas.width = this.viewportRect.width * this._pixelRatio;
        this.plane.canvas.height = this.viewportRect.height * this._pixelRatio;
        this.plane.ctx.scale(this._pixelRatio, this._pixelRatio);
    }
//------- end of planescaling class
}