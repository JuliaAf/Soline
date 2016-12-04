$(document).ready(function(){
  $(".main-page-slider").owlCarousel({

    // Most important owl features
    items : 1,
    itemsCustom : false,
    singleItem : true,
    itemsScaleUp : false,

    //Basic Speeds
    slideSpeed : 200,
    paginationSpeed : 800,
    rewindSpeed : 1000,

    //Autoplay
    autoPlay : true,
    stopOnHover : true,

    // Navigation
    navigation : false,
    navigationText : ["",""],
    rewindNav : false,
    scrollPerPage : false,

    //Pagination
    pagination : false,
    paginationNumbers: false,

    // Responsive
    responsive: true,
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window,

    // CSS Styles
    baseClass : "owl-carousel",
    theme : "owl-theme",

    //Lazy load
    lazyLoad : false,
    lazyFollow : true,
    lazyEffect : "fade",

    //Auto height
    autoHeight : false,

    //JSON
    jsonPath : false,
    jsonSuccess : false,

    //Mouse Events
    dragBeforeAnimFinish : true,
    mouseDrag : true,
    touchDrag : true,

    //Transitions
    transitionStyle : false,

    // Other
    addClassActive : false,

    //Callbacks
    beforeUpdate : false,
    afterUpdate : false,
    beforeInit: false,
    afterInit: false,
    beforeMove: false,
    afterMove: false,
    afterAction: false,
    startDragging : false
    // afterLazyLoad : false
});

/*mobile nav toggle*/
$(".nav__open").click(function(){
  $(".nav").addClass("nav--header-open")
  $(this).hide()
})
$(".nav__close").click(function(){
  $(".nav").removeClass("nav--header-open")
  $(".nav__open").show()
})

/*scroll-top*/
if ($(window).width() < 768){
  $(function (){
		$(window).scroll(function (){
			if ($(this).scrollTop() > 200){
				$(".scroll-top").fadeIn();
			} else{
				$(".scroll-top").fadeOut();
			}
		});

		$(".scroll-top").click(function (){
			$("body,html").animate({
				scrollTop:0
			}, 500);
			return false;
		});
	 });
}
else{
  return false;
}

/*mobile-menu bars*/
$(window).scroll(function(){
  if ($(this).scrollTop() > 50){
    $(".nav__open").css({"top":"10px"});
  } else{
    $(".nav__open").css({"top":"55px"});
  }
})


})//ready-end
