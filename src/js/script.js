/*global THREE, requestAnimationFrame, console*/

let camera, scene, renderer;

let geometry, material, mesh, obj;

const aspectRatio = window.innerHeight / window.innerWidth;


function createFloor(s) {
	'use strict';

	geometry = new THREE.PlaneGeometry(s, s, 1);
	material = new THREE.MeshBasicMaterial({color: 0x78829C, wireframe: false});
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(0, 0, 0);
	obj = new THREE.Object3D();
	obj.add(mesh);

	scene.add(obj);

	obj.rotateX(-Math.PI / 2);

	return obj;
}

function createCylinder(w, h) {
	'use strict';

	geometry = new THREE.CylinderGeometry(w, w, h, 64);
	material = new THREE.MeshBasicMaterial({color: 0xBDC0C7});
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(0, 0, 0);
	obj = new THREE.Object3D();
	obj.add(mesh);

	scene.add(obj);

	return obj;
}

function createBox(l, h, w) {
    'use strict';

    geometry = new THREE.CubeGeometry(l, h, w);
    material = new THREE.MeshBasicMaterial({color: 0x3D3D3D});
    mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0, 0, 0);
	
	obj = new THREE.Object3D();
	obj.add(mesh);

	return obj;
}

function createChassis() {
	'use strict';

	const thickness = 0.5;
	let b1 = createBox(15, thickness, thickness);
	b1.translateZ(3);
	let b2 = createBox(15, thickness, thickness);
	b2.translateZ(-3);

	let b3 = createBox(2, thickness, thickness);
	b3.translateZ(2);
	b3.translateX(7.25);
	b3.rotateY(Math.PI / 2);
	let b4 = createBox(2, thickness, thickness);
	b4.translateZ(-2);
	b4.translateX(7.25);
	b4.rotateY(-Math.PI / 2);

	let b5 = createBox(6.5, thickness, thickness)
	b5.translateX(-7.5);
	b5.rotateY(Math.PI / 2);

	let b6 = createBox(9, thickness, thickness)
	b6.translateZ(1.25);
	b6.translateX(11.75);
	let b7 = createBox(9, thickness, thickness)
	b7.translateZ(-1.25);
	b7.translateX(11.75);

	let b8 = createBox(2, thickness, thickness);
	b8.translateX(16);
	b8.rotateY(Math.PI / 2);

	// back wheels supports
	let b9 = createBox(1, thickness, thickness);
	b9.translateX(-4.5);
	b9.translateZ(3.75);
	b9.rotateY(-Math.PI / 2);
	let b10 = createBox(1, thickness, thickness);
	b10.translateX(-4.5);
	b10.translateZ(-3.75);
	b10.rotateY(Math.PI / 2);

	// front wheels supports
	let b11 = createBox(3, thickness, thickness);
	b11.translateX(13.5);
	b11.translateZ(3);
	b11.rotateY(-Math.PI / 2);
	let b12 = createBox(3, thickness, thickness);
	b12.translateX(13.5);
	b12.translateZ(-3);
	b12.rotateY(Math.PI / 2);

	let c1 = createCylinder(2, 1.5);
	c1.translateX(-4.5);
	c1.translateZ(5);
	c1.rotateX(Math.PI / 2);
	let c2 = createCylinder(2, 1.5);
	c2.translateX(-4.5);
	c2.translateZ(-5);
	c2.rotateX(-Math.PI / 2);

	let c3 = createCylinder(2, 1.5);
	c3.translateX(13.5);
	c3.translateZ(5);
	c3.rotateX(Math.PI / 2);
	let c4 = createCylinder(2, 1.5);
	c4.translateX(13.5);
	c4.translateZ(-5);
    c4.rotateX(-Math.PI / 2);
    
    obj = new THREE.Object3D();

	obj.add(b1);
	obj.add(b2);
	obj.add(b3);
	obj.add(b4);
	obj.add(b5);
	obj.add(b6);
	obj.add(b7);
	obj.add(b8);
	obj.add(b9);
	obj.add(b10);
	obj.add(b11);
	obj.add(b12);
	obj.add(c1);
	obj.add(c2);
	obj.add(c3);
	obj.add(c4);

    scene.add(obj);
	
	//obj.translateY(3);
    obj.translateX(4.25);
    return obj;
}

