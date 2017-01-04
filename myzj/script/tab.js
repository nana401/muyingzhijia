define(function(require,exports,module){
	var $ = require('jq');
	var Tab = {};
	Tab.play = function(eleFar){
		$(eleFar).children('li').on('click',function(){
			$(this).addClass('group_suit_li_cur').siblings().removeClass('group_suit_li_cur');
			$('.shangpbox').children().eq($(this).index()).css('display','block').prevAll().css('display','none').end().nextAll().css('display','block');
			
			$('html').css('scrollTop',$('.shangpbox').children().eq($(this).index()).offset().top);
		})
	}

	module.exports = Tab;
	
})