require("./publicResource.js");
require("../css/rinkcompany.css")
require("../../webapp/css/plugins/bootstrap-table/bootstrap-table.min.css");
require("../../webapp/js/plugins/bootstrap-table/bootstrap-table.min.js");
require("../../webapp/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js");
require("../../../../node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js")
require("../../../../node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.css")
require("../../../../node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min.js")
require("../../webapp/js/plugins/layer/layer.min.js");
layer.config({
	//path: '../../WebRoot/js/plugins/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
	path:'/lanyue-manage/js/plugins/layer/'
});
window.Vue = require('vue');

//进入页面立即执行的函数
$(function(){
	window.getToken();
	$("#startDate").val("2015-01-01");
	$("#endDate").val(rinkcompanyFunction.formatDate(endDate));
	rinkcompanyFunction.getrinkcompanyList();
	//复选框设置
	 $('.i-checks').iCheck({
	        checkboxClass: 'icheckbox_square-green',
	    });
})

$(window).load(function() { 
	rinkcompanyFunction.showTooltips()
});


//搜索设置
var searchBox=new Vue({
	el:'#searchBox',
	data:{
		companyName:''
	} 
})

$("#searchBtn").click(function(){
	$('#userTable').bootstrapTable("refresh",rinkcompanyFunction.queryParams);
})


//复选框
var checkboxTest = new Vue({
	el:"#statusCheck",
	data:{
		checkedStatus:["0","1"]
	},
	watch:{
		checkedStatus:function(newcheckedStatus){
			console.info(newcheckedStatus)
		}
	}
})

$('input.checkbox-callback').css('width','20px');
$('input.checkbox-callback').on('ifChecked', function(event) {
	rinkcompanyglobal.checkedStu=$('input[name=checkbox]:checked').map(function(){return this.value;}).get().join(',')
	if(rinkcompanyglobal.checkedStu.length==1){
		rinkcompanyglobal.companyStatus=rinkcompanyglobal.checkedStu;
	}else{
		rinkcompanyglobal.companyStatus="";
	}
	$('#userTable').bootstrapTable("refresh",rinkcompanyFunction.queryParams);
});


$('input.checkbox-callback').on('ifUnchecked', function(event) {
	rinkcompanyglobal.companyStatus=$('input[name=checkbox]:checked').map(function(){return this.value;}).get().join(',')
	if(rinkcompanyglobal.companyStatus.length==0){
		rinkcompanyglobal.companyStatus=3;
		layer.msg("没有状态是不会有结果的~",{icon:2})
	}
	$('#userTable').bootstrapTable("refresh",rinkcompanyFunction.queryParams);
});


//整个页面的变量
var  rinkcompanyglobal={
	 globalurl:window.globalurl,//用来保存url的变量名
	 DcompanyId:result.companyId, //上级公司的companyCode
	 companyStatus:"",
	 endDate:new Date(),
	 editstatus,
	 rinkcompanyId,
	 newlogo:"",//用来保存图片和标志的变量名
	 newbanner:"",
	 lng:"",
	 lat:"",
	 map:"",
	 mIcon:"",
	 marker:"",
	 addMarker:"",
	 position:"",
	 lng:"",
	 lat:"",
	 zoom:"",
},

//地图展示
rinkcompanyglobal.map = new AMap.Map('companyMap', {
    resizeEnable: true,
    zoom:5,
    center: [108.946651,34.269971]  
}),
rinkcompanyglobal.mIcon=new AMap.Icon({
	image:"/lanyue-manage/images/marker1.png",
	imageSize:new AMap.Size(33,36)
}),

