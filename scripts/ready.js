var name; //ユーザー名
var reading;  //スキャンダイアログ制御用

$(function($) {
  getConfig('./config.json');
  $('.statusboard').hide();

  setDialogsOption();
  setNameDialogOption();
  setScanningOption();
});

//ダイアログの設定
function setDialogsOption() {
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
      delEventTimeMessage();
      gameReady();
    }
  });
}

//名前を尋ねるダイアログの設定
function setNameDialogOption() {
  name = $('#script').attr('username');
  if (name == 'false') {
    $('.nameDialog').dialog('open');
  } else {
    $('.difficultyDialog').dialog('open');
  }
}

//スキャンの設定をする
function setScanningOption() {
  reading = {
    clear : function() {
      $('.firstBarcode,.secondBarcode').val('');
    },
    endFirst : function() {
      return $('.firstBarcode').val().length == 13;
    },
    endSecond : function() {
      return $('.secondBarcode').val().length == 13;
    },
    end : function() {
      return this.endFirst() && this.endSecond();
    },
    close : function() {
      $('.bonustimeDialog').dialog('close');
    }
  }


  $('.firstBarcode').keydown(function(e) {
    if (!scanning) {
      return;
    }
    if (e.keyCode == 9) {
      if (reading.endFirst()) {
        $(this).prop("disabled", true);
      }
      if (reading.end()) {
        endScanTime();
        reading.close();
        return false;
      }
      return;
    }
    keyCheck(e.keyCode);
  });
  $('.secondBarcode').keydown(function(e) {
    if (!scanning) {
      return;
    }
    if (e.keyCode == 9) {
      if (reading.endSecond()) {
        $(this).prop("disabled", true);
      }
      if (reading.end()) {
        endScanTime();
        reading.close();
        return false;
      }
      return false;
    }
    keyCheck(e.keyCode);
  });
}
