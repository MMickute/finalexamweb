var lastX, lastY, path, pathString;
var first = true;
var lines = [];
var idx = 0;

$(document).ready(function(){
	var $canvasContainer = $('#line-canvas');
	canvas = document.getElementById('canvas');

	paper = new Raphael(canvas, $canvasContainer.width(), $canvasContainer.height());
	path = paper.path();
	buildGrid();
	
	lines[idx] = paper.path().attr({
		'stroke-width': 5,
		'stroke-linecap': 'square'
	});

	

	$(canvas).mousedown(function (e) {
		var x = e.offsetX;
		var y = e.offsetY;

		x = (Math.round(x / 30) * 30) - 10;
		y = (Math.round(y / 30) * 30) - 10;

		if (first) {
			paper.rect(x - 2, y - 2, 4, 4).attr({
				stroke: 'none',
				fill: '#000'
			});
			lines[idx].attr('path', 'M' + (x ) + ',' + (y));
			first = !first;
		} else {
			var p = lines[idx].attr('path');
			p += 'L' + x + ',' + y;
			lines[idx].attr('path', p);
			idx++;
			lines[idx] = paper.path('M' + (x ) + ',' + (y)).attr({
				'stroke-width': 5,
				'stroke-linecap': 'square'
			});
		}
		lastY = y;
		lastX = x;
	});
});

$(document).on({
	keypress: function(e){
		if(e.which === 32){
			lines[idx] = paper.path().attr({
				'stroke-width': 5,
				'stroke-linecap': 'square'
			});

			first = !first;
		}
	}
});

$(document).on({
	dblclick: function(e){
		lines[idx] = paper.path().attr({
			'stroke-width': 5,
			'stroke-linecap': 'square'
		});

		first = !first;
	}
})



function buildGrid(){
	var dW = $(document).width();
	var dH = $(document).height();

	for(var x = 20; x < dW - 10; x += 30){
		for(var y = 20; y < dH - 10; y += 30){
			paper.ellipse(x, y, 10, 10).attr({
				stroke: '#cdcdcd'
			});
		}
	}
}