rinkcompanyglobal.addMarker = map.on("click",function(e){
	rinkcompanyglobal.map.clearMap();
	rinkcompanyglobal.marker=new AMap.Marker({
		position : e.lnglat,
		icon:rinkcompanyglobal.mIcon,
		map : rinkcompanyglobal.map
		});
	rinkcompanyglobal.position=marker.getPosition();
	rinkcompanyglobal.lng=rinkcompanyglobal.position.getLng();
	rinkcompanyglobal.lat=rinkcompanyglobal.position.getLat();
	rinkcompanyglobal.zoom=rinkcompanyglobal.map.getZoom();
	if(rinkcompanyglobal.zoom<11){
		rinkcompanyglobal.map.setZoomAndCenter(11,rinkcompanyglobal.position);
	}else{
		rinkcompanyglobal.map.setZoomAndCenter(rinkcompanyglobal.zoom,rinkcompanyglobal.position);
	}
});


//编辑页面数据初始化
var editcompanyName=new Vue({
	el:'#editcompanyName',
	data:{
		editcompanyName:''
	} 
})

//点击编辑开始数据渲染
$('#editrinkcom').click(function(rinkcompanyglobal.DcompanyId){
	editrinkcompany(rinkcompanyglobal.DcompanyId);
});


//编辑状态的切换
$("#valid").click(function(){
	$(this).attr("class","btn btn-success");
	$("#invalid").attr("class","btn btn-default")
	rinkcompanyglobal.editstatus=1;
})
$("#invalid").click(function(){
	$(this).attr("class","btn btn-success");
	$("#valid").attr("class","btn btn-default")
	rinkcompanyglobal.editstatus=0;
})

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

