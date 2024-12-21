import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

// import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { DragControls } from 'three/addons/controls/DragControls'

import GUI from 'lil-gui';
import { World } from 'cannon';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// MeshPhongMaterial

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

// const entranceLightHelper = new THREE.PointLightHelper(entranceLight)
// scene.add(entranceLightHelper)

// Create a helper for the shadow camera 
// const entranceLightShadowHelper = new THREE.CameraHelper( entranceLight.shadow.camera );
// scene.add( officeLightShadowHelper );


// Office Light
const officeLight = new THREE.PointLight('#FFFFE0', 10, 25, 2);
officeLight.position.set( -6, 3, 0 );
officeLight.castShadow = true

//Set up shadow properties for the light
officeLight.shadow.mapSize.width = 512; // default
officeLight.shadow.mapSize.height = 512; // default
officeLight.shadow.camera.near = 0.5; // default
officeLight.shadow.camera.far = 500; // default
scene.add( officeLight );
// Create a helper for the shadow camera
// const officeLightShadowHelper = new THREE.CameraHelper( officeLight.shadow.camera );
// scene.add( officeLightShadowHelper );


// Bedroom Light
const bedroomLight = new THREE.PointLight('#FFFFE0', 10, 25, 2);
bedroomLight.position.set(2.5, 3, -10)
bedroomLight.castShadow = true
//Set up shadow properties for the light
bedroomLight.shadow.mapSize.width = 512; // default
bedroomLight.shadow.mapSize.height = 512; // default
bedroomLight.shadow.camera.near = 0.5; // default
bedroomLight.shadow.camera.far = 500; // default
scene.add( bedroomLight );
// // Create a helper for the shadow camera
// const bedroomLightShadowHelper = new THREE.CameraHelper( bedroomLight.shadow.camera );
// scene.add( bedroomLightShadowHelper );


// Kitchen Light
const kitchenLight = new THREE.PointLight('#FFFFE0', 10, 25, 2);
kitchenLight.position.set( 3, 3, -3 );
kitchenLight.castShadow = true

//Set up shadow properties for the light
kitchenLight.shadow.mapSize.width = 512; // default
kitchenLight.shadow.mapSize.height = 512; // default
kitchenLight.shadow.camera.near = 0.5; // default
kitchenLight.shadow.camera.far = 500; // default
scene.add( kitchenLight );
// Create a helper for the shadow camera
// const kitchenLightShadowHelper = new THREE.CameraHelper( kitchenLight.shadow.camera );
// scene.add( kitchenLightShadowHelper );


// Bathroom Light
const bathroomLight = new THREE.PointLight('#FFFFE0', 10, 25, 2);
bathroomLight.position.set(-7, 1.5, -7);
bathroomLight.castShadow = true

//Set up shadow properties for the light
bathroomLight.shadow.mapSize.width = 512; // default
bathroomLight.shadow.mapSize.height = 512; // default
bathroomLight.shadow.camera.near = 0.5; // default
bathroomLight.shadow.camera.far = 500; // default
scene.add( bathroomLight );
// Create a helper for the shadow camera
// const bathroomLightShadowHelper = new THREE.CameraHelper( bathroomLight.shadow.camera );
// scene.add( bathroomLightShadowHelper );


// Living Room Window Light
const livingRoomWindowLight = new THREE.SpotLight('#FFFFE0');
livingRoomWindowLight.position.set( 1.9, 2, 10 );
// livingRoomWindowLight.position.set( 1.9, 0, 10.1 );
livingRoomWindowLight.castShadow = true
// livingRoomWindowLight.angle = Math.PI/2
livingRoomWindowLight.power = 100
livingRoomWindowLight.shadow.mapSize.width = 1024;
livingRoomWindowLight.shadow.mapSize.height = 1024;
livingRoomWindowLight.shadow.camera.near = 500;
livingRoomWindowLight.shadow.camera.far = 4000;
livingRoomWindowLight.shadow.camera.fov = 30;
scene.add( livingRoomWindowLight );

// const LivingRoomWindowLightHelper = new THREE.SpotLightHelper(livingRoomWindowLight)
// scene.add(LivingRoomWindowLightHelper)


// Bed Room Window Light
const bedroomWindowLight = new THREE.SpotLight('#FFFFE0');
bedroomWindowLight.position.set( -2.9, 2, -14.9 );
// livingRoomWindowLight.position.set( 1.9, 0, 10.1 );
bedroomWindowLight.castShadow = true
livingRoomWindowLight.angle = Math.PI/2
bedroomWindowLight.power = 100
bedroomWindowLight.shadow.mapSize.width = 1024;
bedroomWindowLight.shadow.mapSize.height = 1024;
bedroomWindowLight.shadow.camera.near = 500;
bedroomWindowLight.shadow.camera.far = 4000;
bedroomWindowLight.shadow.camera.fov = 30;
scene.add( bedroomWindowLight );

// const bedroomWindowLightHelper = new THREE.SpotLightHelper(bedroomWindowLight)
// scene.add(bedroomWindowLightHelper)




// Define materials and geometries
const wallMaterial1 = new THREE.MeshPhongMaterial({ color: '#EEE6D9', side: THREE.DoubleSide });
const wallMaterial2 = new THREE.MeshPhongMaterial({ color: '#EEE6D9', side: THREE.DoubleSide });
const wallMaterial3 = new THREE.MeshPhongMaterial({ color: '#EEE6D9', side: THREE.DoubleSide });
const wallMaterial4 = new THREE.MeshPhongMaterial({ color: '#EEE6D9', side: THREE.DoubleSide });
const floorMaterial = new THREE.MeshPhongMaterial({ color: '#C4A484', side: THREE.DoubleSide });
const ceilingMaterial = new THREE.MeshPhongMaterial({ transparent: true, opacity: 0, wireframe: false, side: THREE.DoubleSide });

