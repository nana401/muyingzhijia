define(function(require,exports,module){
		var $ = require('jq');
	var cookie = require('cookie');//引入cookie
 	cookie($);
	var codeRes = null;
	function getCode(res){//获取到验证码
		codeRes = res;
	}

	var $a = require('../script/ajax');//获取require
	new $a.$ajaxGetData('../data/json/registerCode.json','GET','json',getCode);
	
	var _form = {};
	
	_form.yz = function(id){
		var _this = this;
		_this.code = 'bxzwaw';//默认码
		_this.$formId = $(id);
		_this.$formId.on('click','.codeChange',function(){
			_this.changeImgCode();	
		})
		_this.$formId.on('click','#get-code',function(){
			_this.send();
		})

		_this.focusfn();
		_this.blurfn();
		/*var ainp = _this.$formId.find('input[is_jump=jp]').get();//初始化
		for(var i = 0;i< ainp.length;i++){
			ainp[i].pdz = false;	
		}*/
		
		_this.submitBtn();
	}


	_form.yz.prototype.send = function(){
		var _this = this;
		var userName = $('#email').val();
		console.log(userName);
		$.ajax({
				url:'http://datainfo.duapp.com/shopdata/userinfo.php',
				type:'POST',
				data:{//序列化？（如何实现）
					status:'login',
					userID:userName,
					password:'0'
				},
				success:function(res){

					switch(res){
						case '0':
							console.log(0);
							$('#messyzm').siblings('.noticeWrap').hide();
							jishi();

						
							/*$('#send').show();
							$('#get-code').addClass('disabled');*/
						break;

						default:
						console.log('其他');
							$('#send').hide();
							$('#get-code').removeClass('disabled');
							$('#messyzm').addClass('g-ipt-err').siblings('.noticeWrap').removeClass('noticeWrap-suc').show().addClass('noticeWrap-err').children('.icon-warn').removeClass('icon-succ').addClass('icon-err').siblings().removeClass('text-succ').addClass('text-err').html('该用户名已经存在，请用手机号');
							$('#email').get(0).pdz = false;
					}
				}
			})
	}

	_form.yz.prototype.focusfn = function(){//得焦判断
		var _this = this;
		_this.$formId.find('input[types=txt]').focus(function(){//用户名
			$(this).removeClass('g-ipt-err g-ipt-cor').addClass('g-ipt-active');
		});
	}

	_form.yz.prototype.blurfn = function(){//失焦判断
		var _this = this;		
		_this.$formId.find('#email').blur(function(){//手机号（用户名）
			$(this).removeClass('g-ipt-active');
			var reg = /^[1]\d{10}$/;
			_this.regPd($(this),reg);
			if(!_this.regPd($(this),reg)){
				$(this).siblings().children('.text-err').html('格式不正确，请重新输入')
			}else{
				$(this).siblings().children('.text-succ').html('');
			}
		});
		_this.$formId.find('#password').blur(function(){
			$(this).removeClass('g-ipt-active');
			var reg = /^[^\s]{5,19}[^\s]$/;
			_this.regPd($(this),reg);
			
			if(!(_this.regPd($(this),reg))){
				$(this).siblings().children('.text-err').html('密码长度限制为6-20位字符，开头结尾不能有空格')
			}else{
				$(this).siblings().children('.text-succ').html('');
			}
		});

		_this.$formId.find('#pass-agin').blur(function(){//密码确认
			$(this).removeClass('g-ipt-active');
			if($(this).val() == '' ) {
				$(this).addClass('g-ipt-err').siblings('.noticeWrap').removeClass('noticeWrap-suc').show().addClass('noticeWrap-err').children('.icon-warn').removeClass('icon-succ').addClass('icon-err').siblings().removeClass('text-succ').addClass('text-err').html('密码确认不能为空！');
				$(this).get(0).pdz = false;
			}else if($(this).val() == $('#password').val()) {
				$(this).addClass('g-ipt-cor').siblings('.noticeWrap').removeClass('noticeWrap-err').show().addClass('noticeWrap-suc').children('.icon-warn').removeClass('icon-err').addClass('icon-succ').siblings().removeClass('text-err').addClass('text-succ').html('');
				$(this).get(0).pdz = true;
			}else{
				$(this).addClass('g-ipt-err').siblings('.noticeWrap').removeClass('noticeWrap-suc').show().addClass('noticeWrap-err').children('.icon-warn').removeClass('icon-succ').addClass('icon-err').siblings().removeClass('text-succ').addClass('text-err').html('两次密码输入不一致！');
				$(this).get(0).pdz = false;
			}
		});
		
		_this.$formId.find('#yzm').blur(function(){//验证码失焦判断
			$(this).removeClass('g-ipt-active');
			var reg = /^[0-9a-zA-Z]{6}$/;
			_this.regPd($(this),reg);
			if(!(_this.regPd($(this),reg))){//正则判断
				$(this).siblings().children('text-err').html('请正确输入验证码');
			}else{
				$(this).siblings().children('text-succ').html('');
			}
			console.log($(this).val()+':'+_this.code)
			if($(this).val() == _this.code){
				console.log(true)
				$(this).addClass('g-ipt-cor').siblings('.noticeWrap').removeClass('noticeWrap-err').show().addClass('noticeWrap-suc').children('.icon-warn').removeClass('icon-err').addClass('icon-succ').siblings().removeClass('text-err').addClass('text-succ').html('');
				$(this).get(0).pdz = true;	
			}else{
				console.log(false)
				$(this).addClass('g-ipt-err').siblings('.noticeWrap').removeClass('noticeWrap-suc').show().addClass('noticeWrap-err').children('.icon-warn').removeClass('icon-succ').addClass('icon-err').siblings().removeClass('text-succ').addClass('text-err').html('与验证码输入不一致');
				$(this).get(0).pdz = false;
			}
		});
		_this.$formId.find('#messyzm').blur(function(){//短信验证码
			$(this).removeClass('g-ipt-active');
			var reg = /^[\d]{6}$/;
			_this.regPd($(this),reg);
			if(!(_this.regPd($(this),reg))){
				$(this).siblings().children('text-err').html('请正确输入验证码');
				$('#send').hide();
			}else{

				$(this).siblings().children('text-succ').html('');
				$('#send').hide();
			}
		});
		_this.$formId.find('#agreement').blur(function(){
			if($(this).is(':checked')){
				$(this).get(0).pdz = true;
				console.log($(this).siblings('.noticeWrap'))
				$(this).siblings('.noticeWrap').removeClass('noticeWrap-err').show().addClass('noticeWrap-suc').children('.icon-warn').removeClass('icon-err').addClass('icon-succ').siblings().removeClass('text-err').addClass('text-succ').html('');
				
			}else{
				$(this).get(0).pdz = false;
				$(this).siblings('.noticeWrap').show().addClass('noticeWrap-err').children('.icon-warn').removeClass('icon-succ').addClass('icon-err').siblings().removeClass('text-succ').addClass('text-err').html('您还没有同意用户协议');
				
			}
		})
			

	}
	_form.yz.prototype.regPd = function($Inp,reg){//正则判断
		$Inp.val();
		if(!reg.test($Inp.val())){
			//console.log('错误')
			$Inp.addClass('g-ipt-err').siblings('.noticeWrap').removeClass('noticeWrap-suc').show().addClass('noticeWrap-err').children('.icon-warn').removeClass('icon-succ').addClass('icon-err').siblings().removeClass('text-succ').addClass('text-err');
			$Inp.get(0).pdz = false;
			return false;
		}else{
			//console.log('正确');
			$Inp.addClass('g-ipt-cor').siblings('.noticeWrap').removeClass('noticeWrap-err').show().addClass('noticeWrap-suc').children('.icon-warn').removeClass('icon-err').addClass('icon-succ').siblings().removeClass('text-err').addClass('text-succ');
			$Inp.get(0).pdz = true;
			return true;
		}
	}
	
	_form.yz.prototype.changeImgCode = function(){
		var _this = this;
		var randomCode = Math.floor(Math.random()*10);//随机出现的验证码
		$('#codeimgChang').attr('src',codeRes[randomCode].src);
		_this.code = codeRes[randomCode].num;
	}
	
	_form.yz.prototype.submitBtn = function(){
		var _this = this;
		$('#registerBtn').on('click',function(){
			var ainp = _this.$formId.find('input[is_jump=jp]').get()
			console.log(ainp.length)
			for(var i = 0;i < ainp.length ;i++){
				console.log(ainp[i].pdz);
				if(!ainp[i].pdz){
					return false;
				}//都是true时才会执行ajax
					
			}
			$.ajax({
					url:'http://datainfo.duapp.com/shopdata/userinfo.php',
					type:'GET',
					data:{
						status:'register',
						userID:$('#email').val(),
						password:$('#password').val()
					},
					success:function(res){
						switch(res){
							case '1':console.log('success');
									alert('注册成功，去登录吧');
									window.location.href = 'login.html';
							break;
							case '0':
									console.log('用户名重复');
									$('#email').addClass('g-ipt-err').siblings('.noticeWrap').removeClass('noticeWrap-suc').show().addClass('noticeWrap-err').children('.icon-warn').removeClass('icon-succ').addClass('icon-err').siblings().removeClass('text-succ').addClass('text-err').html('该手机号已经注册过了');
							break;
							
							case '2':console.log('后台出错了！');
							break;
						}
					}
	
				})
		})
		$('#login-btn').on('click',function(){
			var ainp = _this.$formId.find('input[is_jump=jp]').get()
			console.log(ainp.length)
			for(var i = 0;i < ainp.length ;i++){
				console.log(ainp[i].pdz);
				if(!ainp[i].pdz){
					return false;
				}//都是true时才会执行ajax
			}
			var $loginuser = $('#email').val(); //用户名
			var $loginpass = $('#password').val(); //密码

			if($('#remember').is(':checked')){//30天免登陆
			
				$.cookie('userID',$loginuser,{expires:30,path:'/'});
				$.cookie('userPass',$loginpass,{expires:30,path:'/'});
			}
			$.ajax({
				url:'http://datainfo.duapp.com/shopdata/userinfo.php',
				type:'POST',
				data:{//序列化？（如何实现）
					status:'login',
					userID:$loginuser,
					password:$loginpass
				},
				success:function(res){
					switch(res){
						case '0':
						console.log('aa');
							$('#email').addClass('g-ipt-err').siblings('.noticeWrap').removeClass('noticeWrap-suc').show().addClass('noticeWrap-err').children('.icon-warn').removeClass('icon-succ').addClass('icon-err').siblings().removeClass('text-succ').addClass('text-err').html('该用户不存在');
	
						break;
						case '2':
						console.log('mimacuowu');
							$('#password').addClass('g-ipt-err').siblings('.noticeWrap').removeClass('noticeWrap-suc').show().addClass('noticeWrap-err').children('.icon-warn').removeClass('icon-succ').addClass('icon-err').siblings().removeClass('text-succ').addClass('text-err').html('密码错误');

						break;
						default:
							console.log('登录成功');
							$.cookie('userID',$loginuser,{expires:30,path:'/'});
							window.location.href = '../index.html';
					}
				}
			})
		})
	}

	function jishi(){
		$('#send').show();
		$('#get-code').addClass('disabled');
		var times = Number($('#send .times').html());
		console.log(times)
		var timer = setInterval(function(){
			console.log(222);
			times = times-1;
			$('#send .times').html(times);
		},1000);
		setTimerout(function(){
			$('#get-code').removeClass('disabled');
			$('#send').hide();
		},60000);

	}

	module.exports = _form;

})