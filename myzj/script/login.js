define(function(require,exports,module){
	var $ = require('jq');
	var cookie = require('cookie');
	cookie($);
	
	$(function(){
		$('#header #header-top').load('../html/common.html #header-site-nav',function(){
			//二级导航效果
			var subNav = require('../script/subNav');
			new subNav.show();
		});
		$('#header-middle .cont').load('../html/common.html #header-logo');

		$('#footer').load('../html/common.html .tfc_footer');

		var ainp = $('#login-form').find('input[is_jump=jp]').get();//初始化
		for(var i = 0;i< ainp.length;i++){
			ainp[i].pdz = false;
			console.log(ainp[i].pdz);	
		}

		if($.cookie('userID') && $.cookie('userPass')){
			$('#login-form #email').val($.cookie('userID'));
			$('#login-form #password').val($.cookie('userPass'));
			$('#login-form #email')[0].pdz = true;
			$('#login-form #password')[0].pdz = true;
		}
		console.log(ainp[0].pdz);
		var registerForm = require('../script/yanzheng');	
		new registerForm.yz('#login-form');

	})
})