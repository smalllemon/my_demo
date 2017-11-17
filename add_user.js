require("./publicResource.js");
require("../css/adduserinfo.css");
require("../../webapp/js/plugins/layer/layer.min.js");
layer.config({
	//path: '../../WebRoot/js/plugins/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
	path:'/lanyue-manage/js/plugins/layer/'
});
window.Vue = require('vue');

//初始化页面
$(function(){
	window.getToken();
	AddglobalFunction.getTradeList();
})

var  adduserglobal ={
		globalurl:window.globalurl,//用来保存url的变量名
		indexstatus:1,//初始化状态
		index :parent.layer.getFrameIndex(window.name),//获取父页面的新增layer弹窗的名字
		newlogo:"",//用来保存图片和标志的变量名
		newbanner:"",
		lng:"",
		lat:"",
		companyname:new Vue({
				el:'#companyName',
				data:{
					companyName:'',
				}
			}),//客户信息
       		 tradeBox:new Vue({
			el:'#tradeSel',
			data:{
				selected:'',
				options:[]
			}
		}),//初始化行业列表
		marker:"",//地图相关
		map:"",
		mIcon:"",
		addMarker:"",
		position:"",
		lat:"",
		lng:"",
		zoom:"",
};

//图片和标志初始化
$("#companyLogo").attr("src",'/lanyue-manage/images/company_logo.png');
$("#companybanner").attr("src","/lanyue-manage/images/company_banner.png");

//初始化用户转状态
if(indexstatus==1){
 $('#valid').css('class','btn btn-success');
 $('#invalid').css('class','btn btn-default');
}


//状态切换
$("#valid").click(function(){
	$(this).attr("class","btn btn-success");
	$("#invalid").attr("class","btn btn-default")
	indexstatus=1;
})
$("#invalid").click(function(){
	$(this).attr("class","btn btn-success");
	$("#valid").attr("class","btn btn-default")
	indexstatus=0;
})

//地图展示
	adduserglobal.map = new AMap.Map('companyMap', {
	    resizeEnable: true,
	    zoom:5,
	    center: [108.946651,34.269971]  
	});
	adduserglobal.mIcon=new AMap.Icon({
		image:"/lanyue-manage/images/marker"+indexstatus+".png",
		imageSize:new AMap.Size(33,36)
	});
	adduserglobal.addMarker = map.on("click",function(e){
		adduserglobal.map.clearMap();
		adduserglobal.marker=new AMap.Marker({
			    position : e.lnglat,
			    icon: adduserglobal.mIcon,
			    map : adduserglobal.map
			});	
			adduserglobal.position=adduserglobal.marker.getPosition();
			adduserglobal.lng=adduserglobal.position.getLng();
			adduserglobal.lat=adduserglobal.position.getLat();
			adduserglobal.zoom=adduserglobal.map.getZoom();
				if(adduserglobal.zoom<11){
					adduserglobal.map.setZoomAndCenter(11,adduserglobal.position);
				}else{
					adduserglobal.map.setZoomAndCenter(zoom,adduserglobalposition);
				}
	  });
	
	
//展示banner
$("#bannerinput").change(function(){
		file=document.getElementById("bannerinput");
		if (file.files && file.files[0])  
		 {  
		 var reader = new FileReader();  
		 reader.onload = function(evt){
		   var newbanner=$("#companybanner").attr("src",evt.target.result);	
		}    
		 reader.readAsDataURL(file.files[0]);  
		}
 }); 

//展示logo
$("#logoinput").change(function(){
		file=document.getElementById("logoinput");
		if (file.files && file.files[0])  
		 {  
		 var reader = new FileReader();  
		 reader.onload = function(evt){
			  $("#companyLogo").attr("src",evt.target.result);
		}   
		 reader.readAsDataURL(file.files[0]);  
		}
});

var AddglobalFunction = { 
	//获取行业列表
	getTradeList:function (){
		$.ajax({
			url:adduserglobal.globalurl+'/v1/trades',
			data:{
				access_token:window.accesstoken,
			},
			type:'GET',
			async:false,
			dataType:'JSON',
			success:function(data){
				if(data.code==400005){
					window.getNewToken();
					AddglobalFunction.getTradeList();
				}else if(data.rows){
					adduserglobal.tradeBox.options=data.rows;
				}else{
					layer.msg(data.error,{icon:2})
				}
			}
		})
	},
	//图片上传
	uploadeImg:function (){
		console.info("asd")
		var oData = new FormData(document.forms.namedItem("fileinfo"));  
		var oReq = new XMLHttpRequest();  
		oReq.open( "POST", "/lanyue-manage/company/uploadeImg" , false );  
		oReq.onload = function(oEvent) { 
		    var obj=eval('('+oEvent.currentTarget.responseText+')');
		    	adduserglobal.newlogo="/lanyue-manage/upload/"+obj[0].logoFileName;
		     	adduserglobal.newbanner="/lanyue-manage/upload/"+obj[1].bannerFileName;
		    if (oReq.status == 200) {  
		    	 layer.alert("图片上传成功");
		    } else {
		    	 layer.alert("图片上传失败！");
		    }  
		};  
		oReq.send(oData);
	}
}

//点击保存按钮，新增信息
$("#saveInfo").click(function(){
	AddglobalFunction.uploadeImg();
	var location={'lng':lng+'','lat':lat+''};
	var newUser="{'companyName':'"+adduserglobal.companyname.companyName+"','tradeId':"+adduserglobal.tradeBox.selected+",'status':"+adduserglobal.indexstatus+",'banner':'"+adduserglobal.newbanner+"','logo':'"+adduserglobal.newlogo+"','location':'"+JSON.stringify(adduserglobal.location)+"','parentCode':''}"
	$.ajax({
			url:adduserglobal.globalurl+'/v1/companys',
			dataType : 'JSON',
			type : 'POST',
			data:{
				access_token:window.accesstoken,
				data:newUser,
			},
			success : function(data) {
				if(data.code==400005){
					window.getNewToken();
					$("#saveInfo").click();
				}else if(data.code==200){
					layer.msg(data.success,{icon:1});
					setTimeout(function(){
						parent.location.reload();
					},1000);
					setTimeout(function(){
					    parent.layer.close(index);
					},2000);
				}else{
					layer.msg(data.error,{icon:2})
				}
			}
	})
});