var  rinkcompanyFunction ={
    init:function(){
        window.FormElements();
    },
    showTooltips:function(){
	  $("[data-toggle='tooltip']").tooltip();
	},
	//日期格式化
	formatDate = function (date) {  
	    var y = date.getFullYear();  
	    var m = date.getMonth() + 1;  
	    m = m < 10 ? '0' + m : m;  
	    var d = date.getDate();  
	    d = d < 10 ? ('0' + d) : d;  
	    return y + '-' + m + '-' + d;  
	},
	//获取下级公司列表
	window.getrinkcompanyList=function(){
		var dataTables= $('#userTable').bootstrapTable({
		  	method: 'get',
		    url:rinkcompanyglobal.globalurl+"/v1/companys",//数据源
		    sidePagination: 'server',//设置为服务器端分页
		    pagination: true, //是否分页
		    search: false, //显示搜索框
		    pageSize: 10,//每页的行数 
		    toolbar: '#userTableToolbar',
		    pageNumber:1,
		    showRefresh: true,
		    showToggle: true,
		    showColumns: true,
		    pageList:[10,15,20, 25],
		    queryParams: rinkcompanyFunction.queryParams,
		    striped: true,//条纹
		    onLoadSuccess:function(value){
		    	if(value.code==400005){
		    		window.getNewToken();
		    		$('#userTable').bootstrapTable("refresh",queryParams);
		    	}
		    	rinkcompanyfunction.showTooltips();
		    },
		    columns: [
	                    {
	                        title: "客户名称",
	                        field: "companyName",
	                    },
	                    {
	                        title: "创建日期",//标题
	                        field: "createDate",//键名
	                    },
	                    {
	                        field: "status",
	                        title: "状态",
	                        formatter: rinkcompanyFunction.statusFormatter,//对本列数据做格式化
	                    },
	                    {
	                        field: "companyCode",
	                        title: "下级公司",
	                        formatter:rinkcompanyFunction.infoFormatter,
	                        
	                    },
	                    {
	                        field: "_id",
	                        title: "账号 ",
	                        formatter:rinkcompanyFunction.rinkaccountinfoFormatter,
	                    },
	                    {
	                        field: "_id",
	                        title: "操作",
	                        valign:"middle",
	                        align:"center",
	                        formatter: rinkcompanyFunction.editFormatter,//对本列数据做格式化
	                    }
	                ],
		});
	},
  	 //表格数据获取的参数
   	 queryParams:function (params) {
	    return {
	    	pageNumber:params.offset,
	    	pageSize:params.limit,
	    	access_token:window.accesstoken,
	    	status:rinkcompanyglobal.companyStatus,
	    	filter:'{"startDate":"'+$("#startDate").val()+'","endDate":"'+$("#endDate").val()+'"}',
		    sortOrder: params.order,
		    parentCode:rinkcompanyglobal.DcompanyId,
		    like:'{"companyName":"'+searchBox.companyName+'"}',
	    };
	},
	//账号列的格式化
	rinkaccountinfoFormatter:function (value, row, index){ 
	  return "<span  data-toggle='tooltip' data-placement='top' title='点击进入账号页面' style='cursor: pointer;' class='fa fa-wrench' onclick=rinkaccountpageturn('"+value+"')></span>&nbsp;&nbsp;"+row.ownUserCount;
	},
	//操作列的格式化
	editFormatter:function (value,row,index){
		return "<span data-toggle='tooltip' data-placement='top' title='点击编辑' style='color:#5A9F90;height:33px;line-height:33px;cursor: pointer;' class='fa fa-pencil-square-o' id='editrinkcom' onclick=editrinkcompany('"+value+"')></span><span data-toggle='tooltip' data-placement='top' title='点击删除' style='color:#D9B793;margin-left:15px;cursor: pointer;' class='glyphicon glyphicon-trash' onclick=deleterinkcompany('"+value+"')></span>"
	},
	//状态列的格式化
	statusFormatter:function (value,row,index){
		if(value==1){
			return "<font style='color:#5A9F90;'>有效</font>"
		}else{
			return "<font style='color:#D9B793;'>无效</font>"
		}
	},
	//下级公司列的格式化
	infoFormatter:function (value, row, index){
		return "<span data-toggle='tooltip' data-placement='top' title='点击进入下级公司' style='cursor: pointer;' class='fa fa-wrench' onclick=pageturn('"+value+"')></span>&nbsp;&nbsp;"+row.childrenCompnayCount
	}
	//页面插件
	window.FormElements : function() {
		var runDatePicker = function() {
			$('.date-picker').datepicker({
				autoclose : true
			});
		};
		return {
			init : function() {
				runDatePicker();
			}
		};
	},
	//图片展示
	uploadeImg:function (){
		var oData = new FormData(document.forms.namedItem("fileinfo"));  
		var oReq = new XMLHttpRequest();  
		oReq.open( "POST", "/lanyue-manage/company/uploadeImg" , false );  
		oReq.onload = function(oEvent) {  
			var obj=eval('('+oEvent.currentTarget.responseText+')');
			rinkcompanyglobal.newlogo="/lanyue-manage/upload/"+obj[0].logoFileName;
			rinkcompanyglobal.newbanner="/lanyue-manage/upload/"+obj[1].bannerFileName;
		     if(oReq.status == 200) {  
		    	 layer.alert("图片上传成功");
		     }else{
		   	     layer.alert("图片上传失败！");
		    }  
	};  
		oReq.send(oData);
	},
};
rinkcompanyFunction.init();


//删除选中的子公司
window.deleterinkcompany=function(value){
	   layer.confirm('是否要删除此客户？', {
		  btn: ['确定','取消'] //按钮
		}, function(){
				$.ajax({
					url:rinkcompanyglobal.globalurl+'/v1/companys/'+value+'?access_token='+window.accesstoken,
					dataType: 'JSON',
					type: 'delete',
					success: function(data) {
						if(data.code==200){
							layer.msg(data.success,{icon:1});
	 						$('#userTable').bootstrapTable("refresh",queryParams);
						}else if(data.code==400005){
							window.getNewToken();
							window.getToken();
							}else{
								layer.msg(data.error,{icon:2})
							}
						}
					});	
			});
	}
 
//再点击下级公司进行页面的跳转
window.pageturn=function(companyCode){
 	self.location="/lanyue-manage/company/rinkcompany/"+companyCode;
}

//点击下级公司的账号进行页面跳转
window.rinkaccountpageturn=function(_id){
	 self.location="/lanyue-manage/company/rinkcompanyaccount/"+_id;
}


