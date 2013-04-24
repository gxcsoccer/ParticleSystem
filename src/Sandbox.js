(function() {
	var $ = function(id) {
			return document.getElementById(id);
		};

	var preDefinedConfig = {
		totalParticles: 100,
		emissionRate: 100 / 5,
		pos: {
			x: 400,
			y: 300
		},
		life: 5,
		size: 5,
		color: "blue",
		angle: 90,
		angleVar: 180,
		speed: 10
	};

	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(function() {
			callback(new Date().getTime());
		}, 1 / 60 * 1000);
	};

	var canvas, context, emitter, lastTimestamp = 0;

	var play = function(timestamp) {
			timestamp = timestamp || 0;
			var delta = timestamp - lastTimestamp;
			lastTimestamp = timestamp;

			delta /= 1000;
			//console.log(delta);
			emitter.update(delta);
			emitter.draw(context);

			requestAnimationFrame(play);
		};

	window.Sandbox = {
		init: function() {
			canvas = $('canvas');
			context = canvas.getContext('2d');
			emitter = new ParticleEmitter(preDefinedConfig);

			play();
		}
	}
})()