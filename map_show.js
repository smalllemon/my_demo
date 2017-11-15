 //这部分代码主要应用于对百度地图的开发，涉及的操作有地图自定义图层、自定义MARKER、 根据地理坐标进行边界的绘制。
   
   
   $(document).ready(function(){
    	var authorityManage = top.getUser().company_code.length;
        if(authorityManage < 11){
			$(".changeIndex").empty();
			createElement(0,true);
        	getcompanyMessage(2,0);	
        }else{
			$(".changeIndex").empty();
			createElement(0,true);
        	getcompanyMessage(2,1);
        }	
    });	  
	     
		//用来保存地址、令牌、表示权限的字段
         		setlevel = 0,
         	    saveCompanyId = [],
         	    latCoord,
         	    res = [],
         	    branchres = [],
         	    stationres = [],
         		strokeColor = ["#00bcd4","#0f6e40","#1e88e5"];
	         	
	    //初始化地图   
			var map = new BMap.Map("map", {enableMapClick:false}); 
		    map.disableDoubleClickZoom(true);
		    map.enableScrollWheelZoom();
		    map.enableAutoResize(); 
			var styleJson = [
					{
					   "featureType": "building",
					   "elementType": "alls",
					   "stylers": {
								 "hue": "#f3f3f3",
								 "visibility":"on",
					   }
					},
					{
					   "featureType": "poi",
                    	"elementType": "labels",
					    "stylers": {
								 "visibility":"off",
					   }
					},
					{
					   "featureType": "road",
					   "elementType": "all",
					   "stylers": {
								  "visibility":"on",
					   }
					},
					{
					   "featureType": "highway",
					   "elementType": "all",
					   "stylers": {
								"visibility":"off",
					   }
					},
                   
				 ]
		    map.setMapStyle({styleJson:styleJson});
		   //鼠标滚轮进入不同级别
	 		map.addEventListener("zoomend", function(){ 
				var mapLevel = map.getZoom();
				if(mapLevel > 5 &&  mapLevel < 12 ){
					//1、先清除地图上的覆盖物
				    map.clearOverlays();
				    //2.加载标签列表
				    $(".changeIndex").empty();
					createElement(0,true);
					//3.加载数据
				    getcompanyMessage(2,0);
				}else if( mapLevel > 12 && mapLevel < 14){
					//1、先清除地图
					clearMapthing();
					setlevel = 1;
				    //2.加载标签列表
				    $(".changeIndex").empty();
					createElement(0,true);
					//3.加载数据
					getcompanyMessage(2,1);
				}else if( mapLevel > 14 && mapLevel < 16){
					//1、先清除地图
					clearMapthing();
					setlevel = 2;
				    //2.加载标签列表
				    $(".changeIndex").empty();
					createElement(1,true);
					//3.加载数据
	   				getcompanyMessage(2,2);
	   				//4.绘制边界
	   			    addLine();
				}else if( mapLevel > 18 &&  mapLevel < 21){
					//1、先清除地图
					clearMapthing();
					setlevel = 3;
				    //2.加载标签列表
				     $(".changeIndex").empty();
					createElement(2,true);
					//3.加载数据
	   				getcompanyMessage(2,3);
	   				//4.绘制边界
	   			    addLine();
	   			}
	   				
			}); 

          
		//set marker type 初始化marker类型
        function addMarker(state,point,index,text){ 
        	    var markerName = "";
        	    var fontColor = "";
        	    switch(state){
	    	    	case 0:{
	    	    	  	markerName = "../img/mark_red.png";
	    	    	  	fontColor = "#473f3c";
	    	    	  	break;
	    	    	}
	    	    	case 1:{
                        markerName = "../img/mark_green.png";
	    	    	  	fontColor = "#473f3c";
	    	    	  	break; 
	    	    	}
	    	    	case 2:{
	    	    		markerName = "../img/mark_outline.png";
	    	    	  	fontColor = "#473f3c";
	    	    	  	break; 
	    	    	}  
        	    }
        	    var myIcon = new BMap.Icon(markerName, new BMap.Size(350,71));    	
		    	var marker = new BMap.Marker(point, {icon: myIcon}); 
		    	//数据图标的入口(点击地图上的marker显示相应的数据图表)
				    	if(marker.addEventListener){				   
							marker.addEventListener("click",showcompanyCharts);
							marker.addEventListener("mouseover",showcompanyInfo);
						}else if(marker.attachEvent){
						    marker.attachEvent("onclick",showcompanyCharts);
						    marker.addEventListener("onmouseover",showcompanyInfo);
					    }
		    	var label = new BMap.Label(text,{offset:new BMap.Size(200,14)});
			    	label.setStyle({
			    	 	color           :  fontColor,
			    	 	border          :  "none",
			    	 	backgroundColor :  "none",
			    	 	lineHeight      :  "5px",
						textAlign       :  "center",
						height          :  "20px",
						textIndent      :  "1px" ,
			    	})
		        marker.setLabel(label);
				map.addOverlay(marker); 
				marker.enableMassClear();
				label.enableMassClear();
	    } 
	     
		//动态加载指标列表
		function createElement(mapLevel,flag){
         		$.ajax({
         			url:globalurl+"/v1_0_0/tags",
         			type:"get",
         			dataType:"JSON",
         			crossDomain: true == !(document.all),
         			async: false,
         			data:{
         			   access_token:accesstoken,
         			   level:mapLevel,
         			},
         			success:function(data){
         			    for( var x  = 0; x <data.station_tag.length; x++){
         			    	if(flag == true){
         			    		if(data.station_tag[x].tag_name == "实际能耗"){
         			    			$(".changeIndex").append("<div class='indexShow' style='float:left;'>"+
									                                "<label class='text'>"+
									                                  "<input type='radio'  name='change' onclick=getMessage("+data.station_tag[x]._id+") checked>"+data.station_tag[x].tag_name+""+
									                                "</label>"+
								                                  "</div>"
								                       		);
	         			    	}else{
	         			    		$(".changeIndex").append("<div class='indexShow' style='float:left;'>"+
										                                "<label class='text'>"+
										                                  "<input type='radio'  name='change' onclick=getMessage("+data.station_tag[x]._id+")>"+data.station_tag[x].tag_name+""+
										                                "</label>"+
									                                  "</div>"
									                        );
	         			    	}
         			    	}else if(flag == false){
         			    		if(data.station_tag[x].tag_name == "实际能耗"){
         			    			$(".changeIndex").append("<div class='indexShow' style='float:left;'>"+
									                                "<label class='text'>"+
									                                  "<input type='radio'  name='change' onclick=changeIndex("+data.station_tag[x]._id+") checked>"+data.station_tag[x].tag_name+""+
									                                "</label>"+
								                                  "</div>"
								                      		);
	         			    	}else{
	         			    		$(".changeIndex").append("<div class='indexShow' style='float:left;'>"+
										                                "<label class='text'>"+
										                                  "<input type='radio'  name='change' onclick=changeIndex("+data.station_tag[x]._id+")>"+data.station_tag[x].tag_name+""+
										                                "</label>"+
									                                  "</div>"
									                        );
	         			    	}
         			    	}
         			    	
								
						}   
         			}
	        	
         		});     	
        }
		
		
        
        //2、存储指标的容器 (避免标签累加)
	    function  getcompanyMessage(tagValue){
	    	//1、先清除地图上的覆盖物
				map.clearOverlays(); 
		    //2.请求数据
		    	$.ajax({
                    url:globalurl+'/v1_0_0/mapShow',
                    dataType:"JSON",
                    type:"get",
                    crossDomain: true == !(document.all),
                    async:false,
                    data:{
                    	access_token:accesstoken,
                    	tag:tagValue,
                    	level:setlevel,
                    	name:
                    },
                    success:function(data){
                   	   		// 设置全局变量的值
                   	   		switchKey = false ;
                   	   		var dataName = "";
                   	   		var valueShow ;
                   	   		var status = 1;
                   	   		for(var x = 0 ;x < data.length ;x++ ){
                   	   			//1.进入地图需要设置地图中心
                                if( data.length == 1){
									map.centerAndZoom(new BMap.Point(parseFloat(data.data[0].location.split(",")[0]),parseFloat(data.data[0].location.split(",")[1])),12);  
                                }else{
                                	for(var i = 0 ;i < data.length ;i++  ){
                                    // 画出总公司边界
                                	saveCompanyId.push(data.data[i].company_id);
                                	createLine(data.data[i].company_id,strokeColor[i]);
                                }
                                //2.格式化数据
                   	   			dataName = data.data[x].company_name ? data.data[x].company_name:name;
      							dataName = data.data[x].branch_name ? data.data[x].branch_name:name;
      							dataName = data.data[x].heating_station_name ? data.data[x].heating_station_name:name;
								var Point = new BMap.Point( data.data[i].location.split(",")[0],data.data[i].location.split(",")[1]);
                                valueShow = data.data[i].data_value ? data.data[i].data_value + (data.data[i].data_unit? data.data[i].data_unit:"暂无数据") :"暂无数据" +"    "+dataName ;
                                //根据后台返回字段初始化marker数据
                                if(data.data[i].status == 0 ){
									status = 0 ;
                                }
                                if(setlevel == 3 && data.data[i].is_onLine == 0){
  									addMarker(status,point,x,valueShow);
                                }
								//4.保存悬浮的内容
								switch(setlevel){
                                    case 0:{
                                     	savekindName = ["图表"] ;
									    imgName = ["../img/data1.png"];
									    offsetTop = 50;
									    offsetLeft = 170;
									    break ;
                                    }
                                    case 1 :{
                                    	savekindName = ["能耗","图表"] ;
									    imgName = ["../img/data0.png","../img/data1.png"];
									    offsetTop = 50;
									    offsetLeft = 170;
									    break ;
                                    }
                                    case 2:{
                                    	savekindName = ["能耗","图表","水压图"] ;
									    imgName = ["../img/data0.png","../img/data1.png","../img/data2.png"];
									    offsetTop = 50;
									    offsetLeft = 170;
									    break ;
                                    }
                                    case 3:{
                                    	savekindName = ["图表","档案"] ;
									    imgName = ["../img/data1.png","../img/data3.png"];
									    offsetTop = 50;
									    offsetLeft = 170;
									    break ;
                                    }

								}
                   	   		}
                   	}
                })
			}
   
		
		
		// 切换指标时执行的函数
		function  getMessage(value){
			if(switchKey == true){
			}else if(switchKey == false){
				if(value){
					getcompanyMessage(value,setlevel);
				}
			}
		}
		

		//文本框获得或失去焦点事件
		changeInput();
		function changeInput(){
			$("#searchFunction").on({
				"focus":function(){
					if($(this).val("")=="请搜索"){
						$(this).val("");
			 		}
				},
				"blur":function (){
					$(this).val("请搜索");
				}
			});
			
		}
		
	  
       
        /*获取点击marker绑定的值
          地图上显示的覆盖物是通过坐标去绘制，将坐标与后台返回的部分数据进行绑定
          为了之后鼠标经过覆盖物时获取它的值，打开相应的图表
        */ 
        function  findRes(ev,showRes){
        	var ev = ev || window.event;
			var p = ev.target || ev.srcElement;
			var markerPositionlat = p.getPosition().lat;
			if( markerPositionlat){
                for(var x = 0 ; x < showRes.length ; x++){
                    if( showRes[x].value == markerPositionlat){
                        showId = showRes[x].name;
                        showName = showRes[x].keyValue;
                        showTag  = showRes[x].TagValue;
                        showLevel  = showRes[x].MapLevel;
                    }
                }
            	return {showId:showId, showName: showName, showTag:showTag,showLevel:showLevel};
            }
	    }


        //自定义覆盖物对象，调用地图的自定义覆盖物API
        var myCompOverlay;
        //鼠标经过显示悬浮物体
        function showmyCompOverlay(ev){
        	var ev = ev || window.event;
			var p = ev.target || ev.srcElement;
			var Positionlat = p.getPosition().lat;
			var Positionlng = p.getPosition().lng;
			if(myCompOverlay){
				map.removeOverlay(myCompOverlay); 
			}
			myCompOverlay = new ComplexCustomOverlay(new BMap.Point(Positionlng,Positionlat));
			map.addOverlay(myCompOverlay); 
        }

	    //鼠标悬浮自定义覆盖物
		function ComplexCustomOverlay(point){
			    this._point = point;
		}
		
	    ComplexCustomOverlay.prototype = new BMap.Overlay();
	    ComplexCustomOverlay.prototype.initialize = function(map){
		      	this._map = map;
		      	var div = this._div = document.createElement("div");
		      	div.style.position = "absolute";
		      	div.style.color = "white";
		      	div.style.height = "auto";
		      	div.style.padding = "2px";
		      	div.style.lineHeight = "18px";
		      	div.style.whiteSpace = "nowrap";
		     	div.style.MozUserSelect = "none";
		    	div.style.fontSize = "12px"
			    for(var i = 0; i <  savekindName.length ; i++){
			      	 var divs = this._span = document.createElement("div");
			      	 divs.style.width="100px";
			      	 divs.style.height="40px";
			      	 divs.style.overflow="hidden";
		             divs.innerHTML='<span class="showDetails" onclick="openlayers('+i+','+mapzoom+')">'+savekindName[i]+'</span><img src='+imgName[i]+' style="float:right;"  >';
		             div.appendChild(divs);
			    }  
		     	var that = this;
		      	map.getPanes().labelPane.appendChild(div);
		      	return div;
	    }

		//获取该覆盖物的位置
	    ComplexCustomOverlay.prototype.getPosition = function () {       
	        return this._point;
	    };
	    // 自定义覆盖物添加事件方法
	    ComplexCustomOverlay.prototype.addEventListener = function (event, fun) {
	        this._div['on' + event] = fun;
	    }
	    
		//在地图上绘制自定义覆盖物
	    ComplexCustomOverlay.prototype.draw = function(){
	      var map = this._map;
	      var pixel = map.pointToOverlayPixel(this._point);
	      this._div.style.left = pixel.x - offsetLeft+ "px";
	      this._div.style.top  = pixel.y - offsetTop + "px";
	    }
	   
        //添加分公司边界
        function createLine(companyid,strokeColor){
	     	$.ajax({
		        url:globalurl+"/v1_0_0/child_company_boundary",
		        dataType:"JSON",
		        type:"get",
		        crossDomain: true == !(document.all),
		        async:false,
		        data:{
		        	access_token:accesstoken,
		        	company_id:saveCompanyId ,
		        },
		        success:function(data){
		        	for(var x = 0 ; x < data.data_boundray.length; x++){
		                if(companyid == data.data_boundray[x].child_company_loc_id ){
		                	var mapPoint=[];
							for(var i =0 ; i< data.data_boundray[x].child_company_loc.length; i++){
								if(data.data_boundray[x].child_company_loc[i]){
									var locationLat = data.data_boundray[x].child_company_loc[i].split(",")[0];
									var locationLng = data.data_boundray[x].child_company_loc[i].split(",")[1];
									mapPoint.push( new BMap.Point(locationLat,locationLng));
								}
							}
							var polygon = new BMap.Polygon(mapPoint, {strokeColor:strokeColor, strokeWeight:2, strokeOpacity:0.5});  //创建多边形
							map.addOverlay(polygon);  		           
		        		}
		            }
		        }
		        
       		});
       	}
        
       
   
