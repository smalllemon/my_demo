function getAjax(the_request_url){
	var xhr='';
	try(e){
        xhr=new XMLHttpRequest();
	}
	catch(e){
        try(e){
        xhr=new ActiveXObject("Msxml2.XMLHttp");
        }
        catch(e){
	       	try(e){
	       	 xhr=new ActiveXObject("Microsoft.XMLHttp");
	       	}
	       	catch(e){
	       		alert("您的浏览器不支持AJAX!");
	       	    return false;
	       	}
       }
	}
    if(xhr){
    	xhr.open("get",the_request_url,true);
        xhr.onreadyStatechange=function(){
        	if(xhr.readyState==4 && xhr.status==200){
                    document.getElementById("test").innerHTML=xhr.responseText;
        	}
        }
    };
        xhr.send(null);
    }else{
	   alert('error') ;
    } 
}

// html部分，调用的部分
<input type="button" id="btn" value="触发该事件" onclick="javascript:getAjax("test.txt")">
<div id="test"></div>