const roomMaterials = [ wallMaterial1, wallMaterial2, ceilingMaterial, floorMaterial, wallMaterial3, wallMaterial4 ]
const doorMaterial = new THREE.MeshPhongMaterial({ color: '#A26A42' });
const entranceWayMaterial = new THREE.MeshPhongMaterial({ color: 'black', transparent: true, opacity: 0.1, });
const windowMaterial = new THREE.MeshPhongMaterial({ color: 0xADD8E6, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
// const wallGeometry = new THREE.BoxGeometry(1, 1, 0.1);

// Fridge material
const fridgeMaterial = new THREE.MeshPhongMaterial({ color: 'white', side: THREE.DoubleSide });

// Cabinets materials
const woodMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513, side: THREE.DoubleSide });
const openMaterial = new THREE.MeshPhongMaterial({ color: 'black', transparent: true, opacity: 0.5 });

// // Couch materials
// const couchMaterial = new THREE.MeshPhongMaterial({ color: '#1560bd' }); // Light blue color
// // const cushionMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff }); // White color for cushions

// Dog pen materials
const penWallMaterial = new THREE.MeshPhongMaterial({ color: 'black', transparent: true, opacity: 0.5, side: THREE.DoubleSide });
// const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
// const penMaterial = new THREE.MeshPhongMaterial({ color: 0xadd8e6 }); // Light blue color for the pen

// Black and blue desk materials
const blackMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
const blueMaterial = new THREE.MeshPhongMaterial({ color: 0x0000FF });

// Book shelf materials
const woodShelfMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
const bookMaterial = new THREE.MeshPhongMaterial({ color: 0x0000FF }); // Blue color for books

// TV stand materials
const woodTVStandMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
const metalMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
const glassMaterial = new THREE.MeshPhongMaterial({ color: 0xADD8E6, transparent: true, opacity: 0.5 });

// TV materials
const tvMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 }); // Black color for the TV
const screenMaterial = new THREE.MeshPhongMaterial({ color: 0xADD8E6, transparent: true, opacity: 0.8 }); // Light blue color for the screen
const standMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 }); // Brown color for the stand

// Metal table material
const metalTableMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 }); // Gray color for the metal

// Office chair material
const blackLeatherMaterial = new THREE.MeshPhongMaterial({ color: 0x000000  });
const blueLeatherMaterial = new THREE.MeshPhongMaterial({ color: 0x0000FF  });

// // Bed material
// const bedMaterial = new THREE.MeshPhongMaterial({ color: 0x0000FF }); // Blue color for bed

// Painting material
const paintingMaterialsRed = new THREE.MeshPhongMaterial({ color: '#65000B'  })
const paintingMaterialsGreen = new THREE.MeshPhongMaterial({ color: '#043927'  })
const paintingMaterialsBlue = new THREE.MeshPhongMaterial({ color: '#041E42'  })

// // Bathtub material
// const bathtubMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF }); // White color for the bathtub

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
//   const room = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
//   scene.add(room); 
//   room.receiveShadow = true
  
  const counter = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
  scene.add(counter); 

//   const woodBlock = new THREE.Group();

  // Create the block of wood
  // const blockGeometry = new THREE.BoxGeometry(7, 3, 0); // 7, 4, .5 // 7, 2, .5
  // const blockGeometry = new THREE.BoxGeometry(7, 4, .5);
  // const block = new THREE.Mesh(blockGeometry, woodMaterial);
//   woodBlock.add(block);

//   // Create the cubby holes
//   for (let i = 0; i < 3; i++) {
//       for (let j = 0; j < 3; j++) {
//       const cubbyHoleGeometry = new THREE.BoxGeometry(2.3, 1, 1); // 2.3, 1.3, 2
//       // const cubbyHoleGeometry = new THREE.BoxGeometry(2.3, 1.3, 2);
//       const cubbyHole = new THREE.Mesh(cubbyHoleGeometry, woodMaterial);
//       cubbyHole.position.set((i - 1) * 2.3, (j - 1) * 1, 1);
//       woodBlock.add(cubbyHole);

//       // Add an open face to the cubby hole
//       // if (i === 1 && j === 1) {
//           const openFaceGeometry = new THREE.PlaneGeometry(2.3, 1); // 2.3, 1.3
//           const openFace = new THREE.Mesh(openFaceGeometry, openMaterial);
//           openFace.position.set((i - 1) * 2.3, (j - 1) * 1, 1.5);
//           woodBlock.add(openFace);
//       // }
//       }
//   }

//   woodBlock.receiveShadow = true
//   woodBlock.castShadow = true

//   counter.receiveShadow = true
  counter.castShadow = true

//   return woodBlock;

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

// // Function to create a three-person couch
// function createCouch() {
//     const couch = new THREE.Group();
  
//     // Create the main body of the couch
//     const couchGeometry = new THREE.BoxGeometry(5, 2, 2);
//     const couchBody = new THREE.Mesh(couchGeometry, couchMaterial);
//     couch.add(couchBody);

//     couch.receiveShadow = true
//     couch.castShadow = true
    
  
//     return couch;
// }

