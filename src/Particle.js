var Particle = function() {
		this.pos = new Vector2d(0, 0);
		this.originalPos = new Vector2d(0, 0);
		this.force = new Vector2d(0, 0);
		this.setVelocity(0, 0);
	};

/**
 * 初始化粒子
 */
Particle.prototype.init = function(config) {
	var b = {};
	b.x = Util.random11() * config.posVar.x;
	b.y = Util.random11() * config.posVar.y;
	config.initPos && (b = config.initPos(b));

	this.originalPos.x = config.pos.x;
	this.originalPos.y = config.pos.y;
	this.pos.x = config.pos.x + b.x;
	this.pos.y = config.pos.y + b.y;

	this.originalLife = this.life = config.life + (Util.random11() * config.lifeVar) || Infinity;
	this.originalRadius = this.radius = config.radius + (Util.random11() * config.radiusVar);

	var angle = config.angle + config.angleVar * Util.random11();
	var speed = config.speed + config.speedVar * Util.random11();
	this.setVelocity(angle, config.speed);
	this.radialAccel = config.radialAccel + config.radialAccelVar * Util.random11();
	this.tangentialAccel = config.tangentialAccel + config.tangentialAccelVar * Util.random11();
	this.gravity = config.gravity;

	// 颜色
	var startColor = [
	config.startColor[0] + config.startColorVar[0] * Util.random11(), config.startColor[1] + config.startColorVar[1] * Util.random11(), config.startColor[2] + config.startColorVar[2] * Util.random11(), config.startColor[3] + config.startColorVar[3] * Util.random11()];
	var endColor = [
	config.endColor[0] + config.endColorVar[0] * Util.random11(), config.endColor[1] + config.endColorVar[1] * Util.random11(), config.endColor[2] + config.endColorVar[2] * Util.random11(), config.endColor[3] + config.endColorVar[3] * Util.random11()];

	this.color = startColor;
	this.deltaColor = [
	(endColor[0] - startColor[0]) / this.life, (endColor[1] - startColor[1]) / this.life, (endColor[2] - startColor[2]) / this.life, (endColor[3] - startColor[3]) / this.life];

	this.deltaScale = config.endScale - config.startScale;
};

/**
 * 设置速度
 */
Particle.prototype.setVelocity = function(angle, speed) {
	if (!this.velocity) {
		this.velocity = new Vector2d(Math.cos(Util.toRad(angle)) * speed, -Math.sin(Util.toRad(angle)) * speed);
	} else {
		this.velocity.x = Math.cos(Util.toRad(angle)) * speed;
		this.velocity.y = -Math.sin(Util.toRad(angle)) * speed;
	}
};

/**
 * 更新粒子数据
 */
Particle.prototype.update = function(delta) {
	this.life -= delta;
	var ageRatio = this.life / this.originalLife;
	if (this.life > 0) {
		//this.radius = this.originalRadius * ageRatio;
		this.radius *= (1 + (this.deltaScale * delta));


		var radial, tangential;
		if ((this.pos.x !== this.originalPos.x || this.pos.y !== this.originalPos.y) && (this.radialAccel || this.tangentialAccel)) {
			radial = (new Vector2d(this.pos.x - this.originalPos.x, this.pos.y - this.originalPos.y)).unitVector;
		} else {
			radial = new Vector2d(0, 0);
		}
		tangential = radial.rightNormal;

		radial.x *= this.radialAccel;
		radial.y *= this.radialAccel;
		tangential.x *= this.tangentialAccel;
		tangential.y *= this.tangentialAccel;

		this.velocity.x += (this.gravity.x + radial.x + tangential.x) * delta;
		this.velocity.y += (this.gravity.y + radial.y + tangential.y) * delta;

		this.pos = this.pos.add({
			x: this.velocity.x * delta,
			y: this.velocity.y * delta
		});

		// TOD0:
		if(this.pos.y > 600) {
			this.velocity.y *= -0.8;
			this.pos.y = 1200 - this.pos.y;
		}
		if(this.pos.x < 0) {
			this.velocity.x *= -0.8;
			this.pos.x *= -1;
		}
		if(this.pos.x > 800) {
			this.velocity.x *= -0.8;
			this.pos.x = 1600 - this.pos.x;
		}

		this.color[0] += this.deltaColor[0] * delta;
		this.color[1] += this.deltaColor[1] * delta;
		this.color[2] += this.deltaColor[2] * delta;
		this.color[3] += this.deltaColor[3] * delta;
	}
};

/**
 * 粒子是否活着？
 */
Particle.prototype.isAlive = function() {
	return this.life > 0;
};

/**
 * 渲染粒子
 */
Particle.prototype.draw = function(context) {
	context.save();
	context.fillStyle = Util.colorArrayToString(this.color);
	context.beginPath();
	context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
	context.closePath();
	context.fill();
	context.restore();
};