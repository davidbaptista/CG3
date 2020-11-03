let camera, scene, renderer;

let geometry, material, mesh, obj;

let rotateCarAndStage;

let rotate = [0, 0], lights = [0, 0, 0];

let clock = new THREE.Clock();

let aspectRatio = window.innerHeight / window.innerWidth;

let perspective = true;

const cameraSize = 35;

let meshList = [];

function createFloor(s) {
	'use strict';

	geometry = new THREE.PlaneGeometry(s, s, 1);
	material = new THREE.MeshStandardMaterial({color: 0x78829C, wireframe: false});
    mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    meshList.push(mesh);

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
	material = new THREE.MeshStandardMaterial({color: 0xBDC0C7});
    mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
	mesh.position.set(0, 0, 0);
	obj = new THREE.Object3D();
    obj.add(mesh);

	scene.add(obj);

	return obj;
}

function createBox(l, h, w) {
    'use strict';

    geometry = new THREE.BoxGeometry(l, h, w);
    let materials = [
        new THREE.MeshBasicMaterial({color: 0x3D3D3D, side: THREE.DoubleSide}),
        new THREE.MeshLambertMaterial({color: 0x3D3D3D}),
        new THREE.MeshPhongMaterial({color: 0x3D3D3D}),
    ];
    mesh = new THREE.Mesh(geometry, materials);
    mesh.position.set(0, 0, 0);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    console.log(mesh);

    for(let j = 0; j < mesh.geometry.faces.length; j++){
        mesh.geometry.faces[j].materialIndex = 0;
    }

    meshList.push(mesh);
	
	return mesh;
}

function createSphere(r) {
	'use strict'

    geometry = new THREE.SphereGeometry(r, 16, 16)
    let materials = [
        new THREE.MeshBasicMaterial({color: 0x303030}),
        new THREE.MeshLambertMaterial({color: 0x303030}),
        new THREE.MeshPhongMaterial({color: 0x303030}),
    ];
	mesh = new THREE.Mesh(geometry, materials);
    mesh.position.set(0, 0, 0);
    meshList.push(mesh);
    obj = new THREE.Object3D();
	obj.add(mesh);

	return obj;
}

function createCone(r) {
	'use strict'

    geometry = new THREE.ConeGeometry(r, r, 32);
    let materials = [
        new THREE.MeshBasicMaterial({color: 0x303030}),
        new THREE.MeshLambertMaterial({color: 0x303030}),
        new THREE.MeshPhongMaterial({color: 0x303030}),
    ];
	mesh = new THREE.Mesh(geometry, materials);
    mesh.position.set(0, 0, 0);
    meshList.push(mesh);
    obj = new THREE.Object3D();
	obj.add(mesh);

	return mesh;
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
    
	obj.rotateY(Math.PI);
	obj.translateX(-16.25);
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
		// 11

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
		new THREE.Vector3(16, 4.5, -5),
        // 22
		
		new THREE.Vector3(-1, 1, 3),
		new THREE.Vector3(-1, 4, 3),
		new THREE.Vector3(3, 5, 5),
		//25

		new THREE.Vector3(-1, 1, -3),
		new THREE.Vector3(-1, 4, -3),
		new THREE.Vector3(3, 5, -5),
		//28
		);

 
    body.faces.push(
		// left side
        new THREE.Face3(7, 6, 0),
        new THREE.Face3(0, 1, 7),
        new THREE.Face3(10, 7, 1),
        new THREE.Face3(1, 2, 10),
        new THREE.Face3(2, 9, 10),
        new THREE.Face3(2, 3, 9),
        new THREE.Face3(3, 4, 9),
        new THREE.Face3(4, 5, 9),
        new THREE.Face3(5, 8, 9),
        new THREE.Face3(5, 6, 8),
        new THREE.Face3(6, 7, 8),

		// right side
        new THREE.Face3(0+11, 6+11, 7+11),
        new THREE.Face3(7+11, 1+11, 0+11),
        new THREE.Face3(1+11, 7+11, 10+11),
        new THREE.Face3(10+11, 2+11, 1+11),
        new THREE.Face3(10+11, 9+11, 2+11),
        new THREE.Face3(9+11, 3+11, 2+11),
        new THREE.Face3(9+11, 4+11, 3+11),
        new THREE.Face3(9+11, 5+11, 4+11),
        new THREE.Face3(9+11, 8+11, 5+11),
        new THREE.Face3(8+11, 6+11, 5+11),
		new THREE.Face3(8+11, 7+11, 6+11),

		// front side 
		new THREE.Face3(23, 6, 5),
		new THREE.Face3(5+11, 6+11, 26),
		new THREE.Face3(5, 5+11, 26),
		new THREE.Face3(26, 23, 5),

		// left light
		new THREE.Face3(23, 22, 0),
		new THREE.Face3(0, 6, 23),

		// right light
		new THREE.Face3(11, 25, 26),
		new THREE.Face3(26, 6 + 11, 11),

		// bumper
		new THREE.Face3(22, 23, 25),
		new THREE.Face3(26, 25, 23),

		// rear
		new THREE.Face3(3+11, 4, 3),
		new THREE.Face3(4, 3+11, 4+11),

		// reat top part
		new THREE.Face3(4, 4+11, 5),
		new THREE.Face3(5, 4+11, 5+11),
		);
		
 
    body.computeVertexNormals();
    let materials = [
        new THREE.MeshBasicMaterial({color: 0x404040}), //specular: 0xc5c5c5
        new THREE.MeshLambertMaterial({color: 0x404040}),
        new THREE.MeshPhongMaterial({color: 0x404040}),
    ];
    mesh = new THREE.Mesh(body, materials)
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    meshList.push(mesh);
    obj = new THREE.Object3D();
    obj.add(mesh);

    return obj;
}

