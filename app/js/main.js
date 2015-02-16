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
