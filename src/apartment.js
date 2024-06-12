import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/addons/controls/DragControls'

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

const draggableObjects = []


/* 
    Lights
*/
// Entrance Light
const entranceLight = new THREE.PointLight('#FFFFE0', 10, 25, 2);
entranceLight.position.set( -2, 1.5, 9.8 );
entranceLight.castShadow = true

//Set up shadow properties for the light
entranceLight.shadow.mapSize.width = 512; // default
entranceLight.shadow.mapSize.height = 512; // default
entranceLight.shadow.camera.near = 0.5; // default
entranceLight.shadow.camera.far = 500; // default

scene.add( entranceLight );

// Office Light
const officeLight = new THREE.PointLight('#FFFFE0', 10, 25, 2);
officeLight.position.set( -6, 3, -3 );
officeLight.castShadow = true
scene.add( officeLight );

// Bedroom Light
const bedroomLight = new THREE.PointLight('#FFFFE0', 10, 25, 2);
bedroomLight.position.set(2.5, 3, -10)
bedroomLight.castShadow = true
scene.add( bedroomLight );

// Kitchen Light
const kitchenLight = new THREE.PointLight('#FFFFE0', 10, 25, 2);
kitchenLight.position.set( 3, 3, -3 );
kitchenLight.castShadow = true
scene.add( kitchenLight );

// Bathroom Light
const bathroomLight = new THREE.PointLight('#FFFFE0', 10, 25, 2);
bathroomLight.position.set(-7, 1.5, -8);
bathroomLight.castShadow = true
scene.add( bathroomLight );

// Living Room Window Light
const livingRoomWindowLight = new THREE.SpotLight('#FFFFE0');
livingRoomWindowLight.position.set( 1.9, 2, 10 );
livingRoomWindowLight.castShadow = true
livingRoomWindowLight.power = 100
livingRoomWindowLight.shadow.mapSize.width = 1024;
livingRoomWindowLight.shadow.mapSize.height = 1024;
livingRoomWindowLight.shadow.camera.near = 500;
livingRoomWindowLight.shadow.camera.far = 4000;
livingRoomWindowLight.shadow.camera.fov = 30;
scene.add( livingRoomWindowLight );

// Bed Room Window Light
const bedroomWindowLight = new THREE.SpotLight('#FFFFE0');
bedroomWindowLight.position.set( -2.9, 2, -14.9 );
bedroomWindowLight.castShadow = true
livingRoomWindowLight.angle = Math.PI/2
bedroomWindowLight.power = 100
bedroomWindowLight.shadow.mapSize.width = 1024;
bedroomWindowLight.shadow.mapSize.height = 1024;
bedroomWindowLight.shadow.camera.near = 500;
bedroomWindowLight.shadow.camera.far = 4000;
bedroomWindowLight.shadow.camera.fov = 30;
scene.add( bedroomWindowLight );

// Define materials and geometries
const wallMaterial = new THREE.MeshPhongMaterial({ color: '#EEE6D9', side: THREE.DoubleSide });
const floorMaterial = new THREE.MeshPhongMaterial({ color: '#C4A484', side: THREE.DoubleSide });
const ceilingMaterial = new THREE.MeshPhongMaterial({ transparent: true, opacity: 0, wireframe: false, side: THREE.DoubleSide });

const roomMaterials = [ wallMaterial, wallMaterial, ceilingMaterial, floorMaterial, wallMaterial, wallMaterial ]

const doorMaterial = new THREE.MeshPhongMaterial({ color: '#A26A42' });

const entranceWayMaterial = new THREE.MeshPhongMaterial({ color: 'black', transparent: true, opacity: 0.1, });

const windowMaterial = new THREE.MeshPhongMaterial({ color: 0xADD8E6, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });

// Cabinets materials
const woodMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513, side: THREE.DoubleSide });

// Dog pen materials
const penWallMaterial = new THREE.MeshPhongMaterial({ color: 'black', transparent: true, opacity: 0.5, side: THREE.DoubleSide });

// Painting material
const paintingMaterialsRed = new THREE.MeshPhongMaterial({ color: '#65000B'  })
const paintingMaterialsGreen = new THREE.MeshPhongMaterial({ color: '#043927'  })
const paintingMaterialsBlue = new THREE.MeshPhongMaterial({ color: '#041E42'  })




// Function to create a wall
function createWall(width, height, depth, material) {
  const wall = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
  scene.add(wall); 
  wall.receiveShadow = true

  return wall;
}

