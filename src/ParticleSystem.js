function coinFlip() {
	return Math.random() > .5 ? 1 : -1;
}

var ParticleSystem = function(count) {
		this.particles = [];
		for (var i = 0; i < count; i++) {
			this.particles.push(new Particle(400, 300, 10, 5, 90 + Math.random() * 180 * coinFlip(), Math.random() * 60 + 20, "blue"));
		}
	};

ParticleSystem.prototype.update = function(delta) {
	this.particles.forEach(function(particle) {
		particle.update(delta);
	});
};

ParticleSystem.prototype.draw = function(context) {
	context.fillStyle = 'black';
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);

	this.particles.forEach(function(particle) {
		if (particle.life > 0) {
			particle.draw(context);
		}
	});
};