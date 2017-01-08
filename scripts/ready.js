var name; //ユーザー名

$(function($) {
  getConfig('./config.json');
  $('.statusboard').hide();
  $('.nameDialog').dialog({
    autoOpen: false,
    width: 500,
    buttons: {
      'OK': function() {
        $(this).dialog('close');
      }
    },
    position: {
      my: "center top",
      at: "center",
      of: '.dialog'
    },
    open: function(event, ui) {
      $(".ui-dialog-titlebar-close").hide();
    },
    close: function(event, ui) {
      $('.nameDialogForm').submit();
    }
  });
  $('.difficultyDialog').dialog({
    autoOpen: false,
    width: 600,
    position: {
      my: "center top",
      at: "center",
      of: '.dialog'
    },
    open: function(event, ui) {
      $(".ui-dialog-titlebar-close").hide();
    }
  });
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
    buttons: {
      'GO': function() {
        $(this).dialog('close');
      },
      'チュートリアルを見る': function() {
        $('.tutorialDialog').dialog('open');
      }
    },
    open: function(event, ui) {
      $(".ui-dialog-titlebar-close").hide();
    },
    close: function(event, ui) {
      gameStart();
    }
  });
  $('.tutorialDialog').dialog({
    autoOpen: false,
    modal: true,
    width: 600,
    buttons: {
      'OK': function() {
        $(this).dialog('close');
      }
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
        window.location.href = './ranking.php?name=' + name + '&score=' + score + '&time=' + playingTime;
      }
    },
    close: function(event, ui) {
      gameReady();
    }
  });

  name = $('#script').attr('username');
  if (name == 'false') {
    $('.nameDialog').dialog('open');
  } else {
    $('.difficultyDialog').dialog('open');
  }
});
