$(".video-container").fitVids({ customSelector: "iframe[src^='http://socialcam.com']"});

$(document).ready(function($) {
  $('#tabs').tabulous({
    effect: 'scale'
  });

  $('#tabs2').tabulous({
    effect: 'slideLeft'
  });

  $('#tabs3').tabulous({
    effect: 'scaleUp'
  });

  $('#tabs4').tabulous({
    effect: 'flip'
  });
});