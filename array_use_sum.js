/*数组操作方法集合


//1、查找给定元素在数组中的下标或者位置
function indexOf(arr,item){
	for(var i=0;i<arr.length;++i){
	     if(item === arr[i]){
	         return i;
	         //i是数组元素的下标
	     }
	}
	return -1;
}

function getItemIndex(arr,item){
	return arr.indexOf(item);
}




//2、求数组的和

function getSum(arr){
	var sum = 0;
	for(var i=0;i<arr.length ; i++){
	      sum+=arr[i];
	}
	return  sum;
}


function sum(arr){
	return  arr.reduce(function(sum,e){
	    return sum+e;
	},0)
}


//3、移除数组中arr与item相等的元素,不要直接修改数组 arr，结果返回新
function remove(arr,item){
	var tempArr = [];
	for(var x= 0; x < arr.length ;x++){
	   tempArr.push(arr[x]);
    }
  
    var index = temArr.indexOf(item);
    while(index !=-1){
	    tempArr.splice(index, 1);
	    index =  tempArr.indexOf(item);
    }

    return tempArr;
}

function remove(arr,item){
	return arr.filter(function(e)){
	   return e!== item;
	});
};


//4、移除数组 arr 中的所有值与 item 相等的元素，直接在给定的 arr 数组上进行操作
function removeWithoutCopy(arr,item){
	for(var i=0; i< arr.length ; i++){
	       if(arr[i] === item){
	           arr.splice(i,1);
	           i--;
	       };
	};

	return arr;
}

//5、删除数组 arr 最后一个元素
  arr.pop();

//6、在数组 arr 开头添加元素 item
  arr.unshift(item);

//7、使用shift删除首元素方法
  arr.shift(item);

//8、合并数组 arr1 和数组 arr2

  arr1.concat(arr2);

//9、统计数组 arr 中值等于 item 的元素出现的次数 

function count(arr, item) {
    var count = 0;
    arr.forEach(function(e) {
        e === item ? count++ : 0;
    });

    return count;
}



function count(arr, item) {
    let cnt = 0;
    for (let e of arr) {
        e === item ? cnt++ : 0;
    }
    return cnt;
}

//10、找出数组 arr 中重复出现过的元素
function duplicates(arr) {
    var sortedArr = arr.sort();
    var tempArr = [];
    for (var i = 0; i < sortedArr.length; ++i) {
        if (sortedArr[i] === sortedArr[i + 1] &&
             tempArr.indexOf(sortedArr[i]) === -1) {
            tempArr.push(sortedArr[i]);
        }
    }

    return tempArr;
}


//11、数组 arr 中的每个元素求二次方
	function square(arr) {
	    var tempArr = [];
	    arr.forEach(function(e) {
	        tempArr.push(e * e);
	    });

	    return tempArr;
	}

//12、数组 arr 中，查找值与 item 相等的元素出现的所有位置 
function findAllOccurrences(arr, item) {
    var tempArr = [];
    for (var i = 0; i < arr.length; i++){
        if (arr[i] === item) {
            tempArr.push(i);
        }
    }

    return tempArr;
}



function findAllOccurrences(arr, item) {
    return arr.map(function(ele, index) {
        return ele === item ? index : -1;
    }).filter(function(e) {
        return e !== -1;
    })
}

//13、实现一个打点计时器
    function consoleLOg(){
	
        console.info(start++); 

		var time  =  setIntval(function(start,end){
			if(start<end){
			    console.log(start++);
			}else{
			  cancelIntetval(time);
			}
		},100);

	    return {
		  cancel:function(){
		      clearInterval(time);
		  }
	}

  
*/