// Function to create a simple metal table
function createMetalTable() {
    const table = new THREE.Group();
  
    // Create the tabletop
    const tabletopGeometry = new THREE.BoxGeometry(5, 0.2, 2);
    const tabletop = new THREE.Mesh(tabletopGeometry, metalTableMaterial);
    table.add(tabletop);
  
    // Create the table legs
    const legGeometry = new THREE.BoxGeometry(0.2, 1.5, 0.2);
    const leg1 = new THREE.Mesh(legGeometry, metalTableMaterial);
    const leg2 = new THREE.Mesh(legGeometry, metalTableMaterial);
    const leg3 = new THREE.Mesh(legGeometry, metalTableMaterial);
    const leg4 = new THREE.Mesh(legGeometry, metalTableMaterial);
  
    leg1.position.set(-1.8, -0.75, 0.8);
    leg2.position.set(1.8, -0.75, 0.8);
    leg3.position.set(-1.8, -0.75, -0.8);
    leg4.position.set(1.8, -0.75, -0.8);
  
    table.add(leg1, leg2, leg3, leg4);

    table.receiveShadow = true
    table.castShadow = true

  
    return table;
  }

// Function to create a simple metal table
function createOfficeStand() {
    const table = new THREE.Group();
  
    // Create the tabletop
    const tabletopGeometry = new THREE.BoxGeometry(3, 0.2, 1);
    const tabletop = new THREE.Mesh(tabletopGeometry, woodMaterial);
    table.add(tabletop);
  
    // Create the table legs
    const legGeometry = new THREE.BoxGeometry(0.2, 1.5, 0.2);
    const leg1 = new THREE.Mesh(legGeometry, woodMaterial);
    const leg2 = new THREE.Mesh(legGeometry, woodMaterial);
    const leg3 = new THREE.Mesh(legGeometry, woodMaterial);
    const leg4 = new THREE.Mesh(legGeometry, woodMaterial);
  
    leg1.position.set(-.8, -0.75, 0.4);
    leg2.position.set(.8, -0.75, 0.4);
    leg3.position.set(-.8, -0.75, -0.4);
    leg4.position.set(.8, -0.75, -0.4);
  
    table.add(leg1, leg2, leg3, leg4);

    table.receiveShadow = true
    table.castShadow = true

  
    return table;
  }
  
// Function to create a black and blue leather chair
function createLeatherChair() {
    const chair = new THREE.Group();
  
    // Create the chair seat
    const seatGeometry = new THREE.BoxGeometry(1.5, 0.2, 1.5);
    const seat = new THREE.Mesh(seatGeometry, blackLeatherMaterial);
    chair.add(seat);
  
    // Create the chair backrest
    const backrestGeometry = new THREE.BoxGeometry(1.5, 1.5, 0.2);
    const backrest = new THREE.Mesh(backrestGeometry, blackLeatherMaterial);
    backrest.position.set(0, 0.75, -0.75);
    chair.add(backrest);
  
    // Create the chair legs
    const legGeometry = new THREE.BoxGeometry(0.2, 0.75, 0.2);
    const leg1 = new THREE.Mesh(legGeometry, blackLeatherMaterial);
    const leg2 = new THREE.Mesh(legGeometry, blackLeatherMaterial);
    const leg3 = new THREE.Mesh(legGeometry, blackLeatherMaterial);
    const leg4 = new THREE.Mesh(legGeometry, blackLeatherMaterial);
  
    leg1.position.set(-0.65, -0.375, 0.65);
    leg2.position.set(0.65, -0.375, 0.65);
    leg3.position.set(-0.65, -0.375, -0.65);
    leg4.position.set(0.65, -0.375, -0.65);
  
    chair.add(leg1, leg2, leg3, leg4);
  
    // // Add blue leather cushions
    // const cushionGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.8);
    // const cushion1 = new THREE.Mesh(cushionGeometry, blueLeatherMaterial);
    // const cushion2 = new THREE.Mesh(cushionGeometry, blueLeatherMaterial);
  
    // cushion1.position.set(-0.35, 0.55, 0.2);
    // cushion2.position.set(0.35, 0.55, 0.2);
  
    // chair.add(cushion1, cushion2);

    chair.receiveShadow = true
    chair.castShadow = true
  
    return chair;
  }

// Function to create a simple flat-screen TV
function createFlatScreenTV() {
    const tv = new THREE.Group();
  
    // Create the TV body
    const tvBodyGeometry = new THREE.BoxGeometry(4, 2.5, 0.5);
    const tvBody = new THREE.Mesh(tvBodyGeometry, tvMaterial);
    tv.add(tvBody);
  
    // Create the TV screen
    const screenGeometry = new THREE.BoxGeometry(3.8, 2.3, 0.1);
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 0, 0.25);
    tv.add(screen);
  
    // Create the TV stand
    const standGeometry = new THREE.BoxGeometry(2, 0.2, 0.5);
    const stand = new THREE.Mesh(standGeometry, standMaterial);
    stand.position.set(0, -1.3, -0.25);
    tv.add(stand);
  
    tv.receiveShadow = true
    tv.castShadow = true

    return tv;
}

