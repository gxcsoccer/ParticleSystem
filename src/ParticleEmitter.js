/**
 * 粒子发射器
 */
var ParticleEmitter = function(config) {
		this.emissionRate = config.emissionRate;
		this.totalParticles = config.totalParticles;
		this.particlePool = [];
		this.activeParticles = [];

		this.emitCounter = 0;
		this.rate = 1.0 / this.emissionRate;

		this.metadata = config;

		for (var i = 0; i < this.totalParticles; i++) {
			this.particlePool.push(new Particle());
		}
	};

ParticleEmitter.prototype.addParticle = function() {
	if (this.isFull()) {
		return false;
	}

	var p = this.particlePool.pop();
	p.init(this.metadata);
	this.activeParticles.push(p);
};

ParticleEmitter.prototype.isFull = function() {
	return this.particlePool.length === 0;
};

ParticleEmitter.prototype.update = function(delta) {
	if (this.emissionRate) {
		this.emitCounter += delta;

		while (!this.isFull() && this.emitCounter > this.rate) {
			this.addParticle();
			this.emitCounter -= this.rate;
		}
	}

	var particleIndex = 0,
		totalCount = this.activeParticles.length,
		particle;
	while (particleIndex < totalCount) {
		particle = this.activeParticles[particleIndex];
		particle.update(delta);
		if (!particle.isAlive()) {
			this.particlePool.push(particle);
			this.activeParticles.splice(particleIndex, 1);
			totalCount--;
		} else {
			particleIndex++			
		}
	}
};

ParticleEmitter.prototype.draw = function(context) {
	context.fillStyle = 'black';
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);

	var particleIndex = 0,
		totalCount = this.activeParticles.length;
	while (particleIndex < totalCount) {
		this.activeParticles[particleIndex++].draw(context);
	}
};