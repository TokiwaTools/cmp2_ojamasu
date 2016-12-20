$(document).ready(function(){
  var table = $('.mainTable');
  createTable(table);
});

function createTable(table) {
  var html = '';
  for (var j = 0; j < 12; j++) {
    html += '<tr class="' + j + '">';
    for (var i = 0; i < 12; i++) {
      html += '<td class="' + i + '"></td>';
    }
    html += '</tr>';
  }
  table.append(html);
}

function setHeaders(table) {

}
