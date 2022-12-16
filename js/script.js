$(document).ready(() => {
    // creating plane objects
    var planes = [
        new Plane(document.getElementById("plane0")),
        new Plane(document.getElementById("plane1")),
        new Plane(document.getElementById("plane2")),
        new Plane(document.getElementById("plane3")),
        new Plane(document.getElementById("plane4")),
        new Plane(document.getElementById("plane5")),
        new Plane(document.getElementById("plane6")),
        new Plane(document.getElementById("plane7"))
    ];
    //--- plane 0
    // setting colors
    planes[0].setAxisColor(254, 254, 254, 1);
    planes[0].setGridColor(254, 254, 254, 0.5);
    // drawing grid
    planes[0].drawGrid();
    // adding points
    for (let i = 0; i < 50; i += 0.5) {
        planes[0].addPoint(i, 1.15**i);
        planes[0].addPoint(-i, 1.15**(-i));
    }
    // drawing points
    planes[0].drawPoints();
    //--- plane 1
    // setting colors
    planes[1].setAxisColor(254, 254, 254, 1);
    planes[1].setGridColor(254, 254, 254, 0.5);
    // drawing grid
    planes[1].drawGrid();
    // adding points
    for (let i = 0; i < 50; i += 0.5) {
        planes[1].addPoint(i/1.1*i, i);
        planes[1].addPoint(-i/1.1*i, -i);
    }
    // drawing points
    planes[1].drawPoints();
    //--- plane 2
    // setting colors
    planes[2].setAxisColor(254, 254, 254, 1);
    planes[2].setGridColor(254, 254, 254, 0.5);
    // drawing grid
    planes[2].drawGrid();
    // adding points
    for (let i = 0; i < 50; i += 0.1) {
        planes[2].addPoint(i, i/1.1*i);
        planes[2].addPoint(-i, -i/1.1*(i));
    }
    // drawing points
    planes[2].connectPoints();
    //--- plane 3
    // setting colors
    planes[3].setAxisColor(254, 254, 254, 1);
    planes[3].setGridColor(254, 254, 254, 0.5);
    // setting font
    planes[3].setFont("Unbounded");
    planes[3].setFontSize(16);
    // drawing grid
    planes[3].drawGrid();
    //--- plane 4
    // setting colors
    planes[4].setAxisColor(254, 0, 0, 1);
    planes[4].setGridColor(254, 0, 200, 0.5);
    // drawing grid
    planes[4].drawGrid();
    // adding points
    for (let i = 0; i < 50; i += 0.5) {
        planes[4].addPoint(i, i/(i+1));
        planes[4].addPoint(-i, i/(i-1));
    }
    // drawing points
    planes[4].drawPoints();
    //--- plane 5
    // setting colors
    planes[5].setAxisColor(254, 254, 254, 1);
    planes[5].setGridColor(254, 254, 254, 0.5);
    // setting numberStep
    planes[5].setNumberStep(3);
    // drawing grid
    planes[5].drawGrid();
    // adding points
    for (let i = 0; i < 50; i += 1) {
        planes[5].addPoint(i, 1.15**i);
        planes[5].addPoint(-i, 1.15**(-i));
    }
    // drawing points
    planes[5].connectPoints();
    //--- plane 6
    // setting colors
    planes[6].setAxisColor(254, 254, 254, 1);
    planes[6].setGridColor(254, 254, 254, 0.5);
    // setting pixelStep
    planes[6].setPixelStep(35);
    // drawing grid
    planes[6].drawGrid();
    // adding points
    for (let i = 0.1; i < 10; i += 0.1) {
        planes[6].addPoint(i, 1/i);
        planes[6].addPoint(-i, 1/(-i));
    }
    // drawing points
    planes[6].connectPoints();
    //--- plane 7
    // setting colors
    planes[7].setAxisColor(254, 254, 254, 1);
    planes[7].setGridColor(254, 254, 254, 0.5);
    // setting pixel ratio
    planes[7].setPixelRatio(2);
    // setting pixelStep e numberStep
    planes[7].setPixelStep(30);
    // drawing grid
    planes[7].drawGrid();
    // adding points
    for (let i = 0; i < 50; i += 0.1) {
        planes[7].addPoint(i, i**2.2718);
        planes[7].addPoint(-i, 2.2718**(-i));
    }
    // drawing points
    planes[7].connectPoints();
});