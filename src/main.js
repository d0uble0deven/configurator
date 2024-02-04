import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import GUI from 'lil-gui';

/* Base */

// Debug
const gui = new GUI();

const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

console.log('gui: ', gui)
console.log('canvas: ', canvas)
console.log('scene: ', scene)
console.log('camera: ', camera)
console.log('renderer: ', renderer)


// Function to change the size of the cube
function changeSizeOfCube() {
    let sizeValue;
    
    // Set sizeValue based on the selected option
    switch (debugObject.size) {
      case 'Small':
        sizeValue = 0.5;
        break;
      case 'Medium':
        sizeValue = 1;
        break;
      case 'Large':
        sizeValue = 1.5;
        break;
      default:
        sizeValue = 1;
    }
  
    // Update the scale of the cube
    cube.scale.set(sizeValue, sizeValue, sizeValue);
  }
/* Test Cube */
// let colorBox = new THREE.Color(0xaa00ff)
debugObject.color  = new THREE.Color('#e20303')
debugObject.size = 'Medium'


const geometryCube = new THREE.BoxGeometry(1, 1, 1)
const materialCube = new THREE.MeshBasicMaterial( {color: debugObject.color })
const cube = new THREE.Mesh(geometryCube, materialCube)
scene.add(cube)
camera.position.z = 5
// camera.position.y = 5
// camera.rotateX( - Math.PI / 4)

gui.add(debugObject, 'size', [ 'Small', 'Medium', 'Large' ])
.onChange(() => changeSizeOfCube())
changeSizeOfCube();

gui.addColor( debugObject, 'color' )
.onChange(() => {
    // colorBox = colorInput
    materialCube.color.set(debugObject.color)
    console.log('onChange - materialCube: ', debugObject.color)
});

gui.add(materialCube, 'wireframe');

gui.add(cube.position, 'x')
.min(-5).max(5).step(0.01).name('slide cube')

gui.add(cube.position, 'y')
.min(-5).max(5).step(0.01).name('elevate cube')

gui.add(cube.position, 'z')
.min(-5).max(5).step(0.01).name('focus cube')


// gui.add(debugObject, 'size', [ 'Small', 'Medium', 'Large' ]);
// gui.add(geometry, 'size', 0, 1);
//  [ 'Small', 'Medium', 'Large' ] 


console.log('geometryCube: ', geometryCube)
console.log('materialCube: ', materialCube)
console.log('cube: ', cube)


/* Floor */
const planeFloor = new THREE.PlaneGeometry(2, 2, 8, 8)
const materialFloor = new THREE.MeshBasicMaterial( {color: 'blue',  side: THREE.DoubleSide} )
const floor = new THREE.Mesh(planeFloor, materialFloor)
// floor.position.x = 1
floor.position.y = -1
// floor.position.z = 0
floor.rotateX( - Math.PI / 2)
scene.add(floor)


/* Ceiling */
const planeCeiling = new THREE.PlaneGeometry(2, 2, 8, 8)
const materialCeiling = new THREE.MeshBasicMaterial( {color: 'orange',  side: THREE.DoubleSide} )
const ceiling = new THREE.Mesh(planeCeiling, materialCeiling)
// ceiling.position.x = 1
ceiling.position.y = 1
// ceiling.position.z = 0
ceiling.rotateX( - Math.PI / 2)
scene.add(ceiling)



/* Back Wall */
const planeBackWall = new THREE.PlaneGeometry(2, 2, 8, 8)
const materialBackWall = new THREE.MeshBasicMaterial( {color: 'green',  side: THREE.DoubleSide} )
const backWall = new THREE.Mesh(planeBackWall, materialBackWall)
// wall.position.x = 1
// wall.position.y = 1
backWall.position.z = -1
// wall.rotateY( Math.PI / 2)
scene.add(backWall)


/* Left Wall */
const planeLeftWall = new THREE.PlaneGeometry(2, 2, 8, 8)
const materialLeftWall = new THREE.MeshBasicMaterial( {color: 'yellow',  side: THREE.DoubleSide} )
const leftWall = new THREE.Mesh(planeLeftWall, materialLeftWall)
leftWall.position.x = 1
// leftWall.position.y = 1
// leftWall.position.z = -1
leftWall.rotateY( - Math.PI / 2)
scene.add(leftWall)

/* Right Wall */
const planeRightWall = new THREE.PlaneGeometry(2, 2, 8, 8)
const materialRightWall = new THREE.MeshBasicMaterial( {color: 'purple',  side: THREE.DoubleSide} )
const rightWall = new THREE.Mesh(planeRightWall, materialRightWall)
rightWall.position.x = -1
// rightWall.position.y = 1
// rightWall.position.z = -1
rightWall.rotateY( Math.PI / 2)
scene.add(rightWall)






/* Animate Camera */
function animate(){
    requestAnimationFrame(animate) // without this it is just a snapshot of the cube on initial render
    renderer.render(scene, camera)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
}

animate();

