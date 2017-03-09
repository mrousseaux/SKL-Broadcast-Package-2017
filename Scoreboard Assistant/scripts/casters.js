var tabID = "casters"; //selects the scoreboard assistant tab
var c1, c2, r1, r2;

$(document).ready(function() {
	//html elements to update on page load
	$('#c1');
	$('#c2');
});

function parseResponse(response) {
	data = JSON.parse(response);
	
	if (data.tabID == tabID)
	{
		c1 = parseText(data.lower1A);
		r1 = parseText(data.lower1B);
		c2 = parseText(data.lower2A);
		r2 = parseText(data.lower2B);

		runUpdate();
	}
}

function runUpdate() {
	if ($('#c1').html() != c1 || $('#r1').html() != r1) {
		updating = true;
		$('#c1') //updates the html element selected
			.queue(elemsUpdate())
			.queue(elemsFinish());
	}
	
	if ($('#c2').html() != c2 || $('#r2').html() != r2) {
		updating = true;
		$('#c2') //updates the html element selected
			.queue(elemsUpdate())
			.queue(elemsFinish());
	}
}

function elemsUpdate() { //updates the content of the selected elements with the parsed socket
	return function (next) {
		console.log("updated elments");
		$('#c1').html(c1);
		$('#r1').html(r1);
		$('#c2').html(c2);
		$('#r2').html(r2);
		next();
	};
}