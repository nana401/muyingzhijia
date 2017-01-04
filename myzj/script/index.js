define(function(require,exports,module){
	var $ = require('jq');
	var isLogin = require('../script/isLogin');
	new isLogin.judge();

	var gwc = require('../script/gwc');
	$(function(){
		$('#slidebar-Right').load('html/common.html #slidebar',function(){
			require ('../script/rightSusp');//获取右侧悬浮框

			new gwc.sc_car();
			$('#mycart').on('mouseenter',function(){
				new gwc.sc_msg('./data/json/goodslist.json','right');
			})
			
			$('#mycart').on('click','.jiesuan_Btn',function(){
				
				window.location.href = "html/shoppingcar.html";
			});
		});

		$('#footer').load('html/common.html #common-footer');//加载底部页面

		//关键字检索功能（模拟）
		$('.text').on('keyup',function(){
			$.getJSON('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+$(this).val()+'&cb=?',function(searchData){
				var str = '';
				for(var i = 0;i < searchData.s.length;i++){
					str += '<li><a href ="https://www.baidu.com/s?wd="'+searchData.s[i]+' target="_blank">'+searchData.s[i]+'</a></li>';
				}
				$('.js').html(str);
				if($('.text').val()){
					$('.js').css('display','block');
				}else{
					$('.js').css('display','none');
				}
				
				$('.js').on('click','li',function(){
					$('.text').val($(this).html());
				})
				$('.js').on('mouseenter','li',function(){
					$(this).css({'background':'#ff5c00','color':'#fff'});
				})
				$('.js').on('mouseleave','li',function(){
					$(this).css({'background':'#fff','color':'#000'})
				})
			})
		})
		$('.text').on('blur',function(){
			$('.js').css('display','none');
		})


		var $fixLeftImg = $('#fixLeftImg');
		$(document).scroll(function(){//scrollTop滚动效果
			if($(document).scrollTop() >= 150){//左侧悬浮框
				$fixLeftImg.fadeIn();
			}else{
				$fixLeftImg.fadeOut();
			}

			if($(document).scrollTop() >= $('#everyDayBox').offset().top){
				$('.ui-fixed-top').stop().fadeIn();
			}else{
				$('.ui-fixed-top').stop().fadeOut();
			}
			//主页吸顶效果
			$fixLeftImg.find('.fixLeftAd_close').on('click',function(){
				$(this).parent().css('display','none');
			})
			$fixLeftImg.find('.area-hotProductCon').on('click',function(){//楼梯效果
				$('body,html').stop().animate({scrollTop:$('#spaceProduct').offset().top - 50},3000)
			})
			$fixLeftImg.find('.area-specialProductCon').on('click',function(){
				$('body,html').stop().animate({scrollTop:$('#hotProduct').offset().top - 50},3000)
			})
			
		})
		
		//二级导航
		var subNav = require('../script/subNav');
		new subNav.show();
		
		//轮播部分
		var $L = require('../script/lunbo');
		new $L.banner('#banner ul','#banner .btnArea');//轮播图
		new $L.massage('#ui-new-ul');//消息轮播

		new djs();//倒计时效果
		function everyDayProtuct(res){//当日抢购楼层
			var str='';
			for(var i=0;i<res.length;i++){
				str+='<li><a href="'+res[i].href+'" alt="'+res[i].tip+'" title="'+res[i].tip+'"><div class="ui-item-img"><img src="'+res[i].src+'" alt="'+res[i].tip+'"></div><div class="ui-item"><span class="ui-item-title">'+res[i].tip+'</span><span class="ui-item-price">'+res[i].price+'</span></div><div class="ui-overlayBg"></div><div class="ui-overlay"><p>已出售<span>'+res[i].sell+'</span>件</p></div></a></li>'
			}
			$('#everyDayPro').html(str);
			$('#everyDayPro').children('li').hover(function(){
				$(this).find('.ui-overlayBg').css({'opacity':'0.3'}).next().css('opacity','1').stop().animate({'margin':'-152px 0 0 -79px'},100);

			},function(){
				$(this).find('.ui-overlayBg').css({'opacity':'0' }).next().css('opacity','0').stop().animate({'margin':'-100px 0 0 -79px'},100);	
			})
		
			new $L.banner2('#everyDayPro','#ui-arr');//当日抢购楼层轮播
		}

		function floor(res){//获取专场商品列表
			var html_tehui='';
			var html_jx='';
			var html_brand='';
			for(var i=0;i<res.length;i++){
				if(res[i].type == 'tehui'){
					html_tehui += '<div class="mb20 site-hot-item clearfix"><div class="site-hot-item-fleft"><a href="'+res[i].href+'"><img src="'+res[i].src+'" alt="" title="" width="598" height="278"></a><div class="soldoutPro item-soldout" data-type="soldout" style="display: none;"></div></div><div class="site-hot-item-fright"><h2 class="site-hot-row-two"><a href="'+res[i].href+'" name="__AD_todaySpecial_1" title="'+res[i].tip+'" class="newstats">'+res[i].tip+'</a></h2><div class="site-hot-row-three"><span class="product-words">'+res[i].active+'</span></div><div class="site-hot-row-four"><div class="fl"><div class="promo-price"><div class="price"><p style="font-size: 32px;"><b style="font-size: 18px;font-weight: bold;vertical-align: 2px;margin-right: 3px">￥</b>'+res[i].price+'<b style="font-size: 16px;font-weight: bold;vertical-align: 3px;margin-left: 3px">起</b></p></div></div></div><a class="viewbtn" href="'+res[i].href+'" name="__AD_todaySpecial_1" data-position="m_special_1">点击进入</a><div class="clear"></div></div></div></div>';
				}else if(res[i].type == 'jx'){
					html_jx += '<div class="mb20 site-hot-item clearfix"><div class="site-hot-item-fleft"><a href="'+res[i].href+'"class="promotionStats"><img src="'+res[i].src+'" width="'+res[i].width+'" height="'+res[i].height+'"></a><div class="soldoutPro item-soldout" style="display: none;"></div></div><div class="site-hot-item-fright"><div class="site-hot-row-one"><div class="fl"><span class="inblock" style="height: 45px;"></span><span class="inblock promotionTag-cu">'+res[i].active+'</span></div></div><h2 class="site-hot-row-two"><a href="'+res[i].href+'" name="__AD_todaySelect_1" class="promotionStats" data-productid="101653" title="'+res[i].title+'">'+res[i].title+'</a></h2><div class="site-hot-row-three"><span class="promo-words">'+res[i].prowords+'</span><span class="product-words">'+res[i].tip+'</span></div><div class="fahuo-cang" style="height: 18px;"><i></i>'+res[i].fahuo+'</div><div class="site-hot-row-four"><div class="fl"><div class="promo-price"><div class="price">￥<span class="promo-new-price" data-type="price" style="font-size: 32px; vertical-align: -2px;">'+res[i].price+'</span></div></div></div><a class="viewbtn" name="__AD_todaySelect_1" href="'+res[i].href+'" title="">点击进入</a></div></div></div>';
				}else if(res[i].type == 'big'){
					html_brand += '<a class="big" target="_blank" href="'+res[i].href+'"><img src="'+res[i].src+'"></a>'
				}else{
					html_brand += '<a class="small" target="_blank" href="'+res[i].href+'"><img src="'+res[i].src+'"></a>'
				}
			}
			$('#tehui_floor').html(html_tehui);
			$('#jx_floor').html(html_jx);
			$('#uiBrand li').html(html_brand);

			$('.site-hot-item').hover(function(){//鼠标移入移出
				$(this).addClass('site-hot-item-hover');
			},function(){
				$(this).removeClass('site-hot-item-hover');
			});
			$('#uiBrand li a').hover(function(){//鼠标移入移出品牌专栏
				$(this).css({
					border:'1px solid #ff5c00',
				})
			},function(){
				$(this).css({	
					border:'1px solid #ccc',
				})
			})
		}
		var $a = require('../script/ajax');//获取require
		new $a.$ajaxGetData('./data/json/everyDay.json','GET','json',everyDayProtuct);
		new $a.$ajaxGetData('./data/json/indexGoodsList.json','GET','json',floor);
	})

	function djs(){//倒计时
		var _this = this;
		_this.oHour = $("#hour");
		_this.oMinute = $("#minute");
		_this.oSecond = $("#second");
		//console.log(this)
		_this.time();
		_this.timer = setInterval(function(){
			_this.time();
		},1000);
	}
	djs.prototype.time = function(){
		var _this = this;
		var timeNow = new Date().getTime();
		var timeFinally = new Date(2017,0,1,0,0,0).getTime();
		var endTime = timeFinally - timeNow;
		if (endTime <=1 ) {
			clearInterval(_this.timer);
			_this.oHour.html('00');
			_this.oMinute.html('00');
			_this.oSecond.html('00');
		}else{
			var hour = Math.floor(endTime/1000/60/60%24);
			var minute = Math.floor(endTime/1000/60%60);
			var second = Math.floor(endTime/1000%60);
			_this.oHour.html(_this.Double(hour));
			_this.oMinute.html(_this.Double(minute));
			_this.oSecond.html(_this.Double(second));
		}
	}
	djs.prototype.Double = function(num){
		if (num < 10) {
			num = '0'+num;
		}
		return num;
	}


	
})