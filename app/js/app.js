/* jshint undef: false, unused: false */
/**
 * Accordian
 */
var accordian = function() {
  $('#accordian ul li').on('click', function() {
    $('#accordian ul li').removeClass('active');
    $(this).addClass('active');
  });
};

/**
 * Typing effecting in banner
 */
var typingEffect = function() {
  var typeString = [ 'a secure', 'a free' ];
  var  i = 0;
  var count = 0;
  var selectedText = '';
  var text = '';
  var timeout;
  var target = document.getElementById('typing');
  if (!target) {
    return;
  }
  var type = function() {
    if (count === typeString.length) {
      count = 0;
    }

    if (i === 0) {
      document.getElementById('typing').innerHTML = '';
      clearTimeout(timeout);
      timeout = setTimeout(type, 1000);
      i++;
      return;
    }
    selectedText = typeString[count];
    text = selectedText.slice(0, ++i);
    target.innerHTML = text;
    if (text.length === selectedText.length) {
      count++;
      i = 0;
      clearTimeout(timeout);
      timeout = setTimeout(type, 1000);
      return;
    }
    timeout = setTimeout(type, 200);
  };
  type();
};

// Header Change on Window Scroll
var headerChangeOnScroll = function() {
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 10) {
      $('header').addClass('invert');
      $('#site-logo').addClass('invert');
      $('#secNav').addClass('invert');
      $('#secNavButton').addClass('invert');
      return;
    }
    $('header').removeClass('invert');
    $('#site-logo').removeClass('invert');
    $('#secNav').removeClass('invert');
    $('#secNavButton').removeClass('invert');
  });
};

var showMobPrimaryNav = function() {
  $('#secNavButton').on('click', function() {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      $(this).addClass('selected');
    }
    var target = $('#secNav');
    if (target.hasClass('show')) {
      target.removeClass('show');
      return;
    }
    target.addClass('show');
  });
};

$(function() {
  typingEffect();
  accordian();
  headerChangeOnScroll();
  showMobPrimaryNav();
});
