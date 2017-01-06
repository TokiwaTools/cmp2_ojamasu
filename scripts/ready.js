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
        gameStart();
      }
    }],
    open: function(event, ui) {
      $(".ui-dialog-titlebar-close").hide();
    }
  });
});
