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
        // setting points list
        this.points = [];
    }
    //------- configuration methods
    /**
     * 
     */
     setPixelRatio(ratio) {
        if (isNaN(parseFloat(ratio))) {
            throw "Parameter must be a number";
        }
        this.pixelRatio = parseFloat(ratio);
        this.scaleCanvas();
    }
    /**
     * 
     */
    setNumberStep(lenght) {
        if (isNaN(parseFloat(lenght))) {
            throw "Parameter must be a number";
        }
        this.numberStep = parseFloat(lenght);
    }
    /**
     * 
     */
    setPixelStep(lenght) {
        if (isNaN(parseInt(lenght))) {
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
        if (isNaN(parseInt(size))) {
            throw "Parameter must be an integer";
        }
        this.fontSize = parseInt(size);
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
            let pixelCoordinates = this.gridToPixels(point["x"], point["y"]);
            this.drawPoint(pixelCoordinates["x"], pixelCoordinates["y"]);
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
            let pixelCoordinates = {
                "thisPoint": this.gridToPixels(point["x"], point["y"]),
                "nextPoint": this.gridToPixels(arr[(idx + 1)]["x"], arr[(idx + 1)]["y"])
            };
            this.drawLine(pixelCoordinates["thisPoint"]["x"], pixelCoordinates["thisPoint"]["y"], pixelCoordinates["nextPoint"]["x"], pixelCoordinates["nextPoint"]["y"], this.axisColor);
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
        this.ctx.arc(x, y, (this.pixelStep / 10), 0, Math.PI * 2);
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
            this.ctx.fillText((-i / this.pixelStep * this.numberStep), gridWidth - 2, (gridHeight + i));
            this.ctx.fillText((i / this.pixelStep * this.numberStep), gridWidth - 2, (gridHeight - i));
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
        return {"x": (((x / this.numberStep) * this.pixelStep) + this.originX), "y": (this.originY - ((y / this.numberStep) * this.pixelStep))};
    }
    /**
     * 
     */
    pixelsToGrid() {
        return {"x": ((x - originX) / this.pixelStep) * this.numberStep, "y": ((originY - y) / this.pixelStep) * this.numberStep};
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