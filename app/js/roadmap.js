/* jshint undef: false*/

// resize large map height
var resizeHeightCheck = function() {
  var map = $('#wrapper');
  var mapWidth = map.css('width');
  var stMapWidth = mapWidth.split('px');
  var mapHeight = stMapWidth[0] * 0.505;
  map.css('height', mapHeight);
};
// update matrix edge on roadmap
var mapMatrixFix = function(isResizing) {
  var $map = $('#large');
  $map.panzoom('resetDimensions');
  if (isResizing) {
    map.panzoom('resetPan');
  }
};

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
    resizeHeightCheck();
  };
  hover.click(toggle);
  thumbnail.click(toggle);
  $('#close_btn').click(toggle);
  overlay.click(toggle);

  // panzoom
  var $panzoom = $('#large').panzoom({
    contain: 'invert',
    minScale: 0,
    rangeStep: 0.01,
    $zoomIn: $('#zoom-in').on('click', function(e) {
      e.preventDefault(); zoomableRegion.panzoom('zoom');
    }),
    $zoomOut: $('#zoom-out').on('click', function(e) {
      e.preventDefault(); zoomableRegion.panzoom('zoom', true);
    })
  });
  $panzoom.on('panzoomzoom', function(e, panzoom, scale, opts){
    mapMatrixFix(false);
  });
});

// for the window resize
$(window).resize(function() {
  resizeHeightCheck();
  mapMatrixFix(true);
});
