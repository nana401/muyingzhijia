define(function(require,exports,module){
	var $ = require('jq');
	var $a = require('../script/ajax');
	var cookie = require('cookie');//引入模块化cookie
	cookie($);
	var gwc = {};//购物车对象

	gwc.operate = function(box){
		//事件委托
		var _this = this;
		_this.goodsnum = 1;//增加的商品数量
		this.goodsBox = $(box);

		_this.choseCount();//增加、减少商品数量

		this.goodsBox.on('click','.sc_btn',function(){//（列表页单个增加商品）添加商品
			_this.add(this.id,_this.goodsnum);
			//alert('商品已成功加入购物车');
		})

		this.goodsBox.on('click','.cars',function(){//详情页增加商品
			var id = eval($.cookie('detailPage'))//获取到当前详情页商品的ID
			//console.log(id);
			_this.add(id,_this.goodsnum);
		})

		$('#showcart').on('click','.delet',function(){//删除商品
			var id = $(this).attr('del_id');//获取要删除的商品ID
			_this.delet(id,$(this));
								
		})

		$('#shopping-cart').on('mouseenter',function(){
			$('#showcart').css('display','block');
			gwc.sc_msg('../data/json/goodslist.json','top');
		})
		$('#shopping-cart').on('mouseleave',function(){
			$('#showcart').css('display','none');
		})

	}
	gwc.operate.prototype.add = function(id,proNum){//添加操作(给为id便于以后详情页加ID（跳转时cookie中的ID）)
		//console.log(btn.id);//获取到对应商品的ID
		var _this = this;
		_this.id =id;
		//console.log(_this.id);
		var first = $.cookie('goods')==null?true:false;//判断是否是第一次增加cookie
		_this.same = false;//判断是否追加。商品不同时追加
		if(first){
			$.cookie('goods','[{id:'+_this.id+',num:'+ proNum +'}]',{expires:30,path:'/'});//存入ID值和数量
		}else{
			var str = $.cookie('goods');
			var arr = eval(str);
			for(var i in arr){
				if(arr[i].id == _this.id){//商品相同时，改变num值
					arr[i].num = arr[i].num + proNum;
					var cookieStr = JSON.stringify(arr);//将数组值转换成json格式
					$.cookie('goods',cookieStr,{expires:30,path:'/'});
					_this.same = true;
				}
			}
			//如果商品不同
			if(! _this.same){
				var obj = {id:_this.id,num:proNum};//第一次添加该商品
				arr.push(obj);
				var cookieStr = JSON.stringify(arr);
				$.cookie('goods',cookieStr,{expires:30,path:'/'});
			}
		}
		gwc.sc_car();//数量更新
	}

	gwc.operate.prototype.delet = function(id,del){//购物车商品删除
		var _this = this;
		
		var sc_str = $.cookie('goods');//获取当前的cookie值，
		var arr = eval(sc_str);//转换为对象数组
		
		for(var i in arr){
			if(arr[i].id == id){//找到要删除的那一项cookie值
					//改变cookie值，删除div
					arr.splice(i,1);
					var cookieStr = JSON.stringify(arr);
						del.parents('li').remove();
						del.parents('.cart3_area').remove();
						del.parents('.cart-level-plist').remove();
					if(arr.length == 0){
						$.cookie('goods',null,{expires:30,path:'/'});
					}else{
						$.cookie('goods',cookieStr,{expires:30,path:'/'});
					}
						
				break;	
			}
		}
		//将数组值转换成json格式
		//商品从新显示
		gwc.sc_car();//数量更新
		gwc.sc_msg('../data/json/goodslist.json','top');
	}

	gwc.operate.prototype.choseCount = function(){//详情页点击更改数量
		var _this = this;
		$('.computing_act .add').click(function(){
			var a = $('.computing_num input').val()
			a++;
			$('.computing_num input').val(a);
			_this.goodsnum = a;
		})
		$('.computing_act .reduce').click(function(){
			var r = $('.computing_num input').val()
			if(r == 1){
				r=1;
			}else{
				r--;
			}
			$('.computing_num input').val(r);
			_this.goodsnum = r;
		})
	}

	gwc.sc_car = function(){
		var sc_str = $.cookie('goods');
		if(sc_str){//如果购物车cookie不为空。
			var sc_obj = eval(sc_str);
			var sc_num = 0 ; 
			for(var i in sc_obj){
				sc_num += Number(sc_obj[i].num);
			}
			$('.icon-shop-amount,.goods_num').html(sc_num);
			$('#cartSlideNum').html('('+sc_num+')');
		}else{
			$('.icon-shop-amount,.goods_num').html(0);
			$('#cartSlideNum').html('(0)');
		}
	}

	gwc.sc_msg = function(url,locate){//home判断是否是首页
		
		$.ajax({
			url:url,
			type:'GET',
			success:function(res){
				var sc_str = $.cookie('goods');//获取商品cookie
				
				if(sc_str){
					var sc_obj = eval(sc_str);//获取到
					//console.log(typeof res[sc_obj[0]].price )
					var sc_sum = 0;
					var htmltop = '';
					var htmlright = '';
					if(locate == 'right'){
						htmlright = '<div class="cart-level-c"><div id="cart-level-plist"><div class="scroll_track" style="height: 293px;"><div class="scroll_thumb scroll_disable"></div></div><div class="scroll_viewport" id="scroll_viewport_cart"><div class="scroll_overview">'
						//侧边栏购物车拼接
						for(var i in sc_obj){
							htmlright += '<div class="cart-level-plist"><div class="cart-level-img"><a target="_blank" title="'+res[sc_obj[i].id].name+'"><img src="'+res[sc_obj[i].id].src+'" alt="'+res[sc_obj[i].id].name+'" title="'+res[sc_obj[i].id].name+'" width="46" height="46"></a></div><div class="cart-level-intro"><a class="cart-level-name"  target="_blank" title="'+res[sc_obj[i].id].name+'">'+res[sc_obj[i].id].name+'</a><div class="cart-level-act"><strong class="cart-level-price">￥'+res[sc_obj[i].id].price+'</strong><em class="cart-level-num">×<span class="goods_num">'+sc_obj[i].num+'</span></em><a class="cart-level-del" del_id="'+sc_obj[i].id+'" href="javascript:;" target="_self">删除</a><div class="clearfix"></div></div></div><div class="clearfix"></div></div>';
							sc_sum = sc_sum + res[sc_obj[i].id].price*sc_obj[i].num;
						}
						htmlright +='</div></div></div><div class="cart-level-all"><div class="cart-level-fl">共计￥<span class="mcart-p-price"><strong class="f20 sum">0</strong></span></div><a href="javascript:;" class="cart-level-fr jiesuan_Btn" target="_blank" title="去购物车结算" rel="nofollow">去购物车结算</a><div class="clearfix"></div></div>';
					}else if(locate == 'top'){
						for(var i in sc_obj){			
							htmltop += '<li class="clearfix"><img src="'+res[sc_obj[i].id].src+'"><a class="cart_goods_name">'+res[sc_obj[i].id].name+'</a><div><span class="price">'+res[sc_obj[i].id].price+'</span><span>*</span><span class="goods_num">'+sc_obj[i].num+'</span><br><a class="delet" del_id="'+sc_obj[i].id+'">[ 删除 ]</a></div></li>';
							sc_sum = sc_sum + res[sc_obj[i].id].price*sc_obj[i].num;
						}
					}
				}else{//购物车为空
					if(locate == 'right'){
						htmlright = '<div class="cart-level-c"><img src="http://static.boodoll.cn/mall/v16/images/index/cartdefault.jpg" width="124" height="128" alt="" style="margin: 30px auto 15px;"><p>您的购物车还是空的<br>去挑选喜欢的商品吧~</p><div class="cart-level-line"></div></div>';
					}else if(locate == 'top'){
						htmltop = '<div class="kong">购物车中是空的，快去选购商品吧</div>';
					}
					sc_sum = 0;
				}
				$('#slideBarCart-box').html(htmlright);
				$('.goods').html(htmltop);
				$('.sum').html(sc_sum);
				
				$('#slideBarCart-box').on('click','.cart-level-del',function(){//右侧购物车点击删除商品
					var g = new gwc.operate('#slideBarCart-box');
					var id = $(this).attr('del_id');
					g.delet(id,$(this));
					
				})
			}

		});

	}

	
	module.exports = gwc;
})