var Particle = function() {
		this.pos = new Vector2d(0, 0);
		this.setVelocity(0, 0);
	};

Particle.prototype.init = function(config) {
	this.pos.x = config.pos.x;
	this.pos.y = config.pos.y;

	this.originalLife = this.life = config.life + (Util.random11() * config.lifeVar) || Infinity;
	this.originalRadius = this.radius = config.radius + (Util.random11() * config.radiusVar);

	var angle = config.angle + config.angleVar * Util.random11();
	var speed = config.speed + config.speedVar * Util.random11();
	this.setVelocity(angle, config.speed);
	this.gravity = config.gravity;

	var startColor = [
		config.startColor[0] + config.startColorVar[0] * Util.random11(), 
		config.startColor[1] + config.startColorVar[1] * Util.random11(), 
		config.startColor[2] + config.startColorVar[2] * Util.random11(), 
		config.startColor[3] + config.startColorVar[3] * Util.random11()
	];
	var endColor = [
		config.endColor[0] + config.endColorVar[0] * Util.random11(), 
		config.endColor[1] + config.endColorVar[1] * Util.random11(), 
		config.endColor[2] + config.endColorVar[2] * Util.random11(), 
		config.endColor[3] + config.endColorVar[3] * Util.random11()
	];
	// then figure out how much to shift the color each frame
	this.color = startColor;
	this.deltaColor = [
		(endColor[0] - startColor[0]) / this.life, 
		(endColor[1] - startColor[1]) / this.life, 
		(endColor[2] - startColor[2]) / this.life, 
		(endColor[3] - startColor[3]) / this.life
	];
};

Particle.prototype.setVelocity = function(angle, speed) {
	if (!this.velocity) {
		this.velocity = new Vector2d(Math.cos(Util.toRad(angle)) * speed, -Math.sin(Util.toRad(angle)) * speed);
	} else {
		this.velocity.x = Math.cos(Util.toRad(angle)) * speed;
		this.velocity.y = -Math.sin(Util.toRad(angle)) * speed;
	}
};

Particle.prototype.update = function(delta) {
	this.life -= delta;
	var ageRatio = this.life / this.originalLife;
	if (this.life > 0) {
		//this.radius = this.originalRadius * ageRatio;

		this.velocity.x += this.gravity.x * delta;
		this.velocity.y += this.gravity.y * delta;

		this.pos = this.pos.add({
			x: this.velocity.x * delta,
			y: this.velocity.y * delta
		});

		this.color[0] += this.deltaColor[0] * delta;
		this.color[1] += this.deltaColor[1] * delta;
		this.color[2] += this.deltaColor[2] * delta;
		this.color[3] += this.deltaColor[3] * delta;
	}
};

Particle.prototype.isAlive = function() {
	return this.life > 0;
};

Particle.prototype.draw = function(context) {
	context.save();
	context.fillStyle = Util.colorArrayToString(this.color);
	context.beginPath();
	context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
	context.closePath();
	context.fill();
	context.restore();
};