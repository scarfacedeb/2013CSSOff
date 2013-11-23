var barbieImg = document.getElementById( 'barbie_img' );
  //barbieFront = barbieImg.getElementsByClassName( 'barbie__img__front' )[0];

barbieImg.classList.add( 'barbie__img--closed' );

barbieImg.addEventListener( 'click', function(){

  barbieImg.classList.add( 'barbie__img--animating' );
  //requestAnimationFrame( function(){
    //barbieImg.classList.toggle( 'barbie__img--closing' );
  //});
  barbieImg.title = barbieImg.title == "Open" ? "Close" : "Open";
});

barbieImg.addEventListener( 'webkitAnimationEnd', function(e){
  barbieImg.classList.remove( 'barbie__img--animating' );

  barbieImg.classList.toggle( 'barbie__img--opened' );
  barbieImg.classList.toggle( 'barbie__img--closed' );
});