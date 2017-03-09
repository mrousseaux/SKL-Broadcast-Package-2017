var tabID = "event";
var l1, l2;

$(document).ready(function() {
	$('body').delay(inSpeed*3).queue(elemsShow('.logo'));
});

function parseResponse(response) {
	data = JSON.parse(response);
	
	if (data.tabID == tabID)
	{
		l1 = parseText(data.text3);
		l2 = parseText(data.text4);

		runUpdate();
	}
}

function runUpdate() {
	if ($('#l2').html() != l2) {
		updating = true;
		$('body')
			.queue(elemsHide('.lower1 .title')).delay(outSpeed).queue(elemsHide('.lower1'))
			.queue(elemsHide('.lower2 .title')).delay(outSpeed).queue(elemsHide('.lower2'))
			.delay(outSpeed)
			.queue(elemsUpdate()).delay(inSpeed)
			.queue(elemsShow('.lower2')).delay(inSpeed).queue(elemsShow('.lower2 .title'))
			.queue(elemsShow('.lower1')).delay(inSpeed).queue(elemsShow('.lower1 .title'))
			.queue(elemsFinish());
	} else if ($('#l1').html() != l1) {
		updating = true;
		$('body')
			.queue(elemsHide('.lower1 .title')).delay(outSpeed).queue(elemsHide('.lower1'))
			.delay(outSpeed)
			.queue(elemsUpdate()).delay(inSpeed)
			.queue(elemsShow('.lower1')).delay(inSpeed).queue(elemsShow('.lower1 .title'))
			.queue(elemsFinish());
	}
}

function elemsUpdate() {
	return function (next) {
		$('#l1').html(l1);
		$('#l2').html(l2);
		next();
	};
}