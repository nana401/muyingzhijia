/*
* @Author: Administrator
* @Date:   2016-12-25 20:45:02
* @Last Modified by:   Administrator
* @Last Modified time: 2016-12-25 21:04:43
*/

define(function(require,exports,moudle){

	var $ = require ('jq');
	var $a = require('../script/ajax');
	var $L = require('../script/lunbo');
	var isLogin = require('../script/isLogin');

	$('#activeheader').load('../html/common.html #common-header #header',function(){
		//二级导航效果
			var subNav = require('../script/subNav');
			new subNav.show();
			new $L.massage('#ui-new-ul');
			new isLogin.judge();
	});
	$('#footer').load('../html/common.html #common-footer');
	
	function getRes(res){
		if(res){
			var html = '';
			for(var i in res){
				if(res[i].sale == 'have'){
					html += '<li><div class="main"><div class="img_box"><div class="img_pic"><a href="javascript:;"><img class="onloadingBg" src="'+res[i].img+'"></a><span class="saleOut-tip hide"><img src="../data/img/common/saleOut_tip.png"></span></div><div class="img_info"><p>'+res[i].name+'</p><p><a href="javascript:;">'+res[i].tip+'</a></p></div></div><div class="price_box" style="background: url(../data/img/common/BtnBg_light.png) repeat"><span class="price_f1"><i>￥</i><em>'+res[i].price+'</em></span></div></div></li>';
				}else if(res[i].sale == 'out'){
					html += '<li><div class="main"><div class="img_box"><div class="img_pic"><a href="javascript:;"><img class="onloadingBg" src="'+res[i].img+'"></a><span class="saleOut-tip"><img src="../data/img/common/saleOut_tip.png"></span></div><div class="img_info"><p>'+res[i].name+'</p><p><a href="javascript:;">'+res[i].tip+'</a></p></div></div><div class="price_box" style="background: url(../data/img/common/BtnBg_dark.png) repeat"><span class="price_f1"><i>￥</i><em>'+res[i].price+'</em></span></div></div></li>';
				}
			}
			$('.ac-goodsList ul').html(html);
		}
	}

	new $a.$ajaxGetData('../data/json/activePro.json','GET','json',getRes);

})