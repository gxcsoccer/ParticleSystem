(function() {
	var $ = function(id) {
			return document.getElementById(id);
		};

	var preDefinedConfig = {
		totalParticles: 400,
		emissionRate: 100,
		pos: {
			x: 400,
			y: 300
		},
		gravity: {
			x: 0,
			y: 150
		},
		life: 2.5,
		lifeVar: 1,
		radius: 5,
		radiusVar: 3,
		angle: 90,
		angleVar: 10,
		speed: 180,
		speedVar: 50,
		startColor: [19.89, 59.93, 255, 1],
		startColorVar: [0, 0, 48, 0.3],
		endColor: [198.9, 198.9, 255, 0],
		endColorVar: [0, 0, 0, 0],
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