function createBody() {
    'use strict'

    let body = new THREE.Geometry();
 
    body.vertices.push(
        new THREE.Vector3(0, 0, 5),
        new THREE.Vector3(19, 0, 5),
        new THREE.Vector3(23, 1, 5),
        new THREE.Vector3(24, 1, 5),
        new THREE.Vector3(25, 6, 5),
        new THREE.Vector3(11, 8, 4),
        new THREE.Vector3(0, 4, 5),
        new THREE.Vector3(3, 4, 5),
        new THREE.Vector3(11, 7, 4.75),
        new THREE.Vector3(16, 6, 5),
        new THREE.Vector3(16, 4.5, 5),

        
        new THREE.Vector3(0, 0, -5),
        new THREE.Vector3(19, 0, -5),
        new THREE.Vector3(23, 1, -5),
        new THREE.Vector3(24, 1, -5),
        new THREE.Vector3(25, 6, -5),
        new THREE.Vector3(11, 8, -4),
        new THREE.Vector3(0, 4, -5),
        new THREE.Vector3(3, 4, -5),
        new THREE.Vector3(11, 7, -4.75),
        new THREE.Vector3(16, 6, -5),
        new THREE.Vector3(16, 4.5, -5));

 
    body.faces.push(
 
        new THREE.Face3(0, 6, 7),
        new THREE.Face3(0, 1, 7),
        new THREE.Face3(1, 7, 10),
        new THREE.Face3(1, 2, 10),
        new THREE.Face3(2, 9, 10),
        new THREE.Face3(2, 3, 9),
        new THREE.Face3(3, 4, 9),
        new THREE.Face3(4, 5, 9),
        new THREE.Face3(5, 8, 9),
        new THREE.Face3(5, 6, 8),
        new THREE.Face3(6, 7, 8),

        new THREE.Face3(0+11, 6+11, 7+11),
        new THREE.Face3(0+11, 1+11, 7+11),
        new THREE.Face3(1+11, 7+11, 10+11),
        new THREE.Face3(1+11, 2+11, 10+11),
        new THREE.Face3(2+11, 9+11, 10+11),
        new THREE.Face3(2+11, 3+11, 9+11),
        new THREE.Face3(3+11, 4+11, 9+11),
        new THREE.Face3(4+11, 5+11, 9+11),
        new THREE.Face3(5+11, 8+11, 9+11),
        new THREE.Face3(5+11, 6+11, 8+11),
        new THREE.Face3(6+11, 7+11, 8+11));

 
    body.computeVertexNormals();
    //body.normalize();
    material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
    mesh = new THREE.Mesh(body, material)
    obj = new THREE.Object3D();
    obj.add(mesh);
    scene.add(obj);

    return obj;
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();

	scene.add(new THREE.AxisHelper(10));

	//createFloor(50);
	//let stage = createCylinder(15, 2);
	//stage.children[0].material.color.setHex(0xffff00);
    let chassis = createChassis();
    chassis.rotateY(Math.PI)
    let body = createBody();
    body.translateX(-12);
}

function createCamera() {
	'use strict';
	const cameraSize = 25;
	camera = new THREE.OrthographicCamera(-cameraSize, cameraSize, cameraSize*aspectRatio, -cameraSize*aspectRatio, 1, 1000);
	//camera = new THREE.PerspectiveCamera(70,  window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.x = 20;
    camera.position.y = 20;
    camera.position.z = 20;
    camera.lookAt(scene.position);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
    case 65: //A
    case 97: //a
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;
    case 69:  //E
    case 101: //e
        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;
    }
}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

    render();

    requestAnimationFrame(animate);
}
