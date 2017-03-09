var tabID = "alerts";
var t1,t2,t3;

$(document).ready(function() {
	$('#text1');
	$('#text2');
	$('#text3');
});

function parseResponse(response) {
	data = JSON.parse(response);
	
	if (data.tabID == tabID)
	{
		t1 = parseText(data.text1);
		t2 = parseText(data.text2);
		t3 = parseText(data.text3);

		runUpdate();
	}
}

function runUpdate() {
	if ($('#t1').html() != t1) {
		updating = true;
		$('#text1')
			.queue(elemsUpdate())
			.queue(elemsFinish());
	}
	
	if ($('#t2').html() != t2) {
		updating = true;
		$('#text2')
			.queue(elemsUpdate()).delay(inSpeed)
			.queue(elemsFinish());
	}
	if ($('#t3').html() != t3) {
		updating = true;
		$('#text3')
			.queue(elemsUpdate()).delay(inSpeed)
			.queue(elemsFinish());
	}
}

function elemsUpdate() {
	return function (next) {
		console.log("updated elments");
		$('#t1').html(t1);
		$('#t2').html(t2);
		$('#t3').html(t3);
		next();
	};
}