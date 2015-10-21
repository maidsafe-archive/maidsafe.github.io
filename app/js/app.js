/* global $: false, document: false, window: false */
/**
 * Accordian
 */
 var accordian = function() {
   $('#accordian ul li').on('click', function() {
     var self = $(this);
     if (self.hasClass('active')) {
       self.removeClass('active');
       return;
     }
     $('#accordian ul li').removeClass('active');
     self.addClass('active');
   });
 };

/**
 * Typing effecting
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

    // Initiation
    if (i === 0) {
      document.getElementById('typing').innerHTML = '';
      clearTimeout(timeout);
      timeout = setTimeout(type, 1500);
      i++;
      return;
    }
    selectedText = typeString[count];
    text = selectedText.slice(0, ++i);
    target.innerHTML = text;

    // change Next word
    if (text.length === selectedText.length) {
      count++;
      i = 0;
      clearTimeout(timeout);
      timeout = setTimeout(type, 4000);
      return;
    }

    // timing to type each word
    timeout = setTimeout(type, 200);
  };
  type();
};

// Header Change on Window Scroll
var headerChangeOnScroll = function() {
  var exclude = [ 'company.html', 'safecoin.html' ];
  var excludeFlag = false;
  var currentPage = window.location.href.split('/').pop();
  for (var i = 0; i < exclude.length; i++) {
    if (exclude[i] === currentPage) {
      excludeFlag = true;
      break;
    }
  }
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 10) {
      $('header').addClass('invert onScroll');
      $('#site-logo').addClass('invert');
      $('#secNav').addClass('invert');
      $('#secNavButton').addClass('invert');
      return;
    }
    $('header').removeClass('onScroll');
    if (excludeFlag) {
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
