var operator = '+'; //演算子
var main; //テーブルの要素

$(document).ready(function(){
  main = $('.mainTable');
  createTable();
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
    }
  });
}

//解の確認
function solve(target) {
  var headers = getHeaders(target);
  //答えが合っているか
  if (isEqual(target) ) {
    $(target).attr('disabled', true);
  }
  //一列全て解き終わったか
  if ( isClearAtColumn(target) ) {
    console.log(headers[1] + ' Column is Complete');
    return true;
  }
  //一行全て解き終わったか
  if ( isClearAtRow(target) ) {
    console.log(headers[0] + ' Row is Complete');
    return true;
  }
  return false;
}

//answeringクラスを削除
function delAnswering() {
  $(main).find('.answering').removeAttr('class');
}

//解答中のセルにansweringクラスを付与
function answering(target) {
  var headers = getHeaders(target);
  $(target).parent().siblings().find('input').each(function() {
    $(this).attr('class', 'answering');
  });
  $(main).find('tr').each(function() {
    $(this).find('input').eq(headers[1]-1).attr('class', 'answering');
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

//何番目のヘッダーか返す
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
