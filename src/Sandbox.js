(function() {
	var $ = function(id) {
			return document.getElementById(id);
		};

	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(function() {
			callback(new Date().getTime());
		}, 1 / 60 * 1000);
	};

	var canvas, context, psys, lastTimestamp = 0;

	var play = function(timestamp) {
			timestamp = timestamp || 0;
			var delta = timestamp - lastTimestamp;
			lastTimestamp = timestamp;

			delta /= 1000;
			//console.log(delta);

			psys.update(delta);
			psys.draw(context);

			requestAnimationFrame(play);
		};

	window.Sandbox = {
		init: function() {
			canvas = $('canvas');
			context = canvas.getContext('2d');
			psys = new ParticleSystem(100);

			play();
		}
	}
})()