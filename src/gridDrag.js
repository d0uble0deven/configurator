import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

// import { DragControls } from 'three/addons/controls/DragControls'
import { DragControls } from './modules/DragControls.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



// Canvas
const canvas = document.querySelector('canvas.webgl')


// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap; // default THREE.PCFShadowMap
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );
const ambientLight = new THREE.AmbientLight( 0xffffbb, 0x080820, 1 );
scene.add( ambientLight );


/*
 * Meshes
*/
const geometry = new THREE.BoxGeometry( 5, 5, 5 ); 
const material = new THREE.MeshPhongMaterial( {color: 'blue'} ); 
const cube = new THREE.Mesh( geometry, material ); 
cube.castShadow = true
cube.receiveShadow = true
// scene.add( cube );
cube.position.set(5, 2.5, 7)

const geometryS = new THREE.SphereGeometry( 2.5 ); 
const materialS = new THREE.MeshPhongMaterial( {color: 'yellow'} ); 
const sphere = new THREE.Mesh( geometryS, materialS ); 
sphere.castShadow = true
sphere.receiveShadow = true
// scene.add( cube );
sphere.position.set(-5, 2.5, 5)

const draggableObjects = new THREE.Group()
draggableObjects.add( cube );
draggableObjects.add( sphere );
scene.add( draggableObjects );

let bed
let bedBB

/*
 * Bounding Boxes
*/
let cubeBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
cubeBB.setFromObject(cube)
console.log('cubeBB: ', cubeBB)



let sphereBB = new THREE.Sphere(sphere.position, 1)
console.log('sphereBB: ', sphereBB)


/*
 * Models
*/
const dracoLoader = new DRACOLoader()

dracoLoader.setDecoderPath('/draco/')

// Fox
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

gltfLoader.load(
    '/models/furnitures/furnitures.gltf',
    (furnitures) => {
        console.log('furnitures: ', furnitures)
        console.log('furnitures.children: ', furnitures.scene.children[0].children)
  
        // furnitures.scene.scale.set(200, 115, 115)
        // furnitures.scene.position.set(4.5, 2.5, 8.75)
        // furnitures.scene.rotation.set(0, Math.PI * 2, 0)
        // scene.add(furnitures.scene)
          
        const bedModel = furnitures.scene.children[0].children[2]
        bedModel.scale.set(200, 115, 115)
        bedModel.position.set(0, 0, 0)
        bedModel.rotation.set(0, Math.PI * 2, 0)
        bedModel.name = "bed"
        // draggableObjects.push( bed );
        // scene.add(bed)
        bedModel.material = new THREE.MeshPhongMaterial()
        bedModel.material.color.set('#007FFF')
        bedModel.material.emissive.setRGB(0, 0, 0);
        // bedModel.material.emissive = {'b': 0, 'g': 0,'r': 0, 'isColor': true}

        bed = bedModel

        draggableObjects.add( bed );

        bedBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
        bedBB.setFromObject(bed)
        console.log('bedBB: ', bedBB)

    },
    (progress) => {
        console.log('furnitures: ','progress')
        console.log('furnitures: ', progress)
    },
    (error) => {
        console.log('furnitures: ', 'error')
        console.log('furnitures: ', error)
    }
  )


const gridHelper = new THREE.GridHelper(50, 10, 0x000000, 0xffffff)
scene.add( gridHelper );

// Ground
const groundGeo = new THREE.PlaneGeometry(50, 50)
const groundMat = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
groundGeo.rotateX( - Math.PI / 2)

const ground = new THREE.Mesh( groundGeo, groundMat )
scene.add( ground )
ground.receiveShadow = true


// Set camera position
camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0); 

const orbitControls = new OrbitControls(camera, canvas);

const dragControls = new DragControls(draggableObjects.children, camera, renderer.domElement);

const keyPressed = (e) => {
    switch(e.key) {
      case 'ArrowUp':
        selectedObject.rotateX(Math.PI / 2);
          break;
      case 'ArrowDown':
        selectedObject.rotateX(- Math.PI / 2);
          break;
      case 'ArrowLeft':
        selectedObject.rotateY(- Math.PI / 2);
          break;
      case 'ArrowRight':
        selectedObject.rotateY(Math.PI / 2);
          break;
    }
  }

