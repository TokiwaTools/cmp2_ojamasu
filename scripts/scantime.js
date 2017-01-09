//スキャンタイム
var scanInterval;  //スキャンタイムの間隔
var scanLimit;     //制限時間
var scanTime;      //スキャン時間

//スキャンタイムかどうか
function isScanTime() {
  return (score%scanInterval == 0);
}

//制限時間をセットする
function setLimitTimer() {
  var timer = setInterval(function() {
    scanTime--;
    if (scanTime == 0) {
      clearInterval(timer);
      endScanTime();
      $('.bonustimeDialog').dialog('close');
    }
    updateLimitMessage();
  }, 1000);
}

//制限時間のメッセージをアップデート
function updateLimitMessage() {
  $('.limitTimeMessage').text('おじゃまタイム発動まであと' + scanTime + '秒');
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
        endScanTime();
        reading.close();
      }
      return;
    }
    keyCheck(e.keyCode);
  });
  $('.secondBarcode').keydown(function(e) {
    if (e.keyCode == 9) {
      if (reading.end()) {
        endScanTime();
        reading.close();
      }
      return;
    }
    keyCheck(e.keyCode);
  });

  reading.clear();
  getBarcodeTime = true;
}

//スキャンタイム終了時
function endScanTime() {
  var eventTime = false;

  getBarcodeTime = false;
  addHeader = true;

  if (scanTime == 0) {
    eventTime = false;
  } else {
    var firstBarcodeLast = $('.firstBarcode').val().slice(-1);
    var secondBarcodeLast = $('.secondBarcode').val().slice(-1);
    eventTime = (firstBarcodeLast + secondBarcodeLast)%2 == 0;
  }

  setEventTimeMessage(eventTime);
}
