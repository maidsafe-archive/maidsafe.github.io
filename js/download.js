$(document).ready(function () {
  if (LS.SystemDetector.isWin()) {
    $('#downloadBox').addClass('surefile_download_link_win');
    var cpu_type = ((LS.SystemDetector.isWinx64() == true) ? "x86_64" : "x86_32");
    $('.downloadSoon').hide();
    if (LS.SystemDetector.isWin7()) {
      $('#downloadOS').html('Windows 7');
      $('#downloadArchitecture').html(((LS.SystemDetector.isWinx64() == true) ? "(64 Bit)" : "(32 Bit)"));
      $('#downloadBox .button-grey').addClass('win_7');
      $('#downloadBox .button-grey').addClass(cpu_type);
    } else if (LS.SystemDetector.isWinVista()) {
      $('#downloadOS').html('Windows Vista');
      $('#downloadArchitecture').html(((LS.SystemDetector.isWinx64() == true) ? "(64 Bit)" : "(32 Bit)"));
      $('#downloadBox .button-grey').addClass('win_vista');
      $('#downloadBox .button-grey').addClass(cpu_type);
    } else if (LS.SystemDetector.isWin8()) {
      $('#downloadOS').html('Windows 8');
      $('#downloadArchitecture').html(((LS.SystemDetector.isWinx64() == true) ? "(64 Bit)" : "(32 Bit)"));
      $('#downloadBox').addClass('win_8');
      $('#downloadBox').addClass(cpu_type);
    } else {
      $('.downloadSoon').show();
      $('#downloadBox').addClass('surefile_download_link_soon');
      $('.downloadSoon span').html('Windows');
    }
  } else if (LS.SystemDetector.isMac()) {
    $('.downloadSoon').hide();
    $('#downloadBox').addClass('surefile_download_link_mac');
    if (LS.SystemDetector.isMountainLion()) {
      $('#downloadOS').html('Mountain Lion');
      $('#downloadBox .button-grey').addClass('osx_10_8');
    } else if (LS.SystemDetector.isLion()) {
      $('#downloadOS').html('Lion');
      $('#downloadBox .button-grey').addClass('osx_10_7');
    } else {
      $('.downloadSoon').show();
      $('#downloadBox').addClass('surefile_download_link_soon');
      $('.downloadSoon span').html('Mac');
    }
  } else if (LS.SystemDetector.isLinux()) {
    $('.downloadSoon').hide();
    $('#downloadBox').addClass('surefile_download_link_linux');
    $('#downloadBox').addClass('surefile_download_link_soon');
    $('.downloadSoon span').html('Linux');
    $('.downloadSoon').show();
  } else {
    $('#downloadBox').addClass('hidden');
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