// Function to create a room
function createRoom(width, height, depth, material) {
  const room = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
  scene.add(room); 
  room.receiveShadow = true
//   room.castShadow = true

  return room;
}

// Function to create kitchen
function createKitchen(width, height, depth, material) {
    const counter = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
    scene.add(counter); 
    counter.castShadow = true
    
    return counter;
}

// Function to create a window
function createWindow(width, height, depth, material) {
  const windowFrame = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
  scene.add(windowFrame);
  windowFrame.receiveShadow = true
  windowFrame.castShadow = true

  return windowFrame;
}

// Function to create a door
function createDoor(width, height, depth, material) {
  const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
  scene.add(doorFrame);
  doorFrame.receiveShadow = true
  doorFrame.castShadow = true

  return doorFrame;
}

// Function to create an indoor dog pen
function createIndoorDogPen() {
  const indoorDogPen = new THREE.Group();

  // Create the walls
  const penWallGeometry = new THREE.BoxGeometry(3, 3, 0.1);
  const leftWall = new THREE.Mesh(penWallGeometry, penWallMaterial);
  const rightWall = new THREE.Mesh(penWallGeometry, penWallMaterial);
  const backWall = new THREE.Mesh(penWallGeometry, penWallMaterial);
  const frontWall = new THREE.Mesh(penWallGeometry, penWallMaterial);

  leftWall.position.set(-1.5, 0, 0);
  rightWall.position.set(1.5, 0, 0);
  backWall.position.set(0, 0, -1.5);
  frontWall.position.set(0, 0, 1.5);

  leftWall.rotateY(Math.PI / 2)
  rightWall.rotateY(Math.PI / 2)

  indoorDogPen.add(leftWall, rightWall, backWall, frontWall);

  indoorDogPen.receiveShadow = true
  indoorDogPen.castShadow = true


  return indoorDogPen;
}

// Function to create a large painting 
function createLargePainting(color) {
  const painting = new THREE.Group();

  // Create painting surface
  const paintingSurfaceGeometry = new THREE.BoxGeometry(1, 0.1, 2); // 6, 0.1, 3
  const paintingSurface = new THREE.Mesh(paintingSurfaceGeometry, color);
  paintingSurface.rotateX(Math.PI / 2)
  painting.add(paintingSurface);

  // Create frame
  const horizontalFrameGeometry = new THREE.BoxGeometry(0.1, 0.1, 1);
  const topFrame = new THREE.Mesh(horizontalFrameGeometry, woodMaterial);
  const bottomFrame = new THREE.Mesh(horizontalFrameGeometry, woodMaterial);

  const verticalFrameGeometry = new THREE.BoxGeometry(0.1, 0.1, 2.1);
  const leftFrame = new THREE.Mesh(verticalFrameGeometry, woodMaterial);
  const rightFrame = new THREE.Mesh(verticalFrameGeometry, woodMaterial);

  topFrame.position.set(0, 1.01, 0);
  bottomFrame.position.set(0, -1.01, 0);
  leftFrame.position.set(-0.51, 0, 0);
  rightFrame.position.set(0.51, 0, 0);

  topFrame.rotateY(Math.PI / 2)
  bottomFrame.rotateY(Math.PI / 2)

  leftFrame.rotateX(Math.PI / 2)
  rightFrame.rotateX(Math.PI / 2)


  painting.add(topFrame, bottomFrame, leftFrame, rightFrame);

  return painting
}

// Function to create a small painting 
function createSmallPainting(color) {
  const painting = new THREE.Group();

  // Create painting surface
  const paintingSurfaceGeometry = new THREE.BoxGeometry(0.7, 0.1, 0.7); // 6, 0.1, 3
  const paintingSurface = new THREE.Mesh(paintingSurfaceGeometry, color);
  paintingSurface.rotateX(Math.PI / 2)
  painting.add(paintingSurface);

  // Create frame
  const horizontalFrameGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.8);
  const topFrame = new THREE.Mesh(horizontalFrameGeometry, woodMaterial);
  const bottomFrame = new THREE.Mesh(horizontalFrameGeometry, woodMaterial);

  const verticalFrameGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.8);
  const leftFrame = new THREE.Mesh(verticalFrameGeometry, woodMaterial);
  const rightFrame = new THREE.Mesh(verticalFrameGeometry, woodMaterial);

  topFrame.position.set(0, 0.37, 0);
  bottomFrame.position.set(0, -0.37, 0);
  leftFrame.position.set(-0.37, 0, 0);
  rightFrame.position.set(0.37, 0, 0);

  topFrame.rotateY(Math.PI / 2)
  bottomFrame.rotateY(Math.PI / 2)

  leftFrame.rotateX(Math.PI / 2)
  rightFrame.rotateX(Math.PI / 2)


  painting.add(topFrame, bottomFrame, leftFrame, rightFrame);

  return painting
}

