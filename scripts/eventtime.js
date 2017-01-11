var scanEvents = {};    //イベント

//イベントタイムメッセージを出力する
function setEventTimeMessage(event) {
  $('.eventState').text( event ? 'ボーナスタイム発生中！' : 'おじゃまタイム発生中！' );
  var eventState = '';
  var eventMessage = '';

  if (event) {
    var length = 0;
    var array = [];
    for(var key in scanEvents.bonus){
      for (var j = 0; j < scanEvents.bonus[key].frequency; j++) {
        array.push(key);
        length++;
      }
    }
    var rand = Math.floor(Math.random()*length);
    eventState = array[rand];
    eventMessage = scanEvents.bonus[eventState].message;
  } else {
    var length = 0;
    var array = [];
    for(var key in scanEvents.ojama) {
      for (var j = 0; j < scanEvents.ojama[key].frequency; j++) {
        array.push(key);
        length++;
      }
    }
    var rand = Math.floor(Math.random()*length);
    eventState = array[rand];
    eventMessage = scanEvents.ojama[eventState].message;
  }

  $('.eventContent').text(scanEvents.ojama['blindfold'].message);
  causeEvent('blindfold');

  //console.log(eventMessage);
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
    case 'long_add_header_interval':
      addHeaderInterval += 10;
      break;
    case 'long_scan_time_interval':
      scanInterval += 100;
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
    case 'short_add_header_interval':
      addHeaderInterval += -5;
      break;
    case 'short_scan_time_interval':
      scanInterval += -100;
      break;
    case 'blindfold':
      var w = $('#ballpaper').width();
      var h = $('#ballpaper').height();
      $('#canvas').attr('width', w);
      $('#canvas').attr('height', h);
      $('#ballpaper').show();
      break;
  }
}

//イベントタイムメッセージを削除
function delEventTimeMessage() {
  $('.eventState').empty();
  $('.eventContent').empty();
}
