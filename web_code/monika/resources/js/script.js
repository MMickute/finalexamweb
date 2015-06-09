(function( $ ) {

	var glyphX = 6;
	var glyphY = 11;
	var gridSize = 30;

	$.fn.makeDrawableGlyph = function() {
 
		this.each(function() {
			var lastX, lastY, path, pathString;
			var first = true;
			var lines = [];
			var idx = 0;
			
			$(this).width(gridSize * glyphX, gridSize * glyphY);
			
			var paper = new Raphael(this, $(this).width(), $(this).height());
			var path = paper.path();
			
			
			var buildGrid = function(){
				// Makes the open circles in the background
	
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
			
			$(this).mousedown(function (e) {
				// when you click anywhere,
				// store mouse coordinates
				var x = e.offsetX;
				var y = e.offsetY;
				
				console.log(x,y)

				// go from mouse coordinates to grid position
				x = (Math.round(x / gridSize) * gridSize) - 10;
				y = (Math.round(y / gridSize) * gridSize) - 10;

				// only allow coordinates within the lines
				if (Math.round(x / gridSize) > glyphX || Math.round(y / gridSize) > glyphY) {
					return;
				}

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

			$(this).on({
				dblclick: function(e){
					// When you double-click, stop this line
					lines[idx] = paper.path().attr({
						'stroke-width': 5,
						'stroke-linecap': 'square'
					});

					first = !first;
				}
			})

			buildGrid();
			lines[idx] = paper.path().attr({
				'stroke-width': 5,
				'stroke-linecap': 'square'
			});

		});
 
		return this;
 
    };
 
}( jQuery ));



$('#line-canvas').makeDrawableGlyph();
$('#canvas-container-2').makeDrawableGlyph();



