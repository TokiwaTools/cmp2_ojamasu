//スキャンタイム
var scanning = false; //スキャンタイムかどうか
var scanInterval;  //スキャンタイムの間隔
var scanLimit;     //制限時間
var scanTime;      //スキャン時間
var scanTimer;     //タイマー

//スキャンタイムかどうか
function isScanTime() {
  return (score%scanInterval == 0);
}

//制限時間をセットする
function setLimitTimer() {
  scanTimer = setInterval(function() {
    scanTime--;
    if (scanTime == 0) {
      clearInterval(scanTimer);
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
  $('.bonustimeDialog').dialog('open');
  $('.firstBarcode').prop("disabled", false);
  $('.secondBarcode').prop("disabled", false);
  $('.firstBarcode').focus();

  reading.clear();
  scanning = true;
}

//スキャンタイム終了時
function endScanTime() {
  clearInterval(scanTimer);
  setConfigByDiff();
  var eventTime = false;

  scanning = false;
  addHeader = true;

  if (scanTime == 0) {
    eventTime = false;
  } else {
    var firstBarcodeLast = $('.firstBarcode').val().slice(-1);
    var secondBarcodeLast = $('.secondBarcode').val().slice(-1);
    eventTime = (firstBarcodeLast + secondBarcodeLast)%2 == 0;
  }

  setEventTimeMessage(false);
}
