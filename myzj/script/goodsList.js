define(function(require,exports,module){
	var $ = require('jq');
	var $L = require('../script/lunbo');
	var gwc = require('../script/gwc');
	var isLogin = require('../script/isLogin');
		
	$(function(){
		$('#header #header-top').load('../html/common.html #header-site-nav',function(){
			//二级导航效果
			var subNav = require('../script/subNav');
			new subNav.show();
			new isLogin.judge();
		});
		$('#header-middle .cont').load('../html/common.html #header-logo');
		$('#header-bot').load('../html/common.html #ui-nav-bar',function(){
			var subNav = require('../script/subNav');
			new subNav.show();
			//消息轮播
			new $L.massage('#ui-new-ul');
		})
		$('#footer').load('../html/common.html #common-footer');
		$('#slidebar-Right').load('../html/common.html #slidebar',function(){
			require ('../script/rightSusp');//获取右侧悬浮框
			new gwc.sc_car();
			$('#mycart').on('mouseenter',function(){
				new gwc.sc_msg('../data/json/goodslist.json','right');
			})
			$('#mycart').on('click','.jiesuan_Btn',function(){
				window.location.href = "shoppingcar.html";
			});
				
		});
		//三级下拉折叠菜单
		if($('.category_sort li').has('ul')){
			
			$('.category_sort li .second_icon').click(function(event){
				if(event.target == this){
					$(this).parent().find('.thirdhide').toggle();
				}	
			})
			$('.category_sort li .first_icon').click(function(event){
				if(event.target == this){
					$(this).parent().find('.secondhide').toggle();
				}
			})
		}
		
		//top5排行实现实现
		$('.top5 dl').on('mouseover',function(){
			$(this).children('dt').css('display','none').siblings('dd').css('display','block');
			$(this).siblings().children('dt').css('display','block').siblings('dd').css('display','none');
		})
		//获取商品分页
		
		var goodspage = require('../script/goodsPage');
	 	new goodspage.pagin(32,false);
		new goodspage.classify();
		//购物车
		
		new gwc.operate('.goods_list');
		new gwc.sc_car();	

		

	})
})