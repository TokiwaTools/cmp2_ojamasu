var getBarcodeTime = false;  //バーコード入力受付中
var barcodeCounter = 0;      //バーコードを入力した回数
var barcodeRow = [];         //行ヘッダー用バーコード
var barcodeColumn = [];      //列ヘッダー用バーコード

//バーコードの数字を列ヘッダーに割り当てる
function setColumnHeadersByBarcode() {
  var columnNum = getColumnNum();
  $(main).find('.column-header').each(function(i) {
    $(this).text( barcodeColumn[barcodeColumn.length - columnNum + i] );
  });
}

//バーコードの数字を行ヘッダーに割り当てる
function setRowHeadersByBarcode() {
  var rowNum = getRowNum();
  $(main).find('.row-header').each(function(i) {
    $(this).text( barcodeRow[barcodeRow.length - rowNum + i] );
  });
}

//キー(バーコード)入力時
function keyCheck(e) {
  if (!getBarcodeTime) {
    return;
  }

  var chr = String.fromCharCode(e);
  if (barcodeCounter == 0) {
    barcodeColumn.push(chr);
    if (barcodeColumn.length == 13) {
      setColumnHeadersByBarcode();
      barcodeCounter++;
      barcodeColumn = [];
    }
  } else if (barcodeCounter == 1) {
    barcodeRow.push(chr);
    if (barcodeRow.length == 13) {
      setRowHeadersByBarcode();
      barcodeCounter = 0;
      barcodeRow = [];
    }
  }
}