let selectedObject 

dragControls.addEventListener('dragstart', function(event) {
    selectedObject = event.object
    orbitControls.enabled = false
    
    selectedObject.material.wireframe = true; 
    console.log('selectedObject: ', selectedObject)

    document.body.removeEventListener('keydown', keyPressed);
    document.body.addEventListener('keydown', keyPressed);
})

dragControls.addEventListener('dragend', function(event) {
    orbitControls.enabled = true

    selectedObject.material.wireframe = false; 

})

dragControls.addEventListener('hoveron', function(event) {
    // orbitControls.enabled = true
})
dragControls.addEventListener('hoveroff', function(event) {
    // orbitControls.enabled = true
})

function checkCollisions() {
    console.log('checkCollisions - cube: ', cube)
    console.log('checkCollisions - bed: ', bed)
    console.log('checkCollisions - sphere: ', sphere)

    if (bedBB.intersectsBox(cubeBB)) {
        console.log('bedBB.intersectsBox(cubeBB)')
        cube.material.emissive = new THREE.Color('white')
    } else {
        // cube.material.emissive = {'b': 0, 'g': 0,'r': 0, 'isColor': true}
        cube.material.emissive.setRGB(0, 0, 0);
        
    }
    if (sphereBB.intersectsBox(cubeBB)) {
        console.log('sphereBB.intersectsBox(cubeBB)')
        cube.material.emissive = new THREE.Color('white')
    } else {
        cube.material.emissive.setRGB(0, 0, 0);
    }



    if (cubeBB.intersectsBox(bedBB)) {
        console.log('cubeBB.intersectsBox(bedBB)')
        bed.material.emissive = new THREE.Color('white')
    } else {
        // bed.material.emissive = {'b': 0, 'g': 0,'r': 0, 'isColor': true}
        bed.material.emissive.setRGB(0, 0, 0);
    }
    if (sphereBB.intersectsBox(bedBB)) {
        console.log('sphereBB.intersectsBox(bedBB)')
        bed.material.emissive = new THREE.Color('white')
    } else {
        bed.material.emissive.setRGB(0, 0, 0);
    }



    if (cubeBB.intersectsSphere(sphereBB)) {
        console.log('cubeBB.intersectsBox(sphereBB)')
        sphere.material.emissive = new THREE.Color('white')
    } else {
        sphere.material.emissive.setRGB(0, 0, 0);
    }
    if (bedBB.intersectsSphere(sphereBB)) {
        console.log('bedBB.intersectsSphere(sphereBB)')
        sphere.material.emissive = new THREE.Color('white')
    } else {
        sphere.material.emissive.setRGB(0, 0, 0);
    }



    if (cubeBB.containsBox(bedBB)) {
        cube.scale.y = 3;
    } else {
        cube.scale.y = 1;
    }
    // if (sphereBB.containsSphere(cubeBB)) {
    //     cube.scale.y = 3;
    // } else {
    //     cube.scale.y = 1;
    // }
    // if (cubeBB.containsBox(sphereBB)) {
    //     cube.scale.y = 3;
    // } else {
    //     cube.scale.y = 1;
    // }
    if (bedBB.containsBox(cubeBB)) {
        bed.scale.y = 3;
    } else {
        bed.scale.y = 1;
    }

}


/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

function animate() {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime


    cubeBB.copy(cube.geometry.boundingBox).applyMatrix4(cube.matrixWorld)
    // sphereBB.copy(sphere.geometry.boundingBox).applyMatrix4(sphere.matrixWorld)
    
    if(bed != undefined) {
        bedBB.copy(bed.geometry.boundingBox).applyMatrix4(bed.matrixWorld)
        checkCollisions()
    }


    // Render
    renderer.render(scene, camera)

    // Call animate again on the next frame
    window.requestAnimationFrame(animate)
}

animate()
