/**
 * 🌌 Minimalistic 3D Background Animation using Three.js
 * 
 * Creates a subtle, floating geometric landscape.
 */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bg-canvas');

    if (!canvas) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true, // Transparent background
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // PARTICLES / GEOMETRY
    const geometry = new THREE.IcosahedronGeometry(1.5, 1); // Radius, Detail
    const material = new THREE.MeshBasicMaterial({
        color: 0x2563EB, // Primary Blue
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });

    // Create multiple shapes
    const shapes = [];

    // Main large shape
    const mainShape = new THREE.Mesh(geometry, material);
    mainShape.position.set(2, 0, -2);
    mainShape.scale.set(2, 2, 2);
    scene.add(mainShape);
    shapes.push(mainShape);

    // Secondary smaller shape
    const secondaryGeometry = new THREE.IcosahedronGeometry(1, 0);
    const secondaryMaterial = new THREE.MeshBasicMaterial({
        color: 0xDB2777, // Secondary Pink
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    const secondShape = new THREE.Mesh(secondaryGeometry, secondaryMaterial);
    secondShape.position.set(-3, 2, -4);
    scene.add(secondShape);
    shapes.push(secondShape);

    // Third shape
    const thirdShape = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        color: 0xD97706, // Accent Amber
        wireframe: true,
        transparent: true,
        opacity: 0.1
    }));
    thirdShape.position.set(3, -3, -3);
    thirdShape.scale.set(0.8, 0.8, 0.8);
    scene.add(thirdShape);
    shapes.push(thirdShape);

    // CAMERA POSITION
    camera.position.z = 5;

    // ANIMATION LOOP
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    const animate = () => {
        requestAnimationFrame(animate);

        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        // Smooth rotation based on mouse
        mainShape.rotation.y += 0.05 * (targetX - mainShape.rotation.y);
        mainShape.rotation.x += 0.05 * (targetY - mainShape.rotation.x);

        // Constant slow rotation
        mainShape.rotation.z += 0.002;

        // Animate other shapes
        secondShape.rotation.x -= 0.003;
        secondShape.rotation.y -= 0.003;

        thirdShape.rotation.x += 0.002;
        thirdShape.rotation.z -= 0.002;

        renderer.render(scene, camera);
    };

    animate();

    // RESIZE HANDLER
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
