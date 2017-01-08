$(function($) {
  $('.statusboard').hide();
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
    buttons: {
      'リトライ': function() {
        $(this).dialog('close');
      },
      'ランキングを見る': function() {
        window.location.href = './ranking.php';
      }
    },
    close: function(event, ui) {
      gameReady();
    }
  });
});
