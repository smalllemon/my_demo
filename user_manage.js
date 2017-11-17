require("./publicResource.js");
require("../css/user_manger.css")
require("../../webapp/css/plugins/bootstrap-table/bootstrap-table.min.css");
require("../../webapp/js/plugins/bootstrap-table/bootstrap-table.min.js");
require("../../webapp/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js");
require("../../../../node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js")
require("../../../../node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.css")
require("../../../../node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min.js")
require("../../webapp/js/plugins/layer/layer.min.js");
layer.config({
	path:'/lanyue-manage/js/plugins/layer/'
});
window.Vue= require('vue');



//进入页面立即执行的函数
$(function(){
	window.getToken();
	getUserList();
	$("#startDate").val("2015-01-01");
	$("#endDate").val(gobalFunction.formatDate(globalNumber.endDate));
	//复选框设置
	 $('.i-checks').iCheck({
	        checkboxClass: 'icheckbox_square-green',
	    });
})
//提示函数初始化
$(window).load(function() { 
	showTooltips();
});

//复选框
var checkboxTest = new Vue({
	el:"#statusCheck",
	data:{
		checkedStatus:["0","1"]
	},
})

$('input.checkbox-callback').on('ifChecked', function(event) {
	var checkedStu=$('input[name=checkbox]:checked').map(function(){return this.value;}).get().join(',')
	if(checkedStu.length==1){
		companyStatus=checkedStu;
	}else{
		companyStatus="";
	}
	$('#userTable').bootstrapTable("refresh",queryParams);
});


$('input.checkbox-callback').on('ifUnchecked', function(event) {
	companyStatus=$('input[name=checkbox]:checked').map(function(){return this.value;}).get().join(',')
	if(companyStatus.length==0){
		companyStatus=3;
		layer.msg("没有状态是不会有结果的~",{icon:2})
	}
	$('#userTable').bootstrapTable("refresh",queryParams);
});


//整个页面涉及的函数和变量名
var globalNumber = {
    globalurl:window.globalurl; //用来保存url的变量名
 	companyStatus:"";
 	endDate:new Date();
};

