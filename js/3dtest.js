var camera, scene, renderer,
    geometry, material, mesh, increment, raycaster, projector;


init();
animate();

function init() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'fixed';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    stats.domElement.style.opacity = '0';
    document.body.appendChild(stats.domElement);

    clock = new THREE.Clock();

    renderer = new THREE.WebGLRenderer();

    renderer.setSize( window.innerWidth, window.innerHeight );


    scene = new THREE.Scene();

    scene.background = new THREE.Color( 0x00000 );


    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.lookAt(0, 0, 1);
    camera.position.z = 1000;
    camera.position.x = 0;
    camera.position.y = 10;


    scene.add( camera );

    var cam = document.querySelector('#space');
    cam.setAttribute( 'orbit-controls', 'enabled', false);
    cam.setAttribute( 'position', '0 2 10');
    cam.setAttribute( 'orbit-controls', 'enabled', true);



    // controls - orbit controls js
    controls = new THREE.OrbitControls( camera );
    controls.update();
    controls.minDistance = 300;
    controls.maxDistance = 2000;
    //controls.maxPolarAngle = Math.PI/2;
    controls.maxPolarAngle = Math.PI; // radians

    geometry = new THREE.CubeGeometry( 200, 200, 200 );
    material = new THREE.MeshLambertMaterial( { color: 'white', wireframe: false } );
    mesh = new THREE.Mesh( geometry, material );
    //scene.add( mesh );
    cubeSineDriver = 0;

    textGeo = new THREE.PlaneGeometry(200,100);
    THREE.ImageUtils.crossOrigin = '';
    textTexture = THREE.ImageUtils.loadTexture('images/1.jpg');
    textMaterial = new THREE.MeshLambertMaterial({color: 'white', opacity: 4, map: textTexture, side: THREE.DoubleSide, transparent: true, blending: THREE.AdditiveBlending})
    text = new THREE.Mesh(textGeo,textMaterial);
    text.position.z = 400;
    scene.add(text);



    // lighting

    light = new THREE.DirectionalLight(0xffffff,1);
    light2 = new THREE.DirectionalLight(0xffffff,1);
    light3 = new THREE.DirectionalLight(0xffffff,0.5);
    light4 = new THREE.DirectionalLight(0xffffff,0.5);
    light5 = new THREE.DirectionalLight(0xffffff,1);

    light.position.set(-1,1,1);
    light2.position.set(-1,150,1);
    light3.position.set(-1,1,500);
    light4.position.set(200,1,1);
    light5.position.set(-1,1,-500);


    scene.add(light);
    scene.add(light2);
    scene.add(light3);
    scene.add(light4);
    scene.add(light5);



    // draw squares - SQUARES

    cubeTexture = THREE.ImageUtils.loadTexture('images/browser.svg');
    cubeMaterial = new THREE.MeshLambertMaterial({color:'white',map: cubeTexture, transparent:true, side: THREE.DoubleSide});
    cubeGeo = new THREE.PlaneGeometry(300,300);
    cube = new THREE.Mesh(cubeGeo,cubeMaterial);
    //cube.doubleSided = true;
    cube2 = new THREE.Mesh(cubeGeo,cubeMaterial);
    cube3 = new THREE.Mesh(cubeGeo,cubeMaterial);
    cube4 = new THREE.Mesh(cubeGeo,cubeMaterial);
    cube5 = new THREE.Mesh(cubeGeo,cubeMaterial);

    cube.position.z = 800;
    cube2.position.z = 100;
    cube3.position.z = 400;
    cube3.position.y = -140;
    cube3.rotation.x = -7.9;
    cube4.position.z = 800;
    cube4.rotation.y = -300;
    cube5.position.z = 100;
    cube5.position.y = -310;



    scene.add(cube);
    scene.add(cube2);
    scene.add(cube3);
    scene.add(cube4);
    scene.add(cube5);

    // draw tree - TREE
    treeTexture = THREE.ImageUtils.loadTexture('images/tree.png');
    treeMaterial = new THREE.MeshLambertMaterial({color:'white',map: treeTexture, transparent:true, side: THREE.DoubleSide});
    treeGeo = new THREE.PlaneGeometry(200,200);
    tree = new THREE.Mesh(treeGeo,treeMaterial);
    tree.doubleSided = true;

    tree.position.z = 500;
    tree.position.x = -200;


    scene.add(tree);

