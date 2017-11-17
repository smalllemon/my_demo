//编辑页面数据初始化
var editfullname=new Vue({
	el:"#editfullname",
	data:{
		editfullname:'',
	}
})
 
 var  editpassword=new Vue({
	 el:"#editpassword",
	 data:{
		 editpassword:'',
	 }
 })

 var editusername=new Vue({
	 el:'#editusername',
	 data:{
		 editusername:'',
	 }
 })


//编辑页面数据渲染
  window.editAccount=function(userId){
    editfullname.editfullname="";
    editpassword.editpassword="";
    editusername.editusername="";
    accountcompanyId=userId;
		$.ajax({
        url:globalurl+'/v1/users/'+userId,
        type:'GET',
        dataType:'JSON',
        data:{
          access_token:window.accesstoken
        },
			 success:function(data){
          if(data.code==400005){
            window.getNewToken();
            getaccountInfo();
          }else if(data._id){
            accountInfo=data;
              editfullname.editfullname=data.fullname;
              editpassword.editpassword=data.password;
            editusername.editusername=data.username;
            editaccountstatus=data.status;
            if(data.status==0){
              $("#invalid").attr("class","btn btn-success");
              $("#valid").attr("class","btn btn-default");
            }else{
              $("#valid").attr("class","btn btn-success");
              $("#invalid").attr("class","btn btn-default");
            }
            layereditacc=layer.open({
              type:1,
              title:"编辑账户信息",
              skin:'title-class',
              shade: [0.7, '#fff'],
              area:'40%',
              scrollbar: false,
              content:$("#editaccount")
             });
            }else {
              layer.msg(data.error,{icon:2})
          }
			  }
		})			
}

//编辑页面状态切换
$("#value").click(function(){
	$(this).attr("class","btn btn-success");
	$("#invalue").attr("class","btn btn-default")
	editaccountstatus=1;
})

$("#invalue").click(function(){
	$(this).attr("class","btn btn-success");
	$("#value").attr("class","btn btn-default")
	editaccountstatus=0;
})


//保存账户的编辑信息
$("#AccountsaveInfo").click(function(){
	    window.getNewToken();
	    console.info(window.accesstoken);
		userInfo="{'fullname':'"+editfullname.editfullname+"','password':'"+editpassword.editpassword+"','username':'"+editusername.editusername+"','status':"+editaccountstatus+"}"
		$.ajax({
			url:globalurl+'/v1/users/'+accountcompanyId,
			dataType : 'JSON',
			type : 'PUT',
			data:{
				access_token:window.accesstoken,
				data:userInfo,
			},
			success:function(data) {
				if(data.code==400005){
					window.getNewToken();
					$("#AccountsaveInfo").click();
				}else if(data.code==200){
					layer.msg(data.success,{icon:1})
					layer.close(layereditacc);
					$('#userTable').bootstrapTable("refresh",queryParams);	
				}else{
					layer.msg(data.error,{icon:2})
				}
			}
		})
})