var  gobalFunction  ={
    init:function(){
          gobalFunction.showTooltips();
          gobalFunction.formatDate();
          window.getUserList();
          window.turnpage();
          window.showAccount();
          window.deleteCompany();
          window.FormElements();
    },
    showTooltips:function(){
	  	$("[data-toggle='tooltip']").tooltip();
	},
	//日期格式化
    formatDate:function (date){
	    var y = date.getFullYear();  
	    var m = date.getMonth() + 1;  
	    m = m < 10 ? '0' + m : m;  
	    var d = date.getDate();  
	    d = d < 10 ? ('0' + d) : d;  
	    return y + '-' + m + '-' + d;  
	},
	//获取客户列表
	window.getUserList:function(){
	 	   var dataTables= $('#userTable').bootstrapTable({
		  	method: 'get',
		    url:globalNumber.globalurl+"/v1/companys",//数据源
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
		    queryParams:gobalFunction.queryParams,
		    striped: true,//条纹
		    onLoadSuccess:function(value){
		    	if(value.code==400005||value.code==500){
		    		 window.getNewToken();
		    		$('#userTable').bootstrapTable("refresh",queryParams)
		    	}
		    	gobalFunction.showTooltips();
		    },
	        onLoadError: function(value){ //加载失败时执行 
	        	  if(value.code==404){
	    		       layer.msg("加载数据失败", {time : 1500, icon : 2}); 
	    		   } 	
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
	                        formatter: gobalFunction.statusFormatter,//对本列数据做格式化
	                    },
	                    {
	                        field: "tradeName",
	                        title: "行业",
	                    },
	                    {
	                        field: "companyCode",
	                        title: "下级公司",
	                        width:"130px",
	                        formatter: gobalFunction.infoFormatter,//对本列数据做格式化
	                    },
	                    {
	                        field: "_id",
	                        title: "账号",
	                        width:"130px",
	                        formatter: gobalFunction.accountFormatter,//对本列数据做格式化
	                    },
	                    {
	                        field: "_id",
	                        title: "操作",
	                        valign:"middle",
	                        align:"center",
	                        formatter: gobalFunction.editFormatter,//对本列数据做格式化
	                    }
	                ],
		});
	},
	//表格数据获取的参数
	queryParams:function(params) {
	    return {
	    	pageNumber:params.offset,
	    	pageSize:params.limit,
	    	access_token:window.accesstoken,
	    	status:companyStatus,
	    	filter:'{"startDate":"'+$("#startDate").val()+'","endDate":"'+$("#endDate").val()+'"}',
		    sortOrder: params.order,
		    parentCode:'',
		    like:'{"companyName":"'+searchBox.userName+'"}',
	    };
	},
	//账号列的格式化
	accountFormatter:function (value,row,index){
		  return "<span data-toggle='tooltip' data-placement='top' title='进入账号页面'  style='cursor: pointer;' class='fa fa-wrench' onclick=showAccount('"+value+"')></span>&nbsp;&nbsp;"+row.ownUserCount

	},
	//操作列的格式化
	editFormatter:function (value,row,index){
		    return "<span data-toggle='tooltip' data-placement='top' title='客户编辑' style='color:#5A9F90;height:33px;line-height:33px;cursor: pointer;' class='fa fa-pencil-square-o' onclick=edit('"+value+"')></span><span  data-toggle='tooltip' data-placement='top' title='删除客户' style='color:#D9B793;margin-left:15px;cursor: pointer;' class='glyphicon glyphicon-trash' onclick=deleteCompany('"+value+"')></span>"
	},
	//状态列的格式化
  statusFormatter:function(value,row,index){
      if(value==1){
        return "<font style='color:#5A9F90;'>有效</font>"
      }else{
        return "<font style='color:#D9B793;'>无效</font>"
      }
	},
	//下级公司列的格式化
	infoFormatter:function(value, row, index){
		  return "<span data-toggle='tooltip' data-placement='top' title='进入下级公司页面' style='cursor: pointer;' class='fa fa-wrench' onclick=turnpage('"+value+"')></span>&nbsp;&nbsp;"+row.childrenCompnayCount
	},
	//点击下级公司进行页面的跳转
	window.turnpage:function(companyCode){
		  self.location="company/rinkcompany/"+companyCode;
	},
	//点击账号按钮跳转页面
	window.showAccount:function(companyId){
		  self.location="company/account/"+companyId;
	}
	//点击删除按钮事件
	window.deleteCompany:function(companyId){
      layer.confirm('是否要删除此客户？', {
          btn: ['确定','取消'] //按钮
        },function(){
          datanum="{'companyId':"+companyId+"}";
          $.ajax({
            url:globalNumber.globalurl+'/v1/companys/'+companyId+'?access_token='+window.accesstoken,
            dataType: 'JSON',
            type:'delete',
            success: function(data) {
              if(data.code==200){
                layer.msg(data.success,{icon:1});
                $('#userTable').bootstrapTable("refresh",queryParams)
              }else if(data.code==400005){
                window.getNewToken();
                window.getToken();
                }else{
                  layer.msg(data.error,{icon:2})
                }
              }
            });	
        });
	},
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
};
gobalFunction.init();

//搜索功能的实现
var searchBox=new Vue({
	el:'#searchBox',
	data:{
		userName:''
	} 
})

$("#searchBtn").click(function(){
	$('#userTable').bootstrapTable("refresh",queryParams);
})

//点击新增按钮触发弹窗
$('#addUserInfo').click(function(){
		 adduserinfo = layer.open({
			type:2,
			title:"新增用户信息",
			shadeClose:true,
			skin:'title-class',
			shade: [0.7, '#fff'],
			area:['80%','95%'],
			content:"/lanyue-manage/company/addUser/"
		})
});

//点击编辑按钮事件
window.edit = function(companyId){
		    editCompany = layer.open({
				type:2,
				title:"编辑客户资料",
				shadeClose:true,
				skin:'title-class',
				shade: [0.7, '#fff'],
				area:['80%','95%'],
				content:"/lanyue-manage/company/editCompany/"+companyId
			})
		   
}
layer.full(adduserinfo,editCompany); 


