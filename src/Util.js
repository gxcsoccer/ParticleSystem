/**
 * 工具类
 */
var Util = {
	toRad: function(angle) {
		return angle * Math.PI / 180;
	},
	isNumber: function(i) {
		return typeof i === 'number';
	},
	isInteger: function(num) {
		return num === (num | 0);
	},
	random: function(minOrMax, maxOrUndefined, dontFloor) {
		dontFloor = dontFloor || false;

		var min = this.isNumber(maxOrUndefined) ? minOrMax : 0;
		var max = this.isNumber(maxOrUndefined) ? maxOrUndefined : minOrMax;

		var range = max - min;
		var result = Math.random() * range + min;

		if (this.isInteger(min) && this.isInteger(max) && !dontFloor) {
			return Math.floor(result);
		} else {
			return result;
		}
	},
	random11: function() {
		return this.random(-1, 1, true);
	},
	colorArrayToString: function(array, overrideAlpha) {
		var r = array[0] | 0;
		var g = array[1] | 0;
		var b = array[2] | 0;
		var a = overrideAlpha || array[3];

		return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
	}
};