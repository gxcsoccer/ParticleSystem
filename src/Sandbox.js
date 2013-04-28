(function() {
	var $ = function(id) {
			return document.getElementById(id);
		};

	var preDefinedConfig = {
		waterfall: {
			totalParticles: 400,
			emissionRate: 400 / 2,
			pos: {
				x: 400,
				y: 300
			},
			posVar: {
				x: 0,
				y: 20
			},
			gravity: {
				x: 0,
				y: 100
			},
			life: 10,
			lifeVar: 5,
			radius: 5,
			radiusVar: 3,
			angle: 90,
			angleVar: 180,
			speed: 80,
			speedVar: 20,
			startScale: 1,
			endScale: 1,
			tangentialAccel: 0,
			tangentialAccelVar: 0,
			radialAccel: 0,
			radialAccelVar: 0,
			startColor: [19.89, 59.93, 255, 1],
			startColorVar: [0, 0, 48, 0.3],
			endColor: [198.9, 198.9, 255, 0],
			endColorVar: [0, 0, 0, 0],
			// initPos: function(pos) {
			// 	var r = Util.toRad(pos.x);
			// 	return new Vector2d(Math.cos(r) * 60, Math.sin(r) * 80);
			// }
		},
		ring: {
			totalParticles: 100,
			emissionRate: 100 / 2,
			pos: {
				x: 400,
				y: 300
			},
			posVar: {
				x: 180,
				y: 20
			},
			gravity: {
				x: 0,
				y: 0
			},
			life: 2.5,
			lifeVar: 1,
			radius: 5,
			radiusVar: 3,
			angle: 90,
			angleVar: 180,
			speed: 0,
			speedVar: 0,
			startScale: 1,
			endScale: 1,
			tangentialAccel: 480,
			tangentialAccelVar: 30,
			radialAccel: -1080,
			radialAccelVar: 30,
			startColor: [19.89, 59.93, 255, 1],
			startColorVar: [0, 0, 48, 0.3],
			endColor: [198.9, 198.9, 255, 0],
			endColorVar: [0, 0, 0, 0],
			initPos: function(pos) {
				var r = Util.toRad(pos.x);
				return new Vector2d(Math.cos(r) * 60, Math.sin(r) * 80);
			}
		}
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
			emitter = new ParticleEmitter(preDefinedConfig.ring);

			play();
		}
	}
})()