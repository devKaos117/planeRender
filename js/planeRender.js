/**
 * 
 */
class Plane {
    //------- class constructor
    constructor(canvas){
        //--- verifying parameter
        if (typeof canvas != "object" || canvas.tagName != "CANVAS") {
            throw "Parameter is not a canvas";
        }
        //--- declaring attributes
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.numberStep = "1";
        this.pixelStep = "25";
        this.axisColor = "rgba(0, 0, 0, 1)";
        this.gridColor = "rgba(0, 0, 0, 0.2)";
        this.originX = (this.canvas.width / 2);
        this.originY = (this.canvas.height / 2);
    }
    //------- configuration methods
    /**
     * 
     */
    setNumberStep(lenght) {
        if (!parseFloat(lenght)) {
            throw "Parameter is not a number";
        }
        this.numberStep = parseFloat(lenght);
    }
    /**
     * 
     */
    setPixelStep(lenght) {
        if (!parseInt(lenght)) {
            throw "Parameter is not a number";
        }
        this.pixelStep = parseInt(lenght);
    }
    /**
     * 
     */
    setAxisColor(r, g, b, a) {
        if (r < 0 || r > 255 || !Math.ceil(r)) {
            throw "Red chanel parameter is not valid";
        }
        if (g < 0 || g > 255 || !Math.ceil(g)) {
            throw "Green chanel parameter is not valid";
        }
        if (b < 0 || b > 255 || !Math.ceil(b)) {
            throw "Blue chanel parameter is not valid";
        }
        if (a < 0 || a > 1) {
            throw "Alpha chanel parameter is not valid";
        }
        this.axisColor = "rgba(" + Math.ceil(r) + ", " + Math.ceil(g) + ", " + Math.ceil(b) + ", " + a + ")";
    }
    /**
     * 
     */
    setGridColor(r, g, b, a) {
        if (r < 0 || r > 255 || !Math.ceil(r)) {
            throw "Red chanel parameter is not valid";
        }
        if (g < 0 || g > 255 || !Math.ceil(g)) {
            throw "Green chanel parameter is not valid";
        }
        if (b < 0 || b > 255 || !Math.ceil(b)) {
            throw "Blue chanel parameter is not valid";
        }
        if (a < 0 || a > 1) {
            throw "Alpha chanel parameter is not valid";
        }
        this.gridColor = "rgba(" + Math.ceil(r) + ", " + Math.ceil(g) + ", " + Math.ceil(b) + ", " + a + ")";
    }
    //------- render methods
    /**
     * 
     */
    drawLine(x0, y0, xf, yf) {

    }
    /**
     * 
     */
    writeGridNumbers() {

    }
    /**
     * 
     */
    drawGrid() {
        
    }
    /**
     * 
     */
    clearAll() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
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
}