//小知识点总结

1、跨域访问 

（1）、通过ajax访问

  getResource();
  function  getResource(){
     $.ajax({
        url:"指向其他域名的链接",
        dataType:'JSONP',
        type:"get",
        jsonp: "callback",
        jsonpCallback:"flightHandler",
        data:{
        },
        success: function(json){
            alert('success' + JSON.stringify(json));
        },
        error: function(){
            alert('fail');
        }
     });
  }
  
(2)、利用JS构造一个script标签，把JSON的url赋值给script的src属性，并把它插入到dom元素里，让浏览器获取其中的资源；

    var  script =  document.createElement("script");
    script.src="",
    script.type= "javascript/text";
    document.body.appendChild("script");
    
2、typeof会返回的数据值有?

  number  string  null  undefined  object  boolean  
  
3、json和string互相转化的方法

   json.stringify();
   json.parse();
   json.eval();
  
4、bom的内置对象有哪些？
  
   location navigator history
   
   window.location.href="";
   navigator.userAgent = "";
   history.go();
   
  

  
