const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Galaxy Setup
const particlesCount = 12000;
const particlesGeometry = new THREE.BufferGeometry();
const posArray = new Float32Array(particlesCount * 3);
const colors = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;
    const radius = Math.random() * 25;
    const spinAngle = radius * 4 + Math.random() * Math.PI * 2;
    const branchAngle = (i % 4) * (Math.PI * 2 / 4);

    posArray[i3] = Math.cos(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 3;
    posArray[i3 + 1] = (Math.random() - 0.5) * 6;
    posArray[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 3;

    colors[i3] = Math.random() * 0.6 + 0.4; // Red
    colors[i3 + 1] = Math.random() * 0.4 + 0.2; // Green
    colors[i3 + 2] = Math.random() * 0.9 + 0.5; // Blue
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
});

const galaxy = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(galaxy);

camera.position.set(0, 6, 20);
camera.lookAt(0, 0, 0);

function animate() {
    requestAnimationFrame(animate);
    galaxy.rotation.y += 0.0015;
    galaxy.rotation.x += 0.0005;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});