// Function to create a simple TV stand
function createTVStand() {
    const tvStand = new THREE.Group();
  
    // Create the main body of the TV stand
    const mainBodyGeometry = new THREE.BoxGeometry(3.5, 2, 2);
    const mainBody = new THREE.Mesh(mainBodyGeometry, woodTVStandMaterial);
    tvStand.add(mainBody);
  
    // Create the legs
    const legGeometry = new THREE.BoxGeometry(0.5, 2, 0.5);
    const leg1 = new THREE.Mesh(legGeometry, woodTVStandMaterial);
    const leg2 = new THREE.Mesh(legGeometry, woodTVStandMaterial);
    const leg3 = new THREE.Mesh(legGeometry, woodTVStandMaterial);
    const leg4 = new THREE.Mesh(legGeometry, woodTVStandMaterial);
  
    leg1.position.set(-1.25, -0.5, 0.75);
    leg2.position.set(1.25, -0.5, 0.75);
    leg3.position.set(-1.25, -0.5, -0.75);
    leg4.position.set(1.25, -0.5, -0.75);
  
    tvStand.add(leg1, leg2, leg3, leg4);
  
    // // Create the shelf
    // const shelfGeometry = new THREE.BoxGeometry(3.5, 0.1, 2);
    // const shelf = new THREE.Mesh(shelfGeometry, woodTVStandMaterial);
    // shelf.position.set(0, -2, 0);
    // tvStand.add(shelf);
  
    // // Create the TV mount
    // const mountGeometry = new THREE.BoxGeometry(2, 0.2, 0.5);
    // const mount = new THREE.Mesh(mountGeometry, metalMaterial);
    // mount.position.set(0, 1, 0.75);
    // tvStand.add(mount);
  
    // // Create the glass shelf
    // const glassShelfGeometry = new THREE.BoxGeometry(3.5, 0., 2);
    // const glassShelf = new THREE.Mesh(glassShelfGeometry, glassMaterial);
    // glassShelf.position.set(0, 0.5, 0);
    // tvStand.add(glassShelf);

    tvStand.receiveShadow = true
    tvStand.castShadow = true
  
    return tvStand;
  }

// Function to create a floor-to-ceiling bookshelf
function createBookshelf() {
    const bookshelf = new THREE.Group();
  
    // Create the vertical elements (bookshelf supports)
    const supportGeometry = new THREE.BoxGeometry(1, 4, 0.5);
  
    for (let i = 0; i < 2; i++) {
      const support = new THREE.Mesh(supportGeometry, woodShelfMaterial);
      support.position.set(-4 + (i * 1), 1.5, -0.3);
      bookshelf.add(support);
    }
  
    // Create the horizontal elements (shelves)
    const shelfGeometry = new THREE.BoxGeometry(2, 0.2, 1);

    for (let i = 0; i < 4; i++) {
        const shelf = new THREE.Mesh(shelfGeometry, woodShelfMaterial);
        shelf.position.set(-3.5, i, 0.4);
        bookshelf.add(shelf);

        // // Add some books on the shelf
        // for (let j = 0; j < 3; j++) {
        // const book = new THREE.Mesh(new THREE.BoxGeometry(.5, 0.2, 1), bookMaterial);
        // book.position.set(-4.5 + j, 0.4 + i, 0.75 + Math.random() * 0.2);
        // book.rotateZ(Math.PI / 2)
        // bookshelf.add(book);
        // }
    }

    shelfGeometry.receiveShadow = true
    shelfGeometry.castShadow = true

    bookshelf.receiveShadow = true
    bookshelf.castShadow = true


    return bookshelf;
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

    // Create the ground
    // const groundGeometry = new THREE.BoxGeometry(10, 0.1, 10);
    // const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    // indoorDogPen.add(ground);
  
    // Create the dog pen (a smaller space within the room)
    // const penGeometry = new THREE.BoxGeometry(5, 2, 5);
    // const pen = new THREE.Mesh(penGeometry, penMaterial);
    // pen.position.set(0, 1, 0);
  
    // indoorDogPen.add(pen);

    indoorDogPen.receiveShadow = true
    indoorDogPen.castShadow = true

  
    return indoorDogPen;
}

// Function to create the block of wood with cubby holes
function createWoodBlock() {
    const woodBlock = new THREE.Group();

    // Create the block of wood
    // const blockGeometry = new THREE.BoxGeometry(7, 3, 0); // 7, 4, .5 // 7, 2, .5
    // const blockGeometry = new THREE.BoxGeometry(7, 4, .5);
    // const block = new THREE.Mesh(blockGeometry, woodMaterial);
    // woodBlock.add(block);

    // Create the cubby holes
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
        const cubbyHoleGeometry = new THREE.BoxGeometry(2.3, 1, 1); // 2.3, 1.3, 2
        // const cubbyHoleGeometry = new THREE.BoxGeometry(2.3, 1.3, 2);
        const cubbyHole = new THREE.Mesh(cubbyHoleGeometry, woodMaterial);
        cubbyHole.position.set((i - 1) * 2.3, (j - 1) * 1, 1);
        woodBlock.add(cubbyHole);

        // Add an open face to the cubby hole
        // if (i === 1 && j === 1) {
            const openFaceGeometry = new THREE.PlaneGeometry(2.3, 1); // 2.3, 1.3
            const openFace = new THREE.Mesh(openFaceGeometry, openMaterial);
            openFace.position.set((i - 1) * 2.3, (j - 1) * 1, 1.5);
            woodBlock.add(openFace);
        // }
        }
    }

    woodBlock.receiveShadow = true
    woodBlock.castShadow = true

    return woodBlock;
}

