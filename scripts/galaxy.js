// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Transparent background
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement); // Append to specific container

// Galaxy Parameters
const particlesCount = 10000;
const particlesGeometry = new THREE.BufferGeometry();
const posArray = new Float32Array(particlesCount * 3);
const colors = new Float32Array(particlesCount * 3); // For color variation

for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;
    // Spiral galaxy shape
    const radius = Math.random() * 20;
    const spinAngle = radius * 5 + Math.random() * Math.PI * 2;
    const branchAngle = (i % 3) * (Math.PI * 2 / 3);

    posArray[i3] = Math.cos(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 2;
    posArray[i3 + 1] = (Math.random() - 0.5) * 5; // Height variation
    posArray[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 2;

    // Color variation (nebula-like effect)
    colors[i3] = Math.random() * 0.5 + 0.5; // Red
    colors[i3 + 1] = Math.random() * 0.3 + 0.2; // Green
    colors[i3 + 2] = Math.random() * 0.8 + 0.5; // Blue
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending, // For a glowing effect
});

const galaxy = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(galaxy);

// Camera Position
camera.position.set(0, 5, 15);
camera.lookAt(0, 0, 0);

// Animation
function animate() {
    requestAnimationFrame(animate);
    galaxy.rotation.y += 0.002; // Slow rotation for galaxy
    renderer.render(scene, camera);
}
animate();

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});