;(function(document, window){
  "use strict";

  /*
    Base
    ========================================================================== */

  var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
      'MozTransition'    : 'transitionend',      // only for FF < 15
      'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
    },
    transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ],

    animEndEventNames = {
      'WebkitAnimation' : 'webkitAnimationEnd',
      'OAnimation' : 'oAnimationEnd',
      'msAnimation' : 'MSAnimationEnd',
      'animation' : 'animationend'
    },
    animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];


  /*
    Barbie
    ========================================================================== */

  var barbieImg = document.getElementById( 'barbie_img' ),
    //barbieFront = barbieImg.getElementsByClassName( 'barbie__img__front' )[0];

    setFinalState = function(){
      barbieImg.classList.remove( 'barbie__img--animating' );

      barbieImg.classList.toggle( 'barbie__img--opened' );
      barbieImg.classList.toggle( 'barbie__img--closed' );
    };


  // no need to animate if there's no JS
  barbieImg.classList.add( 'barbie__img--closed' );

  barbieImg.addEventListener( 'click', function(){
    if ( Modernizr.cssanimations ){
      // fix for flickering of the first animation
      // css-only methods (like backface-visiblity) doesn't work
      requestAnimationFrame( function(){
        barbieImg.classList.add( 'barbie__img--animating' );
      });
    } else {
      setFinalState();
    }

    barbieImg.title = barbieImg.title == "Open" ? "Close" : "Open";
  });

  // set final state after on animation end
  barbieImg.addEventListener( animEndEventName, setFinalState );




  /*
    Beatles
    ========================================================================== */


  var beatlesRoad = document.getElementById( 'beatles_road' ),
    beatlesFront = document.getElementById( 'beatles_front' );

    function showMap(){
      beatlesRoad.classList.add( 'beatles__road--opened' );
      beatlesRoad.classList.remove( 'beatles__road--closed' );

      //beatlesRoad.removeEventListener( 'click', showMap );
      //beatlesFront.addEventListener( 'click', hideMap );
    }
    // function hideMap(){
    //   beatlesRoad.classList.remove( 'beatles__road--opened' );
    //   beatlesRoad.classList.add( 'beatles__road--closed' );

    //   beatlesFront.removeEventListener( 'click', hideMap );
    //   beatlesRoad.addEventListener( 'click', showMap );
    // }

  beatlesRoad.addEventListener( 'click', showMap );

  // GMaps

  var beatlesMap,
    initGMaps = function(){
      // Enable the visual refresh
      //google.maps.visualRefresh = true;

      var mapOptions = {
        center: new google.maps.LatLng( 51.532255, -0.177691 ),
        zoom: 14,
        disableDefaultUI: true,
        styles: [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#84afa3"},{"lightness":52}]},{"stylers":[{"saturation":-17},{"gamma":0.36}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]}]
      };

      beatlesMap = new google.maps.Map( document.getElementById( 'beatles_map' ), mapOptions );

      // load map with beatles-related places
      // var ctaLayer = new google.maps.KmlLayer({
      //    url: '/TheBeatleslocations.kml'
      //  });
      //  ctaLayer.setMap( beatlesMap );
    },

    loadGMaps = function(){
      var script = document.createElement( 'script' );
      script.src = 'https://maps.googleapis.com/maps/api/js?v=3&sensor=false&region=GB&callback=initGMaps';
      document.body.appendChild( script );
    };

  window.onload = loadGMaps;
  window.initGMaps = initGMaps; // make it available as a callback


})(document, window);