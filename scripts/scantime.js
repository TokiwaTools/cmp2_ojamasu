//スキャンタイム
var scanInterval;  //スキャンタイムの間隔
var scanLimit;     //制限時間

//スキャンタイムかどうか
function isScanTime() {
  return (score%scanInterval == 0);
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
    if (e.keyCode == 9) {
      if (reading.end()) {
        reading.close();
        getBarcodeTime = false;
        addHeader = true;
      }
      return;
    }
    keyCheck(e.keyCode);
  });
  $('.secondBarcode').keydown(function(e) {
    if (e.keyCode == 9) {
      if (reading.end()) {
        reading.close();
        getBarcodeTime = false;
        addHeader = true;
      }
      return;
    }
    keyCheck(e.keyCode);
  });

  reading.clear();
  getBarcodeTime = true;
}
