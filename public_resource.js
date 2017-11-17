//将项目中的公共部分提取出来
require('jquery');
require("../../../../node_modules/bootstrap/dist/js/bootstrap.min.js");
require("../../../../node_modules/bootstrap/dist/css/bootStrap.min.css");
require("../../../../node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2");
require("../../../../node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff");
require("../../../../node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf");
require("../../../../node_modules/font-awesome/css/font-awesome.css");
require("../../webapp/css/style.css");
require("../../webapp/css/animate.css");
require("../../webapp/js/content.js");
require("../../webapp/css/plugins/iCheck/custom.css");
require("../../webapp/js/plugins/iCheck/icheck.min.js");

//全局获取资源的url
window.globalurl="http://139.129.235.9:8070/lanyue-api";

//全局保存项目名称
window.itemName="/lanyue-manage";

//项目中所有页面公用的代码(获取token,获取新token)
	//获取token
	window.getToken=function(){
		$.ajax({
			url:itemName+'/frame/getToken',
			dataType : 'JSON',
			type : 'GET',
			async:false,
			success : function(data) {
				 window.accesstoken=data.accesstoken;
				 window.refreshToken=data.refreshToken;
			}
		})
	}
  
	//获取新的token
	window.getNewToken=function(){
		$.ajax({
			url:globalurl+'/authorize/refresh_token',
			type:'GET',
			dataType:'JSON',
			async:false,
			data:{
				refresh_token:window.refreshToken,
				client_id:'admin',
				client_secret:'admin',
				grant_type:"refresh_token",
			},
			success:function(data){
				if(data.code==200){
					window.accesstoken=data.accessToken;
					window.refreshToken=data.refreshToken;
					$.ajax({
						url:itemName+"/frame/saveToken",
						data:data,
						dataType:"JSON",
						async:false,
						type:"POST",
						success:function(json){
						}
					})
				}
			}
		})
	}
