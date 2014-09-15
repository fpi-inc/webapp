'use strict';

angular.module('fpiwebapp.login.service', ['ngResource']).
	factory('LoginService', ['$resource', function($resource) {
		return $resource('http://122.224.196.67:10001/mobile/mobile/load/login.do', {callback: 'JSON_CALLBACK'}, {
		//return $resource('http://172.19.20.218:8088/mobile/mobile/load/login.do', {callback: 'JSON_CALLBACK'}, {
		//return $resource('http://172.19.20.69:8088/mobile/mobile/load/login.do', {callback: 'JSON_CALLBACK'}, {
			query: {method: 'JSONP'}
		});
	}]);



angular.module('fpiwebapp', [
  'ngRoute', 
  'fpiwebapp.region.service',
  'fpiwebapp.region.ctrl',
  'fpiwebapp.search.ctrl',
  'fpiwebapp.search.key.ctrl',
  'fpiwebapp.search.service',
  'fpiwebapp.choose.ctrl',
  'fpiwebapp.category.ctrl',
  //'fpiwebapp.login.ctrl',
  'fpiwebapp.home.ctrl',
  'fpiwebapp.homeCate.ctrl',
  'fpiwebapp.exceed.ctrl',
  'fpiwebapp.transport.ctrl',
  'fpiwebapp.personal.ctrl',
  'fpiwebapp.account.ctrl',
  'fpiwebapp.companyDetail.ctrl',
  'fpiwebapp.companyDetailTab.ctrl',
  'fpiwebapp.common',
  'fpiwebapp.home.service',
  'fpiwebapp.directives',
  'fpiwebapp.service',
  'fpiwebapp.calendar',
  'angular-md5',
  'LocalStorageModule'
  ])
 
