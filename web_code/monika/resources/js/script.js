var lastX, lastY, path, pathString;
var first = true;
var lines = [];
var idx = 0;

var glyphX = 6;
var glyphY = 11;

var gridSize = 30;

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
	x = (Math.round(x / gridSize) * gridSize) - 10;
	y = (Math.round(y / gridSize) * gridSize) - 10;

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

$(canvas).on({
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

	// On the x-axis: start at 20, stop at width-10, every gridSizepx:
	for(var x = 20; x < gridSize * glyphX; x += gridSize){
		// On the y-axis: start at 20, stop at height-10, every gridSizepx:
		for(var y = 20; y < gridSize * glyphY; y += gridSize){
			// Make a 10 by 10px circle with a gray out-line
			paper.ellipse(x, y, 10, 10).attr({
				stroke: '#cdcdcd'
			});
		}
	}
}
