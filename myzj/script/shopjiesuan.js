define(function(require,exports,module){
	var $ = require('jq');
	var gwc = require('../script/gwc');
	var isLogin = require('../script/isLogin');
	$('#header #header-top').load('../html/common.html #header-site-nav',function(){
			//二级导航效果
			var subNav = require('../script/subNav');
			new subNav.show();
			new isLogin.judge();
		});
	$('#header-middle .cont').load('../html/common.html #header-logo');
	$('#footer').load('../html/common.html .tfc_footer');

	if($.cookie('userID')){
		$('.login').css('display','none');
	}else{
		$('.login').css('display','block');
	}


	//拼接(获取到购物车中的商品)
	function loadHtml(res){
		var sc_str = $.cookie('goods');//获取商品cookie

			if(sc_str){
				var sc_obj = eval(sc_str);//获取到
				//console.log(typeof res[sc_obj[0]].price )
				var sc_sum = 0;
				var html = ''; 
				for(var i in sc_obj){
					
					html += '<div class="cart3_area" id="cartType1"><div class="cart3_tit"><div class="cart3_tit_l"><span class="inblock" style="line-height:20px"><a class="left label" href="http://www.muyingzhijia.com/">母婴之家商城</a></span><span class="inblock"><span class="ct-t " id="cartDesc_1">母婴之家商城购物车</span></span></div><span class="price">单价（元）</span><span class="num">数量（件）</span><span class="span_width_90">小计（元）</span><span class="action">操作</span></div><ul class="cart3_list"><li class="cart3_prod select item_group"><a class="pic inblock "><img src="'+res[sc_obj[i].id].src+'" alt="'+res[sc_obj[i].id].name+'"></a><span class="tit inblock"><a class="">'+res[sc_obj[i].id].name+'</a></span><span class="price inblock"> <ins>¥'+res[sc_obj[i].id].price+'</ins> <br><ins class="del grey">¥368.00</ins></span><span class="num inblock"><a class="minus reduce" reduce_id = "'+sc_obj[i].id+'"><span></span> </a><input intp_id="'+sc_obj[i].id+'" type="text" class="inblock" value="'+sc_obj[i].num+'"><a rel="add" class="add" add_id="'+sc_obj[i].id+'"> <span></span><em></em> </a></span><span class="inblock count"> <strong>￥'+res[sc_obj[i].id].price+'</strong></span><span class="inblock action"><a class="del-btn" del_id="'+sc_obj[i].id+'">删除</a></span><em class="line"></em></li><li class="event_info"><span class="tit inblock"> <a class="more_link"> <span class="inblock">'+res[sc_obj[i].id].productmemo+'<em class="koujian"></em></span></a></span><span class="price inblock"> <ins><em class="inblock"></em></ins> </span><span class="num inblock">已购1件,还差1件就可以参加满2件减50元</span><em class="line"></em><em class="ball"></em><em class="line line2"></em></li></ul><div class="cart_check"><span class="dist inblock"><strong>已优惠:</strong><strong class="red">0.00</strong>元</span><span class="checktext inblock">小计：</span><span class="totle_price inblock">'+(sc_obj[i].num*res[sc_obj[i].id].price)+'</span></div></div>'

					sc_sum = sc_sum + res[sc_obj[i].id].price*sc_obj[i].num;
				}
				html += '<div class="coupon_area"><div class="coupon_box"><span class="inblock coupon-form"><input type="text" class="inblock" id="userCouponValue" value="请输入优惠码"><a class="use" id="userCoupon" data-info="">使用</a></span><span class="inblock yh">已优惠：</span><span class="inblock yhtot">￥0.00</span></div></div><div id="cart3_bott_box"><div id="cart3_bott" class=""><div class="cart3_bott"><div class="ac"><label class="select_all"><input type="checkbox" name="cart3_area_input_all">全选</label><a href="javascript:;" class="delete inblock" id="delete_All" data-info="0_0_0_1_1_0">清空购物车</a></div><div class="a-m"><span class="inblock submit"><a href="javascript:;" id="submitOrder" class="submit_b" data-cart="0">确认订单</a></span><span class="inblock totCash" id="totCash">396.00</span><span class="inblock det">共有<strong id="BuyTotalCount" class="goods_num">0</strong> 件商品，总计(不含运费)：</span></div></div></div></div>'
			}else{
				html = '<div class="emptyCart"><dl><dt><i></i></dt><dd><p class="emptyText">您的购物车还是空的</p><p class="btn"><a href="javascript:;">去逛逛</a></p></dd><dd class="clear"></dd></dl></div>';
			}

			$('.cart-box').html(html);
			$('.totCash').html(sc_sum);	
			new gwc.sc_car();	
			
	}
	var $a = require('../script/ajax');
	new $a.$ajaxGetData('../data/json/goodslist.json','GET','json',loadHtml);

	$('.cart-box').on('click','.add',function(){//增加数量
		//console.log('add')
		var id = $(this).attr('add_id');
		var arr = eval($.cookie('goods'));//cookie中的对象数组
		for(var i in arr){
			if(arr[i].id == id){
				arr[i].num ++;
				break;
			}
		}
		var cookieStr = JSON.stringify(arr);
		$.cookie('goods',cookieStr,{expires:30,path:'/'});
		new $a.$ajaxGetData('../data/json/goodslist.json','GET','json',loadHtml);
	})

	$('.cart-box').on('click','.reduce',function(){//较少数量
		var id = $(this).attr('reduce_id');
		var arr = eval($.cookie('goods'));
		for(var i in arr){
			if(arr[i].id == id){
				if(arr[i].num == 1){
					arr[i].num = 1;
					break;
				}else{
					arr[i].num --;
					break;
				}
				
			}
		}
		var cookieStr = JSON.stringify(arr);
		$.cookie('goods',cookieStr,{expires:30,path:'/'});
		new $a.$ajaxGetData('../data/json/goodslist.json','GET','json',loadHtml);
	})

	$('.cart-box').on('click','.del-btn',function(){
		var id = $(this).attr('del_id');
		var sc_str = $.cookie('goods');//获取当前的cookie值，
		var arr = eval(sc_str);//转换为对象数组
		
		for(var i in arr){
			if(arr[i].id == id){//找到要删除的那一项cookie值
					//改变cookie值，删除div
					arr.splice(i,1);
					var cookieStr = JSON.stringify(arr);
					if(arr.length == 0){
						$.cookie('goods',null,{expires:30,path:'/'});
						
						$(this).parents('.cart3_area').remove();
					}else{
						$.cookie('goods',cookieStr,{expires:30,path:'/'});
					}			
				break;	
			}
		}
		new $a.$ajaxGetData('../data/json/goodslist.json','GET','json',loadHtml);
	})

	$('#content').on('click','#delete_All',function(){
		//弹出对话框
		if (confirm("确定要清空购物车吗？")) {
			//console.log('kong');
			$.cookie('goods',null,{path:'/'});
			new $a.$ajaxGetData('../data/json/goodslist.json','GET','json',loadHtml);
		}
		
	})
	$('#content').on('click','#submitOrder',function(){
		if($.cookie('userID')){
			if(confirm("订单已完成")){
			$.cookie('goods',null,{path:'/'});
			new $a.$ajaxGetData('../data/json/goodslist.json','GET','json',loadHtml);
		}
		}else{
			if(confirm("您还没有登录,点击确定进入登录页面")){
				window.location.href="login.html";
			}
		}
	})
	
	
})