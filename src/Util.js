/**
 * 工具类
 */
var Util = {
	toRad: function(angle) {
		return angle * Math.PI / 180;
	},
	random: function(min, max) {
		var range = max - min;
		return Math.random() * range + min;
	},
	random11: function() {
		return this.random(-1, 1);
	}
};