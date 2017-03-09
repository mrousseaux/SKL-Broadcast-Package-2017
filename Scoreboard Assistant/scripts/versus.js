var tabID = "versus";
var p1, p2, i1, i2, s1, s2, mm;

function parseResponse(response) {
	data = JSON.parse(response);
	
	if (data.tabID == tabID)
	{
		p1 = parseText(data.player1A);
		p2 = parseText(data.player2A);
		i1 = parseText(data.player1B);
		i2 = parseText(data.player2B);
		s1 = getRoman(parseText(data.score1));
		s2 = getRoman(parseText(data.score2));
		mm = parseText(data.matchB);

		runUpdate();
	}
}

function runUpdate() {
	if ($('#mm').html() != mm) {
		updating = true;
		$('body')
			.queue(elemsHide('.score .title')).delay(outSpeed).queue(elemsHide('.score'))
			.queue(elemsHide('.player .title')).delay(outSpeed).queue(elemsHide('.player'))
			.queue(elemsHide('.match .title')).delay(outSpeed).queue(elemsHide('.match'))
			.delay(outSpeed)
			.queue(elemsUpdate()).delay(inSpeed)
			.queue(elemsShow('.match')).delay(inSpeed).queue(elemsShow('.match .title'))
			.queue(elemsShow('.player')).delay(inSpeed).queue(elemsShow('.player .title'))
			.queue(elemsShow('.score')).delay(inSpeed).queue(elemsShow('.score .title'))
			.queue(elemsFinish());
	} else if ($('#p1').html() != p1 || $('#p2').html() != p2) {
		updating = true;
		$('body')
			.queue(elemsHide('.score .title')).delay(outSpeed).queue(elemsHide('.score'))
			.queue(elemsHide('.player .title')).delay(outSpeed).queue(elemsHide('.player'))
			.delay(outSpeed)
			.queue(elemsUpdate()).delay(inSpeed)
			.queue(elemsShow('.player')).delay(inSpeed).queue(elemsShow('.player .title'))
			.queue(elemsShow('.score')).delay(inSpeed).queue(elemsShow('.score .title'))
			.queue(elemsFinish());
	} else if ($('#s1').html() != s1 || $('#s2').html() != s2) {
		updating = true;
		$('body')
			.queue(elemsHide('.score .title')).delay(outSpeed).queue(elemsHide('.score'))
			.delay(outSpeed)
			.queue(elemsUpdate()).delay(inSpeed)
			.queue(elemsShow('.score')).delay(inSpeed).queue(elemsShow('.score .title'))
			.queue(elemsFinish());
	}
}

function elemsUpdate() {
	return function (next) {
		$('#mm').html(mm);
		$('#p1').html(p1);
		$('#p2').html(p2);
		$('#s1').html(s1);
		$('#s2').html(s2);
		$('#i1').html("<span class=\"thum i"+i1+"\"></span>");
		$('#i2').html("<span class=\"thum i"+i2+"\"></span>");
		next();
	};
}