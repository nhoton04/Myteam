
const starCanvas = document.getElementById('starfield');
const starCtx = starCanvas.getContext('2d');
let starWidth, starHeight;
let stars = [];

const techCanvas = document.getElementById('techgrid');
const techCtx = techCanvas.getContext('2d');
let techWidth, techHeight;

function init() {
  resize();
  createStars(150);
  createGrid();
  animate();
}

function resize() {
  starWidth = window.innerWidth;
  starHeight = window.innerHeight;
  starCanvas.width = starWidth;
  starCanvas.height = starHeight;

  techWidth = window.innerWidth;
  techHeight = window.innerHeight;
  techCanvas.width = techWidth;
  techCanvas.height = techHeight;
}

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * starWidth,
      y: Math.random() * starHeight,
      radius: Math.random() * 1.2 + 0.3,
      alpha: Math.random(),
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      twinkleDirection: Math.random() > 0.5 ? 1 : -1,
    });
  }
}

let gridPoints = [];
const gridSpacing = 80;

function createGrid() {
  gridPoints = [];
  for (let x = 0; x <= techWidth; x += gridSpacing) {
    for (let y = 0; y <= techHeight; y += gridSpacing) {
      gridPoints.push({ x, y, alpha: Math.random() * 0.5 + 0.3, direction: 1 });
    }
  }
}

function animate() {
  // Animate stars
  starCtx.clearRect(0, 0, starWidth, starHeight);
  stars.forEach(star => {
    star.x += star.dx;
    star.y += star.dy;

    if (star.x < 0) star.x = starWidth;
    else if (star.x > starWidth) star.x = 0;
    if (star.y < 0) star.y = starHeight;
    else if (star.y > starHeight) star.y = 0;

    star.alpha += star.twinkleSpeed * star.twinkleDirection;
    if (star.alpha <= 0) {
      star.alpha = 0;
      star.twinkleDirection = 1;
    } else if (star.alpha >= 1) {
      star.alpha = 1;
      star.twinkleDirection = -1;
    }

    starCtx.beginPath();
    starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    starCtx.fillStyle = `rgba(100, 255, 218, ${star.alpha})`;
    starCtx.shadowColor = 'rgba(100, 255, 218, 0.7)';
    starCtx.shadowBlur = 8;
    starCtx.fill();
  });

  // Animate tech grid
  techCtx.clearRect(0, 0, techWidth, techHeight);
  techCtx.strokeStyle = 'rgba(91, 192, 190, 0.15)';
  techCtx.lineWidth = 1;
  techCtx.shadowColor = 'rgba(91, 192, 190, 0.3)';
  techCtx.shadowBlur = 8;

  // Draw vertical lines
  for (let x = 0; x <= techWidth; x += gridSpacing) {
    techCtx.beginPath();
    techCtx.moveTo(x, 0);
    techCtx.lineTo(x, techHeight);
    techCtx.stroke();
  }

  // Draw horizontal lines
  for (let y = 0; y <= techHeight; y += gridSpacing) {
    techCtx.beginPath();
    techCtx.moveTo(0, y);
    techCtx.lineTo(techWidth, y);
    techCtx.stroke();
  }

  // Draw glowing points
  gridPoints.forEach(point => {
    point.alpha += 0.005 * point.direction;
    if (point.alpha >= 1) {
      point.alpha = 1;
      point.direction = -1;
    } else if (point.alpha <= 0.3) {
      point.alpha = 0.3;
      point.direction = 1;
    }
    techCtx.beginPath();
    techCtx.arc(point.x, point.y, 4, 0, Math.PI * 2);
    techCtx.fillStyle = `rgba(91, 192, 190, ${point.alpha})`;
    techCtx.shadowColor = `rgba(91, 192, 190, ${point.alpha})`;
    techCtx.shadowBlur = 12;
    techCtx.fill();
  });

  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  resize();
  createStars(150);
  createGrid();
});

init();