.config(function($routeProvider) {
  $routeProvider
    //.when('/', {
    //  controller:'LoginController',
    //  templateUrl:'/app/partials/login/login.html'
    //})
    //.when('/category', {
    //  controller:'CategoryController',
    //  templateUrl:'/app/partials/category/category.html'
    //})
    .when('/', {
      controller:'HomeController',
      templateUrl:'/app/partials/home/home.html'
    })
    .when('/cate/:cateCode', {
      controller:'HomeCateController',
      templateUrl:'/app/partials/home/home.html'
    })
    .when('/account', {
      controller: 'AccountController',
      templateUrl: '/app/partials/personal/account.html'
    })
    .when('/selectRegion', {
      controller: 'SelectRegionController',
      templateUrl: '/app/partials/region/region.html'
    })
    .when('/choose', {
      controller:'ChooseController',
      templateUrl:'/app/partials/choose/choose.html'
    })
    .when('/search', {
      controller:'SearchController',
      templateUrl:'/app/partials/search/search.html'
    })
    .when('/search/:key', {
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

.run(function($http, $rootScope, $window, $location, MenuServer, localStorageService){
 
    //history 返回
    $rootScope.back = function(){
        $window.history.back();
    };
    //默认类型
    $rootScope.categoryItem = 'WW';

    //menu
    //$rootScope.isChoice = false;
    //$rootScope.menu = new MenuServer();
    //$rootScope.menu.init();
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

    //检查登录帐号
    $rootScope.checkUser = function(){
        $rootScope.user = localStorageService.get('currentUser'); 
        if(!$rootScope.user){
            $window.location.href = "/";
        }
        else{
            return $rootScope.user;
        }
    };

	//获取日期
	$rootScope.currentDate = function(addDayCount){
		var dateString = '';
		var curDate = new Date();
		curDate.setDate(curDate.getDate() + addDayCount);
		dateString = curDate.getFullYear() + '-' + (curDate.getMonth() + 1) + '-' + curDate.getDate();
		return dateString;
	};

});
 


'use strict';

angular.module('fpiwebapp.region.service', ['ngResource']).
	factory('RegionService', ['$resource', 'platformServer', function($resource, platformServer) {
		return $resource(platformServer + '/mobile/mobile/load/getRegion.do?monitorTypeCode=WW&userName=root', {callback: 'JSON_CALLBACK'}, {
			query: {method: 'JSONP'}
		});
	}]);


angular.module('fpiwebapp.region.ctrl', ['LocalStorageModule'])
 
.controller('SelectRegionController', function($scope, $location, $rootScope, localStorageService, RegionService) {


	//init 地区
	//$scope.regions = ['滨江', '江干', '西湖', '上城', '拱墅', '萧山', '下城', '余杭', '杭州'];
    $scope.currentName = localStorageService.get('currentRegions');
    $scope.currentCate = localStorageService.get('currentCategory');
    $scope.isLoading = false;
    $scope.regions = [];
	//从服务端获取地区数据
    RegionService.query(function(result){
        var regionData = result.region;
        if(regionData.length > 0){
            for(var i = 0; i < regionData.length; i++){
                var item = regionData[i];
                $scope.regions.push(item.regionName);
            }
            $scope.isLoading = true;
            $scope.dataFunc($scope.regions);
        }
    });

    $scope.dataFunc = function(regions){
        var areas = [];
        for (var i = 0; i < regions.length; i++) {
            if (i % 3 == 0){
                areas.push([]);	
            }
            areas[areas.length-1].push(regions[i]);
        }
        return $scope.areas = areas;
    };

    $scope.dataFunc($scope.regions);

  	$scope.selectFunc = function(name){
  		console.log(name);
  		//localStorageService.clearAll();
    	localStorageService.set('currentRegions', name);
  		$location.path("/cate/" + $scope.currentCate);
  	}
	
});
 


angular.module('fpiwebapp.search.ctrl', ['LocalStorageModule', 'fpiwebapp.search.service'])
 
.controller('SearchController', function($rootScope, $scope, $location, $routeParams, localStorageService, SearchService) {
	
	//$rootScope.menu.hideItems();
	////查询
	//$scope.searchCompanyName = [];
	//$scope.name = $routeParams.name;
	//$scope.searchCompany = function(){
	//	var name = $scope.name;
	//	//获取数据
	//	// CompanyService.search({name:name},function(result){
	//	// 	$scope.searchCompanyName = result.data;
	//	// });
	//	console.log($scope.name);
	//};
    //$scope.companyName = '';
    //$scope.searchCompany = function(){
    //    SearchService.query({
    //        monitorTypeCode: 'WW',
    //        companyName: $scope.searchCompany,
    //        userName: 'root'
    //    }, function(result){
    //        if(result){
    //        }
    //    });	
    //};
	$scope.name = $routeParams.key || $scope.companyName;
    $scope.companyArray = [];
    $scope.search = function(){
        SearchService.query({
            monitorTypeCode: 'WW',
            companyName: $scope.name,
            userName: 'root'
        }, function(result){
            if(result){
                $scope.companyArray = result.company;
            }
        });	
    };
});
 


angular.module('fpiwebapp.choose.ctrl', ['LocalStorageModule'])
 
.controller('ChooseController', function($rootScope, $scope, $location, $routeParams, localStorageService) {
	$scope.currentDate = new Date();
	$scope.setCurrentDate = function(date) {
		$scope.currentDate = date;
	}

	$scope.factorData = localStorageService.get('currentFactor');	
    //操作
    $scope.archive = function() {
        var oldFactor = $scope.factorData;
        oldFactor.splice(this.$index, 1, {'text': this.factor.text, 'done': !this.factor.done});
        localStorageService.set('currentFactor', oldFactor);
        $rootScope.isFactorSave = false;
    };
    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.factorData, function(todo) {
            count += !todo.done ? 0 : 1;
        });
        return count;
    };
});
 


angular.module('fpiwebapp.category.ctrl', [ 'LocalStorageModule'])
 
.controller('CategoryController', function($scope, $rootScope, $location, $window, localStorageService, MenuServer) {
    $rootScope.checkUser();
    $('.category').css('height', $rootScope.contentHeight + 'px');
    $scope.list = [];
    $scope.user = '';
    $scope.passw = '';
    $scope.submit = function() {
        //if ($scope.text) {
        //    $scope.list.push(this.user);
        //    $scope.text = '';
        //}
        $location.path('/main');
    };
});
 


angular.module('fpiwebapp.home.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 
.controller('HomeController', function($scope, $rootScope, $routeParams, $location, $window, localStorageService, MenuServer, RegionService, HomeService) {

    $scope.switchingCate = function(){
        console.log('fpi');
    };
    $scope.currentCategory = localStorageService.get('currentCategory');
    $scope.currentRegion = localStorageService.get('currentRegions');
    $scope.currentUser = localStorageService.get('currentUser');
    $scope.currentRegionCode = localStorageService.get('currentRegionCode');

    //数据传输有效率
    $scope.transPercentData = [];
    $scope.transPercentDataTxt = ['传输率', '有效率', '传输有效率'];
    HomeService.getEfficiency({
        monitorTypeCode: $scope.currentCategory,
        regionCode: $scope.currentRegionCode,
        dateTime: '2014-9-3',
        userName: $scope.currentUser
    }, function(result){
        if(result){
            var trans = result.transEfficients;
            $scope.transPercentData.push(trans[0].transPercent);
            $scope.transPercentData.push(trans[0].efficientPercent);
            $scope.transPercentData.push(trans[0].transEfficientPercent);
        }
    });
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        drawProcess();
    });

    //监测点实时状态
    $scope.stateData = [];
    HomeService.getState({
        monitorTypeCode: $scope.currentCategory,
        regionCode: $scope.currentRegionCode,
        userName: $scope.currentUser
    }, function(result){
        if(result){
            $scope.stateData = result.region;
        }
    });

    //超标排行
    HomeService.getOverStandardData({
        monitorTypeCode: $scope.currentCategory,
        regionCode: $scope.currentRegionCode,
        time: '2014-8-3',
        userName: $scope.currentUser
    }, function(result){
        if(result){
        }
    });

    $scope.imgWidth = $(document).width();
    RegionService.query(function(result){
        var data = result.region;
        if(data){
            $scope.regionName = localStorageService.get('currentRegion') || data[0].regionName;
            //localStorageService.set('currentRegion', $scope.regionName);
        }
    });
	//$scope.regionName = localStorageService.get('currentRegion');
	
    $scope.showCompanyDetail = function(){
        var id = 5;
        $location.path('/companyDetail/:id');
    }

	function drawProcess() {
        $('canvas.process').each(function() {
            var canpi = 40;
            //var text = commonutil.stringTrim($(this).text());
            var text = $(this).text();
            var process = text.substring(0, text.length-1);
            var canvas = this;
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canpi, canpi);
            context.beginPath();
            context.moveTo(canpi, canpi);
            context.arc(canpi, canpi, canpi, 0, Math.PI * 2, false);
            context.closePath();
            context.fillStyle = '#f5f5f5';
            context.fill();
            // 画进度
            context.beginPath();
            context.moveTo(canpi, canpi);
            context.arc(canpi, canpi, canpi, 0, Math.PI * 2 * process / 100, false);
            context.closePath();
            context.fillStyle = '#ffa54b';
            context.fill();
            // 画内部空白
            context.beginPath();
            context.moveTo(canpi, canpi);
            context.arc(canpi, canpi, (canpi - 7), 0, Math.PI * 2, true);
            context.closePath();
            context.fillStyle = 'rgba(255,255,255,1)';
            context.fill();

            context.font = "bold 20px Arial";
            context.fillStyle = '#ffa54b';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.moveTo(canpi, canpi);
            context.fillText(text, canpi, canpi);
        })

    };



})
.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});
 


