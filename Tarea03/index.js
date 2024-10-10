const PI2 = Math.PI * 2;
const CANVAS = document.getElementById("lienzo");
const CTX = CANVAS.getContext("2d");
CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;

function updateCanvasSize() {
    CANVAS.width = CANVAS.getBoundingClientRect().width;
    CANVAS.height = CANVAS.getBoundingClientRect().height;
}

function getRandomColor(){
    const letters = '123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color;
}

class Circulo {
    constructor(params = {}) {
        this.borderColor = params.borderColor || getRandomColor();
        this.borderWidth = 15;
        this.radiusX = 30;
        this.radiusY = 30;
        this.width = this.radiusX * 2;
        this.distanceX = 30;

        this.x = params.x || this.radiusX;
        this.y = params.y || this.radiusY;

        // Random speed for both x and y to allow diagonal bouncing
        this.speed = {
            x: (Math.random() - 0.5) * 5, // Random speed between -2.5 and 2.5
            y: (Math.random() - 0.5) * 5 // Random speed between -2.5 and 2.5
        }
    }

    updatePosition() {
        this.x += this.speed.x;
        this.y += this.speed.y;

        // Check for collision with the canvas edges and reverse direction
        if (this.x + this.radiusX > CANVAS.width || this.x - this.radiusX < 0) {
            this.speed.x *= -1; // Reverse x direction
        }

        if (this.y + this.radiusY > CANVAS.height || this.y - this.radiusY < 0) {
            this.speed.y *= -1; // Reverse y direction
        }
    }

    draw() {
        CTX.strokeStyle = this.borderColor;
        CTX.lineWidth = this.borderWidth;
        CTX.beginPath();
        CTX.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, PI2);
        CTX.closePath();
        CTX.stroke();

        this.updatePosition();
    }
}

let listaDeCirculos = [];
let rightEdgeOfLastCircle = 0; // Initialize the variable to track the last circle's edge

while (rightEdgeOfLastCircle < CANVAS.width) {
    let nuevoCirculo = new Circulo({
        x: rightEdgeOfLastCircle
    });
    listaDeCirculos.push(nuevoCirculo);

    rightEdgeOfLastCircle = nuevoCirculo.x + nuevoCirculo.width + nuevoCirculo.distanceX;
}

function render() {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    for (let i = 0; i < listaDeCirculos.length; i++) {
        listaDeCirculos[i].draw();
    }

    requestAnimationFrame(render);
}

window.addEventListener("resize", updateCanvasSize);
requestAnimationFrame(render);

