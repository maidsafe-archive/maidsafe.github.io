$(document).ready(function () {
  if (LS.SystemDetector.isWin()) {
    $('#tutorial_image_one_a').addClass('add_store_win');
	$('#tutorial_image_one_b').addClass('add_store_win');
	$('#tutorial_image_one_c').addClass('add_store_win');
	$('#tutorial_image_two_a').addClass('manage_store_win');
	$('#tutorial_image_two_b').addClass('manage_store_win');
	$('#tutorial_image_three_a').addClass('open_store_win');
	$('#tutorial_image_three_b').addClass('open_store_win');
	$('#tutorial_image_three_c').addClass('open_store_win');
  } else if (LS.SystemDetector.isMac()) {
	$('#tutorial_image_one_a').addClass('add_store_mac');
	$('#tutorial_image_one_b').addClass('add_store_mac');
	$('#tutorial_image_one_c').addClass('add_store_mac');
	$('#tutorial_image_two_a').addClass('manage_store_mac');
	$('#tutorial_image_two_b').addClass('manage_store_mac');
	$('#tutorial_image_three_a').addClass('open_store_mac');
	$('#tutorial_image_three_b').addClass('open_store_mac');
	$('#tutorial_image_three_c').addClass('open_store_mac');    
  } else if (LS.SystemDetector.isLinux()) {
   
  } else {
    $('#downloadBox').addClass('hidden');
  }
});