/**
 * 粒子发射器
 */
var ParticleEmitter = function(config) {
		this.emissionRate = config.emissionRate;
		this.totalParticles = config.totalParticles;
		this.particleCount = 0;
		this.particlePool = [];
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

	this.particlePool[this.particleCount].init(this.metadata);
	++this.particleCount;
};

ParticleEmitter.prototype.isFull = function() {
	return this.particleCount === this.totalParticles;
};

ParticleEmitter.prototype.update = function(delta) {
	if (this.emissionRate) {
		this.emitCounter += delta;

		while (!this.isFull() && this.emitCounter > this.rate) {
			this.addParticle();
			this.emitCounter -= this.rate;
		}
	}

	var particleIndex = 0;
	while (particleIndex < this.particleCount) {
		this.particlePool[particleIndex++].update(delta);
	}
};

ParticleEmitter.prototype.draw = function(context) {
	context.fillStyle = 'black';
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);

	var particleIndex = 0;
	while (particleIndex < this.particleCount) {
		this.particlePool[particleIndex++].draw(context);
	}
};