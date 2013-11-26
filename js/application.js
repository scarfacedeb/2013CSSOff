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


  var bindEvent = function(el, eventName, eventHandler) {
      if (el.addEventListener){
        el.addEventListener(eventName, eventHandler, false);
      } else if (el.attachEvent){
        el.attachEvent('on'+eventName, eventHandler);
      }
    };


  // polyfills

  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

  // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

  // MIT license

  (function() {
      var lastTime = 0;
      var vendors = ['ms', 'moz', 'webkit', 'o'];
      for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
          window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
          window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                     || window[vendors[x]+'CancelRequestAnimationFrame'];
      }

      if (!window.requestAnimationFrame)
          window.requestAnimationFrame = function(callback, element) {
              var currTime = new Date().getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
              lastTime = currTime + timeToCall;
              return id;
          };

      if (!window.cancelAnimationFrame)
          window.cancelAnimationFrame = function(id) {
              clearTimeout(id);
          };
  }());

  // classlist

  /*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
  if(typeof document!=="undefined"&&!("classList" in document.createElement("a"))){(function(j){if(!("HTMLElement" in j)&&!("Element" in j)){return}var a="classList",f="prototype",m=(j.HTMLElement||j.Element)[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.className),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.className=this.toString()}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false;do{r=t[s]+"";var q=g(this,r);if(q!==-1){this.splice(q,1);o=true}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}return !o};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))};


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

  bindEvent( barbieImg, 'click', function(){
    if ( Modernizr.cssanimations && animEndEventName ){
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
  bindEvent( barbieImg, animEndEventName, setFinalState );




  /*
    Beatles
    ========================================================================== */


  var beatlesRoad = document.getElementById( 'beatles_road' ),
    beatlesFront = document.getElementById( 'beatles_front' );

    function showMap(){
      beatlesRoad.classList.add( 'beatles__road--opened' );
      beatlesRoad.classList.remove( 'beatles__road--closed' );

      if ( Modernizr.csstransitions ) {
        bindEvent( beatlesRoad, transEndEventName, function(){
          beatlesRoad.classList.add( 'beatles__road--hidden' );
        });
      } else {
        beatlesRoad.classList.add( 'beatles__road--hidden' );
      }

      //beatlesRoad.removeEventListener( 'click', showMap );
      //beatlesFront.addEventListener( 'click', hideMap );
    }
    // function hideMap(){
    //   beatlesRoad.classList.remove( 'beatles__road--opened' );
    //   beatlesRoad.classList.add( 'beatles__road--closed' );

    //   beatlesFront.removeEventListener( 'click', hideMap );
    //   beatlesRoad.addEventListener( 'click', showMap );
    // }

  bindEvent( beatlesRoad, 'click', showMap );

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