function createWindows() {
    'use strict'
    
    let leftWindow = new THREE.Geometry();
    let rightWindow = new THREE.Geometry();
    let frontWindow = new THREE.Geometry();

    leftWindow.vertices.push (
        new THREE.Vector3(3, 4, 5),
        new THREE.Vector3(11, 7, 4.75),
        new THREE.Vector3(16, 6, 5),
        new THREE.Vector3(16, 4.5, 5),
    );

    leftWindow.faces.push (
        new THREE.Face3(2, 1, 0),
        new THREE.Face3(2, 0, 3)
    );

    rightWindow.vertices.push (
        new THREE.Vector3(3, 4, -5),
        new THREE.Vector3(11, 7, -4.75),
        new THREE.Vector3(16, 6, -5),
        new THREE.Vector3(16, 4.5, -5),
    );

    rightWindow.faces.push (
        new THREE.Face3(0, 1, 2),
        new THREE.Face3(0, 2, 3)
    );

    frontWindow.vertices.push(
        new THREE.Vector3(4, 5.7, 3.50),
        new THREE.Vector3(9, 7.5, 3.25),
        new THREE.Vector3(4, 5.7, -3.50),
        new THREE.Vector3(9, 7.5, -3.25),
    );

    frontWindow.faces.push(
        new THREE.Face3(0, 1, 2),
        new THREE.Face3(3, 2, 1)
    );

    let windows = new THREE.Object3D();

    leftWindow.computeVertexNormals();
    let materials = [
        new THREE.MeshBasicMaterial({color: 0xa3a3a3}), //specular: 0xc5c5c5
        new THREE.MeshLambertMaterial({color: 0xa3a3a3}),
        new THREE.MeshPhongMaterial({color: 0xa3a3a3}),
    ];
    mesh = new THREE.Mesh(leftWindow, materials);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    obj = new THREE.Object3D();
    meshList.push(mesh);
    windows.add(mesh);

    rightWindow.computeVertexNormals();
    mesh = new THREE.Mesh(rightWindow, materials);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    meshList.push(mesh);
    windows.add(mesh);

    frontWindow.computeVertexNormals();
    mesh = new THREE.Mesh(frontWindow, materials);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    meshList.push(mesh);
    windows.add(mesh);

    return windows;
}

function createHeadlights() {
    'use strict'
    let frontHeadlight = new THREE.Geometry();
    let backHeadlight = new THREE.Geometry();

    frontHeadlight.vertices.push (
        new THREE.Vector3(0-0.01, 4, 5),
        new THREE.Vector3(0-0.01, 3.8, 5),
        new THREE.Vector3(-1-0.01, 4, 3),
        new THREE.Vector3(-1-0.01, 3.8, 3),

        new THREE.Vector3(0-0.01, 4, -5),
        new THREE.Vector3(0-0.01, 3.8, -5),
        new THREE.Vector3(-1-0.01, 4, -3),
        new THREE.Vector3(-1-0.01, 3.8, -3),
    );

    frontHeadlight.faces.push (
        new THREE.Face3(2, 1, 0),
        new THREE.Face3(1, 2, 3),

        new THREE.Face3(4, 5, 6),
        new THREE.Face3(7, 6, 5),

        new THREE.Face3(2, 6, 7),
        new THREE.Face3(7, 3, 2)
    );

    backHeadlight.vertices.push (
        new THREE.Vector3(25+0.01, 6, 5),
        new THREE.Vector3(24.96, 5.8, 5),

        new THREE.Vector3(25+0.01, 6, -5),
        new THREE.Vector3(24.96, 5.8, -5),
    );

    backHeadlight.faces.push (
        new THREE.Face3(0, 1, 2),
        new THREE.Face3(3, 2, 1)
    );

    let headLights = new THREE.Object3D();

    frontHeadlight.computeVertexNormals();
    let materials1 = [
        new THREE.MeshBasicMaterial({color: 0xF0F0F0}),
        new THREE.MeshLambertMaterial({color: 0xF0F0F0}),
        new THREE.MeshPhongMaterial({color: 0xF0F0F0}),
    ];
    mesh = new THREE.Mesh(frontHeadlight, materials1);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    obj = new THREE.Object3D();
    obj.add(mesh)
    meshList.push(mesh);;
    headLights.add(obj);

    backHeadlight.computeVertexNormals();
    let materials2 = [
        new THREE.MeshBasicMaterial({color: 0xFF0000}),
        new THREE.MeshLambertMaterial({color: 0xFF0000}),
        new THREE.MeshPhongMaterial({color: 0xFF0000}),
    ];
    mesh = new THREE.Mesh(backHeadlight, materials2);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    obj = new THREE.Object3D();
    obj.add(mesh);
    meshList.push(mesh);
    headLights.add(obj);

    return headLights;
}

