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
  var typeString = ['a secure', 'a free'];
  var  i = 0;
  var count = 0
  var selectedText = '';
  var text = '';
  var timeout;
  var type = function() {
    if (count === typeString.length) {
      count = 0;
    }

    if (i === 0) {
      document.getElementById('typing').innerHTML = "";
      clearTimeout(timeout);
      timeout = setTimeout(type, 1000);
      i++;
      return
    }
    selectedText = typeString[count];
    text = selectedText.slice(0, ++i);
    document.getElementById('typing').innerHTML = text;
    if (text.length === selectedText.length) {
      count++;
      i = 0;
      clearTimeout(timeout);
      timeout = setTimeout(type, 1000);
      return;
    }
    timeout = setTimeout(type, 200);
  }
  type();
};

$(function() {
  typingEffect();
  accordian();
});
