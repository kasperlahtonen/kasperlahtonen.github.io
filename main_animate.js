// Scene, Camera, Renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // Improve sharpness on high-res displays
renderer.shadowMap.enabled = true;  // Enable shadows
renderer.shadowMap.type = THREE.PCFSoftShadowMap;  // Optional for softer shadows
document.getElementById('model-container').appendChild(renderer.domElement);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 10);
directionalLight.castShadow = true;  // Enable shadow casting
scene.add(directionalLight);

// OrbitControls for interaction
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Disable zooming
controls.enableZoom = false;

let model;
let isRotating = false;

// Load your GLB model
const loader = new THREE.GLTFLoader();
loader.load(
  'assets/necker-cube-single.glb',
  function (gltf) {
    model = gltf.scene;
    scene.add(model);

    // Optional adjustments
    model.position.set(0, 0, 0);
    model.scale.set(0.006, 0.006, 0.006);
    // model.rotation.set(0.4071, 3.703, -0.075);
    model.rotation.set(0.3971, 3.7184, -0.0751);  

    // Center the camera
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    controls.target.copy(center);
    camera.position.set(center.x, center.y, center.z + 6);

    // Add click event to toggle rotation
    document.getElementById("model-container").addEventListener("click", () => {
      isRotating = !isRotating; // Toggle rotation state
    });


  },
  undefined,
  function (error) {
    console.error('An error occurred while loading the GLB model:', error);
  }
);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);





// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // Rotate model if rotation is enabled
  if (isRotating && model) {
    model.rotation.y += 0.03; // Adjust speed of rotation
  }

  renderer.render(scene, camera);
}


animate();





