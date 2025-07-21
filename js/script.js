// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
  }
});

// Contact form handling
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // Simple validation
  if (name && email && message) {
    alert("Thank you for your message! I will get back to you soon.");
    contactForm.reset();
  } else {
    alert("Please fill in all fields.");
  }
});

//three js setup
const canvas = document.querySelector("#three-canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Transparent background
canvas.appendChild(renderer.domElement);

// Create multiple rotating cubes
const cubes = [];
const colors = [0xda627d, 0xfca311, 0xffffff, 0xc9ada7, 0x22223b ,0xfca311, 0xffffff, 0x45b7d1, 0xcee6c4d, 0xffeaa7];

for (let i = 0; i < 9; i++) {
  const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
  const material = new THREE.MeshLambertMaterial({
    color: colors[i],
    transparent: true,
    opacity: 0.8,
  });
  const cube = new THREE.Mesh(geometry, material);

  // Random positions
  cube.position.x = (Math.random() - 0.5) * 25;
  cube.position.y = (Math.random() - 0.5) * 10;
  cube.position.z = (Math.random() - 0.1) * 10;

  scene.add(cube);
  cubes.push(cube);
}

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

camera.position.z = 15;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  cubes.forEach((cube, index) => {
    cube.rotation.x += 0.01 * (index + 1);
    cube.rotation.y += 0.01 * (index + 1);

    // Floating animation
    cube.position.y += Math.sin(Date.now() * 0.001 + (index-0.5)) * 0.002;
  });

  renderer.render(scene, camera);
}
animate();