angular.module('fpiwebapp.homeCate.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 
.controller('HomeCateController', function($route, $scope, $rootScope, $routeParams, $location, $window, localStorageService, MenuServer, RegionService, HomeService) {
	//var cateCode = $routeParams.cateCode;
	//console.log(cateCode);
	$scope.nowDate = $rootScope.currentDate(0);
	$scope.preDate = $rootScope.currentDate(-1);
    $scope.currentUser = $rootScope.checkUser();

    $scope.routeCategory = $routeParams.cateCode;

	localStorageService.set('currentCategory', $scope.routeCategory);
    $scope.currentCategory = localStorageService.get('currentCategory');
    $scope.currentRegion = localStorageService.get('currentRegions');
    //$scope.currentUser = localStorageService.get('currentUser');
    $scope.currentRegionCode = localStorageService.get('currentRegionCode');
	
	if($scope.currentCategory == 'WW'){
		$scope.isActive = true;
	}
	if($scope.currentCategory == 'WG'){
		$scope.isSubActive = true;
	}
	
    $scope.refresh = function(){
        $route.reload();
    };
	console.log($scope.currentCategory);

    //数据传输有效率
    $scope.transPercentData = [];
    $scope.transPercentDataTxt = ['传输率', '有效率', '传输有效率'];
    HomeService.getEfficiency({
        monitorTypeCode: $scope.currentCategory,
        regionCode: $scope.currentRegionCode,
        dateTime: $scope.preDate,
        userName: $scope.currentUser
    }, function(result){
        if(result){
            var trans = result.transEfficients;
            $scope.transPercentData.push(trans[0].transPercent);
            $scope.transPercentData.push(trans[0].efficientPercent);
            $scope.transPercentData.push(trans[0].transEfficientPercent);
        }
    });
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        drawProcess();
    });

    //监测点实时状态
    $scope.stateData = [];
    HomeService.getState({
        monitorTypeCode: $scope.currentCategory,
        regionCode: $scope.currentRegionCode,
        userName: $scope.currentUser
    }, function(result){
        if(result){
            $scope.stateData = result.region;
        }
    });

    //超标排行
    $scope.overStandardData = [];
    HomeService.getOverStandardData({
        monitorTypeCode: $scope.currentCategory,
        //regionCode: $scope.currentRegionCode,
        regionCode: '33010401',
        time: $scope.nowDate,
        userName: $scope.currentUser
    }, function(result){
        if(result){
            $scope.overStandardData = result.overStandardData;
        }
    });

    //RegionService.query(function(result){
    //    var data = result.region;
    //    if(data){
    //        $scope.regionName = localStorageService.get('currentRegion') || data[0].regionName;
    //        //localStorageService.set('currentRegion', $scope.regionName);
    //    }
    //});
	//$scope.regionName = localStorageService.get('currentRegion');
	
    $scope.showCompanyDetail = function(){
        var id = 5;
        $location.path('/companyDetail/:id');
    }

	function drawProcess() {
        $('canvas.process').each(function() {
            var canpi = 40;
            //var text = commonutil.stringTrim($(this).text());
            var text = $(this).text();
            var process = text.substring(0, text.length-1);
            var canvas = this;
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canpi, canpi);
            context.beginPath();
            context.moveTo(canpi, canpi);
            context.arc(canpi, canpi, canpi, 0, Math.PI * 2, false);
            context.closePath();
            context.fillStyle = '#f5f5f5';
            context.fill();
            // 画进度
            context.beginPath();
            context.moveTo(canpi, canpi);
            context.arc(canpi, canpi, canpi, 0, Math.PI * 2 * process / 100, false);
            context.closePath();
            context.fillStyle = '#ffa54b';
            context.fill();
            // 画内部空白
            context.beginPath();
            context.moveTo(canpi, canpi);
            context.arc(canpi, canpi, (canpi - 7), 0, Math.PI * 2, true);
            context.closePath();
            context.fillStyle = 'rgba(255,255,255,1)';
            context.fill();

            context.font = "normal 20px Calibri";
            context.fillStyle = '#ffa54b';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.moveTo(canpi, canpi);
            context.fillText(text, canpi, canpi);
        })

    };



})
.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});
 


