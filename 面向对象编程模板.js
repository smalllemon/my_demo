//尝试用面向对象编程的思想来编写JS代码
$.allData={
   inputValue:"",
   chineseReg:"",
   startTime:"",
   endTime:"",
   
};

//插件拓展思想
$.fn.extend({
	Echart:function(){
		$.allData.heatEchart = echarts.init($(this)[0]);
		option = {

		}
	}
})

//调用方法
$.extend({
    init:function(){
       $.backStation();
       $.initDate();
       $.getalarmTable();
       $.queryParams();
       $. heatAjax();
       $.resultInfo();
       $.sureUserInfo();
    },
    backStation:function(){
    	$("#backStation").click(function(){
    		$(window.parent.document).find(".layui-layer").hide();

    	});
    },
    initDate:function(){
    	var data = new Date();
    	var year = data.getFullYear();
    	var month = data.getMonth()+1;
    	var date = data.getDate();
    	var hours = data.getHours();
    	var minutes=  data.getMinutes();
    	var second = data.getSeconds();
    	var flag = (hours >= 12 ? "PM" :"AM");
    	
    };
    dddZero:function(){
    	return second< 10? "0"+second:second;
    },
    getalarmTable :function(){

    },
    queryParams:function(){

    },
    //根据时间来发送请求
    heatAjax:function(){

    },
    //表格中的图标列
    resultInfo:function(){
    	$(".resultFa").on("click",function(){
    		$.alldata.resultID  = $("this").parent().parent().children().eq(0).find("span").attr("id");
	    		$.ajax({
		       	    type:"get",
		       	    url:""
		       	    datatype:"JSON" ,
		       	    crossDomain:true == !(document.all) ,
		       	    async:false,
		       	    data:{
		       	   	  access_token:getToken(),

		       	    }
	       	        success:function(data){
	            		 $.getResultData(data);
	       	        },
	       	        error:function(){

		       	    },
	       		});
    },
    getResultData:function(data){
    	var titleMsg  = "";
    	if(resultData.handle_result =="undefined" || resultData.handle_result =="null"){
    		titleMsg= "提交处理结果";
    		//让处理人员去处理相关结果
    	}else{
    		titleMsg= "查看处理结果";
    		//让登录者去查看结果，数据进行回显
    	}
    	resultBox = layer.open({
    		type:1,
    		title:titleMsg,
    		skin:"",
    		shadeClose:true,
    		shade:0.5,
    		area:['420px'],
    		content:$(".confirmInfo")
    	})
    },
    //点击处理按钮触发事件
    sureUserInfo:function(){
    	$("confirm").click(function(){
    		$.alldata.inputValue = $("confirmInfos").html();
            $.alldata.chineseReg = /^[\u4e00-\u9fa5_0_9]+$/;
            if($.alldata.chineseReg.test($.alldata.inputValue)){
            	$.ajax({

            	});
            }else{
            	layer.msg("请输入合法的字符！")
            }
    	})
    },
});

$.init();