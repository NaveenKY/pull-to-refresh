/*=====================================================
 *
 *	PullToRefresh : Pull to Refresh Functionality for Web & Hybrid applications
 *	(c) Naveen Kumar 2017
 *
 ======================================================*/
/*=====================================================
 *	PullToRefresh Object Constructor
 =============================*/
;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory();
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define([], factory);
	}
	else {
		// Global (browser)
		root.PullToRefresh = factory();
	}
}(this, function () {
	var PullToRefresh = function PullToRefresh(options, callback) {
		options = options || {};
		this.options = options;
		if(!options.$el) {
			throw 'You must provide a target element!'
		}
		var loader = document.createElement('div');
		loader.className = 'reload-loader';
		loader.innerHTML = '<svg id="svg" width="50" height="50"><circle id="bar" r="20" cx="25" cy="25" fill="transparent" stroke-dasharray="200"></circle></svg>';
		options.$el.parentNode.insertBefore(loader, options.$el);
		options.$elemLoader = loader;
		options.$loaderSvg = loader.querySelector('svg');
		var scrollContent = options.$scrollEl || options.$el;
		var panmove = function (e) {
			if (scrollContent.scrollTop != 0) {
				return;
			}
			if (e.distance <= 150) {
				options.$elemLoader.style.top = (e.distance - 75) + 'px';
			}
			options.$loaderSvg.style.transform = options.$loaderSvg.style.webkitTransform = 'rotate(' + e.distance + 'deg)';
		};
		var _this = this;
		var panend = function (e) {
			if (scrollContent.scrollTop != 0) {
				return;
			}
			var loaderTop = Number(options.$elemLoader.style.top.substring(0, options.$elemLoader.style.top.indexOf('px')));
			options.$elemLoader.style.transitionDuration = '0.5s';
			options.$elemLoader.style.transform = options.$elemLoader.style.webkitTransform = 'translate(0,-'+loaderTop+'px)';
			options.$loaderSvg.style.animation = options.$loaderSvg.style.webkitAnimation = 'rotating 1s linear infinite';
			if(options.delay) {
				setTimeout(function() {
					_this.stopLoading();
				}, options.delay);
			}
			if(callback) {
				callback();
			}
		};
		var hammer = new Hammer(options.$el);
		hammer.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
		hammer.on('panmove', panmove);
		hammer.on('panend', panend);
		return this;
	};
	PullToRefresh.prototype = {
		stopLoading: function() {
			this.options.$elemLoader.style.top = '-75px';
			this.options.$loaderSvg.style.animation = this.options.$loaderSvg.style.animation = '';
			this.options.$elemLoader.style.transitionDuration = '';
			this.options.$elemLoader.style.transform = this.options.$elemLoader.style.webkitTransform = '';
		}
	};
	return PullToRefresh;
}));