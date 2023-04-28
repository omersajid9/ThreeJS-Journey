import * as THREE from 'three';

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial( {color: "red"} );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const size = {
    height : 600,
    width : 800,
}

const camera = new THREE.PerspectiveCamera( 75, size.width / size.height, 1, 1000);
camera.position.z = 3;
camera.position.x = 1;
camera.position.y = .5;
scene.add( camera );

const renderer = new THREE.WebGLRenderer( { canvas: canvas });
renderer.setSize(size.width, size.height);

renderer.render(scene, camera);