define(function(require,exports,module){
	var $ = require('jq');
	var Ajax={
		$ajaxGetData :function(url,type,dataType,fn){

		$.ajax({
			url:url,
			type:type,
			dataType:dataType,
			success:function(res){//回调函数
				fn(res);
			},
			error:function(res){
				console.log(1111)
			}
		})
		}
	
	}
	module.exports =  Ajax;
})