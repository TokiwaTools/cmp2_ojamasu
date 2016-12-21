$(document).ready(function(){
  createTable();
  setHeaders();
  $('.mainTable input').change(function(e) {
    solve(e.target);
  });
});

function createTable() {
  var html = '';
  for (var j = 0; j < 12; j++) {
    html += '<tr>';
    for (var i = 0; i < 12; i++) {
      if (i === 0 && j === 0) {
        html += '<td>+</td>';
      } else if (j === 0 && i !== 11) {
        html += '<td id="row-header-' + i + '" class="row-header"></td>';
      } else if (i === 0 && j !== 11) {
        html += '<td id="column-header-' + j + '" class="column-header"></td>';
      } else if (i === 11 || j === 11) {
        html += '<td></td>';
      } else {
        html += '<td>';
        html += '<input type="number" size="1" min="0" max="99" class="' + i + '-' + j + '">';
        html += '</td>';
      }
    }
    html += '</tr>';
  }
  $('.mainTable').append(html);
}

function setHeaders() {
  $('.mainTable .row-header').each(function() {
    $(this).text(Math.floor(Math.random()*10));
  });
  $('.mainTable .column-header').each(function() {
    $(this).text(Math.floor(Math.random()*10));
  });
}

function solve(target) {
  var index = getIndexFromInput(target);  //解いたセルのインデックス
  //答えが合っているか
  if (isEqual(index) ) {
    $(target).attr('readonly', true);
  }
  //一行全て解き終わったか
  if ( isClearAtRow(index[1]) ) {

    console.log(index[1] + ' Row is Complete');
  }
  //一列全て解き終わったか
  if ( isClearAtColumn(index[0]) ) {
    console.log(index[0] + ' Column is Complete');
  }
}

function getIndexFromInput(target) {
  var index = [];
  var className = $(target).attr('class');  //クラス名
  index.push( className.split('-')[0] );  //列のインデックス
  index.push( className.split('-')[1] ); //行のインデックス
  return index;
}

function getSum(index) {
  return $('.mainTable input[class="' + index[0] + '-' + index[1] + '"]').val();
}

function isEqual(index) {
  var sum = getSum(index);  //計算結果
  var headers = getHeaders(index[0], index[1]);  //ヘッダーの値

  console.log(headers[0] + ' + ' + headers[1] + ' = ' + sum);
  if (sum == (parseInt(headers[0]) + parseInt(headers[1]))) {
    console.log('true');
    return true;
  }
  console.log('false');
  return false;
}

function getHeaders(i, j) {
  var headers = [];
  headers.push( $('#row-header-' + i).text() );
  headers.push( $('#column-header-' + j).text() );
  return headers;
}

//class: column-row
function isClearAtRow(row) {
  for (var i = 1; i <= 10; i++) {
    var className = '.mainTable .' + i + '-' + row;
    if ( $(className).attr('readonly') !== 'readonly') {
      return false;
    }
  }
  return true;
}

function isClearAtColumn(column) {
  for (var i = 1; i <= 10; i++) {
    var className = '.mainTable .' + column + '-' + i;
    if ( $(className).attr('readonly') !== 'readonly') {
      return false;
    }
  }
  return true;
}
