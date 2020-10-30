/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

var geometry, material, mesh;

function createScene() {
    'use strict';

    scene = new THREE.Scene();

	scene.add(new THREE.AxisHelper(10));

    // GEOMETRY
    geometry = new THREE.Geometry();
 
    // create an array of vertices by way of
    // and array of vector3 instances
    geometry.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(1, 1, 0),
        new THREE.Vector3(0, 1, 0),
 
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(1, 0, -1),
        new THREE.Vector3(1, 1, -1),
        new THREE.Vector3(0, 1, -1));
 
    // create faces by way of an array of
    // face3 instances. (you just play connect
    // the dots with index values from the
    // vertices array)
    geometry.faces.push(
        new THREE.Face3(0, 1, 2),
        new THREE.Face3(3, 0, 2),
        new THREE.Face3(4, 5, 6),
        new THREE.Face3(7, 4, 6),
 
        new THREE.Face3(0, 4, 1),
        new THREE.Face3(1, 4, 5),
        new THREE.Face3(3, 7, 2),
        new THREE.Face3(2, 7, 6));

    // compute Normals
    geometry.computeVertexNormals();
 
    // normalize the geometry
    geometry.normalize();
 
    // MESH with GEOMETRY, and Normal MATERIAL
    scene.add(new THREE.Mesh(
		// geometry as first argument
		geometry,

		// then Material
		new THREE.MeshNormalMaterial({
			side: THREE.DoubleSide
		})));
}

function createCamera() {
    'use strict';
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.x = 2;
    camera.position.y = 2;
    camera.position.z = 2;
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