//编辑弹窗数据渲染 
window.editrinkcompany=function(rinkcompanyglobal.DcompanyId){
		rinkcompanyId=rinkcompanyglobal.DcompanyId;
	  	 $.ajax({
		   url:rinkcompanyglobal.globalurl+'/v1/companys/'+rinkcompanyglobal.DcompanyId,
		   type:'GET',
		   dataType:'JSON',
		   async:false,
		   data:{
			  access_token:window.accesstoken,
		  },
		  success:function(data){
			  if(data.code==400005){
				  window.getNewToken();
				}else if(data.companyName){
						layereditrinkcom=layer.open({
					        type:1,
							title:"编辑客户信息",
							skin:'title-class',
							shade: [0.7, '#fff'],
							area:'80%',
							scrollbar: false,
							content:$("#editrinkinfo")
					  
					 });
					editcompanyName.editcompanyName=data.companyName;
						if(data.status==0){
							$("#invalid").attr("class","btn btn-success");
							$("#valid").attr("class","btn btn-default");
							editstatus=0;
						}else{
							$("#valid").attr("class","btn btn-success");
							$("#invalid").attr("class","btn btn-default");
							editstatus=1;
						}//自动生成企业的标志
						if(data.logo=='/images/company_logo.png' || data.logo=='images/company_logo.png'|| data.logo=="/lanyue-manage/upload/" ){
							$('#companyLogo').attr("src",'/lanyue-manage/images/company_logo.png');
						}else if(data.logo){
							$('#companyLogo').attr("src",data.logo);
						}if(data.banner=="/images/company_banner.png" || data.banner=="images/company_banner.png" ||data.banner=="/lanyue-manage/upload/" ){
							$("#companybanner").attr("src","/lanyue-manage/images/company_banner.png");
						}else if(data.banner){
							$("#companybanner").attr("src",data.banner);
						}else{
							$('#companyLogo').attr("src","/lanyue-manage/images/company_logo.png");
							$("#companybanner").attr("src","/lanyue-manage/images/company_banner.png");	
						}if(data.location){
		 				    rinkcompanyglobal.map.clearMap();
		 					var location=[];
		 					location.push(data.location.lng);
		 					location.push(data.location.lat);
		 					rinkcompanyglobal.marker=new AMap.Marker({
		 						 	position :location,
		 						    icon:mIcon,
		 						});
		 					rinkcompanyglobal.marker.setMap(map);
		 					rinkcompanyglobal.map.setZoomAndCenter(13,location);
		 			     }else{
		 			    	 layer.msg('该用户暂时没有位置信息！');
		 			     }
			}else{
					layer.msg(data.error,{icon:2})
			     }
		  }
	  })
  }




//点击保存按钮保存修改后的数据
$("#saveInfo").click(function(){
	    rinkcompanyFunction.uploadeImg();
	    window.getToken();
	    var location={'lng':lng+'','lat':lat+''};
		savedata="{'companyName':'"+editcompanyName.editcompanyName+"','status':"+editstatus+",'logo':'"+newlogo+"','banner':'"+newbanner+"','location':'"+JSON.stringify(location)+"'}"
		$.ajax({
			url:rinkcompanyglobal.globalurl+'/v1/companys/'+rinkcompanyId,
			dataType : 'JSON',
			type : 'PUT',
			data:{
				 access_token:window.accesstoken,
				 data:savedata
			},
			success:function(data){
				if(data.code==200){
					layer.msg(data.success,{icon:1});
					layer.close(layereditrinkcom);
					$('#userTable').bootstrapTable("refresh",queryParams);
				}else if(data.code==400005){
					window.getNewToken();
					$("#saveInfo").click();
				}
			}
		})
})


//新增弹窗
window.rinkcompanylayer=function(value){
		addrinkinfo=layer.open({
			type:2,
			title:"添加客户信息",
			shadeClose:true,
			skin:'title-class',
			shade: [0.7, '#fff'],
			area:['80%','95%'],
			content:"/lanyue-manage/company/addrinkCompany/"+value+''
	     })
}
layer.full(addrinkinfo);
