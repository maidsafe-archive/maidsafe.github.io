/* jshint undef: false*/
$('body').addClass('js');
var $menu = $('#menu'),
  $menulink = $('.menu-link'),
  $menuTrigger = $('.has-submenu > a');

$menulink.click(function (e) {
  e.preventDefault();
  $menulink.toggleClass('active');
  $menu.toggleClass('active');
});

$menuTrigger.click(function (e) {
  e.preventDefault();
  var $this = $(this);
  $this.toggleClass('active').next('ul').toggleClass('active');
});
$(document).ready(function() {
  
  $('#home header .download').css({'display': 'none','marginLeft': '-70px'});
  var downloadBtn=false;
  var section4top = $("#container").height()-$('footer').height()-$('#section4').height()-60;

  $(document).scroll(function() {
    var newScroll = $(window).scrollTop();
  	if (newScroll>=500&&newScroll<section4top&&downloadBtn==false){
      $('#home header .developers').stop().animate({
        marginRight: '100'},
        200, 
        function(){
        $('#home header .download').fadeIn(200);
      });
      downloadBtn=true;
    } else if ((newScroll<500||newScroll>=section4top)&&downloadBtn==true){
      $('#home header .download').fadeOut(
        200, 
        function(){
        $('#home header .developers').stop().animate({marginRight: '0'},200);
      });
      downloadBtn=false;
    }
	});
});