// Function to create a black and blue desk
function createBlackBlueDesk() {
    const desk = new THREE.Group();
  
    // Create desk surface
    const deskSurfaceGeometry = new THREE.BoxGeometry(3, 0.1, 2); // 6, 0.1, 3
    const deskSurface = new THREE.Mesh(deskSurfaceGeometry, blackMaterial);
    desk.add(deskSurface);
  
    // Create desk legs
    const legGeometry = new THREE.BoxGeometry(0.5, 1.5, 0.5);
    const leg1 = new THREE.Mesh(legGeometry, blackMaterial);
    const leg2 = new THREE.Mesh(legGeometry, blackMaterial);
    const leg3 = new THREE.Mesh(legGeometry, blackMaterial);
    const leg4 = new THREE.Mesh(legGeometry, blackMaterial);
  
    leg1.position.set(-1.25, -0.7, 0.7);
    leg2.position.set(1.25, -0.7, 0.7);
    leg3.position.set(-1.25, -0.7, -0.7);
    leg4.position.set(1.25, -0.7, -0.7);
  
    desk.add(leg1, leg2, leg3, leg4);
  
    // // Create blue drawers
    // const drawerGeometry = new THREE.BoxGeometry(2, 1, 1);
    // const drawer1 = new THREE.Mesh(drawerGeometry, blueMaterial);
    // const drawer2 = new THREE.Mesh(drawerGeometry, blueMaterial);
  
    // drawer1.position.set(-2.5, -1.5, 0.75);
    // drawer2.position.set(2.5, -1.5, 0.75);
  
    // desk.add(drawer1, drawer2);
  
    desk.receiveShadow = true
    desk.castShadow = true

    return desk;
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
    // topFrame.position.set(1, 1, 0);
    // bottomFrame.position.set(1, 0, 0);
    // leftFrame.position.set(1.5, 0.5, 0);
    // rightFrame.position.set(1, 0.5, 0);

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
    // topFrame.position.set(1, 1, 0);
    // bottomFrame.position.set(1, 0, 0);
    // leftFrame.position.set(1.5, 0.5, 0);
    // rightFrame.position.set(1, 0.5, 0);

    topFrame.rotateY(Math.PI / 2)
    bottomFrame.rotateY(Math.PI / 2)

    leftFrame.rotateX(Math.PI / 2)
    rightFrame.rotateX(Math.PI / 2)


    painting.add(topFrame, bottomFrame, leftFrame, rightFrame);

    return painting
}

// // Function to create a bed
// function createBed() {
//     const bed = new THREE.Group();
  
//     // Create the main body of the couch
//     const bedGeometry = new THREE.BoxGeometry(6, 2, 4);
//     const bedBody = new THREE.Mesh(bedGeometry, bedMaterial);
//     bed.add(bedBody);

//     bed.receiveShadow = true
//     bed.castShadow = true
    
//     return bed;
// }

// // Function to create a simple bathtub
// function createBathtub() {  
//     // Create the bathtub body
//     const bathtubGeometry = new THREE.BoxGeometry(2.9, 2, 2);
//     const bathtub = new THREE.Mesh(bathtubGeometry, bathtubMaterial);
    
//     return bathtub;
// }


// Create living room with office space
const livingRoom = createRoom(15, 5, 15, roomMaterials);
livingRoom.position.set(0, 0, 2.5);

// Create kitchen
const kitchenCounter = createKitchen(8.5, 2, 1.5, woodMaterial);
kitchenCounter.position.set(3.24, -1.5, -1);

// Create kitchen stove counter
const kitchenStoveCounter = createKitchen(6.5, 2, 1.5, woodMaterial);
kitchenStoveCounter.position.set(2.74, -1.5, -4);

// Create kitchen fridge
const kitchenFridge = createKitchen(1.5, 4, 1.5, fridgeMaterial);
kitchenFridge.position.set(6.74, -0.5, -4);

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

// Create storage closet
const storageCloset = createRoom(3, 5, 3, roomMaterials);
storageCloset.position.set(-6, 0, -13.5);

// Create bathroom
const bathroom = createRoom(3, 5, 9.5, roomMaterials);
bathroom.position.set(-6, 0, -7.25);

// Create bedroom
const bedroom = createRoom(12, 5, 10, roomMaterials);
bedroom.position.set(1.5, 0, -10);

// Create doors
const frontDoor = createDoor(2, 4, 0.1, doorMaterial)
frontDoor.position.set(-5.5, -0.5, 10.01);

const storageClosetDoor = createDoor(2, 4, 0.1, doorMaterial)
storageClosetDoor.position.set(-4.5, -0.5, -13.5);
storageClosetDoor.rotateY(Math.PI / 2)

const pantryDoor = createDoor(2, 4, 0.1, doorMaterial)
pantryDoor.position.set(-1.75, -0.5, -3.1);

const bathroomDoor = createDoor(2, 4, 0.1, doorMaterial)
bathroomDoor.position.set(-4.5, -0.5, -3.75);
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

// // Create the three-person couch
// const couch = createCouch();
// // scene.add(couch);
// couch.position.set(0, -1, 6.5)
// couch.rotateY(Math.PI / 2)
// draggableObjects.push( couch );
  
// Create the wood block with cubby holes
const woodBlock = createWoodBlock();
scene.add(woodBlock);
woodBlock.position.set(-7.9, -1, 6)
woodBlock.rotateY(Math.PI / 2)
woodBlock.name = "woodBlock"    
draggableObjects.push( woodBlock );

// Create the indoor dog pen
const indoorDogPen = createIndoorDogPen();
scene.add(indoorDogPen);
indoorDogPen.position.set(5.9, -1, 1.5)
indoorDogPen.name = "indoorDogPen"    
draggableObjects.push( indoorDogPen );

// Create the black and blue desk
const blackBlueDesk = createBlackBlueDesk();
scene.add(blackBlueDesk);
blackBlueDesk.position.set(-5.5, -1, 1)
blackBlueDesk.name = "blackBlueDesk"    
draggableObjects.push( blackBlueDesk );

// Create the bookshelf
const bookshelf = createBookshelf();
scene.add(bookshelf);
bookshelf.position.set(2, -2, .3)      
bookshelf.name = "bookshelf"    
draggableObjects.push( bookshelf );

// Create the TV stand
const tvStand = createTVStand();
scene.add(tvStand);
tvStand.position.set(5, -1, 7)
tvStand.rotateY(Math.PI / 3)
tvStand.name = "tvStand"
draggableObjects.push( tvStand );

