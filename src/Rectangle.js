var Rectangle = function(pos, width, height) {
		this.pos = pos;
		this.width = width;
		this.height = height;
	};

Rectangle.prototype = {
	get top() {
		return this.pos.y;
	}, get bottom() {
		return this.pos.y + this.height;
	}, get left() {
		return this.pos.x;
	}, get right() {
		return this.pos.x + this.width;
	}
};