var camera, scene, renderer,
    geometry, material, mesh, increment;

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

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;
    scene.add( camera );

    geometry = new THREE.CubeGeometry( 200, 200, 200 );
    material = new THREE.MeshLambertMaterial( { color: 'white', wireframe: false } );
    mesh = new THREE.Mesh( geometry, material );
    //scene.add( mesh );
    cubeSineDriver = 0;

    textGeo = new THREE.PlaneGeometry(200,100);
    THREE.ImageUtils.crossOrigin = '';
    textTexture = THREE.ImageUtils.loadTexture('images/pat_assinatura.png');
    textMaterial = new THREE.MeshLambertMaterial({color: 'white', opacity: 4, map: textTexture, transparent: true, blending: THREE.AdditiveBlending})
    text = new THREE.Mesh(textGeo,textMaterial);
    text.position.z = 800;
    scene.add(text);

    light = new THREE.DirectionalLight(0xffffff,0.9);
    light.position.set(-1,0,1);
    scene.add(light);
  
    // draw gradient

    smokeTexture = THREE.ImageUtils.loadTexture('images/Smoke-Element.png');
    smokeMaterial = new THREE.MeshLambertMaterial({color:'white',map: smokeTexture, transparent: true});
    smokeGeo = new THREE.PlaneGeometry(300,300);
    smokeParticles = [];


    for (p = 0; p < 150; p++) {
        var particle = new THREE.Mesh(smokeGeo,smokeMaterial);
        particle.position.set(Math.random()*500-250,Math.random()*500-250,Math.random()*1000-100);
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }
 
    document.getElementById('intro-canvas').appendChild( renderer.domElement );

}
 
function animate() {

    stats.begin();
    delta = clock.getDelta();
    requestAnimationFrame( animate );
    evolveSmoke();
    render();
    stats.end();
}
 
function evolveSmoke() {
    var sp = smokeParticles.length;
    while(sp--) {
        smokeParticles[sp].rotation.z += (delta * 0.2);
    }
}

function render() {

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
    cubeSineDriver += .01;
    mesh.position.z = 100 + (Math.sin(cubeSineDriver) * 500);
    renderer.render( scene, camera );
    

}

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
window.addEventListener( 'resize', onWindowResize, false );

function onViewport(element){
  var nebr = element.getBoundingClientRect();
  var yBound = {min: nebr.top, max: nebr.top + nebr.height, mid: nebr.top + (nebr.height / 2)};
  var wH = window.innerHeight;
  return (yBound.mid > 0 && yBound.mid < wH);
}

// Função para animar cenas on scroll
$(window).scroll(function() {
    var scrollTop = $(this).scrollTop();
    var elementHeight = $(this).height();

  // Função para aproximar camera
  function increment(){
      return 1000 - scrollTop;
  }

   camera.position.z = increment();

    $('.blur').css({
      opacity: function() {
        return 0.5 - (elementHeight - scrollTop) / elementHeight;
      }
    });

    if(scrollTop > elementHeight){
        $('canvas').css('position','relative');
        $('.blur').addClass('-hidden');
        $('.typing-text').addClass('-visible');
        $('.fixed-img').fadeOut(100);
    }else{
        $('canvas').css('position','fixed');
        $('.blur').removeClass('-hidden');
        $('.typing-text').removeClass('-visible');
        $('.fixed-img').fadeIn();

    }

});

// Funçao para inverter cores

// $('#invert-colors').scrollTop(function(){
//     $('body').css('backgroundColor','#FFF');
//     $('body').css('color','#000');
// });





// Função para animar envelope
(function() {
    SnapStates({
        selector: ".icon-envelope",
        transitionTime: 500,
        easing: "linear",
        states: {
            open:[
                { id: "fold-up", element: ".flap", y:-17.5, s:[1, -1] },
            ],
            close:[
                { id: "fold-down", element: ".flap", y:0, s:[1, 1] },
            ]
        },
        events: [
            { event: 'mouseenter', state: ["open", "close"] }
        ]
    });
})();


