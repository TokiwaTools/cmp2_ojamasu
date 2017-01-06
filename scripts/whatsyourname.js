window.onload = function() {
  createWYN();
}

var name = '';

function createWYN() {
  $('#message').text('お名前は？');

  var form = $('<form>');
  var input = $('<input>');
  input.attr('type', 'text');
  input.attr('class', 'namebox');
  input.attr('value', '名無しさん');
  input.keypress(function(e) {
    if (e.which == 13) {
      button.click();
      return false;
    }
  });
  var button = $('<input>');
  button.attr('type', 'button');
  button.attr('class', 'nameboxButton');
  button.attr('value', 'OK');
  button.click(function() {
    if ($('.namebox').val() == '') {
      alert('名前を入力してね');
    } else {
      getName();
      question();
      createChoices();
    }
  });
  form.append(input);
  form.append(button);
  $('.choices').append(form);
  input.focus();
}

function getName() {
  name = $('.namebox').val();
  console.log('Your Name: ' + name);
}
