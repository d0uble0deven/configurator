import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

import GUI from 'lil-gui';



// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* 
    Lights
*/
// Entrance Light
const entranceLight = new THREE.PointLight('#FFFFE0', 100, 250, 2);
entranceLight.position.set( -2, 1, 10 );
entranceLight.castShadow = true
scene.add( entranceLight );
const entranceLightHelper = new THREE.PointLightHelper(entranceLight)
// scene.add(entranceLightHelper)

const officeLight = new THREE.PointLight('#FFFFE0', 100, 250, 2);
officeLight.position.set( -6, 3, 0 );
officeLight.castShadow = true
scene.add( officeLight );
const officeLightHelper = new THREE.PointLightHelper(officeLight)
// scene.add(officeLightHelper)

const livingRoomWindowLight = new THREE.RectAreaLight('#FFFFE0', 10, 7, 4);
livingRoomWindowLight.position.set( 1.9, 0, 10.2 );
livingRoomWindowLight.castShadow = true
scene.add( livingRoomWindowLight );
const livingRoomWindowLightHelper = new RectAreaLightHelper(livingRoomWindowLight)
// scene.add(livingRoomWindowLightHelper)




// Define materials and geometries
const wallMaterial1 = new THREE.MeshPhongMaterial({ color: 0x808080, side: THREE.DoubleSide });
const wallMaterial2 = new THREE.MeshPhongMaterial({ color: 0x808080, side: THREE.DoubleSide });
const wallMaterial3 = new THREE.MeshPhongMaterial({ color: 0x808080, side: THREE.DoubleSide });
const wallMaterial4 = new THREE.MeshPhongMaterial({ color: 0x808080, side: THREE.DoubleSide });
const floorMaterial = new THREE.MeshPhongMaterial({ color: '#C4A484', side: THREE.DoubleSide });
const ceilingMaterial = new THREE.MeshPhongMaterial({ transparent: true, opacity: 0, wireframe: false, side: THREE.DoubleSide });

const roomMaterials = [ wallMaterial1, wallMaterial2, ceilingMaterial, floorMaterial, wallMaterial3, wallMaterial4 ]
const doorMaterial = new THREE.MeshPhongMaterial({ color: 0x909090 });
const entranceWayMaterial = new THREE.MeshPhongMaterial({ color: 'black', transparent: true, opacity: 0.1, });
const windowMaterial = new THREE.MeshPhongMaterial({ color: 0xADD8E6, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
// const wallGeometry = new THREE.BoxGeometry(1, 1, 0.1);

// Cabinets materials
const woodMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513, side: THREE.DoubleSide });
const openMaterial = new THREE.MeshPhongMaterial({ color: 'black', transparent: true, opacity: 0.5 });

// Couch materials
const couchMaterial = new THREE.MeshPhongMaterial({ color: '#1560bd' }); // Light blue color
// const cushionMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff }); // White color for cushions

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

// Metal table materials
const metalTableMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 }); // Gray color for the metal

// Office chair materials
const blackLeatherMaterial = new THREE.MeshPhongMaterial({ color: 0x000000  });
const blueLeatherMaterial = new THREE.MeshPhongMaterial({ color: 0x0000FF  });

// Function to create a room
function createRoom(width, height, depth, material) {
  const room = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
  scene.add(room); 
  return room;
}

// Function to create a window
function createWindow(width, height, depth, material) {
  const windowFrame = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
  scene.add(windowFrame);
  return windowFrame;
}

// Function to create a door
function createDoor(width, height, depth, material) {
  const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
  scene.add(doorFrame);
  return doorFrame;
}

// Function to create a three-person couch
function createCouch() {
    const couch = new THREE.Group();
  
    // Create the main body of the couch
    const couchGeometry = new THREE.BoxGeometry(5, 2, 2);
    const couchBody = new THREE.Mesh(couchGeometry, couchMaterial);
    couch.add(couchBody);
  
    return couch;
}

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
  
    leg1.position.set(-1.25, -1, 0.75);
    leg2.position.set(1.25, -1, 0.75);
    leg3.position.set(-1.25, -1, -0.75);
    leg4.position.set(1.25, -1, -0.75);
  
    tvStand.add(leg1, leg2, leg3, leg4);
  
    // Create the shelf
    const shelfGeometry = new THREE.BoxGeometry(3.5, 0.1, 2);
    const shelf = new THREE.Mesh(shelfGeometry, woodTVStandMaterial);
    shelf.position.set(0, -2, 0);
    tvStand.add(shelf);
  
    // Create the TV mount
    const mountGeometry = new THREE.BoxGeometry(2, 0.2, 0.5);
    const mount = new THREE.Mesh(mountGeometry, metalMaterial);
    mount.position.set(0, 1, 0.75);
    tvStand.add(mount);
  
    // Create the glass shelf
    const glassShelfGeometry = new THREE.BoxGeometry(3.5, 0., 2);
    const glassShelf = new THREE.Mesh(glassShelfGeometry, glassMaterial);
    glassShelf.position.set(0, 0.5, 0);
    tvStand.add(glassShelf);
  
    return tvStand;
  }