// Create living room with office space
const livingRoom = createRoom(15, 5, 15, roomMaterials);
livingRoom.position.set(0, 0, 2.5);

// Create kitchen
const kitchenCounter = createKitchen(8.5, 2, 1.5, woodMaterial);
kitchenCounter.position.set(3.24, -1.5, -1);

// Create kitchen stove counter
const kitchenStoveCounter = createKitchen(6.5, 2, 1.5, woodMaterial);
kitchenStoveCounter.position.set(2.74, -1.5, -4);

// // Create kitchen fridge
// const kitchenFridge = createKitchen(1.5, 4, 1.5, fridgeMaterial);
// kitchenFridge.position.set(6.74, -0.5, -4);

// Create kitchen pantry
const kitchenPantry = createRoom(2.5, 5, 1.5, roomMaterials);
kitchenPantry.position.set(-1.75, 0, -4);

// Create kitchen bottom wall
const kitchenBottomWall = createWall(9.5, 2, 0.01, roomMaterials);
kitchenBottomWall.position.set(2.5, -1.5, -.2);

// Create kitchen pillar
const kitchenPillar = createKitchen(2, 5, 1.5, woodMaterial);
kitchenPillar.position.set(-1.45, 0, -1);

// Create kitchen pillar wall
const kitchenPillarWall = createWall(2.1, 5, 0.01, roomMaterials);
kitchenPillarWall.position.set(-1.5, 0, -.2);

// // Create storage closet
// const storageCloset = createRoom(3, 5, 3, roomMaterials);
// storageCloset.position.set(-6, 0, -13.5);

// // Create bathroom
// const bathroom = createRoom(3, 5, 9.5, roomMaterials);
// bathroom.position.set(-6, 0, -7.25);

// Create bedroom
const bedroom = createRoom(12, 5, 10, roomMaterials);
bedroom.position.set(1.5, 0, -10);

// Create doors
const frontDoor = createDoor(2, 4, 0.1, doorMaterial)
frontDoor.position.set(-5.5, -0.5, 10.01);

// const storageClosetDoor = createDoor(2, 4, 0.1, doorMaterial)
// storageClosetDoor.position.set(-4.5, -0.5, -13.5);
// storageClosetDoor.rotateY(Math.PI / 2)

const pantryDoor = createDoor(2, 4, 0.1, doorMaterial)
pantryDoor.position.set(-1.75, -0.5, -3.1);

const bathroomDoor = createDoor(2, 4, 0.1, doorMaterial)
bathroomDoor.position.set(-4.5, -0.5, -6.75);
bathroomDoor.rotateY(Math.PI / 2)

const bedroomDoor = createDoor(2, 4, 0.1, doorMaterial)
bedroomDoor.position.set(-3.5, -0.5, -5);

// Create entrance ways
const kitchenEntrance = createDoor(2, 4, 0.5, entranceWayMaterial)
kitchenEntrance.position.set(-2.5, -0.5, -1.2);
kitchenEntrance.rotateY(Math.PI / 2)

// Create windows
const livingRoomWindow = createWindow(7, 4, 0.1, windowMaterial);
livingRoomWindow.position.set(2, 0.05, 10);

const bedroomWindow = createWindow(2, 4, 0.1, windowMaterial);
bedroomWindow.position.set(-2.9, 0.05, -15);

// // Create the wood block with cubby holes
// const woodBlock = createWoodBlock();
// scene.add(woodBlock);
// woodBlock.position.set(-7.9, -1, 6)
// woodBlock.rotateY(Math.PI / 2)
// woodBlock.name = "woodBlock"    
// draggableObjects.push( woodBlock );

// Create the indoor dog pen
const indoorDogPen = createIndoorDogPen();
scene.add(indoorDogPen);
indoorDogPen.position.set(5.9, -1, 1.5)
indoorDogPen.name = "indoorDogPen"    
draggableObjects.push( indoorDogPen );

