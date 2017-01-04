define(function(require,exports,module){
	var $ = require('jq');

	var pagination = require('../script/jquery.pagination');
	pagination($);
	var cookie = require('cookie');
	cookie($);
	var Page = {};
	var arrclassify = [];
	
	Page.pagin = function(showNum,condition){
		
		$.ajax({
			url:"../data/json/goodslist.json",
			type:"GET",
			dataType:"json",
			success:function(res){
				Page.writeData(res,showNum,condition);
			}
		
		})
	}

	Page.writeData = function(res,showNum,condition){//拼写数据
		//console.log(condition)
		arrclassify = [];
		for(var i in res){
			if(condition){
				if(condition == res[i].country){
					arrclassify.push(res[i]);
				}else if(condition == res[i].size){
					arrclassify.push(res[i]);
				}
			}else{
				arrclassify.push(res[i]);
			}
		}
		//console.log(arrclassify)
		var pageNum = Math.ceil(arrclassify.length / showNum);
		$('#pagination').pagination(pageNum,{//pagination插件
			items_per_page:1,
			num_display_entries:2,
			current_page:0,
			num_edge_entries:2,
			prev_text:"<<上一页",
			next_text:"下一页>>",
			callback:function(index){			
				var html = '';
				for (var i = showNum*index; i < (index+1)*showNum; i++) {
					if(i<arrclassify.length){//只实现了一重搜索（后期完1善）
					html +='<li><dl><dt><a class="jump" href="goodsDetail.html" target="_block"><img src="'+arrclassify[i].src+'" /></a></dt><dd><p class="goods_name"><a>'+arrclassify[i].name+'<span class="font-red">'+arrclassify[i].productmemo+'</span></a></p><p class="price_wrap"><span class="price_now"><span>￥'+arrclassify[i].price+'</span></span></p><p><span class="btn_m btn_m_o sc_btn" id="'+arrclassify[i].id+'"><a>加入购物车</a></span><span class="btn_m btn_m_g"><a>收藏</a></span></p></dd></dl></li>';
						
					}
				}
				$('.goods_list').html(html);
				//点击跳转到详情页
				$('.jump').on('click',function(){
					var detailId = $(this).parents('dl').find('.sc_btn')[0].id;
					//console.log( detailId);
					$.cookie('detailPage',detailId);//存入到cookie中;
				})
			}
		})
		//console.log(arrclassify)	
	}

	Page.classify = function(){//分类(多条件搜索)
		var _this = this;
		_this.html = '';
		$('.select_f .words').on('click',function(){//点击增加标签
			_this.add($(this));
		});
		$('.giveUpAll').on('click',function(){//撤销全部
			$('.selector').css('display','none');
			$('#categorylist div').html('');
			$('.select_f .words').css('color','#0081cc');
			$('.auto_width').css('display','block');
			$('#goods_order li').eq(0).children('a').addClass('selected').end().siblings().children('a').removeClass('selected order_asc');
			Page.pagin(32,false);
		})

		$('#price').on('click',function(){
			
			_this.charge();
			_this.sorts();
		})
		$('#goods_order li').on('click',function(){
			$(this).children('a').addClass('selected order_asc').end().siblings().children('a').removeClass('selected order_asc');
		})


	}
	Page.classify.prototype.add = function(span){//增加选项
		var _this = this;
		span.css('color','#ff5c00');
		$('#categorylist div').append('<a><span>'+span.html()+'</span><span class="s_close"></span></a>');
		$('#categorylist').css('display','block');
		$('.selector').css('display','block');
		span.parent().parent().siblings().css('display','none');
		
		_this.condition = span.html();//查找的条件
		
		Page.pagin(32,_this.condition);//调用分页
		
		$('.s_close').on('click',function(){//撤销单个条件条件
			$(this).parent().remove();
			span.css('color','#0081cc');
			span.parent().parent().siblings().css('display','block');
			Page.pagin(32,false);
		})
	}

	Page.classify.prototype.charge = function(){//价格排序
		var _this = this;
		_this.arrPrice = [];
		for(var i in arrclassify){
			_this.arrPrice.push(arrclassify[i].price);
		}
		for(var i = 0;i < _this.arrPrice.length;i++){
			for(var j = 0;j < _this.arrPrice.length - i;j++){
				if(_this.arrPrice[j]>_this.arrPrice[j+1]){
					var temp;
					temp = _this.arrPrice[j];
					_this.arrPrice[j] = _this.arrPrice[j+1];
					_this.arrPrice[j+1] = temp;
				}
			}
		}

	}
	Page.classify.prototype.sorts = function(){//价钱与所选数组进行比较
		var _this = this;
		var arrTemp = [];
		for(var i=0;i < _this.arrPrice.length;i++){
			for(var j =0;j<arrclassify.length;j++){
				if(_this.arrPrice[i] == arrclassify[j].price){
					arrTemp.push(arrclassify[j]);
					arrclassify.splice(j,1);//删除掉刚刚相同的数组中的该项
				}
			}
			
		}
		/*var JsonStr = JSON.stringify(arrTemp);
		console.log(arrTemp);*/
		Page.writeData(arrTemp,32,false);
	}

	module.exports = Page;

})