// Create the flat-screen TV
const flatScreenTV = createFlatScreenTV();
scene.add(flatScreenTV);
flatScreenTV.position.set(5, 1.3, 7.1)
flatScreenTV.rotateY( (- Math.PI - 3.5) / 3 )
flatScreenTV.name = "flatScreenTV"
draggableObjects.push( flatScreenTV );

// Create the metal table
const metalTable = createMetalTable();
scene.add(metalTable);
metalTable.position.set(-2, -1, 6.5)
metalTable.rotateY(Math.PI / 2)
metalTable.name = "metalTable"
draggableObjects.push( metalTable );
metalTable.boundingBox = new THREE.Box3().setFromObject(metalTable);

// Create the office stand
const officeStand = createOfficeStand();
scene.add(officeStand);
officeStand.position.set(-6, -1, -2)
officeStand.name = "officeStand"
draggableObjects.push( officeStand );

// Create the leather chair
const leatherChair = createLeatherChair();
scene.add(leatherChair);
leatherChair.position.set(-5.5, -1.7, 0)
leatherChair.name = "leatherChair"
draggableObjects.push( leatherChair );

// Create the office paintings
const officeSamuraiPainting = createLargePainting(paintingMaterialsRed);
scene.add(officeSamuraiPainting);
officeSamuraiPainting.position.set(-5.5, 1, -2.4)
officeSamuraiPainting.name = "officeSamuraiPainting"
draggableObjects.push( officeSamuraiPainting );

const officeRoshaschPainting = createSmallPainting(paintingMaterialsBlue);
scene.add(officeRoshaschPainting);
officeRoshaschPainting.position.set(-6.75, 1.5, -2.4)
officeRoshaschPainting.name = "officeRoshaschPainting"
draggableObjects.push( officeRoshaschPainting );

const officeJesterPainting = createSmallPainting(paintingMaterialsGreen);
scene.add(officeJesterPainting);
officeJesterPainting.position.set(-6.75, 0.5, -2.4)
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

// // Create the bed
// const bed = createBed(bedMaterial);
// // scene.add(bed);
// bed.position.set(5.5, -1.5, -12)
// bed.rotateY(Math.PI / 2)
// draggableObjects.push( bed );

// // Create the bathtub
// const bathtub = createBathtub();
// scene.add(bathtub);
// bathtub.position.set(-6, -1, -10.9);


/**
 * Models
*/
const dracoLoader = new DRACOLoader()

dracoLoader.setDecoderPath('/draco/')

// Fox
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let mixer = null

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
      bed.position.set(4.5, -2.5, -11.75)
      bed.rotation.set(0, Math.PI * 2, 0)

      bed.name = "bed"
      

      draggableObjects.push( bed );


      scene.add(bed)

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


      bathroom_modern.scene.scale.set(.8, .6, .3)
      bathroom_modern.scene.position.set(-5.6, -2, -6.5)
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
gltfLoader.load(
  '/models/blue_couch/blue_couch.gltf',
  (blue_couch) => {


      // const couch = blue_couch.scene

      // couch.scale.set(30, 30, 30)
      // couch.position.set(0.5, -2.5, 6.2)
      // couch.rotation.set(0, Math.PI/2, 0)



      blue_couch.scene.scale.set(30, 30, 30)
      blue_couch.scene.position.set(0.5, -2.5, 6.2)
      blue_couch.scene.rotation.set(0, Math.PI/2, 0)

      blue_couch.scene.name = "couch"

      draggableObjects.push( blue_couch.scene );
      
      // blue_couch.scene.boundingBox = new THREE.Box3().setFromObject(blue_couch.scene);
      
      scene.add(blue_couch.scene)

  },
  (progress) => {
      console.log('blue_couch: ','progress')
      console.log('blue_couch: ',progress)
  },
  (error) => {
      console.log('blue_couch: ','error')
      console.log('blue_couch: ',error)
  }
)



// Set camera position
camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);

// Set up controls
const orbitControls = new OrbitControls(camera, canvas);


/* UNCOMMENT BELOW TO ENABLE DRAG CONTROLS */

// Initialize DragControls
const dragControls = new DragControls(draggableObjects, camera, renderer.domElement);

// dragControls.transformGroup = true; 
console.log('draggableObjects: ', draggableObjects)

const draggedGroup = new THREE.Group();

// Add event listener for 'dragstart' to update last valid position
dragControls.addEventListener('dragstart', function(event) {
  
  const object = event.object;
    
  // object.lastValidPosition = object.position.clone();
  
  
  // draggedGroup.lastValidPosition = object.position.clone();

  console.log('xxxxxx object: ', object)
  console.log('xxxxxx object.parent.parent: ', object.parent.parent)
  if (object.parent.parent.name == "couch") {


      console.log('xxxxxx draggedGroup: ', draggedGroup)
      draggedGroup.add( object.parent.parent );
      draggedGroup.name = object.parent.parent.name;


        // Add the group to the scene at the position of the object
        // group.position.copy(object.position);
        // group.rotation.copy(object.rotation);
        // group.scale.copy(object.scale);

        // dragControls.transformGroup = true; 

        scene.add(draggedGroup);


    
    // object.parent.children.forEach(child => {
      
    //   // console.log('xxxxxx child: ', child)

      
    //   // // const group = new THREE.Group();
    //   // // group.add( child );
    //   // console.log('xxxxxx draggedGroup: ', draggedGroup)
    //   // draggedGroup.add( child );
    //   // draggedGroup.name = object.parent.parent.name;



    //   // child.material.emissive.set('white'); 
    //   // draggedGroup.position.set(object.position.x, object.position.y, object.position.z); // Reset children positions to the center of the parent
    //   // // child.position.set(object.position.x, object.position.y, object.position.z); // Reset children positions to the center of the parent
    //   // draggedGroup.rotation.set(object.rotation.x, object.rotation.y, object.rotation.z); // Reset rotations if needed
    // });



  } 

});
  