// Function to create a floor-to-ceiling bookshelf
function createBookshelf() {
    const bookshelf = new THREE.Group();
  
    // Create the vertical elements (bookshelf supports)
    const supportGeometry = new THREE.BoxGeometry(1, 3, 0.5);
  
    for (let i = 0; i < 2; i++) {
      const support = new THREE.Mesh(supportGeometry, woodShelfMaterial);
      support.position.set(-4 + (i * 1), 1.5, 0);
      bookshelf.add(support);
    }
  
    // Create the horizontal elements (shelves)
    const shelfGeometry = new THREE.BoxGeometry(2, 0.2, 1);

    for (let i = 0; i < 4; i++) {
        const shelf = new THREE.Mesh(shelfGeometry, woodShelfMaterial);
        shelf.position.set(-3.5, i, 0.5);
        bookshelf.add(shelf);

        // // Add some books on the shelf
        // for (let j = 0; j < 3; j++) {
        // const book = new THREE.Mesh(new THREE.BoxGeometry(.5, 0.2, 1), bookMaterial);
        // book.position.set(-4.5 + j, 0.4 + i, 0.75 + Math.random() * 0.2);
        // book.rotateZ(Math.PI / 2)
        // bookshelf.add(book);
        // }
    }

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
  
    return desk;
  }

// Create living room with office space
const livingRoom = createRoom(15, 5, 15, roomMaterials);
livingRoom.position.set(0, 0, 2.5);

// Create kitchen
const kitchen = createRoom(10, 5, 5, roomMaterials);
kitchen.position.set(2.5, 0, -2.5);

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
pantryDoor.position.set(-1.5, -0.5, -2.5);

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

// Create the three-person couch
const couch = createCouch();
scene.add(couch);
couch.position.set(0, -1, 6.5)
couch.rotateY(Math.PI / 2)
  
// Create the wood block with cubby holes
const woodBlock = createWoodBlock();
scene.add(woodBlock);
woodBlock.position.set(-7.9, -1, 6)
woodBlock.rotateY(Math.PI / 2)

// Create the indoor dog pen
const indoorDogPen = createIndoorDogPen();
scene.add(indoorDogPen);
indoorDogPen.position.set(5.9, -1, 2)

// Create the black and blue desk
const blackBlueDesk = createBlackBlueDesk();
scene.add(blackBlueDesk);
blackBlueDesk.position.set(-5.5, -1, 1)

// Create the bookshelf
const bookshelf = createBookshelf();
scene.add(bookshelf);
bookshelf.position.set(2, -2, .3)

// Create the TV stand
const tvStand = createTVStand();
scene.add(tvStand);
tvStand.position.set(5, -1, 7)
tvStand.rotateY(Math.PI / 3)

// Create the flat-screen TV
const flatScreenTV = createFlatScreenTV();
scene.add(flatScreenTV);
flatScreenTV.position.set(5, 1.3, 7.1)
flatScreenTV.rotateY( (- Math.PI - 3.5) / 3 )

// Create the metal table
const metalTable = createMetalTable();
scene.add(metalTable);
metalTable.position.set(-2, -1, 6.5)
metalTable.rotateY(Math.PI / 2)

// Create the office stand
const officeStand = createOfficeStand();
scene.add(officeStand);
officeStand.position.set(-6, -1, -2)

// Create the leather chair
const leatherChair = createLeatherChair();
scene.add(leatherChair);
leatherChair.position.set(-5.5, -1.7, 0)

// Set camera position
camera.position.set(0, 5, 15);
camera.lookAt(0, 0, 0);

// Set up controls
const controls = new OrbitControls(camera, renderer.domElement);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

animate();
