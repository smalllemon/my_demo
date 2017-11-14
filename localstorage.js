/*


它是h5的新特性，主要是用来本地存储。

(1)、存：
if(window.localstorage){
	var localstorage = window.localstroge;
    
    localstorage['a'] =1; //方法1

    localstorage.b =1; //方法2

    localstorage.setItem("c",3) //方法3
  
    console.info(typeof  storage["c"]); //string  localstroage只能保存string类型的存储

}


(2)、取

if(windows.localStorage){
	var storage = window.localStorage;
	var a=storage.a;
	var b=storage["b"];
	var c= storage.getItem("c");
}

(3)、删

localStorage.clear();

localStorage.removeItem("a");


(4)、key方法

for(var i= 0 ;i<storage.length;i++){
	 var key = storage.key(i);
	 console.log(key);
}

(5)、存入为json格式形式

     function setStorage(){
	    var str_username = $("#loginname").val();
	    var str_password = $("#password").val();
	    var data = {
	       username :username ,
	       password:password ,
	    }
	    var d = JSON.stringify(data)
	    storage.setItem("data",d)
     }


  (6)、取json格式的数据

     var json = storage.getItem("data");
     var jsonObj = JSON.parse(json);
     console.info(jsonObj);
 */
