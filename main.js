import { randomIntFromRange, randomColor } from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const colors = ["#FF00FF", "#00FFFF", "#00FF00", "#FF0000"];

const gravity = 1;
const friction = 0.99;

// Ball class
class Ball {
  constructor({ x, y, dx, dy, radius, color, text }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
    this.text = text;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();

    // Draw text
    c.fillStyle = "white";
    c.font = `${this.radius}px Arial`;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(this.text, this.x, this.y);
  }

  update() {
    this.draw();

    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
      this.dx = -this.dx * friction;
    }

    if (this.y + this.radius + this.dy >= canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}

// Implementation
let balls;
let specialBall; // To track the special ball

function init() {
  balls = [];

  for (let i = 0; i < 50; i++) {
    // Reduced to 49 balls to have one special ball
    const radius = randomIntFromRange(30, 50);
    const x = randomIntFromRange(radius, canvas.width - radius);
    const y = randomIntFromRange(0, canvas.height - radius);
    const dx = randomIntFromRange(-3, 3);
    const dy = randomIntFromRange(-3, 3);
    const color = randomColor(colors);
    const text = ""; // Empty text for normal balls

    balls.push(new Ball({ x, y, dx, dy, radius, color, text }));
  }

  // Create special ball
  const specialRadius = randomIntFromRange(30, 50);
  const specialX = randomIntFromRange(
    specialRadius,
    canvas.width - specialRadius
  );
  const specialY = randomIntFromRange(
    specialRadius,
    canvas.height - specialRadius
  );
  const specialDx = randomIntFromRange(-3, 3);
  const specialDy = randomIntFromRange(-3, 3);
  const specialColor = randomColor(colors);

  specialBall = new Ball({
    x: specialX,
    y: specialY,
    dx: specialDx,
    dy: specialDy,
    radius: specialRadius,
    color: specialColor,
    text: "Click me", // Special text
  });

  balls.push(specialBall);
}

// Click event listener
canvas.addEventListener("click", (event) => {
  const clickX = event.clientX - canvas.getBoundingClientRect().left;
  const clickY = event.clientY - canvas.getBoundingClientRect().top;

  // Check if click is inside the special ball
  if (
    clickX > specialBall.x - specialBall.radius &&
    clickX < specialBall.x + specialBall.radius &&
    clickY > specialBall.y - specialBall.radius &&
    clickY < specialBall.y + specialBall.radius
  ) {
    // Redirect to about.html
    window.location.href = "who.html";
  }
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball) => {
    ball.update();
  });
}

// Initialize and start animation
init();
animate();
