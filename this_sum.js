/*this的用法总结

主要从两个方面进行：常用的场景和常见的误区

1、场景介绍

   全局环境  函数调用   作为对象的方法调用     作为构造函数调用   apply和call

    (1)、全局环境

        this  ===  window
    
    (2)、函数调用

        var name = "window" ;

        function sayName(){
	    	var name = "fun" ;
	     	alert(this.name);
        }

        sayName();  //"window"

    (3)、作为对象的方法调用

        var name = "window";

        var obj = {
	      name :"obj",
	      sayName ：function (){
	        alert(this.name);
	      }
        };

        obj.sayName(); //"obj"

    (4)、作为构造函数被调用

        function Person(name){
	        this.name = name ;
	        this.sayName = function(){
	            alert(this.name);
	        }
        }

        var person1 = new Person("daoko");
        person1.sayName(); //daoko
 

    (5)、apply和call


2、常见的错误总结

  (1)、this究竟指向谁？

    var name = "window";

    var obj = function(){
	    name :"obj",
	    sayName :function(){
		    var test = function(){
		        alert(this.name);
		    }

	        test();
	    }
    }

    obj.sayName(); //this指向window

    //分析这个函数的执行过程：这个函数在执行时，里面嵌套的test函数并没有拥有OBJ这个对象。

    改进方式：

    var name  = "window" ;
 
    var obj = {
	 	name :"obj",
	  	sayName :function(){
	   		var that = this ;
	   		var test =function(){
	      		alert(that.name);
	   		}
	    	test();
	  	}
    }

    obj.sayName(); //obj

    //分析这个过程：在sayName函数中，声明了一个局部变将this对象的值进行保存，
      就相当是扩展了this对象的作用范围，所以接下来关于对象的调用时就会显示obj。

  (2)、方法的赋值表达式
  
   当把对象的方法赋值给一个变量时，它的THIS会发生什么样的变化？

    var name = "window" ;

    var obj = {
   	    name :"obj",
        sayName:function(){
	      alert(this.name);
      }
    }

    var test = obj.sayName;
    obj.sayName();  //obj
    test(); //window  
*/
