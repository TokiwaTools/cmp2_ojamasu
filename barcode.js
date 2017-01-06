$(document).on('keydown','*',function(e) {
  keyCheck(e.keyCode);
});

var getBarcodeTime = true;  //バーコード入力受付中
var barcodeCounter = 0;     //バーコードを入力した回数
var barcodeRow = [];        //行ヘッダー用バーコード
var barcodeColumn = [];     //列ヘッダー用バーコード

//バーコードの数字を列ヘッダーに割り当てる
function setColumnHeadersByBarcode() {
  var columnNum = getColumnNum();
  console.log(barcodeColumn);
  $(main).find('.column-header').each(function(i) {
    $(this).text( barcodeColumn[barcodeColumn.length - columnNum + i + 1] );
  });
}

//バーコードの数字を行ヘッダーに割り当てる
function setRowHeadersByBarcode() {
  var rowNum = getRowNum();
  console.log(barcodeRow);
  $(main).find('.row-header').each(function(i) {
    $(this).text( barcodeColumn[barcodeRow.length - rowNum + i + 1] );
  });
}

//キー(バーコード)入力時
function keyCheck(e) {
  if (!getBarcodeTime) {
    return;
  }

  var chr = String.fromCharCode(e);
  console.log(chr);
  if (barcodeCounter == 0) {
    barcodeColumn.push(chr);
    if (barcodeColumn.length == 13) {
      barcodeCounter++;
      setColumnHeadersByBarcode();
    }
  } else if (barcodeCounter == 1) {
    barcodeRow.push(chr);
    if (barcodeRow.length == 13) {
      barcodeCounter = 0;
      setRowHeadersByBarcode();
    }
  }
}
