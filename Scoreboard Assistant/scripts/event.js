var tabID = "event";
var t1, t2;

function parseResponse(response) {
	data = JSON.parse(response);
	
	if (data.tabID == tabID)
	{
		t1 = parseText(data.text1);
		t2 = parseText(data.text2);

		runUpdate();
	}
}

function runUpdate() {
	if ($('#t1').html() != t1 || $('#t2').html() != t2) {
		updating = true;
		$('body')
			.queue(elemsHide('.event .title')).delay(outSpeed)
			.queue(elemsHide('.event', 'step2')).delay(outSpeed)
			.queue(elemsUpdate()).delay(inSpeed)
			.queue(elemsShow('.event', 'step1')).delay(inSpeed)
			.queue(elemsShow('.event', 'step2')).delay(inSpeed).queue(elemsShow('.event .title'))
			.queue(elemsFinish());
	}
}

function elemsUpdate() {
	return function (next) {
		$('#t1').html(t1);
		$('#t2').html(t2);
		next();
	};
}