// Add event listener for 'drag' to check collisions and possibly revert position
dragControls.addEventListener('drag', function(event) {
    
  orbitControls.enabled = false

  const object = event.object;
    
  // if (checkForCollisions(object)) {
  //   // Collision detected, revert to the last valid position
  //   object.position.copy(object.lastValidPosition);
  // } else {
  //   // No collision detected, update last valid position
  //   object.lastValidPosition.copy(object.position);
  // }


  
  if (object.name == "bed") {
    object.material.emissive.set('white'); 
  }
  else if (object.parent.parent.name == "couch") {
    
    console.log(' draggedGroup.position: ', draggedGroup.position)
    console.log(' draggedGroup.material: ', draggedGroup.material)
    
    // draggedGroup.material.emissive.set('white'); 
    // draggedGroup.position.set(object.position.x, object.position.y, object.position.z); // Reset children positions to the center of the parent
    // draggedGroup.rotation.set(object.rotation.x, object.rotation.y, object.rotation.z); // Reset rotations if needed
    
    // draggedGroup.position = new THREE.Vector3(2,3,4)
    // draggedGroup.position.x = 2
    // draggedGroup.position.y = 2
    // draggedGroup.position.z = 2
    
    console.log(' draggedGroup.position.x: ', draggedGroup.position.x)


      // object.parent.children.forEach(child => {

    //   child.material.emissive.set('white'); 
    //   child.position.set(object.position.x, object.position.y, object.position.z); // Reset children positions to the center of the parent
    //   child.rotation.set(object.rotation.x, object.rotation.y, object.rotation.z); // Reset rotations if needed
    // });
  } 
  else if (object.parent.name == "tvStand") {
    object.parent.children.forEach(child => {

      child.material.emissive.set('white'); 
      child.position.set(object.position.x, object.position.y, object.position.z); // Reset children positions to the center of the parent
      child.rotation.set(object.rotation.x, object.rotation.y, object.rotation.z); // Reset rotations if needed
    });
  }
  else if (object.parent.name == "indoorDogPen") {
    object.parent.children.forEach(child => {
      child.material.emissive.set('white'); 
      child.position.set(object.position.x, object.position.y, object.position.z); // Reset children positions to the center of the parent
      child.rotation.set(object.rotation.x, object.rotation.y, object.rotation.z); // Reset rotations if needed
    });
  }
  else if (object.parent.name == "blackBlueDesk") {
    object.parent.children.forEach(child => {
      child.material.emissive.set('white'); 
      child.position.set(object.position.x, object.position.y, object.position.z); // Reset children positions to the center of the parent
      child.rotation.set(object.rotation.x, object.rotation.y, object.rotation.z); // Reset rotations if needed
    });
  }
  else if (object.parent.name == "woodBlock") {
    object.parent.children.forEach(child => {
      child.material.emissive.set('white'); 
      child.position.set(object.position.x, object.position.y, object.position.z); // Reset children positions to the center of the parent
      child.rotation.set(object.rotation.x, object.rotation.y, object.rotation.z); // Reset rotations if needed
    });
  }
  else if (object.parent.name == "metalTable") {
    object.parent.children.forEach(child => {
      child.material.emissive.set('white'); 
      child.position.set(object.position.x, object.position.y, object.position.z); // Reset children positions to the center of the parent
      child.rotation.set(object.rotation.x, object.rotation.y, object.rotation.z); // Reset rotations if needed
    });
  }
  else if (object.parent.name == "leatherChair") {
    object.parent.children.forEach(child => {
      child.material.emissive.set('white'); 
      child.position.set(object.position.x, object.position.y, object.position.z); // Reset children positions to the center of the parent
      child.rotation.set(object.rotation.x, object.rotation.y, object.rotation.z); // Reset rotations if needed
    });
  }
  else if (object.parent.name == "officeStand") {
    object.parent.children.forEach(child => {
      child.material.emissive.set('white'); 
      child.position.set(object.position.x, object.position.y, object.position.z); // Reset children positions to the center of the parent
      child.rotation.set(object.rotation.x, object.rotation.y, object.rotation.z); // Reset rotations if needed
    });
  }
  else if (object.parent.name == "bookshelf") {
    object.parent.children.forEach(child => {
      child.material.emissive.set('white'); 
      child.position.set(object.position.x, object.position.y, object.position.z); // Reset children positions to the center of the parent
      child.rotation.set(object.rotation.x, object.rotation.y, object.rotation.z); // Reset rotations if needed
    });
  }
  else if (object.parent.name == "officeSamuraiPainting") {
    object.parent.children.forEach(child => {
      child.material.emissive.set('white'); 
      child.position.set(object.position.x, object.position.y, object.position.z); // Reset children positions to the center of the parent
      child.rotation.set(object.rotation.x, object.rotation.y, object.rotation.z); // Reset rotations if needed
    });
  }
  else if (object.parent.name == "officeRoshaschPainting") {
    object.parent.children.forEach(child => {
      child.material.emissive.set('white'); 
      child.position.set(object.position.x, object.position.y, object.position.z); // Reset children positions to the center of the parent
      child.rotation.set(object.rotation.x, object.rotation.y, object.rotation.z); // Reset rotations if needed
    });
  }
  else if (object.parent.name == "officeJesterPainting") {
    object.parent.children.forEach(child => {
      child.material.emissive.set('white'); 
      child.position.set(object.position.x, object.position.y, object.position.z); // Reset children positions to the center of the parent
      child.rotation.set(object.rotation.x, object.rotation.y, object.rotation.z); // Reset rotations if needed
    });
  }
  else if (object.parent.name == "entranceSamuraiPainting") {
    object.parent.children.forEach(child => {
      child.material.emissive.set('white'); 
      child.position.set(object.position.x, object.position.y, object.position.z); // Reset children positions to the center of the parent
      child.rotation.set(object.rotation.x, object.rotation.y, object.rotation.z); // Reset rotations if needed
    });
  }
  else if (object.parent.name == "livingRoomSamuraiPainting") {
    object.parent.children.forEach(child => {
      child.material.emissive.set('white'); 
      child.position.set(object.position.x, object.position.y, object.position.z); // Reset children positions to the center of the parent
      child.rotation.set(object.rotation.x, object.rotation.y, object.rotation.z); // Reset rotations if needed
    });
  } else {

  }

});

