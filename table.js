var operator = '+'; //演算子
var score = 0;  //スコア
var main; //テーブルの要素
var scoreboard; //スコアボードの要素

$(document).ready(function(){
  main = $('.mainTable');
  scoreboard = $('.scoreboard');
  createTable();
  setLimitingKeys();
  createScoreboard();
  setHeadersAtRandom();
  textboxOnFocus();
  textboxOnChange();
});

//空のテーブルを作成
function createTable() {
  for (var j = 0; j < 12; j++) {
    var tr = $('<tr>');
    for (var i = 0; i < 12; i++) {
      var td = $('<td>');

      if (i === 0 && j === 0) {
        td.attr('class', 'operator');
        td.html(operator);
      } else if (j === 0 && i !== 11) {
        td.attr('class', 'row-header');
      } else if (i === 0 && j !== 11) {
        td.attr('class', 'column-header');
      } else if (i === 11 || j === 11) {
        td.attr('class', 'overcell');
      } else {
        td.html('<input type="text" maxlength="2">');
      }

      tr.append(td);
    }
    $(main).append(tr);
  }
}

//スコアボードの作成
function createScoreboard() {
  var title = $('<h2>');
  title.html('Scoreboard');
  $(scoreboard).append(title);
  var scorep = $('<p>');
  scorep.attr('class', 'score');
  scorep.html(score);
  $(scoreboard).append(scorep);
}

//入力できるキーを制限し、エンターとタブでセル移動を可能にする
function setLimitingKeys() {
  $(main).on('keydown', 'input', function(e) {
    if (!e) var e = window.event;

    var k = e.keyCode;
    //エンターで下のテキストボックスに移動
    if (k == 13) {
      focusLowerCell($(this));
      return false;
    }
    else if (k == 9) {
      focusRightCell($(this));
      return false;
    }
    //数字キー・Backspaceなどの制御用キー以外を受け付けない
    else if(!((k >= 48 && k <= 57) || (k >= 96 && k <= 105) || k == 8 || k == 46 || k == 39 || k == 37)) {
      return false;
    }
  });
}

//下のテキストボックスにフォーカスさせる
function focusLowerCell(target) {
  var index = getHeaders(target);
  var nextRow = index[0]+1;
  if (nextRow >= getRowNum()) {
    nextRow = 1;
  }
  $(main).find('tr').eq(nextRow).find('input').eq(index[1]-1).focus();
}

//右のテキストボックスにフォーカスさせる
function focusRightCell(target) {
  var index = getHeaders(target);
  var nextColumn = index[1]+1;
  if (nextColumn >= getColumnNum()) {
    nextColumn = 1;
  }
  $(main).find('tr').eq(index[0]).find('input').eq(nextColumn-1).focus();
}

//ヘッダーにランダムな値をセット
function setHeadersAtRandom() {
  $(main).find('.row-header').each(function() {
    $(this).text(Math.floor(Math.random()*10));
  });
  $(main).find('.column-header').each(function() {
    $(this).text(Math.floor(Math.random()*10));
  });
}

//テキストボックスのフォーカス時
function textboxOnFocus() {
  var textbox = $(main).find('input');
  textbox.focus(function(e) {
    delAnswering();
    answering(e.target);
  });
}

//テキストボックスの変更時
function textboxOnChange() {
  var textbox = $(main).find('input');
  textbox.change(function(e) {
    if ( solve(e.target) ) {
      alert('1 Queue is Done!');
      updateScore();
    }
  });
}

//解の確認
function solve(target) {
  var headers = getHeaders(target);
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
    score += 100;
    return true;
  }
  //一行全て解き終わったか
  if ( isClearAtRow(target) ) {
    console.log(headers[0] + ' Row is Complete');
    $(target).parent().parent().remove();
    score += 100;
    return true;
  }
  return false;
}

//スコアを更新
function updateScore() {
  $(scoreboard).find('.score').html(score);
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

  console.log(headers[1] + ' + ' + headers[0] + ' = ' + sum);
  var bool = false;
  switch (operator) {
    case '+':
      bool = (sum == parseInt(headers[0]) + parseInt(headers[1]) );
      break;
    case '*':
      bool = (sum == parseInt(headers[0]) * parseInt(headers[1]) );
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
  values.push( $(main).find('.row-header').eq(headers[1]-1).text() );
  values.push( $(main).find('.column-header').eq(headers[0]-1).text() );
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
