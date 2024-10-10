const PI2 = Math.PI * 2;
const CANVAS = document.getElementById("lienzo");
const CTX = CANVAS.getContext("2d");
CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;

function updateCanvasSize() {
  CANVAS.width = CANVAS.getBoundingClientRect().width;
  CANVAS.height = CANVAS.getBoundingClientRect().height;
}

// Circle object constructor
class Circle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw() {
        CTX.fillStyle = this.color;
        CTX.beginPath();
        CTX.ellipse(this.x, this.y, 5, 5, 0, 0, PI2);
        CTX.fill();
    }
}

const circles = []; // Array to store circle objects
let numberOfCircles = 1000; // Total number of circles
const spiralSpacing = 5; // Distance between circles in the spiral
const angleIncrement = 0.1; // Controls the "tightness" of the spiral

// Initialize circles array for a spiral composition
function initializeSpiral() {
    let angle = 0; 
    let radius = 0;
    const centerX = CANVAS.width / 2;
    const centerY = CANVAS.height / 2;
    let i = 0;

    while (i < numberOfCircles) {
        // Inside the `while`, we use a `for` loop for added control over circle creation
        for (let j = 0; j < 10; j++) { // Batch 10 circles at a time within the while loop
            let x = centerX + radius * Math.cos(angle);
            let y = centerY + radius * Math.sin(angle);

            // Only add circles within the canvas bounds
            if (x > 0 && x < CANVAS.width && y > 0 && y < CANVAS.height) {
                const color = i % 2 === 0 ? "red" : "blue";
                circles.push(new Circle(x, y, color));
            }

            // Update angle and radius for the spiral pattern
            angle += angleIncrement;
            radius += spiralSpacing / (2 * Math.PI);
            i++; // Increment the circle count
        }
    }
}

// Frame animation
function frame() {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    circles.forEach(circle => circle.draw()); // Draw all circles from the array
    requestAnimationFrame(frame);
}

// Initialize and start animation
initializeSpiral();
frame();
