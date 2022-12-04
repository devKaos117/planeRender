/**
 * 
 */
class Plane {
    //------- class constructor
    constructor(canvas){
        //--- verifying parameter
        if (typeof canvas != "object" || canvas.tagName != "CANVAS") {
            throw "Parameter must be a canvas";
        }
        //--- declaring attributes
        // starting the canvas
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        // setting canvas DPi
        this.viewportRect = this.canvas.getBoundingClientRect();
        this.setPixelRatio(1);
        // setting measurement units
        this.setNumberStep(1);
        this.setPixelStep(25);
        // setting colors
        this.setAxisColor(0, 0, 0, 1)
        this.setGridColor(0, 0, 0, 0.5);
        // setting font properties
        this.setFont("arial");
        this.setFontSize(8);
        // setting origin position
        this.originX = (this.canvas.width / 2);
        this.originY = (this.canvas.height / 2);
    }
    //------- configuration methods
    /**
     * 
     */
     setPixelRatio(ratio) {
        if (!parseFloat(ratio)) {
            throw "Parameter must be a number";
        }
        this.pixelRatio = parseFloat(ratio);
        this.scaleCanvas();
    }
    /**
     * 
     */
    setNumberStep(lenght) {
        if (!parseFloat(lenght)) {
            throw "Parameter must be a number";
        }
        this.numberStep = parseFloat(lenght);
    }
    /**
     * 
     */
    setPixelStep(lenght) {
        if (!parseInt(lenght)) {
            throw "Parameter must be a number";
        }
        this.pixelStep = parseInt(lenght);
    }
    /**
     * 
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
     * 
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
     * 
     */
    setFont(font) {
        this.font = font;
    }
    /**
     * 
     */
    setFontSize(size) {
        if (!parseInt(size)) {
            throw "Parameter must be an integer";
        }
        this.fontSize = parseInt(size);
    }
    //------- render methods
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
    writeGridNumbers() {
        //--- setting text properties
        this.ctx.font = this.fontSize + "px " + this.font;
        this.ctx.direction = "ltr";
        this.ctx.fillStyle = this.gridColor;
        //--- setting grid size relative to the scale
        let gridWidth = this.viewportRect.width - this.originX;
        let gridHeight = this.viewportRect.height - this.originY;
        //--- looping the x-grid
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "top";
        for (let i = this.pixelStep; i < gridWidth ; i += this.pixelStep) {
            this.ctx.fillText((i / this.pixelStep * this.numberStep), (gridWidth + i), gridHeight + 2);
            this.ctx.fillText((-i / this.pixelStep * this.numberStep), (gridWidth - i), gridHeight + 2);
        }
        //--- looping the y-grid
        this.ctx.textAlign = "right";
        this.ctx.textBaseline = "middle";
        for (let i = this.pixelStep; i < gridHeight ; i += this.pixelStep) {
            this.ctx.fillText((i / this.pixelStep * this.numberStep), gridWidth - 2, (gridHeight + i));
            this.ctx.fillText((-i / this.pixelStep * this.numberStep), gridWidth - 2, (gridHeight - i));
        }
    }
    /**
     * 
     */
    drawGrid() {
        //--- axis
        this.drawLine(this.originX, 0, this.originX, this.canvas.height, this.axisColor);
        this.drawLine(0, this.originY, this.canvas.width, this.originY, this.axisColor);
        //--- x-grid
        let gridWidth = this.viewportRect.width - this.originX;
        for (let i = this.pixelStep; i < gridWidth ; i += this.pixelStep) {
            this.drawLine(gridWidth + i, 0, gridWidth + i, this.viewportRect.height, this.gridColor);
            this.drawLine(gridWidth - i, 0, gridWidth - i, this.viewportRect.height, this.gridColor);
        }
        //--- y-grid
        let gridHeight = this.viewportRect.height - this.originY;
        for (let i = this.pixelStep; i < gridHeight ; i += this.pixelStep) {
            this.drawLine(0, gridHeight + i, this.viewportRect.width, gridHeight + i, this.gridColor);
            this.drawLine(0, gridHeight - i, this.viewportRect.width, gridHeight - i, this.gridColor);
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
    //------- unit conversion tools
    /**
     * 
     */
    gridToPixels(x, y) {
        return {"x": (((x / this.numberStep) * this.pixelStep) + this.originX), "y": (((y / this.numberStep) * this.pixelStep) - this.originY)};
    }
    /**
     * 
     */
    pixelsToGrid() {
        return {"x": ((x - originX) / this.pixelStep) * this.numberStep,"y": ((originY - y) / this.pixelStep) * this.numberStep};
    }
    //------- setting canvas resolution
    /**
     * 
     */
    scaleCanvas() {
        this.canvas.width = this.viewportRect.width * this.pixelRatio;
        this.canvas.height = this.viewportRect.height * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
    }
}