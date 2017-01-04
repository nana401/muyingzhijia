define(function(require,exports,module){
	var $ = require('jq');
	var subNav = {};
	subNav.show = function(){
		$('#phonediv').on('mouseover',function(){
			$(this).css({
				background:'#fff',
				border:'1px solid #ff9c00',
				borderBottom:'none'
			}).siblings('#ewm-img').stop().show();
		});
		$('#phonediv').on('mouseout',function(){
			$(this).css({
				background:'none',
				border:'none'
			}).siblings('#ewm-img').stop().hide();
		});
		$('.hasChilds').on('mouseover',function(){
			$(this).css({
				background:'#fff',
				border:'1px solid #ff9c00',
				borderBottom:'none',
				width:'57px'
			}).children('.nav-child').stop().show()
		});
		$('.hasChilds').on('mouseout',function(){
			$(this).css({
				background:'none',
				border:'none',
				width:'59px'
			}).children('.nav-child').stop().hide();
		});
		$('#ui-silder-nav').on('mouseover',function(){
			$(this).children('#ui-category').show();
		})
		$('#ui-silder-nav').on('mouseout',function(){
			$(this).children('#ui-category').hide();
			$('.ui-category-list').children('.ui-category-third').hide();
			$('.ui-category-list').children('.ui-category-second').css({
				border:'1px solid #fff',
				width:'139px'
			})
		})
		$('.ui-category-list').on('mouseover',function(){
			$(this).children('.ui-category-second').css({
				border:'1px solid #ff5c00',
				borderRightColor:'#fff',
				width:'140px'
			});
			$(this).children('.ui-category-third').show();
		})
		$('.ui-category-list').on('mouseout',function(){
			$(this).children('.ui-category-second').css({
				border:'1px solid #fff',
				width:'139px'
			});
			$(this).children('.ui-category-third').hide();
		})
	}

	
	module.exports = subNav;
})