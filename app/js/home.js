/* jshint undef: false*/
// video overlay
$('.video-thumbnail').click(function() {
  $('.youtube-overlay').fadeIn(200);
});
$('.youtube-overlay').click(function() {
  $('.youtube-overlay').fadeOut(200);
});

function switchKeyword(start) {
  if (start === 4) {
    start = 0;
  }
  var newStart = start + 1;
  if (newStart === 4) {
    newStart = 0;
  }
  var keywordArray = [ '.private', '.secure', '.free', '.evolved' ];
  // console.log(keywordArray[start]);
  $(keywordArray[start]).delay(500).fadeOut('slow', function() {
    $(keywordArray[newStart]).fadeIn('slow');
    switchKeyword(newStart);
  });
}

// Navbar initialization for Responsiveness
jQuery(document).ready(function($) {
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

switchKeyword(0);
