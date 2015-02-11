$(document).ready(function() {
  var toggle = function() {
    $('#big-map').fadeToggle();
  };
  $('#map-popup').click(toggle);
  $('#big-map .close_btn').click(toggle);
});