function createLights(x, y, z) {
    let lightbox = new THREE.Object3D();
    lightbox.add(createSphere(1).translateY(1));
    lightbox.add(createCone(1.5));
    lightbox.position.set(x, y ,z);
    lightbox.lookAt(new THREE.Vector3(0, y*2, 0));

    scene.add(lightbox);

    const spotLight = new THREE.SpotLight(0xffffff, 0.7);
    spotLight.position.set(lightbox.position.x, lightbox.position.y, lightbox.position.z);
    spotLight.target.position.set(0, 0, 0);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048; 
    spotLight.shadow.mapSize.height = 2048; 
    spotLight.shadow.camera.near = 0.5;
    spotLight.shadow.camera.far = 200;
    spotLight.shadow.radius = 1.5;
    spotLight.shadow.type = THREE.PCFSoftShadowMap;
 
    return spotLight;
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();

	scene.add(new THREE.AxisHelper(10));

	createFloor(70);
    let stage = createCylinder(15, 2);
    stage.children[0].material.receiveShadow = true;
    stage.children[0].material.color.setHex(0x6B611F);
    let car = new THREE.Object3D();
    car.add(createChassis());
    car.add(createBody());
    car.add(createWindows());
    car.add(createHeadlights());
    car.translateX(-12);
    car.translateY(3);

    rotateCarAndStage = new THREE.Object3D();
    rotateCarAndStage.add(car);
    rotateCarAndStage.add(stage);

    scene.add(rotateCarAndStage);
    
    
    let l1 = createLights(20,20,0);
    scene.add(l1);
    scene.add(l1.target);

    let l2 = createLights(-10,20,17);
    scene.add(l2);
    scene.add(l2.target);

    let l3 = createLights(-10,20,-17);
    scene.add(l3);
    scene.add(l3.target);
    
    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(15, 1, 15);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
}

function createCamera() {
	'use strict';
	//camera = new THREE.OrthographicCamera(-cameraSize, cameraSize, cameraSize*aspectRatio, -cameraSize*aspectRatio, 1, 1000);
	camera = new THREE.PerspectiveCamera(60,  window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.x = -30;
    camera.position.y = 30;
	camera.position.z = -30;
    camera.lookAt(scene.position);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

	if(perspective) {
		if (window.innerHeight > 0 && window.innerWidth > 0) {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		}
	}
	else {
		aspectRatio = window.innerHeight / window.innerWidth;
		camera.top = cameraSize * aspectRatio;
		camera.bottom = cameraSize * - aspectRatio;
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
        for(let i = 0; i < meshList.length; i++){
            for(let j = 0; j < meshList[i].geometry.__directGeometry.groups.length; j++){
                if(meshList[i].geometry.__directGeometry.groups[j].materialIndex == 0){
                    meshList[i].geometry.__directGeometry.groups[j].materialIndex = 1;
                }
                else {
                    meshList[i].geometry.__directGeometry.groups[j].materialIndex = 0;
                }
            }
        }
		break;
	case 49: // 1
		break;
	case 50: // 2
		break;
	case 51: // 3
		break;
	case 52: // 4
		perspective = true;
		camera = new THREE.PerspectiveCamera(60,  window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.x = -30;
		camera.position.y = 30;
		camera.position.z = -30;
		camera.lookAt(scene.position);
		break;
	case 53: // 5
		perspective = false;
		camera = new THREE.OrthographicCamera(-cameraSize, cameraSize, cameraSize*aspectRatio, -cameraSize*aspectRatio, 1, 1000);
		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 20;
		camera.lookAt(scene.position);
		break;
    case 37: //<-
        rotate[0] = 1;
            break;
    case 39: //->
        rotate[1] = 1;
            break;
    }
}

function onKeyUp(e) {
	'use strict';

	switch(e.keyCode) {
        case 37: //<-
            rotate[0] = 0;
            break;
        case 39: //->
            rotate[1] = 0;
            break;		
	}
}

function render() {
    'use strict';
    renderer.shadowMap.enabled = true;
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';
    let rotationSpeed = Math.PI;
    let delta = 0;
    delta = clock.getDelta();
    rotateCarAndStage.rotateY(rotationSpeed * delta * (rotate[0] - rotate[1]));
    render();

    requestAnimationFrame(animate);
}
