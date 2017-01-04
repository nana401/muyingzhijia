define(function(require,exports,module){
	var $ = require('jq');
	var Lunbo = {
		banner:function(boxId,clickId){
			var _this = this;
			this.$ele = $(boxId);//ul
			this.clickId = $(clickId);//图标
			this.aLi = this.$ele.children();//ul下的li			
			Lunbo.init(_this);
		},
		init:function(_this){
			_this.$index = 0;
			_this.$ele.width(_this.aLi.outerWidth() * _this.aLi.length);
			_this.$clickArea = $(_this.clickId).children();//选择出所有的标记
			_this.timer = null;
			clearInterval(_this.timer);
			_this.timer = setInterval(function(){//自动轮播
				Lunbo.$setInterval(_this,{marginLeft:- _this.$index * _this.aLi.innerWidth()},'spancur',_this.$index)
			},2000)
		
			_this.$clickArea.on('click',function(){					
				/*Lunbo.$clickAreaFn($(this).index(),_this);*/
				_this.$index = $(this).index();
				Lunbo.$change(_this,{marginLeft:- _this.$index * _this.aLi.innerWidth()},'spancur',_this.$index);	
			});
			
			_this.$ele.hover(function(){clearInterval(_this.timer)},function(){
				_this.timer = setInterval(function(){
					Lunbo.$setInterval(_this,{marginLeft:- _this.$index * _this.aLi.innerWidth()},'spancur',_this.$index)
				},2000);
			})
		},

		$change:function(_this,obj,cur,index){
			_this.$clickArea.removeClass(cur).eq(index).addClass(cur);
			_this.$ele.animate(obj);
		},
		$setInterval:function(_this,obj,cur,index){
			Lunbo.$change(_this,obj,cur,index);
			if(_this.$index == _this.$clickArea.length-1){
				_this.$index = 0;
			}else{
				_this.$index++;
			}
		},

		//继承？
		banner2:function(boxId,clickId){		
			var _this = this;
			this.$ele = $(boxId);//ul
			this.aLi = this.$ele.children();//ul下的li			
			this.clickId = $(clickId);//图标
			Lunbo.init2(_this);
		},
		init2:function(_this){
			_this.$ele.width('2210px');
			_this.$clickArea = $(_this.clickId).children();
			_this.timer = null;
			_this.$index = 0;
			clearInterval(_this.timer);
			_this.timer = setInterval(function(){
				Lunbo.$setInterval(_this,{marginLeft:- _this.$index * (_this.$ele.innerWidth()/2)},'on',_this.$index);
			},3000);
			_this.$clickArea.on('click',function(){	
				_this.$index = $(this).index();		
				Lunbo.$change(_this,{marginLeft:-_this.$index*(_this.$ele.innerWidth()/2)},'on',_this.$index);	
			});
			_this.$ele.hover(function(){clearInterval(_this.timer)},function(){
				_this.timer = setInterval(function(){
					Lunbo.$setInterval(_this,{marginLeft:-_this.$index*(_this.$ele.innerWidth()/2)},'on',_this.$index);
				},3000);
			})
		},
		
		massage:function(boxId){
			var _this = this;
			_this.$ele = $(boxId);
			_this.timer = null;
			clearInterval(_this.timer);
			_this.timer = setInterval(function(){
				Lunbo.$massageDsp(_this);
			},3000);
		},
		$massageDsp:function(_this){
			//console.log(_this.$ele.children().eq(0))
			_this.$ele.animate({marginTop:"-35px"},2000,function(){
				_this.$ele.children().eq(0).clone().appendTo(_this.$ele);//克隆第一个li插入到ul中
				_this.$ele.children().eq(0).remove();
				_this.$ele.css('marginTop','0');
			});
			
			
			
		}

	}
	
	module.exports = Lunbo;
})// JavaScript Document 