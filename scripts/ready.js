$(function($) {
  $('.bonustimeDialog').dialog({
    autoOpen: false,
    width: 500,
    modal: true,
    open: function(event, ui) {
      $(".ui-dialog-titlebar-close").hide();
    }
  });
  $('.areyouready').dialog({
    autoOpen: false,
    modal: true,
    width: 300,
    buttons: [{
      text: 'GO',
      click: function() {
        $(this).dialog('close');
      }
    }],
    open: function(event, ui) {
      $(".ui-dialog-titlebar-close").hide();
    },
    close: function(event, ui) {
      gameStart();
    }
  });
  $('.gameoverDialog').dialog({
    autoOpen: false,
    modal: true,
    width: 500,
    buttons: [{
      text: 'ランキングを見る',
      click: function() {
        $(this).dialog('close');
      }
    }],
    close: function(event, ui) {
      window.location.href = './result.php';
    }
  });
});
