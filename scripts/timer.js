var timer;        //タイマーボードの要素

var addHeader = false;
var addHeaderInterval;  //ヘッダー追加の間隔(秒)

//タイマーボードの作成
function createTimerboard() {
  $(timer).empty();
  var title = $('<h2>');
  title.text('Time');
  $(timer).append(title);
  var time = $('<p>');
  time.attr('class', 'time');
  time.text(playingTime);
  $(timer).append(time);
}

//時間をアップデート
function updateTimer() {
  $(timer).find('.time').html(playingTime);
}

//ヘッダー追加の時間か返す
function isAddHeaderTime() {
  if (playingTime == 0 || !addHeader) {
    return false;
  }
  return playingTime%addHeaderInterval == 0;
}