// Add event listener for 'dragstart' to update last valid position
dragControls.addEventListener('dragend', function(event) {

  const object = event.object;
  
  orbitControls.enabled = true

  if (draggedGroup.boundingBox.intersectsBox(metalTable)) {
    console.log("Collision detected!");
}
  // {b:0, g: 0, r: 0, isColor: true}

  // if (object.name == "bed") {
  //   object.material.emissive.set({b:0, g: 0, r: 0, isColor: true}); 
  // }
  // else if (object.parent.parent.name == "couch") {
  //   object.parent.children.forEach(child => {
  //     child.material.emissive.set({b:0, g: 0, r: 0, isColor: true});  
  //   });
  // } 
  // else if (object.parent.name == "tvStand") {
  //   object.parent.children.forEach(child => {
  //     child.material.emissive.set({b:0, g: 0, r: 0, isColor: true});  
  //   });
  // }
  // else if (object.parent.name == "indoorDogPen") {
  //   object.parent.children.forEach(child => {
  //     child.material.emissive.set({b:0, g: 0, r: 0, isColor: true});  
  //   });
  // }
  // else if (object.parent.name == "blackBlueDesk") {
  //   object.parent.children.forEach(child => {
  //     child.material.emissive.set({b:0, g: 0, r: 0, isColor: true});  
  //   });
  // }
  // else if (object.parent.name == "woodBlock") {
  //   object.parent.children.forEach(child => {
  //     child.material.emissive.set({b:0, g: 0, r: 0, isColor: true});  
  //   });
  // }
  // else if (object.parent.name == "metalTable") {
  //   object.parent.children.forEach(child => {
  //     child.material.emissive.set({b:0, g: 0, r: 0, isColor: true});  
  //   });
  // }
  // else if (object.parent.name == "leatherChair") {
  //   object.parent.children.forEach(child => {
  //     child.material.emissive.set({b:0, g: 0, r: 0, isColor: true});  
  //   });
  // }
  // else if (object.parent.name == "officeStand") {
  //   object.parent.children.forEach(child => {
  //     child.material.emissive.set({b:0, g: 0, r: 0, isColor: true});  
  //   });
  // }
  // else if (object.parent.name == "bookshelf") {
  //   object.parent.children.forEach(child => {
  //     child.material.emissive.set({b:0, g: 0, r: 0, isColor: true});  
  //   });
  // }
  // else if (object.parent.name == "officeSamuraiPainting") {
  //   object.parent.children.forEach(child => {
  //     child.material.emissive.set({b:0, g: 0, r: 0, isColor: true});  
  //   });
  // }
  // else if (object.parent.name == "officeRoshaschPainting") {
  //   object.parent.children.forEach(child => {
  //     child.material.emissive.set({b:0, g: 0, r: 0, isColor: true});  
  //   });
  // }
  // else if (object.parent.name == "officeJesterPainting") {
  //   object.parent.children.forEach(child => {
  //     child.material.emissive.set({b:0, g: 0, r: 0, isColor: true});  
  //   });
  // }
  // else if (object.parent.name == "entranceSamuraiPainting") {
  //   object.parent.children.forEach(child => {
  //     child.material.emissive.set({b:0, g: 0, r: 0, isColor: true});  
  //   });
  // }
  // else if (object.parent.name == "livingRoomSamuraiPainting") {
  //   object.parent.children.forEach(child => {
  //     child.material.emissive.set({b:0, g: 0, r: 0, isColor: true});  
  //   });
  // }

});




// Function to check for collisions
function checkForCollisions(currentObject) {
  // currentObject.updateMatrixWorld(true); // Update the world matrix
  
  // console.log('checkForCollisions - currentObject: ', currentObject)
  // // console.log('checkForCollisions - updateMatrixWorld: ', currentObject.updateMatrixWorld)
  // const currentBoundingBox = new THREE.Box3().setFromObject(currentObject);
  // console.log('checkForCollisions - currentBoundingBox: ', currentBoundingBox)

  // // const helper = new THREE.Box3Helper( currentBoundingBox, 0xffff00 );
  // // scene.add( helper );
  
  // for (let otherObject of draggableObjects) {
  //   otherObject.updateMatrixWorld(true); // Update the world matrix
  //   // console.log('checkForCollisions - otherObject: ', otherObject)
  //   if (otherObject !== currentObject) {
  //       // console.log('checkForCollisions - otherObject !== currentObject: ', otherObject !== currentObject)
  //         const otherBoundingBox = new THREE.Box3().setFromObject(otherObject);
  //         if (currentBoundingBox.intersectsBox(otherBoundingBox)) {
  //             // console.log("Collision detected with another object!");
  //             return true; // Collision occurred
  //         }
  //     }
  // }
  return false; // No collision
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
