define(function(require,exports,module){
	var $ = require('jq');
	var $L = require('../script/lunbo');//引入轮播js
	var gwc = require('../script/gwc');
	var isLogin = require('../script/isLogin');
	
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

	function loadData(res){
		//获取cookie中的值
		var id = eval($.cookie('detailPage'));
		//字符串拼接
		var jqzoom = '';//放大镜图片
		var speList = '';//小图片列项
		var proCont = '';//产品情况
		for(var i in res){
			if(res[i].id == id){
				for(var arr in res[i].bigImg){
					jqzoom += '<img src="../data/img/goodsDetail/'+res[i].bigImg[arr]+'.jpg">'
					speList += '<li><img src="../data/img/goodsDetail/'+res[i].smallImg[arr]+'.jpg"></li>'
				}
				proCont += '<div class="name"><h1 class="pro_name">'+res[i].name+'</h1><div class="pro_memo">'+res[i].productmemo+'</div></div><div class="fahuo-cang" style="height: 18px;"><i></i>母婴之家发货</div><div class="clearfix"><ul id="summary" class="clearfix"><li id="summary-price" class="clearfix"><div class="sx_dt pdt5"> 促 销 价 </div><div class="sx_dd"><strong class="p-price">￥'+res[i].price+'</strong></div></li><li id="divpromotinInfo" class="bdbtm clearfix"><div class="sx_dt" style="">促销信息</div><div class="sx_dd" id="QueryPromInfosByProductId"><div class="sale_prom" id="A_MJ_01"><dl class="salePromotionType"><dt class="dt_icon1"></dt><dd> <a href="#" title="'+res[i].productmemo+'" class="promDetail color333">'+res[i].productmemo+'</a></dd></dl></div><div class="sale_prom" id="A_MG_01"></div><div class="sale_prom" id="giftBox"><dl class="salePromotionType"><dt class="dt_icon3"></dt><dd><a href="javascript:;" target="_self" title="双诞惠氏满2听赠好礼（送完即止）" class="promDetail colorf90">双诞惠氏满2听赠好礼（送完即止）</a><div class="sp_act" id="sp_act"><a href="javascript:;" target="_self" class="in colorf90">收起<i></i></a><a href="javascript:;" target="_self" class="ex hide colorf90">展开查看<i></i></a></div></dd></dl><div class="promBox" id="giftBoxIn"><ul class="full_gift" id="fullGift"><li data-id="560490" data-promsysno="13846" data-producttype="2"><a href="" title="赠品：ELLE Mama餐垫包（奶粉））"><img src="http://img.boodoll.cn/pdt/img/s1/66f3cbdb096ac8b2_160X160.jpg" alt="赠品：ELLE Mama餐垫包（奶粉））" title="赠品：ELLE Mama餐垫包（奶粉））"></a><b class="ongetGift" data-id="560490" style="bottom: -24px;">领取</b></li><li><a href="javascript:;" title="赠品：爱思得小麦纤维儿童餐具套装（颜色随机）（惠氏）"><img src="http://img.boodoll.cn/pdt/img/u7/c32d9afa94785744_160X160.jpg" alt="赠品：爱思得小麦纤维儿童餐具套装（颜色随机）（惠氏）" title="赠品：爱思得小麦纤维儿童餐具套装（颜色随机）（惠氏）"></a><b class="ongetGift" style="bottom: -24px;">领取</b></li><li><a href="" title="赠品：托马斯儿童座便器（惠氏）"><img src="http://img.boodoll.cn/pdt/img/a0/95dfc2a2bbcc0306_160X160.jpg" alt="赠品：托马斯儿童座便器（惠氏）" title="赠品：托马斯儿童座便器（惠氏）"></a><b class="ongetGift" data-producttype="2" style="bottom: -24px;">领取</b></li></ul><div class="prom_act"><a class="prom_add" data-index="1"></a><a class="prom_reduce"></a></div></div></div><li id="choose-version" class="clearfix"><div class="sx_dt">规&nbsp;&nbsp;&nbsp;&nbsp;格</div><div class="sx_dd"><ul class="size_num" id="size_num"><li class="select"><a data-type="spec" href="javascript:;" target="_self">'+res[i].weight+'</a></li></ul></div></li><li id="choose-amount" class="i_buy_div clearfix"><div class="sx_dt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div class="sx_dd pdt10 clearfix"><div class="choose_num_ul"><div class="computing_num"><input type="text" value="1" id="txtqyt" intp_id="'+res[i].id+'"></div><div class="computing_act"><input type="button" class="add" id="plus" add_id="'+res[i].id+'"><input type="button" class="reduce" id="minus" reduce_id="'+res[i].id+'"></div></div><div class="shopping_div clearfix"><a class="shopping_car cars" data-position="item_Cart" id="jCarbtn1">加载中...</a></div><div class="phonebuydiv"><div id="phonebuy"></div><div id="m-qrcode" class="hide"></div></div></div></li><li id="amountbeyond" class="clearfix" style="display: none;"><div class="sx_dt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div class="sx_dd tb-msg" id="tbmsgBox"><p class="tb-stop">您所填写的商品数量超过库存！</p></div></li></ul></div>'
			}
		}
		$('.jqzoom').append(jqzoom);
		$('.speList ul').html(speList);
		$('.conTopConBox').html(proCont);

		//放大镜
		var $Img = require('../script/fadajing');//获取放大镜方法
		new $Img.init('#preview');

		//礼物区
		$('.full_gift li a').hover(function(){
			$(this).siblings('.ongetGift').stop().animate({'bottom':'0px'});
		},function(){
			$(this).siblings('.ongetGift').stop().animate({'bottom':'-24px'})
		})
		//购物车
		var gwc = require('../script/gwc');
		new gwc.operate('.shopping_div');//点击加入购物车
		new gwc.sc_car();	
	}
	//获取cookie值
	var $a = require('../script/ajax');
	$a.$ajaxGetData('../data/json/goodsList.json','GET','json',loadData);

	//吸顶效果
	$(document).scroll(function(){
		
		if($('body').scrollTop() >= $('.ContRight').offset().top){
			$('.tab_nav_box').css(
				{
					'position':'absolute',
					'top':$('body').scrollTop(),
					'zIndex':'20'
			});

		}else{
			$('.tab_nav_box').css(
				{
					'position':'static',
					'top':'0px',
					'zIndex':'20'
			});
		}	

	})
	$('#product_intro').children('li').on('click',function(){
		$(this).addClass('group_suit_li_cur').siblings().removeClass('group_suit_li_cur');
		$('.shangpbox').children().eq($(this).index()).css('display','block').prevAll().css('display','none').end().nextAll().css('display','block');
		$('body,html').stop().animate({scrollTop:655});
	})



})