// Função para o typing
$(document).ready(function(){

  //Preloader
 
  setTimeout(function(){
    $('#loader-wrapper').addClass('-loaded');
    $('#loader-wrapper').css('z-index','0');
}, 1500);

      const text = document.getElementById('typing-text');

      // Word array
      const words = [
        "fdfdfdsfsdfs.",
        "fdsfdsfsdfsd.",
        "fsfsdf.",
        "fdssfsfs."
      ];

      setTyper(text,words);

      function setTyper(element, words) {
      
        const LETTER_TYPE_DELAY = 75;
        const WORD_STAY_DELAY = 2000;
      
        const DIRECTION_FORWARDS = 0;
        const DIRECTION_BACKWARDS = 1;
      
        var direction = DIRECTION_FORWARDS;
        var wordIndex = 0;
        var letterIndex = 0;
      
        var wordTypeInterval;
      
        startTyping();
      
        function startTyping() {
          wordTypeInterval = setInterval(typeLetter, LETTER_TYPE_DELAY);
        }
      
        function typeLetter() {
          const word = words[wordIndex];
      
          if (direction == DIRECTION_FORWARDS) {
            letterIndex++;
      
            if (letterIndex == word.length) {
              direction = DIRECTION_BACKWARDS;
              clearInterval(wordTypeInterval);
              setTimeout(startTyping, WORD_STAY_DELAY);
            }
      
          } else if (direction == DIRECTION_BACKWARDS) {
            letterIndex--;
      
            if (letterIndex == 0) {
              nextWord();
            }
          }
      
          const textToType = word.substring(0, letterIndex);
      
          element.textContent = textToType;
        }
      
        function nextWord() {
      
          letterIndex = 0;
          direction = DIRECTION_FORWARDS;
          wordIndex++;
      
          if (wordIndex == words.length) {
            wordIndex = 0;
          }

        }
      }

});
window.sr = ScrollReveal();
sr.reveal('.descriptive-text',{ delay: 200 });
sr.reveal('.typing-text',{ delay: 200 });
sr.reveal('.grid',{ delay: 200 });
sr.reveal('.photo-carved',{ scale:0.90, delay: 200 });
sr.reveal('.photo',{ scale:0.90, delay: 600 });
//How to show the color block with callback function


//Function to show modal and hide scrollable icon

$(window).scroll(function() {
    var scroll_y = window.scrollY;
    var div = $('#block').height();
	if($(window).scrollTop() + $(window).height()  > $(document).height() - 100) {
		$('.scrollable').addClass('-hidden');
        $('.modal').addClass('-visible');
	}else{
		$('.scrollable').removeClass('-hidden');
        $('.modal').removeClass('-visible');
    }

    //Function to show color block on image 
    if($(window).scrollTop() + $(window).height() > $(document).height() - div){
        $('.color-block').addClass('expand');
    }else{
        $('.color-block').removeClass('expand');
    }

    if(scroll_y > 710){
        $('#color-block-purple').addClass('expand');
    }else{
        $('#color-block-purple').removeClass('expand');
    }
});



//Function to do dinamic parallax

var value = 0;

function applyTransformY($element, value) {
    var translateString = 'translate3d(0, ' + value + 'px, 0)';
    $element.css({
        '-webkit-transform': translateString,
        '-moz-transform': translateString,
        'transform': translateString
    });
}

function makeParallax() {

    var $window = $(window);
    var $text = $('.descriptive-text');
    var $images = $('.photo-carved');
    var lastTop = 0;

    $window.on('scroll', function(e) {
        var currentTop = $window.scrollTop();
        if (currentTop > lastTop) {
            value++;
        }
        else if (currentTop < lastTop) {
            value--;
        }
        applyTransformY($text, value * .500);
        applyTransformY($images, value * .500);
        lastTop = currentTop;
    });
}

// Using anime.js

/*
    targets: 'div',
    translateX: path,
    translateY: path,
    rotate: path,

    follow the path line

*/

anime({
    targets: '.chart path',
    strokeDashoffset: function(el) {
      var pathLength = el.getTotalLength();
      el.setAttribute('stroke-dasharray', pathLength);
      return [-pathLength, 0];
    },
    stroke: {
      value: function(el, i) {
        return 'rgb(252,'+ i * 10 +',82)';
      },
      easing: 'linear',
      duration: 2000,
    },
    strokeWidth: {
      value: 6,
      easing: 'linear',
      delay: function(el, i) { 
        return 1200 + (i * 40); 
      },
      duration: 800,
    },
    delay: function(el, i) { 
      return i * 60; 
    },
    duration: 1200,
    easing: 'easeOutExpo',
    loop: true,
    direction: 'alternate'
});






