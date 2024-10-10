const PI2 = Math.PI * 2;
const CANVAS = document.getElementById("lienzo");
const CTX = CANVAS.getContext("2d");
CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;

function updateCanvasSize() {
  CANVAS.width = CANVAS.getBoundingClientRect().width;
  CANVAS.height = CANVAS.getBoundingClientRect().height;
}

function drawCircle(x, y,color) {
    CTX.fillStyle = color;
    CTX.beginPath();
    CTX.ellipse(x, y, 5, 5, 0, 0, PI2);
    CTX.fill();
}

function frame (){
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    let Circle1 = 0;
    let Circle2 = 0;
    let whileCounterX = 0;
    let whileCounterY = 0;

    const gap= 10; 

    //Columnas: 
    while (Circle1 < CANVAS.width) {
        Circle2 =0;
        whileCounterY = 0;

    //filas
    while (Circle2 < CANVAS.height) {
        //Alternar colores: boolean 
        //if else
        const color= (whileCounterX + whileCounterY) % 2 === 0 ? "red" : "blue";
        drawCircle (Circle1, Circle2, color);

        Circle2=whileCounterY*gap;
        whileCounterY++; 

 
        }
        Circle1 = whileCounterX * gap;
        whileCounterX++;
    }
    requestAnimationFrame(frame);
}





window.addEventListener("resize", updateCanvasSize);
requestAnimationFrame(frame);


