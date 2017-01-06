var timer;        //タイマーボードの要素

//タイマーボードの作成
function createTimerboard() {
  var title = $('<h2>');
  title.text('Time');
  $(timer).append(title);
  var time = $('<p>');
  time.attr('class', 'time');
  time.text(playingTime);
  $(timer).append(time);
}

function updateTimer() {
  $(timer).find('.time').html(playingTime);
}
