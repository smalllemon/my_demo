/*
1、DOM：文本对象模型

	节点的分类：文本节点：元素节点的子节点，其内容是文本
            元素节点 
            属性节点：元素节点的属性，

	js代码书写的位置：

	    1、head行里书写
	    2、标签元素行里进行书写（代码耦合太严重）
	    3、外部引入（放置在body后面）||直接书写代码即可
	        （当DOM树绘制成功之后操作某些元素）

	*/


	//(1)、当整个HTML文档加载完成之后触发该事件       
	window.onload = function(){
	//(2)、获取所有的button节点，并为第一个元素绑定事件
	  	var btn = document.getElementsByTagName("button")[0];
	   	btn.onclick = function(){
	     	alert("hello world!");
	    }
	}

// 2、获取文本节点属性并设置属性值
	var nameNode =  document.getElementById("name");
	var nodeValue = nameNode.value;
	nameNode.value = "这是我新设置的属性值";

// 3、获取元素的子节点

	var city = document.getElementById("city");
	//获取上述元素下的所有子节点（空格也被获取到），不推荐使用
	alert(city.childNodes.length);

// 4、获取元素的子节点

	var citynodes = document.getElementsByTagName("li");
	var first = city.firstChild; //元素节点
	var last = city.lastChild; //空白节点，当作文本节点


// 5、获取文本节点（文本节点是元素节点的子节点；）
  （1）、定位到元素节点；

  （2）、定位到该文本节点（firstChild）

  （3）、获取文本节点的nodeValue; //innerHTML

	var bjNode =  document.getElementById("bj");

	var bjTextNode = bjNode.firstChild;

	bjTextNode.nodeValue; //获取到文本节点的内容


// 6、练习1

	var  parent = document.getElementById("city");

	var  child = parent.getElementsByTagName("li");

	for(var i = 0 ; i < child.length ; i++){
		
	   	child [i] .onclick = function(){
	       //this:正在响应事件的那个节点
	      console.log(this.firstChild.nodeValue);     
	    }
	}


// 7、练习2(正则表达式)

	var  reg = /^\^{2}/g;

	var  parent = document.getElementById("city");

	var  child = parent.getElementsByTagName("li");

	for(var i = 0 ; i < child.length ; i++){
	   	child [i] .onclick = function(){
	       //this:正在响应事件的那个节点
	        if(reg.test(this.firstChild.nodeValue)){
				this.firstChild.nodeValue = this.firstChild.nodeValue.replace(reg,"");
	        }else{
	        	this.firstChild.nodeValue = "^^"+this.firstChild.nodeValue;
	        }
	         
	    }
	}


// 8、总结上述知识点

	(1)操作DOM元素的相关js在页面中应该放置的位置？
	 

	(2)如何定位或者获取到具体的DOM元素？(伪数组){
	  document.getElementById();
	  document.getElementsByTagName();
	  document.getElementsByClassName();
	  document.getElementsByName();
	}


	(3)元素节点包含的内容及操作属性{

	  1、所有的子节点：childNodes(包含一切的空白节点，不常用)

	  2、firstChild

	  3、lastChild

	  4、nodeValue
	}

//9、 创建并加入节点
	createElement
	createTextNode
	appendChild
	replaceChild


// 9.1 新增节点：
	//并把该节点插入到元素中
	window.onload = function (){

		//1、创建元素节点
	    var  lis = document.createElement("li");

	    //2、创建文本节点
	    var  xmText = ent.createTextNode("厦门");
	    lis.appendChild(xmText);

	    //3、追加到父元素中
	    var  container = document.getElementById("city");    
	    container.appendChild(lis);
	   
	}

