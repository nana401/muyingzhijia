define(function(require,exports,module){
	var $ = require('jq');
	var Img = {};
	Img.init = function(id){
		var _this = this;
		 _this.id = id;
		$(_this.id).find('.speList ul').children('li').eq(0).addClass('chosed');
		$(_this.id).find('.jqzoom').children('img').eq(0).css('zIndex','2');
		//鼠标移上小图片
		$(_this.id).find('.speList ul').children('li').on('mouseover',function(){
			$(this).addClass('chosed').siblings().removeClass('chosed')
			$(_this.id).find('.jqzoom').children('img').css('z-index','1');
			var bigImgSrc = $(_this.id).find('.jqzoom').children('img').eq($(this).index())
			bigImgSrc.css('zIndex','2');

			$('.zoomdiv').html('<img class="bigimg" src="'+bigImgSrc.attr('src')+'">');
		})

		_this.Big();

		
	}
	Img.init.prototype.Big = function(){//大图片
		var _this = this;
		$(_this.id).find('.jqzoom').on('mouseover',function(){
			$('.jqZoomPup').css({
				width:'205px',
				height:'196px',
				visibility:'visible'
			})
			$('.zoomdiv').css({display:'block',});	
		})
		$(_this.id).find('.jqzoom').on('mouseout',function(){
				$('.jqZoomPup').css({visibility:'hidden'})
				$('.zoomdiv').css({display:'none'})
		})
		$(_this.id).find('.jqzoom').mousemove(function(event){
				_this.move(event);
		})
	}
	Img.init.prototype.move = function(evt){
		
		var left = evt.pageX - $('.jqzoom').offset().left - $('.jqZoomPup').width()/2;
		var top = evt.pageY - $('.jqzoom').offset().top - $('.jqZoomPup').height()/2;
		
		if(left > ($('.jqzoom').width() - $('.jqZoomPup').width())){
			left = $('.jqzoom').width() - $('.jqZoomPup').width();
		}else if(left < 0){
			left = 0;
		}
		if(top > ($('.jqzoom').height() - $('.jqZoomPup').height())){
			top = $('.jqzoom').height() - $('.jqZoomPup').height();
		}else if(top < 0){
			top = 0;
		}
		$('.jqZoomPup').css('left',left);
		$('.jqZoomPup').css('top',top);

		var perX = left / ($('.jqzoom').width() - $('.jqZoomPup').width());
		var perY = top / ($('.jqzoom').height() - $('.jqZoomPup').height());

		var $BIgImg = $('.zoomdiv img');

		var BigImgLeft = - perX * ($BIgImg.width() - $('.zoomdiv').width());
		
		var BigImgTop = - perY * ($BIgImg.height() - $('.zoomdiv').height());

		$BIgImg.css({'left':BigImgLeft,'top':BigImgTop});
	
	}
	module.exports = Img;
})