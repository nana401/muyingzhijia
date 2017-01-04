define(function(require,exports,module){//判断是否已经登录
	var $ = require('jq');
	var cookie = require('cookie');
	cookie($);

	var isLogin = {}
	isLogin.judge = function(){
		if($.cookie('userID')){
		$('.welcom').html('<span class="welcom-span">'+$.cookie('userID')+'欢迎来到母婴之家！</span><a class="quite" href="javascript:;" target="_self">[退出]</a>')
		}

		$('.quite').on('click',function(){
			$.cookie('userID',null,{expires:30,path:'/'})
			$.cookie('userPass',null,{expires:30,path:'/'})
			$('.welcom').html('<span class="welcom-span">欢迎来到母婴之家！</span>&nbsp;&nbsp;<a href="login.html" target="_self">[登陆]</a><a href="register.html" target="_self">[免费注册]</a>');
		
		});
	}
	module.exports = isLogin;
})