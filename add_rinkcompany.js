require("./publicResource.js");
require("../css/addrinkcompany.css");
require("../../webapp/js/plugins/layer/layer.min.js");
layer.config({
	//path: '../../WebRoot/js/plugins/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
	path:'/lanyue-manage/js/plugins/layer/'
});
//全局引入vue
window.Vue = require('vue');


//进入页面立即执行的函数
$(function(){
	window.getToken();
	addrinkcompanyFunction.getTradeList();
})

var addrinkcompanyglobal = {
	globalurl:window.globalurl, //用来保存url的变量名
	parentCode:result.companyCode,//新增下级公司需要的parentcode
	index: parent.layer.getFrameIndex(window.name),//获取父页面的新增layer弹窗的名字
	newlogo:"",//用来保存图片和标志的变量名
	newbanner:"",
	lng:"",
	lat:"",
	indexrinkstatu:1,
	access_token:"",
	//初始化行业列表
	tradeBox:new Vue({
		el:'#tradeSel',
		data:{
			selected:'',
			options:[]
		}
	}),
	//客户信息
	companyname:new Vue({
		el:'#companyName',
		data:{
			companyName:'',
		}
	}),
	//地图相关信息
	map:"",
	mIcon:"",
	marker:"",
	addMarker:"",
	position:"",
	lat:"",
	lng:"",
	zoom:""
};

//获取行业列表
var  addrinkcompanyFunction = {
	getTradeList:function(){
		$.ajax({
			url:addrinkcompanyglobal.globalurl+'/v1/trades',
			data:{
				access_token:window.accesstoken
			},
			type:'GET',
			async:false,
			dataType:'JSON',
			success:function(data){
				if(data.code==400005){
					window.getNewToken();
					addrinkcompanyFunction.getTradeList();
				}else if(data.rows){
					addrinkcompanyglobal.tradeBox.options=data.rows;
				}else{
					layer.msg(data.error,{icon:2})
				}
			}
		})
	},
	//地图展示
	uploadeImg:function (){
		var oData = new FormData(document.forms.namedItem("fileinfo"));  
		var oReq = new XMLHttpRequest();  
		oReq.open( "POST", "/lanyue-manage/company/uploadeImg" , false );  
		oReq.onload = function(oEvent) {  
			 var obj=eval('('+oEvent.currentTarget.responseText+')');
				addrinkcompanyglobal.newlogo="/lanyue-manage/upload/"+obj[0].logoFileName;
				addrinkcompanyglobal.newbanner="/lanyue-manage/upload/"+obj[1].bannerFileName;
		      if (oReq.status == 200) {  
		    	 layer.alert("图片上传成功");
		     } else {
		    	 layer.alert("图片上传失败！");
		     }  
		};  
		oReq.send(oData);
	}
}


//自动生成企业图片
	$('#companyLogo').attr("src","/lanyue-manage/images/company_logo.png");
	$("#companybanner").attr("src","/lanyue-manage/images/company_banner.png");

	//展示banner
	$("#bannerinput").change(function(){
				file=document.getElementById("bannerinput");
				if (file.files && file.files[0])  
				 {  
				 var reader = new FileReader();  
				 reader.onload = function(evt){
					 $("#companybanner").attr("src",evt.target.result)
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
					 $("#companyLogo").attr("src",evt.target.result)
				}    
				 reader.readAsDataURL(file.files[0]);  
				}
	});
	


//单选框
if(indexrinkstatu==1){
	 $('#valid').css('class','btn btn-success');
	 $('#invalid').css('class','btn btn-default');
	}

	//状态切换
	$("#valid").click(function(){
		$(this).attr("class","btn btn-success");
		$("#invalid").attr("class","btn btn-default")
		addrinkcompanyglobal.indexrinkstatu=1;
	})
	$("#invalid").click(function(){
		$(this).attr("class","btn btn-success");
		$("#valid").attr("class","btn btn-default")
		addrinkcompanyglobal.indexrinkstatu=0;
	})

//地图展示
addrinkcompanyglobal.map = new AMap.Map('companyMap', {
    resizeEnable: true,
    zoom:5,
    center: [108.946651,34.269971]  
});
addrinkcompanyglobal.mIcon=new AMap.Icon({
	image:"/lanyue-manage/images/marker"+indexrinkstatu+".png",
	imageSize:new AMap.Size(33,36)
});
addrinkcompanyglobal.addMarker = addrinkcompanyglobal.map.on("click",function(e){
	addrinkcompanyglobal.map.clearMap();
	addrinkcompanyglobal.marker=new AMap.Marker({
		position : e.lnglat,
		icon:addrinkcompanyglobal.mIcon,
		map :addrinkcompanyglobal.map
		});
	addrinkcompanyglobal.position=marker.getPosition();
	addrinkcompanyglobal.lng=addrinkcompanyglobal.position.getLng();
	addrinkcompanyglobal.lat=addrinkcompanyglobal.position.getLat();
	addrinkcompanyglobal.zoom=addrinkcompanyglobal.map.getZoom();
	if(addrinkcompanyglobal.zoom<11){
		addrinkcompanyglobal.map.setZoomAndCenter(11,addrinkcompanyglobal.position);
	}else{
		addrinkcompanyglobal.map.setZoomAndCenter(addrinkcompanyglobal.zoom,addrinkcompanyglobal.position);
	}
});


//点击保存按钮，新增信息
$("#saveInfo").click(function(){
	addrinkcompanyFunction.uploadeImg();
	var location={'lng':addrinkcompanyglobal.lng+'','lat':addrinkcompanyglobal.lat+''};
	var newUser="{'companyName':'"+addrinkcompanyglobal.companyname.companyName+"','tradeId':"+addrinkcompanyglobal.tradeBox.selected+",'status':"+addrinkcompanyglobal.indexrinkstatu+",'parentCode':'"+addrinkcompanyglobal.parentCode+"','banner':'"+addrinkcompanyglobal.newbanner+"','logo':'"+addrinkcompanyglobal.newlogo+"','location':'"+JSON.stringify(addrinkcompanyglobal.location)+"'}"
	$.ajax({
		url:addrinkcompanyglobal.globalurl+'/v1/companys',
		dataType : 'JSON',
		type : 'POST',
		data:{
			access_token:window.accesstoken,
			data:newUser
		},
		success : function(data) {
			if(data.code==400005){
				window.getNewToken();
				$("#saveInfo").click();
			}else if(data.code==200){
				parent.location.reload();
				layer.msg(data.success,{icon:1});
				setTimeout(function(){
					  parent.layer.close(index); 
				},800);
			}else{
				layer.msg(data.error,{icon:2})
			}
		}
	})
})