//9.2练习新增节点

	//考虑不到的内容有：正则匹配和类型判断
	document.getElementById("sumbit").onclick = function(){
		var checkValue =  document.getElementsByName("type");
		var typeValue = null ;
		for(var i = 0 ; i< checkValue.length ; i++){
			if(checkValue[i].checked){
	           typeValue = checkValue[i].value;
	           console.log(typeValue);
	           break;  
			}
		}
		if(typeValue == null ){
			alert("请选择一种类型！");
			return false;
		}
	    var inputValue =  document.getElementsByName("submit")[0].value;
		var reg = /^\s*|\s*$/g;
		inputValue = inputValue.replace(reg,"");
	    if(inputValue == ""){
	 		alert("请输入添加的内容！");
	 		return false;
	    }else{
	    	create(inputValue,typeValue);
	    }
		return false;//取消默认行为
	}

	function create(inputValue,typeValue){

		var newliNode = document.createElement("li");
	    
	    var newliValue = document.createTextNode(inputValue);

	    newliNode.appendChild(newliValue);
	   
	    var container = document.getElementById(typeValue);

	    container.appendChild(newliNode);
	}

//10、总结上述知识点
		 createElement()   //新增一个元素
		 createTextNode() //新增一个文本节点
		 appendChild();   //向容器里插入节点
		 reg             //正则表达式


//11、替换某些节点
replaceChild(newNode,oldNode):替换某些节点

	//练习1：某个容器里节点的互换 

	    function replaceEach(aNode,bNode){
	    	var aParent = aNode.parentNode;

	    	var bParent = bNode.parentNode;

	    	if(aParent && bParent){
	           
	            var aNode2 = aNode.cloneNode(true);
	    	    
	    	    bParent.replaceChild(aNode2,bNode);

	            aParent.replaceChild(bNode,aNode)

	    	}
	    }

	    /*replaceChild这个方法的调用者是该节点的父节点，

	      使用该节点的关键是通过设置一个中间变量保存要替换节点的新节点值。

	    */

	//练习2 ：两个容器里对应位置的节点进行互换

      //1、明确这个节点里面有多少个节点;
           
      //2、for为每一个节点绑定相应的替换事件;

      //3、替换事件的写法;
     
      var firstparentNode = document.getElementById("firstparentName");

      var nodeNumber = firstparentNode.getElementsByTagName("element");

      for(var i = 0 ; i < nodeNumber.length ; i++){
         nodeNumber[i].index = i;
         nodeNumber[i] .onclick = function (){

            //获取对应位置上的节点的父节点
         	var secondparentNode = document.getElementById("secondparentName")
         
            var  newNode  = secondparentNode.getElementsByTagName("elements");

            replaceEach(this,newNode[this.index])

            //用新节点去替换旧节点
         }
      }

