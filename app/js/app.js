/* global $: false, document: false, window: false */

var IntroVideoSrc = 'https://www.youtube.com/embed/bXOaxjvefGc';
var subPage = [ '/safecoin.html', '/features.html', '/contact.html' ];

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
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 10) {
      $('header').addClass('invert onScroll');
      $('#site-logo').addClass('invert');
      $('#secNav').addClass('invert');
      $('#secNavButton').addClass('invert');
      return;
    }
    $('header').removeClass('onScroll');
    if (subPage.indexOf(window.location.pathname) > -1) {
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
    var target = $('#secNav');
    if ($.inArray(window.location.pathname, subPage) !== -1) {
      $(this).addClass('invert');
      target.addClass('invert');
    }
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      $(this).addClass('selected');
    }

    if (target.hasClass('show')) {
      target.removeClass('show');
      return;
    }
    target.addClass('show');
  });
};

// Modal events
var Modal = {
  target: $('#Modal'),
  open: function() {
    this.target.show();
  },
  close: function() {
    this.target.hide();
  }
};

$(function() {
  typingEffect();
  accordian();
  headerChangeOnScroll();
  showMobPrimaryNav();

  // Intro video
  $('#IntroVideoTrigger').on('click', function(e) {
    e.preventDefault();
    Modal.open();
    $('#IntroVideo').attr('src', IntroVideoSrc);
  });

  // Close Modal
  $('#Modal').on('click', function(e) {
    e.stopPropagation();
    Modal.close();
    $('#IntroVideo').attr('src', 'about:blank');
  });
});