// // Create the black and blue desk
// const blackBlueDesk = createBlackBlueDesk();
// scene.add(blackBlueDesk);
// blackBlueDesk.position.set(-5.5, -1, 1)
// blackBlueDesk.name = "blackBlueDesk"    
// draggableObjects.push( blackBlueDesk );

// // Create the bookshelf
// const bookshelf = createBookshelf();
// scene.add(bookshelf);
// bookshelf.position.set(2, -2, .3)      
// bookshelf.name = "bookshelf"    
// draggableObjects.push( bookshelf );

// // Create the TV stand
// const tvStand = createTVStand();
// scene.add(tvStand);
// tvStand.position.set(5, -1, 7)
// tvStand.rotateY(Math.PI / 3)
// tvStand.name = "tvStand"
// draggableObjects.push( tvStand );

// // Create the flat-screen TV
// const flatScreenTV = createFlatScreenTV();
// scene.add(flatScreenTV);
// flatScreenTV.position.set(5, 1.3, 7.1)
// flatScreenTV.rotateY( (- Math.PI - 3.5) / 3 )
// flatScreenTV.name = "flatScreenTV"
// draggableObjects.push( flatScreenTV );

// // Create the metal table
// const metalTable = createMetalTable();
// scene.add(metalTable);
// metalTable.position.set(-2, -1, 6.5)
// metalTable.rotateY(Math.PI / 2)
// metalTable.name = "metalTable"
// draggableObjects.push( metalTable );
// metalTable.boundingBox = new THREE.Box3().setFromObject(metalTable);

// // Create the leather chair
// const leatherChair = createLeatherChair();
// scene.add(leatherChair);
// leatherChair.position.set(-5.5, -1.7, 0)
// leatherChair.name = "leatherChair"
// draggableObjects.push( leatherChair );

// Create the office paintings
const officeSamuraiPainting = createLargePainting(paintingMaterialsRed);
scene.add(officeSamuraiPainting);
officeSamuraiPainting.position.set(-5.5, 1, -4.7)
officeSamuraiPainting.name = "officeSamuraiPainting"
draggableObjects.push( officeSamuraiPainting );

const officeRoshaschPainting = createSmallPainting(paintingMaterialsBlue);
scene.add(officeRoshaschPainting);
officeRoshaschPainting.position.set(-6.75, 1.5, -4.7)
officeRoshaschPainting.name = "officeRoshaschPainting"
draggableObjects.push( officeRoshaschPainting );

const officeJesterPainting = createSmallPainting(paintingMaterialsGreen);
scene.add(officeJesterPainting);
officeJesterPainting.position.set(-6.75, 0.5, -4.7)
officeJesterPainting.name = "officeJesterPainting"
draggableObjects.push( officeJesterPainting );

// Create the entrance paintings
const entranceSamuraiPainting = createLargePainting(paintingMaterialsGreen);
scene.add(entranceSamuraiPainting);
entranceSamuraiPainting.position.set(-3.5, .7, 9.9)
entranceSamuraiPainting.name = "entranceSamuraiPainting"
draggableObjects.push( entranceSamuraiPainting );

// Create the living room paintings
const livingRoomSamuraiPainting = createLargePainting(paintingMaterialsBlue);
scene.add(livingRoomSamuraiPainting);
livingRoomSamuraiPainting.position.set(7, 1.2, 4.1)
livingRoomSamuraiPainting.rotateY(Math.PI / 2)
// livingRoomSamuraiPainting.rotateZ(Math.PI / 2)
livingRoomSamuraiPainting.name = "livingRoomSamuraiPainting"
draggableObjects.push( livingRoomSamuraiPainting );



/**
 * Models
*/
const dracoLoader = new DRACOLoader()

dracoLoader.setDecoderPath('/draco/')

