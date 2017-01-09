var bonusEvents;    //ボーナスイベント
var ojamaEvents;    //おじゃまイベント

//イベントタイムダイアログを開く
function setEventTimeMessage(event) {
  $('.eventState').text( (event == true) ? 'ボーナスタイム発生中！' : 'おじゃまタイム発生中！' );
  var eventState = '';
  var eventContent = '';

  if (event) {
    var length = 0;
    var array = [];
    for(var i in bonusEvents){
      array.push(i);
      length++;
    }
    var rand = Math.floor(Math.random()*length);
    eventState = array[rand];
    eventContent = bonusEvents[ecentState];
  } else {
    var length = 0;
    var array = [];
    for(var i in ojamaEvents){
      array.push(i);
      length++;
    }
    var rand = Math.floor(Math.random()*length);
    eventState = array[rand];
    eventContent = ojamaEvents[ecentState];  }

  console.log(eventState);

  $('.eventContent').text(eventContent);
}
