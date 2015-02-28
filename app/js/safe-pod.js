/*globals $, document*/
$(document).ready(function() {
  var map = $('#big-map');
  var overlay = $('div.overlay');
  var toggle = function() {
    map.fadeToggle();
    overlay.fadeToggle();
  };
  $('#map-popup').click(toggle);
  $('#big-map .close_btn').click(toggle);
  overlay.click(toggle);
});
