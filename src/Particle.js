var Particle = function(x, y, size, life, angle, speed, color, acceleration) {
		this.pos = new Vector2d(x, y);
		this.originalLife = this.life = life || Infinity;
		this.originalSize = this.size = size;
		this.color = color;

		var angleInRadians = angle * Math.PI / 180;
		this.velocity = new Vector2d(speed * Math.cos(angleInRadians), -speed * Math.sin(angleInRadians));
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
	context.globalCompositeOperation = this.alpha;
	context.fillStyle = this.color;
	context.beginPath();
	context.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
	context.closePath();
	context.fill();
	context.restore();
};