// Fox
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let mixer = null
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
gltfLoader.load( 
  // '/models/cybertruck/Engagement_9mm.glb',
  // '/models/cybertruck/black_watch.glb', // no texture or detail
  // '/models/cybertruck/full_bar_scene.glb', // huge, no texture
  // '/models/cybertruck/Diner.glb', // doesnt work,
  '/models/cybertruck/cybertruck_wrap.gltf',  // works
  // '/models/cybertruck/cybertruck.glb', // works
  // '/models/cybertruck/cybertruck_new.glb',// half is shown
    // '/models/Fox/glTF/Fox.gltf',
    (cyber) => {        

        
        console.log('cyber - success: ', cyber)
        // scene.add(cyber.scene.children[1]) // scene.children[1]
        scene.add(cyber.scene)


        
        // cyber.scene.bindMode = ""
        // cyber.scene.castShadow = true
        // cyber.scene.name = "cyber"
        // // draggableObjects.push( fox );
        // draggableObjects.push( cyber.scene );

    },
    (progress) => {
        console.log('cyber - progress: ', progress)
    },
    (error) => {
        console.log('cyber - error: ', error)
    }
)
gltfLoader.load(
    '/models/Fox/glTF/Fox.gltf',
    (fox) => {        
        mixer = new THREE.AnimationMixer(fox.scene)
        // const action = mixer.clipAction(fox.animations[0])
        // const action = mixer.clipAction(fox.animations[1])
        const action = mixer.clipAction(fox.animations[0])
        
        action.play()
        
        fox.scene.scale.set(0.01, 0.01, 0.01)
        // fox.scene.scale.set(0.1, 0.1, 0.1)
        fox.scene.position.set(5.9, -2.5, 2)
        
        
        scene.add(fox.scene)
        
        fox.scene.bindMode = ""
        fox.scene.castShadow = true
        fox.scene.name = "fox"
        // draggableObjects.push( fox );
        draggableObjects.push( fox.scene );

    },
    (progress) => {
        console.log('fox - progress: ', progress)
    },
    (error) => {
        console.log('fox - error: ', error)
    }
)

