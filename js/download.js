$(document).ready(function () {
  if (LS.SystemDetector.isWin()) {
    $('#downloadBox').addClass('surefile_download_link_win');
    var cpu_type = ((LS.SystemDetector.isWinx64() == true) ? "x86_64" : "x86_32");
    $('.downloadSoon').hide();
    if (LS.SystemDetector.isWin7()) {
      $('#downloadOS').html('Windows 7');
	  if (LS.SystemDetector.isWinx64()) {
		// 64 bit
		  $('#downloadArchitecture').html("(64 Bit)");
		  $('.download-shell .button-blue').attr('href', $('.win_7.x86_64').attr('href'));
	  } else {
		// 32 bit  
		$('#downloadArchitecture').html("(32 Bit)");
       $('.download-shell .button-blue').attr('href', $('.win_7.x86_32').attr('href'));
	  }
    } else if (LS.SystemDetector.isWinVista()) {
      $('#downloadOS').html('Windows Vista');
	  if (LS.SystemDetector.isWinx64()) {
		// 64 bit
		  $('#downloadArchitecture').html("(64 Bit)");
		  $('.download-shell .button-blue').attr('href', $('.win_vista.x86_64').attr('href'));
	  } else {
		// 32 bit  
		$('#downloadArchitecture').html("(32 Bit)");
       $('.download-shell .button-blue').attr('href', $('.win_vista.x86_32').attr('href'));
	  }
    } else if (LS.SystemDetector.isWin8()) {
      $('#downloadOS').html('Windows 8');
	  if (LS.SystemDetector.isWinx64()) {
		// 64 bit
		  $('#downloadArchitecture').html("(64 Bit)");
		  $('.download-shell .button-blue').attr('href', $('.win_8.x86_64').attr('href'));
	  } else {
		// 32 bit  
		$('#downloadArchitecture').html("(32 Bit)");
       $('.download-shell .button-blue').attr('href', $('.win_8.x86_32').attr('href'));
	  }
    } else {
      $('.downloadSoon').show();
      $('#downloadBox').addClass('surefile_download_link_soon');
      $('.downloadSoon span').html('Windows');
    }
  } else if (LS.SystemDetector.isMac()) {
    $('.downloadSoon').hide();
    $('#downloadBox').addClass('surefile_download_link_mac');
    if (LS.SystemDetector.isMavericks()) {
      $('#downloadOS').html('Mac OS X Mavericks');
      $('.download-shell .button-blue').attr('href', $('.osx_10_9').attr('href'));
	  /*
    } else if (LS.SystemDetector.isLion()) {
      $('#downloadOS').html('Lion');
      $('#downloadBox').addClass('osx_10_9');*/
	  /*} else if (LS.SystemDetector.isLion()) {
      $('#downloadOS').html('Lion');
      $('#downloadBox').addClass('osx_10_9');*/
    } else {
      $('.downloadSoon').show();
      $('.download-shell .button-blue').hide();
      $('#downloadBox').addClass('surefile_download_link_soon');
      $('.downloadSoon span').html('Mac');
    }
  } else if (LS.SystemDetector.isLinux()) {
    $('.downloadSoon').hide();
    $('#downloadBox').addClass('surefile_download_link_linux');
    $('#downloadBox').addClass('surefile_download_link_soon');
    $('.downloadSoon span').html('Linux');
    $('.downloadSoon').show();
	$('.download-shell .button-blue').hide();
  } else {
    $('#downloadBox').addClass('hidden');
	$('.download-shell .button-blue').hide();
  }
/*
  $('.win_8.x86_32').click(function () {
    SetCount('win8x86');
  });
  $('.win_8.x86_64').click(function () {
    SetCount('win8x64');
  });
  $('.win_7.x86_32').click(function () {
    SetCount('win7x86');
  });
  $('.win_7.x86_64').click(function () {
    SetCount('win7x64');
  });
  $('.win_vista.x86_32').click(function () {
    SetCount('winvistax86');
  });
  $('.win_vista.x86_64').click(function () {
    SetCount('winvistax64');
  });
  $('.osx_10_8').click(function () {
    SetCount('osxmlion');
  });
  $('.osx_10_7').click(function () {
    SetCount('osxlion');
  });*/
});

/*
function SetCount(ostype) {  
  $.ajax({
    type: "POST",
    url: 'DownloadCounter.asmx/SetCount',
    contentType: 'application/json; charset=utf-8',
    data: "{\"input_string\":\"" + ostype + "\"}",
    success: function (return_json_object) {
      window.location.href = $('td ' + return_json_object.d).attr('data-href');
    },
    timeout: 30000
  });
}*/