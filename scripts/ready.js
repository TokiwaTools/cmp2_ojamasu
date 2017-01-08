var name;

$(function($) {
  $.getJSON('config.json', function(json) {
    operator = json.table.operator;
    maxRowNum = json.table.max_row;
    maxColumnNum = json.table.max_column;
    addHeaderInterval = json.table.add_header_interval;
    scanInterval = json.scantime.interval;
  });
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
        window.location.href = './ranking.php';
      }
    },
    close: function(event, ui) {
      gameReady();
    }
  });

  if ($('.name').text().trim() != '') {
    name = $('.name').text().trim();
    $('.difficultyDialog').dialog('open');
  } else {
    $('.nameDialog').dialog('open');
  }
});
