import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Debug
 */
const gui = new GUI();





/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

// Scene
const scene = new THREE.Scene()

const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/4/px.png',
    '/textures/environmentMaps/4/nx.png',
    '/textures/environmentMaps/4/py.png',
    '/textures/environmentMaps/4/ny.png',
    '/textures/environmentMaps/4/pz.png',
    '/textures/environmentMaps/4/nz.png'
])

/**
 * Objects
 */
const material = new THREE.MeshStandardMaterial();
material.metalness = 1
material.roughness = 0

material.envMap = environmentMapTexture;
material.envMapIntensity = 1;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = .05;
// material.wireframe = false;

// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.1, 0.1);

// material.alphaMap = doorAlphaTexture;
// material.transparent = true;


gui.add(material, "metalness").min(0).max(1).step(.01);
gui.add(material, 'roughness').min(0).max(1).step(.01);
gui.add(material, 'aoMapIntensity').min(1).max(10).step(1);
gui.add(material, 'wireframe');
gui.add(material, 'displacementScale').min(0).max(0.5).step(.001);



// const material = new THREE.MeshLambertMaterial()
// const material = new THREE.MeshNormalMaterial()
// const material = new THREE.MeshDepthMaterial()
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture
// const material = new THREE.MeshBasicMaterial({color: 'whtie'})
// material.map = doorColorTexture
// material.alphaMap = doorAlphaTexture
// material.wireframe = true
// material.flatShading = true
// material.opacity = 0.5
// material.transparent = true
// material.side = THREE.DoubleSide

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, .2, 64, 128),
    material
)
torus.position.x = 1.5

plane.geometry.setAttribute("uv2", new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))
sphere.geometry.setAttribute("uv2", new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
torus.geometry.setAttribute("uv2", new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))


scene.add(plane, sphere, torus)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // sphere.rotation.y = elapsedTime * .1
    // plane.rotation.y = elapsedTime * .1
    // torus.rotation.y = elapsedTime * .1

    // sphere.rotation.x = elapsedTime * .15
    // plane.rotation.x = elapsedTime * .15
    // torus.rotation.x = elapsedTime * .15

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()