var main;         //テーブルの要素

//テーブル
var operator = '+';     //演算子 (+, *)
var maxRowNum = 10;     //最大行数
var maxColumnNum = 10;  //最大列数

var playingTime = 0;  //プレイ時間

//テーブルの準備
function gameReady(){
  main = $('.mainTable');
  scoreboard = $('.scoreboard');
  timer = $('.timerboard');
  createTable();
  setLimitingKeys();
  createScoreboard();
  createTimerboard();
  setHeadersAtRandom();
  textboxOnFocus();
  textboxOnFocusout();
  openAreYouReady();
}

function openAreYouReady() {
  $('.areyouready').dialog('open');
}

//空のテーブルを作成
function createTable() {
  for (var j = 0; j < maxRowNum+2; j++) {
    var tr = $('<tr>');
    for (var i = 0; i < maxColumnNum+2; i++) {
      var td = $('<td>');

      if (i === 0 && j === 0) {
        td.attr('class', 'operator');
        td.html(operator);
      } else if (j === 0 && i !== maxColumnNum+1) {
        td.attr('class', 'column-header');
      } else if (i === 0 && j !== maxRowNum+1) {
        td.attr('class', 'row-header');
      } else if (i === maxColumnNum+1 || j === maxRowNum+1) {
        td.attr('class', 'overcell');
      } else {
        td.html('<input type="text" maxlength="2">');
      }

      tr.append(td);
    }
    $(main).append(tr);
  }
  $(main).show();
}

//入力できるキーを制限し、エンターとタブでセル移動を可能にする
function setLimitingKeys() {
  $(main).on('keydown', 'input', function(e) {
    if (!e) var e = window.event;

    var k = e.keyCode;
    switch (k) {
      case 13 : //エンター
        focusHorizontalCell($(this), 1);
        return false;
      case 9 :  //タブ
        focusVerticalCell($(this), 1);
        return false;
      case 38 : //↑
        focusHorizontalCell($(this), -1);
        return false;
      case 40 : //↓
        focusHorizontalCell($(this), 1);
        return false;
      case 37 : //←
        focusVerticalCell($(this), -1);
        return false;
      case 39 : //→
        focusVerticalCell($(this), 1);
        return false;
      case 32 : //スペース
        autoComplete($(this));
        return false;
      default:
        if(!((k >= 48 && k <= 57) || (k >= 96 && k <= 105) || k == 8 || k == 46 || k == 39 || k == 37)) {
          return false;
        }
        break;
    }
  });
}

//下のテキストボックスにフォーカスさせる
function focusHorizontalCell(target, direction) {
  var index = getHeaders(target);
  var nextRow = index[0] + direction;
  var targetBox = null;

  while(true) {
    if (nextRow === index[0]) {
      break;
    } else if (nextRow >= getRowNum()) {
      nextRow = direction;
    } else if (nextRow <= 0) {
      nextRow = getRowNum() + direction;
    }

    var nextBox = $(main).find('tr').eq(nextRow).find('input').eq(index[1]-1);
    if (nextBox.is(':disabled')) {
      nextRow += direction;
    } else {
      targetBox = nextBox;
      break;
    }
  }

  if (targetBox === null) {
    $(target).blur();
  } else {
    $(targetBox).focus();
  }
}

//右のテキストボックスにフォーカスさせる
function focusVerticalCell(target, direction) {
  var index = getHeaders(target);
  var nextColumn = index[1] + direction;
  var targetBox = null;

  while(true) {
    if (nextColumn === index[1]) {
      break;
    } else if (nextColumn >= getColumnNum()) {
      nextColumn = direction;
    } else if (nextColumn <= 0) {
      nextColumn = getColumnNum() + direction;
    }
    var nextBox = $(main).find('tr').eq(index[0]).find('input').eq(nextColumn-1);
    if ( nextBox.attr('disabled') ) {
      nextColumn += direction;
    } else {
      targetBox = nextBox;
      break;
    }
  }

  if (targetBox === null) {
    $(target).blur();
  } else {
    $(targetBox).focus();
  }
}

//ヘッダーにランダムな値をセット
function setHeadersAtRandom() {
  $(main).find('.column-header').each(function() {
    $(this).text(Math.floor(Math.random()*10));
  });
  $(main).find('.row-header').each(function() {
    $(this).text(Math.floor(Math.random()*10));
  });
}

//テキストボックスのフォーカス時
function textboxOnFocus() {
  var textbox = $(main).find('input');
  textbox.focus(function(e) {
    delValue(e.target);
    delAnswering();
    answering(e.target);
  });
}

