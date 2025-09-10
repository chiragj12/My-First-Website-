// — Dark Mode Toggle —
const toggle = document.getElementById('toggle-theme');
const bodyEl = document.body;

// initialize
if (localStorage.getItem('theme') === 'dark') {
  bodyEl.classList.add('dark-mode');
  toggle.checked = true;
}

toggle.addEventListener('change', () => {
  bodyEl.classList.toggle('dark-mode');
  localStorage.setItem(
    'theme',
    bodyEl.classList.contains('dark-mode') ? 'dark' : 'light'
  );
});

// — Modal Logic —
const modal = document.getElementById('modal');
const titleEl = document.getElementById('modal-title');
const descEl = document.getElementById('modal-description');
const closeBtn = document.querySelector('.close-btn');

const projects = {
  1: { title: 'Project One', description: 'Details about Project One.' },
  2: { title: 'Project Two', description: 'Details about Project Two.' },
  3: { title: 'Project Three', description: 'Details about Project Three.' }
};

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.dataset.project;
    titleEl.textContent = projects[id].title;
    descEl.textContent = projects[id].description;
    modal.classList.remove('hidden');
  });
});
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
window.addEventListener('click', e => {
  if (e.target === modal) modal.classList.add('hidden');
});

// — Floating Color Bubbles —
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, bubbles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Bubble class
class Bubble {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * W;
    this.y = H + Math.random() * 200;
    this.radius = 10 + Math.random() * 30;
    this.speed = 0.5 + Math.random() * 1.5;
    this.alpha = 0.1 + Math.random() * 0.3;
    this.color = `hsla(${Math.random()*360}, 70%, 60%, ${this.alpha})`;
  }
  update() {
    this.y -= this.speed;
    if (this.y < -this.radius) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// create bubbles
for (let i = 0; i < 50; i++) bubbles.push(new Bubble());

// animate
function animate() {
  ctx.clearRect(0, 0, W, H);
  bubbles.forEach(b => {
    b.update();
    b.draw();
  });
  requestAnimationFrame(animate);
}
animate();
