angular.module('fpiwebapp.home.ctrl', [ 'LocalStorageModule'])
 
.controller('HomeController', function($scope, $location, $window, localStorageService, MenuServer) {
	// //init 地区
	// $scope.regions = ['滨江', '江干', '西湖'];
	// //从服务端获取地区数据
	// //
	// if ($scope.regions.length > 0) {
	// 	$scope.regionName = $scope.regions[0];
	// };
	$scope.regionName = localStorageService.get('currentRegion');
	

	//var mapData = ['蒸发量','降水量'];
	var labelTop = {
	    normal : {
	        label : {
	            show : false,
	            position : 'top',
	            textStyle: {
	                baseline : 'center'
	            }
	        },
	        labelLine : {
	            show : false
	        }
	    }
	};
	var labelBottom = {
	    normal : {
	        color: '#ccc',
	        label : {
	            show : true,
	            position : 'center',
	            formatter : function (a,b,c){return 100 - c + '%'},
	            textStyle: {
	                baseline : 'center'
	            }
	        },
	        labelLine : {
	            show : false
	        }
	    },
	    emphasis: {
	        color: 'rgba(0,0,0,0)'
	    }
	};
	var radius = [30, 20];
	require(
        [
            'echarts',
            'echarts/chart/bar',
            'echarts/chart/pie'
        ],
        function (ec) {
            //--- 折柱 ---
            var myChart = ec.init(document.getElementById('main'));
            myChart.setOption({
			    legend: {
			        x : 'center',
			        y : 'bottom',
			        itemGap: 30,
			        selectedMode: true,
			        textStyle: {color: 'auto', fontSize: '14px'},
			        data:[
			            '传输率','有效率','传输有效率'
			        ]
			    },
			    // title : {
			    //     text: 'The App World',
			    //     subtext: 'from global web index',
			    //     x: 'center'
			    // },
			    toolbox: {
			        show : false,
			        feature : {
			            dataView : {show: true, readOnly: false},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    series : [
			        {
			            type : 'pie',
			            center : ['20%', '40%'],
			            radius : radius,
			            data : [
			                {name:'other', value:46, itemStyle : labelBottom},
			                {name:'GoogleMaps', value:54,itemStyle : labelTop}
			            ]
			        },
			        {
			            type : 'pie',
			            center : ['50%', '40%'],
			            radius : radius,
			            data : [
			                {name:'other', value:56, itemStyle : labelBottom},
			                {name:'Facebook', value:44,itemStyle : labelTop}
			            ]
			        },
			        {
			            type : 'pie',
			            center : ['80%', '40%'],
			            radius : radius,
			            data : [
			                {name:'other', value:65, itemStyle : labelBottom},
			                {name:'Youtube', value:35,itemStyle : labelTop}
			            ]
			        }
			    ]
            });
            
        }
    );
});
 