//テキストボックスのアンフォーカス時
function textboxOnFocusout() {
  var textbox = $(main).find('input');
  textbox.focusout(function(e) {
    if ( solve(e.target) ) {
      score += scoreInterval;
      updateScore();
      if (isBonusTime()) {
        readingBarcode();
      }
    }
  });
}

//解の確認、一列/一行解き終わったか返す
function solve(target) {
  var headers = getHeaders(target);
  if ($(target).val() == '') {
    return false;
  }
  //答えが合っているか
  if (isEqual(target) ) {
    $(target).attr('disabled', true);
  } else {
    $(target).attr('class', 'notequal');
  }
  //一列全て解き終わったか
  if ( isClearAtColumn(target) ) {
    console.log(headers[1] + ' Column is Complete');
    $( getCellsInAColumn(target) ).each(function() {
      $(this).remove();
    });
    return true;
  }
  //一行全て解き終わったか
  if ( isClearAtRow(target) ) {
    console.log(headers[0] + ' Row is Complete');
    $(target).parent().parent().remove();
    return true;
  }
  return false;
}

//不正解のセルのみ値を削除する
function delValue(target) {
  if ( $(target).attr('class') === 'notequal' ) {
    $(target).val('');
  }
}

//answeringクラスを削除
function delAnswering() {
  $(main).find('.answering').removeAttr('class');
}

//テキストボックスのtabindexタグを全て-1(TAB移動無効)にする
function delTabIndex() {
  $(main).find('input').attr('tabindex', -1)
}

//解答中のセルにansweringクラスを付与
function answering(target) {
  var headers = getHeaders(target);
  $(target).parent().siblings().find('input').each(function() {
    if ($(this).attr('class') === 'notequal') {
      return true;
    }
    $(this).attr('class', 'answering');
  });
  $(main).find('tr').each(function() {
    if ($(this).attr('class') === 'notequal') {
      return true;
    }
    $(this).find('input').eq(headers[1]-1).attr('class', 'answering');
  });
}

//tabindexをその行のみにセット
function setTabIndex(target) {
  $(target).parent().parent().find('input').each(function(i) {
    $(this).attr('tabindex', i);
  });
}

//解が等しいか
function isEqual(target) {
  var sum = $(target).val();  //計算結果
  var headers = getHeadersValues(target);  //ヘッダーの値

  console.log(headers.row + ' + ' + headers.column + ' = ' + sum);
  var bool = false;
  switch (operator) {
    case '+':
      bool = (sum == headers.row + headers.column );
      break;
    case '*':
      bool = (sum == headers.row * headers.column );
      break;
  }
  console.log(bool);
  return bool;
}

//ヘッダー番号を返す (ヘッダーは0)
function getHeaders(target) {
  var headers = [];
  headers.push( $(target).parent().parent().index() );
  headers.push( $(target).parent().index() );
  return headers;
}

//ヘッダーの値を返す
function getHeadersValues(target) {
  var values = [];
  var headers = getHeaders(target);
  values.row = parseInt( $(main).find('.row-header').eq(headers[0]-1).text() );
  values.column = parseInt( $(main).find('.column-header').eq(headers[1]-1).text() );
  return values;
}

//一行解き終わったか返す
function isClearAtRow(target) {
  var bool = true;
  $(target).parent().parent().find('input').each(function() {
    if ( !$(this).prop('disabled') ) {
      bool = false;
      return false;
    }
  });
  return bool;
}

//一列解き終わったか返す
function isClearAtColumn(target) {
  var bool = true;
  var headers = getHeaders(target);
  var column = headers[1]-1;
  $(main).find('tr').each(function(i) {
    var input = $(this).find('input');
    if (input.length === 0) {
      return true;
    } else if ( !$(input).eq(column).prop('disabled') ) {
      bool = false;
      return false;
    }
  });
  return bool;
}

//指定のinputがある行のセルのjQueryを取得
function getCellsInARow(target) {
  return $(target).parent().parent().find('tr');
}

//指定のinputがある行のセルのjQueryを取得
function getCellsInAColumn(target) {
  var tr = [];
  var index = getHeaders(target)[1];
  $(main).find('tr').each(function() {
    tr.push( $(this).find('td').eq(index) );
  });
  return tr;
}

//行数を返す(ヘッダーを除く)
function getRowNum() {
  return $(main).find('tr').length-1;
}

//列数を返す(ヘッダーを除く)
function getColumnNum() {
  return $(main).find('tr').eq(0).find('td').length-1;
}

//自動解答
function autoComplete(target) {
  var value = getHeadersValues(target);
  var answer;
  switch (operator) {
    case '+':
      answer = value.row + value.column;
      break;
    case '*':
      answer = value.row * value.column;
      break;
  }
  target.val(answer);
}
