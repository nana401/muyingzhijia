define(function(require,exports,module){
	
	var $ = require('jq');
	
	function RightSus(){
		this.$ele = $('#slidebar');	
		this.hoverfn();
	}
	RightSus.prototype.hoverfn = function(){
		var _this = this;
		_this.$ele.find('.level-dl').on('mouseover',function(){
			$(this).children('.level-dt').css('background','#ff5c00').siblings().stop().show().animate({
				right:'31px'
			});
			_this.closefn();
			goTop();
		})
		_this.$ele.find('.level-dl').on('mouseout',function(){
			$(this).children('.level-dt').css('background','#fff').siblings().hide().stop().animate({
				right:'55px'
			});
		})
		
	}
	RightSus.prototype.closefn = function(){
		var _this = this;
		this.$ele.find('.level-close').on('click',function(){
			_this.$ele.find('.level-dd').hide().css('right','55px');
		})
	}
	module.exports = new RightSus();
	function goTop(){
		$('#goTop').on('click',function(){
			console.log('点点点');
			$('body,html').stop().animate({scrollTop:0},3000);
		})
		
	}
	
	
})