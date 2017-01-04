define(function(require,exports,module){
	var $ = require('jq');
	
	$(function(){
		$('#header #header-top').load('../html/common.html #header-site-nav',function(){
			//二级导航效果
			var subNav = require('../script/subNav');
			new subNav.show();
		});
		$('#header-middle .cont').load('../html/common.html #header-logo');
		$('#footer').load('../html/common.html .tfc_footer');

		var registerForm = require('../script/yanzheng');

		var ainp = $('#register-form').find('input[is_jump=jp]').get();//初始化
		for(var i = 0;i< ainp.length;i++){//初始化
			ainp[i].pdz = false;	
		}

		new registerForm.yz('#register-form');
		
	
	})
})