'use strict';

angular.module('fpiwebapp.home.service', ['ngResource']).
	factory('HomeService', ['$resource', 'platformServer', function($resource, platformServer) {
		return $resource(platformServer + '', {callback: 'JSON_CALLBACK'}, {
			query: {method: 'JSONP'},
            getState: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getState.do'},
            getEfficiency: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getTransmissionEfficientBySelfRegion.do'},
            getOverStandardData: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getOverStandardData.do'},
            getOverStandardDataByCompany: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getOverStandardDataByCompany.do'},
            getDetailOverStandardDataByCompany: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getDetailOverStandardDataByCompany.do'}
		});
	}]);


angular.module('fpiwebapp.exceed.ctrl', [ 'LocalStorageModule'])
 
.controller('ExceedController', function($scope, $location, $window, localStorageService, MenuServer) {

});
 


angular.module('fpiwebapp.transport.ctrl', [ 'LocalStorageModule'])
 
.controller('TransportController', function($scope, $location, $window, localStorageService, MenuServer) {
	
});
 


angular.module('fpiwebapp.personal.ctrl', [ 'LocalStorageModule'])
 
.controller('PersonalController', function($scope, $location, $window, localStorageService, MenuServer) {
	
});
 


angular.module('fpiwebapp.account.ctrl', [ 'LocalStorageModule'])
 
.controller('AccountController', function($route, $scope, $rootScope, $location, $window, localStorageService, MenuServer) {

    $scope.currentUser = $rootScope.checkUser();
    //$scope.currentUser = localStorageService.get('currentUser');
    $scope.signOut = function(){
        localStorageService.clearAll();
        $route.reload();
    };
});
 


