$(function() {
  $('.bxslider').bxSlider({
    auto: true,
    mode: 'fade',
    autoControls: false,
    speed: 1000,
    pause: 8000,
    pager: true,
    controls: false,
    tickerHover: true
  });
});
// Custom selector and No-Double-Wrapping Prevention Test
$(".video-container").fitVids({ customSelector: "iframe[src^='http://socialcam.com']"});
// Navbar initialization for Responsiveness
jQuery(document).ready(function ($) {
  $('body').addClass('js');
  var $menulink = $('.menu-link');
  var $menuTrigger = $('.has-submenu > a');
  $menulink.click(function(e) {
    e.preventDefault();
    $menulink.toggleClass('active');
  });
  $menuTrigger.click(function(e) {
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass('active');
  });
});
