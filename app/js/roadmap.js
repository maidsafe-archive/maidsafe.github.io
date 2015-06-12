/* jshint undef: false*/
/*globals $, document*/
$(document).ready(function() {
  var map = $('#big-roadmap');
  var overlay = $('div.overlay');
  var rWidth = map.width();
  var rHeight = map.height();
  var elbounds = {
    w: parseInt(rWidth),
    h: parseInt(rHeight)
  };
  var bounds = { w: rWidth - elbounds.w, h: rHeight - elbounds.h };
  var origin = { x: 0, y: 0 };
  var start = { x: 0, y: 0 };
  var movecontinue = false;
  var toggle = function() {
    map.fadeToggle();
    overlay.fadeToggle();
  };
  var zoomIn = function() {
    var s = map.css('backgroundSize');
    console.log(s);
    var sa = s.split('%');
    var h = parseInt(sa[0]);
    if (h === 100) {
      h = 130;
      rWidth *= 1.3;
      rHeight *= 1.3;
      bounds = { w: rWidth - elbounds.w, h: rHeight - elbounds.h };
    }
    s = h + '% auto';
    console.log(s);
    map.css({ 'backgroundSize': s, 'backgroundPosition': '0 0' });
    $('#big-roadmap .zoom-in').css({ 'opacity': '.5', 'cursor': 'move' });
    $('#big-roadmap .zoom-out').css({ 'opacity': '1', 'cursor': 'pointer' });
  };
  var zoomOut = function() {
    var s = map.css('backgroundSize');
    var sa = s.split('%');
    var h = parseInt(sa[0]);
    if (h === 130) {
      h = 100;
      rWidth /= 1.3;
      rHeight /= 1.3;
      bounds = { w: rWidth - elbounds.w, h: rHeight - elbounds.h };
    }
    s = h + '% auto';
    map.css({ 'backgroundSize': s, 'backgroundPosition': '0 0' });
    start = { x: 0, y: 0 };
    $('#big-roadmap .zoom-in').css({ 'opacity': '1', 'cursor': 'pointer' });
    $('#big-roadmap .zoom-out').css({ 'opacity': '.5', 'cursor': 'move' });
  };
  $('.thumbnail').click(toggle);
  $('#big-roadmap .close_btn').click(toggle);
  overlay.click(toggle);
  $('#big-roadmap .zoom-in').click(zoomIn);
  $('#big-roadmap .zoom-out').click(zoomOut);
  var move = function(e) {
    var inbounds = { x: false, y: false };
    var offset = {
        x: start.x - (origin.x - e.clientX),
        y: start.y - (origin.y - e.clientY)
    };
    inbounds.x = offset.x < 0 && (offset.x * -1) < bounds.w;
    inbounds.y = offset.y < 0 && (offset.y * -1) < bounds.h;
    if (movecontinue && inbounds.x && inbounds.y) {
      start.x = offset.x;
      start.y = offset.y;
      $(this).css('background-position', start.x + 'px ' + start.y + 'px');
    }
    origin.x = e.clientX;
    origin.y = e.clientY;
    e.stopPropagation();
    return false;
  };

  var handle = function(e) {
    movecontinue = false;
    map.unbind('mousemove', move);
    if (e.type === 'mousedown') {
      origin.x = e.clientX;
      origin.y = e.clientY;
      movecontinue = true;
      map.bind('mousemove', move);
    } else {
      $(document.body).focus();
    }
    e.stopPropagation();
    return false;
  };

  var reset = function() {
    start = { x: 0, y: 0 };
    map.css({ 'backgroundPosition': '0 0', 'backgroundSize': '100%' });
    $('#big-roadmap .zoom-in').css({ 'opacity': '1', 'cursor': 'pointer' });
    $('#big-roadmap .zoom-out').css({ 'opacity': '.5', 'cursor': 'move' });
    rWidth = map.width();
    rHeight = map.height();
    bounds = { w: rWidth - elbounds.w, h: rHeight - elbounds.h };
  };

  map.bind('mousedown mouseup mouseleave', handle);
  map.bind('dblclick', reset);
  $('#big-roadmap .close_btn').bind('click', reset);
  $('.overlay').bind('click', reset);
});