angular.module('fpiwebapp.companyDetail.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 

.directive('tabDetail', function(){
    return{
        restrict: 'EA',
        replace: true,
        //scope: {
        //    current: '@'
        //},
        //transclude: true,
        templateUrl: 'partials/company/tab-detail.html',
        link: function(scope, element, attrs){
            scope.isShow = false;
        },
        controller: function($scope){
            var currentItem = $scope.currentItem;
            $('.tab-content').hide();
            $('.tab-content').eq(currentItem).show();
            var tabs = $('.tab').find('a');
            var line = $('.c-line');
            var leftArray = [];
            for(var i = 0; i < tabs.length; i++){
               leftArray.push(tabs[i].offsetLeft);
            }
            console.log(leftArray);
            line.css('left', leftArray[currentItem] + 'px');
            tabs.click(function(){
                var index = $(this).index();
                $('.tab-content').hide();
                $('.tab-content').eq(index).show();
                runCurrentLine(index);
            });
            function runCurrentLine(index){
                line.animate({'left': leftArray[index] + 'px'});
            }
        }
    }
})
.controller('CompanyDetailController', function($scope, $location, $window, $routeParams, localStorageService, MenuServer, HomeService) {
	console.log($routeParams);
    $scope.currentItem = 2;
    //HomeService.getOverStandardDataByCompany({
    //    monitorTypeCode: 'WW',
    //    portId: '2c93871641b498170141b49cfb6b0004',
    //    factorIds: '-1',
    //    dateType: 1,
    //    time: '2014-09-09'
    //},function(result){
    //    if(result){
    //    }        
    //}); 
});



angular.module('fpiwebapp.companyDetailTab.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 

.controller('CompanyDetailTabController', function($scope, $rootScope, $location, $window, $routeParams, localStorageService, MenuServer, HomeService) {
	//console.log($routeParams);
    $scope.myText = 'Not Selected';
    $scope.currentDate = '';
    $scope.updateMyText = function(date) {
        $scope.myText = 'Selected';
    };

    //超标数据
    var test = [
{"factorUnit":null,"fatorName":"COD","alarmValueScope":"30.26~30.26","standardValue":30.0,"overTimesScope":"0.01~0.01","hour":1,"companyName":"长兴兴长污水处理有限公司","portId":"2c93871641b498170141b49cfb6b0004","portName":"长兴兴长污水处理有限公司总排口"},
{"factorUnit":null,"fatorName":"NH4","alarmValueScope":"30.26~30.26","standardValue":30.0,"overTimesScope":"0.01~0.01","hour":1,"companyName":"长兴兴长污水处理有限公司","portId":"2c93871641b498170141b49cfb6b0004","portName":"长兴兴长污水处理有限公司总排口"},
{"factorUnit":null,"fatorName":"O3","alarmValueScope":"30.26~30.26","standardValue":30.0,"overTimesScope":"0.01~0.01","hour":1,"companyName":"长兴兴长污水处理有限公司","portId":"2c93871641b498170141b49cfb6b0004","portName":"长兴兴长污水处理有限公司总排口"}
];
    $scope.overStandarData = [];
    HomeService.getOverStandardDataByCompany({
        monitorTypeCode: 'WW',
        portId: '2c93871641b498170141b49cfb6b0004',
        factorIds: '-1',
        dateType: 1,
        time: '2014-09-09'
    },function(result){
        if(result){
            var standarData = result.overStandardData;

            $scope.factor = [];
            $scope.factorAll = [];
            angular.forEach(standarData, function(standarItem){
                $scope.factorAll.push({'text': standarItem.fatorName, 'done': true});
            });
            var hasCurrentFactor = localStorageService.get('currentFactor');
            if(hasCurrentFactor){
                angular.forEach(hasCurrentFactor, function(fac){
                    if(!fac.done){
                        $scope.factor.push(fac.text);
                    }
                });
                $scope.overStandarData = (function(){
                    var factorData = [];
                    //处理已选中的因子
                    angular.forEach($scope.factor, function(factor) {
                        angular.forEach(standarData, function(standar, index){
                            if(standar.fatorName.toLowerCase() == factor.toLowerCase()){
                                standarData.splice(index, 1);
                            }
                        });
                    });

                    factorData = standarData;
                    return factorData;
                })();
            }
            else{
                localStorageService.set('currentFactor', $scope.factorAll);
                $scope.overStandarData = standarData;
            }
        }        
    }); 

    HomeService.getDetailOverStandardDataByCompany({
        monitorTypeCode: 'WW',
        portId: '2c93871641b498170141b49cfb6b0004',
        factorId: '2c93871641b5db390141b5def6f80001',
        standardValue: '30.0',
        companyName: '长兴兴长污水处理有限公司',
        dateType: 1,
        time: '2014-09-09'
    }, function(result){
        if(result){
        }
    });
    
});



angular.module('fpiwebapp.common', [])
  
.factory('platformServer', function() {
  return platformServer;
})

.factory('LoadingServer', function() {
  var LoadingServer = function(){
  };
  LoadingServer.prototype = {
  
  };
  return LoadingServer;
})

.factory('MenuServer', function($rootScope) {
	var MenuServer = function(){
		this.cover = null;
		this.menuArray = [];
	};
	MenuServer.prototype = {
		init: function(){
			this.createMenu();
			this.createBgDom();
            this.hideItems();
		},
		// remove: function(){
		// 	if (this.cover) {
		// 		this.cover.remove();
		// 		for(var i = 0; i < this.menuArray.length; i++){
		// 			this.menuArray[i].remove();
		// 		}
		// 	};
		// },
        showItems: function(){
            var self = this;
            for(var i = 0; i < self.menuArray.length; i++){
                $(self.menuArray[i]).show();
				(function(item){
					setTimeout(function(){
						$(self.menuArray[item]).animate({left: '20px'});
					}, ((item + 1) * 100));
				})(i);
            }
            $(self.cover).show();
        },
        hideItems: function(){
            var self = this;
            for(var i = 0; i < self.menuArray.length; i++){
                $(self.menuArray[i]).hide().css('left', '0');
            }
            $(self.cover).hide();
        },
		createBgDom: function(){
			var self = this;
			this.cover = document.createElement('div');
			this.cover.setAttribute('class', 'coverCls');
			this.cover.style.height = jQuery(document).height() + 'px';
			$("body").append(this.cover);
			
			this.cover.addEventListener('click', function(){
				//this.remove();
				self.hideItems();
			});
		},
		removeCoverItem: function(){
			var self = this;
			self.cover.remove();
		},
		removeMenuItem: function(){
			var self = this;
			for(var i = 0; i < self.menuArray.length; i++){
				self.menuArray[i].remove();
			}

			$rootScope.isChoice = false;
		},
		createMenu: function(){
			var self = this;
			var pmenu = [];
			var menus = [{
				name: '首页',
				href: '#/main',
				url: 'images/home.png'
			},{
				name: '超标统计',
				href: '#/exceed',
				url: 'images/m2.png'
			},{
				name: '传输有效率',
				href: '#/transport',
				url: 'images/m3.png'
			},{
				name: '我的关注',
				href: '#/personal',
				url: 'images/m4.png'
			}];
			for(var i = 0; i < menus.length; i++){
				var menuItem = document.createElement('div');
				menuItem.setAttribute('class', 'menuItemCls');
				menuItem.innerHTML = '<a href="'+ menus[i].href +'"><img src="'+ menus[i].url +'" width="32" height="32" border="0">' + menus[i].name + '</a>';
				menuItem.style.top = (20 + (i + 1) * 50) + 'px';
				$("body").append(menuItem);
				this.menuArray.push(menuItem);
				pmenu.push(menuItem);
				menuItem.addEventListener('click', function(){
					//this.remove();
					self.hideItems();
				});
			}
		}
	};
	return MenuServer;
});



angular.module('fpiwebapp.directives', [])
  .directive('datepicker', function() {
    return {
      restrict: 'A',
      require: '?ngModel',
      scope: {
        select: '&'        // Bind the select function we refer to the right scope
      },
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) return;

        var optionsObj = {};

        optionsObj.dateFormat = 'mm/dd/yy';
        var updateModel = function(dateTxt) {
          scope.$apply(function () {
            ngModel.$setViewValue(dateTxt);
          });
        };

        optionsObj.onSelect = function(dateTxt, picker) {
          //preventDefault();
          updateModel(dateTxt);
          if (scope.select) {
            scope.$apply(function() {
              scope.select({date: dateTxt});
            });
          }
        };

        ngModel.$render = function() {
          element.datepicker('setDate', ngModel.$viewValue || '');
        };
        element.datepicker(optionsObj);
      }
    };
  });
