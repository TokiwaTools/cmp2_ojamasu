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
	$('.pic').remove();
}

window.onload = function() {
	$('#message').text( "ここに来るのは初めてかな？" );
}