//12、删除节点
removeChild()

    //练习1：简单用例
    	var childNode= document.getElementById("childName");
    	childNode.parentNode.removeChild(childNode); 

    //练习2：删除对应的节点信息
   
        var  lis = document.getElementsByTagName("li");

        for(var  i = 0 ;i < lis.length ; i++){
           
            lis[i].onclick = function(){
           	    var flag = confirm("确定删除该标签"+this.firstChild.nodeValue+"吗？");
           	    if ( flag === true){
                  this.parentNode.removeChild(this);
           	    }else{
           	    	return;
           	    }
            }
        }

    //练习3：新增节点及删除选中的节点

 
      

       //(1)、点击新增按钮将值插入表格

      
        document.getElementById("button").onclick = function (){

        	var nameValue  = document.getElementById("username").value;

      		var emailValue = document.getElementById("emailValue").value;

      		var moneyValue = document.getElementById("moneyValue").value;
        	
        	if(nameValue && emailValue && moneyValue){

        	 	document.getElementsByTagName("tbody").appendChild(
												                    " <tr>"+
												                    	 "<td>"+nameValue+"</td>"+
												                    	 "<td>"+emailValue+"</td>"+
												                    	 "<td>"+moneyValue+"</td>"+
												                         "<td><a href="">删除||delete</a></td>"
												                    "</tr>"
												        		);
        	}else{
              
                alert("请完善页面中的信息输入！");
        	   	
        	}
        }

        
       

       //(2)、对新增数据后的表格进行删除操作

        window.onload = function(){


            //获取页面中所有的a标签
         	var aNodes = document.getElementById("tablename").getElementsByTagName("a");
         
            //为每一个A标签绑定一个点击事件
         	for(var  i = 0 ; i <aNodes.length; i++ ){

                  	aNodes[i] .onclick = function(){
                  		removeNode(this);
                  		return false;
                    }
                        
	        }
            document.getElementById("button").onclick = function (){

	        	var nameValue  = document.getElementById("username").value;

	      		var emailValue = document.getElementById("emailValue").value;

	      		var moneyValue = document.getElementById("moneyValue").value;
	        	
	        	var nameTd = document.createElement("td");
	        	nameTd.appendChild(document.createTextNode(nameValue));

				var emailTd = document.createElement("td");
	        	emailTd.appendChild(document.createTextNode(emailValue));

	        	var moneyTd = document.createElement("td");
	        	moneyTd.appendChild(document.createTextNode(moneyValue));
	              
	            var tr = document.createElement("tr");
	            tr.appendChild(nameTd );
	            tr.appendChild(emailTd );
	            tr.appendChild(moneyTd );

	            var aNode = document.createElement("a");
	            aNode.href="www.baidu.com";
	            aNode.appendChild(document.createTextNode("delete"));
				
				aNode.onclick = function(){
					removeNode(this);
					return false;
				}

	            var aTd = document.createElement("td");
	            aTd.appendChild(aNode);
	            

	            tr.appendChild(aTd);
	            

	            var tbody = document.getElementsByTagName("tbody")[0];
				tbody.appendChild(tr);


         	function trim(str){

         	 	var reg = /^\s*|\s*$/g;

         	 	return str.replace(reg,"")
         	}

         	function removeNode(aNode){

	          		var trNode  = aNode.parentNode.parentNode;
	          			/*  
	          			   parentNode_first:td
	          			   parentNode_second:tr

	          			*/

	                //获取页面tr中第一个td的值
	            	var textContent = trNode.getElementsByTagName("td")[0].firstChild.nodeValue;
	                
	                //存在获取到的内容存在空格字符
	           		textContent = trim;
	              
	                //匹配完空格后进行弹窗的确认？
	           		var flag = confirm("确定要删除"+textContent+"吗？");
	             
	               		if(flag){
	                
	                    	trNode.parentNode.removeChild(trNode);
	                	}

	               		 return false;

	        }

        }
 

    /*上述中的操作如果让我实现，

      	//1、获取td里面的内容

      	//2、然后再进行事件的处理

      	//3、进行节点的删除

    	这样的逻辑存在问题，

    	所有事件的起始点是点击事件！！！通过点击a标签，获取到它所在的tr节点，

    							    通过tr节点获取到第一个td节点以及节点的值(firstChild.nodeValue)
                                     
                                    拿到其值——>匹配空白字符——>触发弹窗

                                    弹窗触发后——>进行节点的移除 

        上述的逻辑才是正确的一个流程，比较顺！


    */


//13、在目标节点之前插入节点和移动节点
	insertBefore();

    //(1)、简单测试

    var  parentNode = document.getElementById("city");
    var  bjNode = document.getElementById("beijing");
    var newNode = document.getElementById("newNode");
    parentNode.insertBefore(newNode,bjNode);
    

    //2、练习1 (insertAfter)
      	function insertAfter(newNode,refNode){
        /*所有的删除、新增、替换都必须由其父节点完成

           1、判断当前的节点是否是最后一个字节点
          
           2、是：插入到最后一个

           3、否：获取当前节点的下一个节点，将新节点插入到目标节点的兄弟节点之前就可以
        */
            var parentNode = refNode.parentNode;

            if(parentNode){

          	    var lastChild =  parentNode.lastChild;

          	    if( lastChild  == refNode){

					parentNode.appendChild(newNode);

		        }else{
		               
		            var targetNode =  refNode.nextSibling;

		            parentNode.insertBefore(newNode,targetNode);
		        }

           }

      }



//14、innerHTML


//15、select

document.getElementById("select").onclick = function(){

    var flag = this.checked ;
    var items = document.getElementsByTagName('li');
    for(var  i = 0 ; i < items.length ; i++){
       items[i].checked = flag;
    }
}

var items = document.getElementsByTagName('li');
for(var i = 0 ;i <items.length ; i++){

    items[i].onclick = function(){

	    for(var i = 0 ;i <items.length ; i++ ){
	       
	        if(items.checked){
	            
	            number ++;
	        }
	    } 

	    document.getElementById("checked").checked = (items.length == number)

   } 	
}
