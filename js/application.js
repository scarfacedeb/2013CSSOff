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

;(function(document, window){
  "use strict";

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

})(document, window);