var websocket, visible, updating, inSpeed, outSpeed;
var socketUrl = 'ws://localhost:58341';
var upSpeed = 5000;

$(document).ready(function() {
	var styles = getComputedStyle(document.documentElement);
	
	inSpeed = String(styles.getPropertyValue('--slow-speed')).trim();
	inSpeed = inSpeed.replace('s', '');
	inSpeed = inSpeed * 1000;
	
	outSpeed = String(styles.getPropertyValue('--fast-speed')).trim();
	outSpeed = outSpeed.replace('s', '');
	outSpeed = (outSpeed * 1000) + 100;
	
	websocket = new WebSocket(socketUrl);
	websocket.onopen = function() {
		websocket.send(tabID);
	}
	websocket.onclose = function() {
		$('.error .title').text('Failed to connect to ' + socketUrl);
		$('body').queue(elemsShow('.error .title'));
	}
	websocket.onmessage = function(message) {
		console.log('Recieving data... ' + socketUrl);
		
		if (updating) return;
		parseResponse(message.data);
	};
});

function parseText(txt) {
	txt = txt.replace(/</g, "&lt;");
	txt = txt.replace(/>/g, "&gt;");
	txt = txt.replace(/\s/g, "&nbsp;");
	
	var regex = /\{\{([\w\.]+?)\}\}/g;
	var match = regex.exec(txt);
	
	while (match != null) {
		match[1] = match[1].replace('.', ' ');
		txt = txt.replace(match[0], "<span class=\"icon i"+match[1]+"\"></span>");
		match = regex.exec(txt);
	}
	
	return txt;
}

function getRoman(num) {
	if (num >= 0) {
		return num;
	}
	
	var digits = String(+num).split(""),
		key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
			"","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
			"","I","II","III","IV","V","VI","VII","VIII","IX"],
		roman = "", i = 3;
		
	while (i--) {
		roman = (key[+digits.pop() + (i * 10)] || "") + roman;
	}
	
	return Array(+digits.join("") + 1).join("M") + roman;
}

function elemsHide(elem, step) {
	return function (next) {
		if (typeof step === "undefined") { step = 'display'; }
		
		$(elem).addClass('fast').removeClass(step);
		next();
	};
}

function elemsShow(elem, step) {
	return function (next) {
		if (typeof step === "undefined") { step = 'display'; }
		
		$(elem).removeClass('fast').addClass(step);
		next();
	};
}

function elemsFinish() {
	return function (next) {
		updating = false;
		next();
	};
}