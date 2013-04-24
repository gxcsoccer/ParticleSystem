var Particle = function() {
		this.pos = new Vector2d(0, 0);
		this.setVelocity(0, 0);
	};

Particle.prototype.init = function(config) {
	this.pos.x = config.pos.x;
	this.pos.y = config.pos.y;

	this.originalLife = this.life = config.life || Infinity;
	this.originalSize = this.size = config.size;

	this.color = config.color;

	var angle = config.angle + config.angleVar * Util.random11();
	this.setVelocity(angle, config.speed);
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
		this.size = this.originalSize * ageRatio;
		this.alpha = ageRatio;

		this.pos = this.pos.add({
			x: this.velocity.x * delta,
			y: this.velocity.y * delta
		});
	}
};

Particle.prototype.draw = function(context) {
	context.save();
	context.globalAlpha = this.alpha;
	context.fillStyle = this.color;
	context.beginPath();
	context.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
	context.closePath();
	context.fill();
	context.restore();
};