gltfLoader.load(
  '/models/furnitures/furnitures.gltf',
  (furnitures) => {
      console.log('furnitures: ', furnitures)
      console.log('furnitures.children: ', furnitures.scene.children[0].children)

      // furnitures.scene.scale.set(200, 115, 115)
      // furnitures.scene.position.set(4.5, 2.5, 8.75)
      // furnitures.scene.rotation.set(0, Math.PI * 2, 0)
      // scene.add(furnitures.scene)
        
      const bed = furnitures.scene.children[0].children[2]
      bed.material.color.set('#007FFF')
      bed.scale.set(200, 115, 115)
      bed.position.set(4.5, -2.25, -11.75)
      bed.rotation.set(0, Math.PI * 2, 0)
      bed.name = "bed"
      draggableObjects.push( bed );
      scene.add(bed)

      const bookshelf = furnitures.scene.children[0].children[3]
      bookshelf.material.color.set(0x8B4513)
      bookshelf.scale.set(190, 100, 115)
      bookshelf.position.set(-1.5, -2.5, .3)      
      bookshelf.rotation.set(0, Math.PI * 2, 0)
      bookshelf.name = "bookshelf"
      draggableObjects.push( bookshelf );
      scene.add(bookshelf)

      const officeTable = furnitures.scene.children[0].children[5]
      officeTable.scale.set(60, 200, 50)
      officeTable.position.set(-6, -2.5, -3.75)      
      officeTable.rotation.set(0, Math.PI * 2, Math.PI * 2)
      officeTable.name = "officeTable"
      draggableObjects.push( officeTable );
      scene.add(officeTable)
      
      const chair = furnitures.scene.children[0].children[11]
      chair.material.color.set('white')
      chair.scale.set(100, 100, 100)
      chair.position.set(-6, -2.5, -1.5)     
      chair.rotation.set(0, Math.PI * 2, 0)
      chair.name = "chair"
      draggableObjects.push( chair );
      scene.add(chair)

      const fridge = furnitures.scene.children[0].children[12]
      fridge.scale.set(100, 90, 115)
      fridge.position.set(6.74, -2.5, -4)  
      fridge.rotation.set(0, Math.PI * 2, 0)
      fridge.name = "fridge"
      // draggableObjects.push( fridge );
      scene.add(fridge)
      
      const lamp = furnitures.scene.children[0].children[14]
      lamp.scale.set(100, 100, 115)
      lamp.position.set(-6, -1, -3.5)      
      lamp.rotation.set(0, Math.PI * 2, 0)
      lamp.name = "lamp"
      draggableObjects.push( lamp );
      scene.add(lamp)

      const piano = furnitures.scene.children[0].children[16]
      piano.scale.set(130, 100, 115)
      piano.position.set(-7, -2.5, 6)      
      piano.rotation.set(0, Math.PI / 2, 0)
      piano.name = "piano"
      draggableObjects.push( piano );
      scene.add(piano)

      const dresser = furnitures.scene.children[0].children[19]
      // test.material.color.set(0x8B4513)
      dresser.scale.set(100, 100, 115)
      dresser.position.set(-3.75, -2.5, -9.75)      
      dresser.rotation.set(Math.PI * 2, Math.PI / 2, 0)
      dresser.name = "dresser"
      draggableObjects.push( dresser );
      scene.add(dresser)

      const sofa = furnitures.scene.children[0].children[26]
      // test.material.color.set(0x8B4513)
      sofa.scale.set(140, 100, 115)
      sofa.position.set(-2, -2.5, 6.5)   
      sofa.rotation.set(0, Math.PI/ 2, 0)
      sofa.name = "sofa"
      draggableObjects.push( sofa );
      scene.add(sofa)

      const tvSet = furnitures.scene.children[0].children[30]
      // test.material.color.set(0x8B4513)
      tvSet.scale.set(60, 100, 115)
      tvSet.position.set(6, -2.5, 7)      
      tvSet.rotation.set(0, - Math.PI / 2, 0)
      tvSet.name = "tvSet"
      draggableObjects.push( tvSet );
      scene.add(tvSet)

      const counter = furnitures.scene.children[0].children[11]
      // test.material.color.set(0x8B4513)
      counter.scale.set(90, 100, 70)
      counter.position.set(2.75, -2.5, -4)      
      counter.rotation.set(0, Math.PI * 2, 0)
      counter.name = "counter"
      // draggableObjects.push( counter );
      scene.add(counter)

      const desk = furnitures.scene.children[0].children[15]
      // desk.material.color.set(0x8B4513)
      desk.scale.set(60, 80, 115)
      desk.position.set(-6, -2.5, -0.5)      
      desk.rotation.set(0, Math.PI * 3, 0)
      desk.name = "desk"
      draggableObjects.push( desk );
      scene.add(desk)


/*
 0 hamper
 1 laundry machine
 2 bed
 3 folded towels
 4 bookshelf
 5 coffee table -> office table
 6 entrance way
 7 coffee machine
 8 camera
 9 air hockey table
 10 plant
 11 small chair
 12 fridge
 13 sink
 14 lamp
 15 arm chair
 16 piano
 17 cat stand
 18 files 
 19 dresser 
 20 cookies 
 21 melon bowl 
 22 2L Coke 
 23 watter bottle  
 24 play car  
 25 easel 
 26 couch 
 27 leg press 
 28 barbell 
 29 weight rack 
 30 TV set 
 31 barbell 

 11 kitchen counter
 13 tall lamp
 15 desk
*/


      // const test = furnitures.scene.children[0].children[15]
      // // test.material.color.set(0x8B4513)
      // // test.scale.set(100, 100, 115)
      // test.position.set(-6, 2, -1)      
      // test.rotation.set(0, Math.PI * 2, 0)
      // test.name = "test"
      // draggableObjects.push( test );
      // scene.add(test)

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
gltfLoader.load(
  '/models/bathroom_modern/bathroom_modern.gltf',
  (bathroom_modern) => {


      bathroom_modern.scene.scale.set(.85, .6, .3)
      // bathroom_modern.scene.position.set(-6, 0, -7.25)
      bathroom_modern.scene.position.set(-5.6, -2, -9)
      bathroom_modern.scene.rotation.set(0, -(Math.PI * 0.5), 0)

      scene.add(bathroom_modern.scene)

  },
  (progress) => {
      console.log('bathroom_modern: ','progress')
      console.log('bathroom_modern: ', progress)
  },
  (error) => {
      console.log('bathroom_modern: ','error')
      console.log('bathroom_modern: ', error)
  }
)



// Set camera position
camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);

// Set up controls
const orbitControls = new OrbitControls(camera, canvas);

// Initialize DragControls
const dragControls = new DragControls(draggableObjects, camera, renderer.domElement);

dragControls.addEventListener('dragstart', function(event) {})
dragControls.addEventListener('drag', function(event) {})
dragControls.addEventListener('dragend', function(event) {})

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

function animate() {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update mixer
    mixer !== null ? mixer.update(deltaTime) : mixer = null

    // Update controls
    orbitControls.update()

    // Render
    renderer.render(scene, camera)

    // Call animate again on the next frame
    window.requestAnimationFrame(animate)
}

animate()
