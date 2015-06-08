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
		// when you click anywhere,
		// store mouse coordinates
		var x = e.offsetX;
		var y = e.offsetY;

		// go from mouse coordinates to grid position
		x = (Math.round(x / 30) * 30) - 10;
		y = (Math.round(y / 30) * 30) - 10;

		// If first Line, we do a MoveTo command.
		if (first) {
			paper.rect(x - 2, y - 2, 4, 4).attr({
				stroke: 'none',
				fill: '#000'
			});
			lines[idx].attr('path', 'M' + (x ) + ',' + (y));
			first = !first;
		} else {
			// Otherwise, we do a LineTo command
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
	// When you press space, stop this line
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
		// When you double-click, stop this line
		lines[idx] = paper.path().attr({
			'stroke-width': 5,
			'stroke-linecap': 'square'
		});

		first = !first;
	}
})



function buildGrid(){
	// Makes the open circles in the background
	
	// The width, height is based on the HTML document
	var dW = $(document).width();
	var dH = $(document).height();

	// On the x-axis: start at 20, stop at width-10, every 30px:
	for(var x = 20; x < dW - 10; x += 30){
		// On the y-axis: start at 20, stop at height-10, every 30px:
		for(var y = 20; y < dH - 10; y += 30){
			// Make a 10 by 10px circle with a gray out-line
			paper.ellipse(x, y, 10, 10).attr({
				stroke: '#cdcdcd'
			});
		}
	}
}
