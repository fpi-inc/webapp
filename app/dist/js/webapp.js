
angular.module('fpiwebapp', [
  'ngRoute', 
  'fpiwebapp.region.service',
  'fpiwebapp.region.ctrl',
  'fpiwebapp.search.ctrl',
  'fpiwebapp.category.ctrl',
  'fpiwebapp.login.ctrl',
  'fpiwebapp.home.ctrl',
  'fpiwebapp.exceed.ctrl',
  'fpiwebapp.transport.ctrl',
  'fpiwebapp.personal.ctrl',
  'fpiwebapp.companyDetail.ctrl',
  'fpiwebapp.companyDetailTab.ctrl',
  'fpiwebapp.common',
  'fpiwebapp.login.service',
  'fpiwebapp.directives',
  'angular-md5'
  ])
 
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'LoginController',
      templateUrl:'/app/partials/login/login.html'
    })
    .when('/category', {
      controller:'CategoryController',
      templateUrl:'/app/partials/category/category.html'
    })
    .when('/main', {
      controller:'HomeController',
      templateUrl:'/app/partials/home/home.html'
    })
    .when('/selectRegion', {
      controller: 'SelectRegionController',
      templateUrl: '/app/partials/region/region.html'
    })
    .when('/search', {
      controller:'SearchController',
      templateUrl:'/app/partials/search/search.html'
    })
    .when('/exceed', {
      controller:'ExceedController',
      templateUrl:'/app/partials/exceed/exceed.html'
    })
    .when('/transport', {
      controller:'TransportController',
      templateUrl:'/app/partials/transport/transport.html'
    })
    .when('/personal', {
      controller:'PersonalController',
      templateUrl:'/app/partials/personal/personal.html'
    })
    .when('/companyDetail/:id', {
      controller:'CompanyDetailController',
      templateUrl:'/app/partials/company/companyDetail.html'
    })
    // .when('/edit/:projectId', {
    //   controller:'EditCtrl',
    //   templateUrl:'detail.html'
    // })
    .otherwise({
      redirectTo:'/'
    });
})

.run(function($http, $rootScope, $window, $location, MenuServer){
 
    //history 返回
    $rootScope.back = function(){
        $window.history.back();
    };

    //menu
    //$rootScope.isChoice = false;
    $rootScope.menu = new MenuServer();
    $rootScope.menu.init();
    //系统菜单
    $rootScope.choiceMenu = function(){
        //if($rootScope.isChoice){
        //  return;
        //}
        $rootScope.menu.showItems();
        //$rootScope.isChoice = true;
    }


    //height
    $rootScope.contentHeight = $(window).innerHeight();
    //console.log($scope.contentHeight);

});
 


angular.module('fpiwebapp.home.ctrl', [ 'LocalStorageModule'])
 
.controller('HomeController', function($scope, $location, $window, localStorageService, MenuServer) {
	// //init 地区
	// $scope.regions = ['滨江', '江干', '西湖'];
	// //从服务端获取地区数据
	// //
	// if ($scope.regions.length > 0) {
	// 	$scope.regionName = $scope.regions[0];
	// };
    
    $scope.imgWidth = $(document).width();
    //window.onorientationchange = function(){
    //    $scope.imgWidth = $(document).width();
    //}

	$scope.regionName = localStorageService.get('currentRegion');
	
    $scope.showCompanyDetail = function(){
        var id = 5;
        $location.path('/companyDetail/:id');
    }

	//var mapData = ['蒸发量','降水量'];
	var labelTop = {
	    normal : {
	        label : {
	            show : false
	        },
	        labelLine : {
	            show : false
	        }
	    }
	};
	var labelBottom = {
	    normal : {
	        color: '#f5f5f5',
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
	var radius = [40, 30];
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
			        //selectedMode: 'single',
			        //textStyle: {color: '#000', fontSize: '14px'},
                    padding: [0, 0, 5, 0],
			        data:[{
                        name: '传输率',
                        icon: "images/legend.png"
                    },{
                        name: '有效率',
                        icon: "images/legend.png"
                    },{
                        name: '传输有效率',
                        icon: "images/legend.png"
                    }]
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
			                {name:'传输率', value:54,itemStyle : labelTop}
			            ]
			        },
			        {
			            type : 'pie',
			            center : ['50%', '40%'],
			            radius : radius,
			            data : [
			                {name:'other', value:56, itemStyle : labelBottom},
			                {name:'有效率', value:44,itemStyle : labelTop}
			            ]
			        },
			        {
			            type : 'pie',
			            center : ['80%', '40%'],
			            radius : radius,
			            data : [
			                {name:'other', value:65, itemStyle : labelBottom},
			                {name:'传输有效率', value:35,itemStyle : labelTop}
			            ]
			        }
			    ]
            });
            
        }
    );

});
 
