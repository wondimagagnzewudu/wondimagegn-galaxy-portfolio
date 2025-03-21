// Ensure Three.js is loaded
if (typeof THREE === 'undefined') {
    console.error('Three.js is not loaded. Check the script source.');
} else {
    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // Galaxy Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 10000; // Increased for a denser galaxy
    const posArray = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3); // For color variation

    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Spiral galaxy shape
        const radius = Math.random() * 10;
        const angle = Math.random() * Math.PI * 2;
        const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 2;
        const y = Math.sin(angle) * radius + (Math.random() - 0.5) * 2;
        const z = (Math.random() - 0.5) * 2;

        posArray[i] = x;
        posArray[i + 1] = y;
        posArray[i + 2] = z;

        // Random colors for stars (white, blue, red hues)
        colors[i] = Math.random() > 0.8 ? 1 : Math.random();     // R
        colors[i + 1] = Math.random() > 0.8 ? 1 : Math.random(); // G
        colors[i + 2] = Math.random() > 0.5 ? 1 : Math.random(); // B
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
    });

    const galaxy = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(galaxy);

    // Camera Position
    camera.position.z = 15;

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        galaxy.rotation.y += 0.001; // Slow rotation for galaxy effect
        renderer.render(scene, camera);
    }
    animate();

    // Handle Window Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}