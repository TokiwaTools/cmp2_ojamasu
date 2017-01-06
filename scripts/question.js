var count = 0;

function imgLeft_Click(){
	count++;
	if (count == 1) {
		$('#message').text( "どのくらいがんばる？" );
		$('#hidari').val("激甘");
		$('#migi').val("中辛");
	} else {
		deleteReadyWindow();
		gameReady();
	}
}

function imgRight_Click(){
	count++;
	if (count == 1) {
		$('#message').text( "どのくらいがんばる？" );
		$('#hidari').val("激甘");
		$('#migi').val("中辛");
	} else {
		deleteReadyWindow();
		gameReady();
	}
}

function deleteReadyWindow() {
	$('#message').remove();
	$('.choices').remove();
}

function question() {
	$('#message').text( "ここに来るのは初めてかな？" );
}

function createChoices() {
	var form = $('<form>');

	var inputLeft = $('<input>');
	inputLeft.attr('type', 'button');
	inputLeft.val('YES');
	inputLeft.attr('id', 'hidari');
	inputLeft.keypress(function(e) {
    if (e.which == 13) {
      inputLeft.click();
      return false;
    }
  });
	inputLeft.click( function() {
		imgLeft_Click();
	});
	form.append(inputLeft);

	var inputRight = $('<input>');
	inputRight.attr('type', 'button');
	inputRight.val('NO');
	inputRight.attr('id', 'migi');
	inputRight.keypress(function(e) {
    if (e.which == 13) {
      inputRight.click();
      return false;
    }
  });
	inputRight.click( function() {
		imgRight_Click();
	});
	form.append(inputRight);

	$('.choices').empty();
	$('.choices').append(form);
}
