/* jshint undef: false*/

$(document).ready(function() {
  var thumbnail = $('#normal');
  var hover = $('#hover');
  thumbnail.mouseenter(function() {
    thumbnail.hide();
    hover.show();
  });
  hover.mouseleave(function() {
    thumbnail.show();
    hover.hide();
  });

  // overlay
  var map = $('#wrapper');
  var overlay = $('div#overlay');
  var zoomableRegion = $('#large');
  var toggle = function() {
    map.fadeToggle();
    overlay.fadeToggle();
    zoomableRegion.panzoom('resetZoom');
  };
  hover.click(toggle);
  thumbnail.click(toggle);
  $('#close_btn').click(toggle);
  overlay.click(toggle);

  // panzoom
  $('#large').panzoom({
    contain: 'invert',
    minScale: 1,
    $zoomIn: $('#zoom-in').on('click', function(e) {
      e.preventDefault(); zoomableRegion.panzoom('zoom');
    }),
    $zoomOut: $('#zoom-out').on('click', function(e) {
      e.preventDefault(); zoomableRegion.panzoom('zoom', true);
    })
  });
});
