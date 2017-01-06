//ボーナスタイム
var bonustime = false;    //ボーナスタイム
var bonusInterval = 100;  //ボーナスタイムの間隔

//ボーナスタイムかどうか
function isBonusTime() {
  return (score%bonusInterval == 0);
}

//バーコードリーダーからバーコードを読み込む
function readingBarcode() {
  var reading = {
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

  $('.bonustimeDialog').dialog('open');
  $('.firstBarcode').focus();
  $('.firstBarcode').keydown(function(e) {
    keyCheck(e.keyCode);
    if (reading.end()) {
      reading.close();
      getBarcodeTime = false;
    } else if (reading.endFirst()) {
      $('.secondBarcode').focus();
    }
  });
  $('.secondBarcode').keydown(function(e) {
    keyCheck(e.keyCode);
    if (reading.end()) {
      reading.close();
      getBarcodeTime = false;
    } else if (reading.endSecond()) {
      $('.firstBarcode').focus();
    }
  });

  reading.clear();
  getBarcodeTime = true;
}