document.getElementById('space').appendChild( renderer.domElement );
document.addEventListener('mousemove', onMouseMove, false);
//document.getElementById('space-two').appendChild( renderer_two.domElement );
}



function animate() {

    stats.begin();
    delta = clock.getDelta();
    requestAnimationFrame( animate );
    controls.update();
    //evolveSmoke();
    render();
    stats.end();
}

//Play sound when passing on z = 300

function doSomething(){

    var audioLoader = new THREE.AudioLoader();
    audioLoader.load( 'sounds/airplane-landing_daniel_simion.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setRefDistance( 20 );

    });

    
    if(camera.position.z > 300){
        // scene.background = new THREE.Color( 0x000000 );
        // camera.position.y = -200;
        $('.text').css('display','none');
        sound.stop();
        camera.position.set(0, 0, 1200); // Reset position
        controls.update(); 

    }else {
        // scene.background = new THREE.Color( 0xFF7D7D );
        // stop not working
        $('.text').css('display','block');
        sound.play();
        controls.noRotate = true; //total rotation unavailable
        camera.position.y = -410;
        camera.position.x = 0;
        // controls.enabled = false; disables OrbitControls
    }
}


function playOtherSound(){

    var audioLoader2 = new THREE.AudioLoader();
    audioLoader2.load( 'sounds/labrador-barking-daniel_simon.mp3', function( buffer ) {
        sound2.setBuffer( buffer );
        sound2.setRefDistance( 20 );

    });

    
    if(camera.position.z > 500){
        // scene.background = new THREE.Color( 0x000000 );
        //camera.position.y = -200;
        sound2.play();
        $('.-two').css('display','block');

    }else if (camera.position.z > 800) {
        // scene.background = new THREE.Color( 0xFF7D7D );
        // stop not working
        $('.-two').css('display','none');
        sound2.stop();
    }else if(camera.position.z < 500){
        $('.-two').css('display','none');

    }
}


function onMouseMove(event) {
    mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;
    camera.position.x += (mouseX - camera.position.x) * 0.005;
    camera.position.y += (mouseY - camera.position.y) * 0.005;
    //set up camera position
    camera.lookAt(scene.position);
};

function render() {

    mesh.rotation.x += 0.005;
    //mesh.rotation.y += 0.01;
    cubeSineDriver += .01;
    mesh.position.z = 100 + (Math.sin(cubeSineDriver) * 500);
    //camera.lookAt(scene.position); 
    renderer.render( scene, camera );

}

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
window.addEventListener( 'resize', onWindowResize, false );

document.addEventListener('wheel', function(event){
    console.log(event.deltaY);
    doSomething();
    playOtherSound();
}, false);


// create an AudioListener and add it to the camera
var listener = new THREE.AudioListener();
camera.add( listener );

// create the PositionalAudio object (passing in the listener)
var sound = new THREE.PositionalAudio( listener );
var sound2 = new THREE.PositionalAudio( listener );


// load a sound and set it as the PositionalAudio object's buffer - DONE AT DOSOMETHING FUNCTION


// create an object for the sound to play from
var sphere = new THREE.SphereGeometry( 20, 32, 16 );
var material = new THREE.MeshPhongMaterial( { color: rgba(255,255,255,0) } );
var mesh = new THREE.Mesh( sphere, material );
scene.add( mesh );

// finally add the sound to the mesh
mesh.add( sound );
mesh.add( sound2 );



