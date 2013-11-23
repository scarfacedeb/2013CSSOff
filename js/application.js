var barbieImg = document.getElementById( 'barbie_img' );


barbieImg.addEventListener( 'click', function(){
  barbieImg.classList.toggle( 'barbie__img--opened' );
  barbieImg.title = barbieImg.title == "Open" ? "Close" : "Open";
});