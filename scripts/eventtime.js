var scanEvents = {};    //イベント

//イベントタイムメッセージを出力する
function setEventTimeMessage(event) {
  $('.eventState').text( event ? 'ボーナスタイム発生中！' : 'おじゃまタイム発生中！' );
  var eventState = '';
  var eventContent = '';

  if (event) {
    var length = 0;
    var array = [];
    for(var i in scanEvents.bonus){
      array.push(i);
      length++;
    }
    var rand = Math.floor(Math.random()*length);
    eventState = array[rand];
    eventContent = scanEvents.bonus[eventState];
  } else {
    var length = 0;
    var array = [];
    for(var i in scanEvents.ojama){
      array.push(i);
      length++;
    }
    var rand = Math.floor(Math.random()*length);
    eventState = array[rand];
    eventContent = scanEvents.ojama[eventState];
  }

  $('.eventContent').text(eventContent);
  causeEvent(eventState);

  console.log(eventContent);
}

//イベントを発生させる
function causeEvent(eventState) {
  var changedHeaderName = '';
  var rand = Math.floor(Math.random()*2);
  if (rand == 0) {
    changedHeaderName = 'row';
  } else {
    changedHeaderName = 'column';
  }
  var header = $('.' + changedHeaderName + '-header');

  switch (eventState) {
    case 'header_less_than_4':
      $(header).each(function() {
        var value = Math.floor(Math.random()*5);
        $(this).text(value);
      });
      break;
    case 'header_0_or_1':
      $(header).each(function() {
        var value = Math.floor(Math.random()*2);
        $(this).text(value);
      });
      break;
    case 'header_0':
      $(header).each(function() {
        var value = 0;
        $(this).text(value);
      });
      break;
    case 'header_more_than_5':
      $(header).each(function() {
        var value = Math.floor(Math.random()*5) + 5;
        $(this).text(value);
      });
      break;
    case 'header_5_or_7':
      $(header).each(function() {
        var value = (Math.floor(Math.random()*2) == 0) ? 5 : 7;
        $(this).text(value);
      });
      break;
    case 'header_all_9':
      $(header).each(function() {
        var value = 9;
        $(this).text(value);
      });
      break;
  }
}

//イベントタイムメッセージを削除
function delEventTimeMessage() {
  $('.eventState').empty();
  $('.eventContent').empty();
}
