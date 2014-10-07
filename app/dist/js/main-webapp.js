
angular.module('fpiwebapp', [
  'ngRoute', 
  'ngSanitize', 
  'fpiwebapp.region.service',
  'fpiwebapp.region.ctrl',
  'fpiwebapp.search.ctrl',
  'fpiwebapp.search.service',
  'fpiwebapp.choose.ctrl',
  'fpiwebapp.category.ctrl',
  //'fpiwebapp.login.ctrl',
  'fpiwebapp.home.ctrl',
  'fpiwebapp.homeCate.ctrl',
  'fpiwebapp.exceed.ctrl',
  'fpiwebapp.transport.ctrl',
  'fpiwebapp.personal.ctrl',
  'fpiwebapp.personal.add.ctrl',
  'fpiwebapp.account.ctrl',
  'fpiwebapp.companyDetail.ctrl',
  'fpiwebapp.companyDetailTab.ctrl',
  'fpiwebapp.common',
  'fpiwebapp.home.service',
  'fpiwebapp.personal.service',
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
    .when('/choose/:id/:currentCate', {
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
    .when('/attentionCompany', {
      controller:'AddCompanyController',
      templateUrl:'/app/partials/personal/personalCompany.html'
    })
    .when('/searchAttention/:key', {
      controller:'SearchController',
      templateUrl:'/app/partials/personal/personalCompany.html'
    })
    .when('/companyDetail/:id/:currentCate', {
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


    //日期格式化
    $rootScope.formatTime = function(curDate) {
		var dateString = '';
		dateString = curDate.substring(1, 11);
		return dateString;
    }

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
                $scope.regions.push({'name': item.regionName, 'code': item.regionCode});
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

  	$scope.selectFunc = function(name, code){
  		console.log(name);
  		//localStorageService.clearAll();
    	localStorageService.set('currentRegions', name);
    	localStorageService.set('currentRegionCode', code);
  		$location.path("/cate/" + $scope.currentCate);
  	}
	
});
 


angular.module('fpiwebapp.search.ctrl', ['LocalStorageModule', 'fpiwebapp.search.service'])
.filter('keyWords', function($sce){
    //var keyWordsFilter = function(input){
    //    var key = "长";
    //    var words = input;
    //    var color = "red";
    //    var sKey = "<span style='color: " + color + ";'>" + key + "</span>";
    //    var rStr = new RegExp(key, "g");
    //    words = words.replace(rStr, sKey);
    //    return $sce.trustAsHtml(words);

    //};
    return keyWordsFilter;
})
.controller('SearchController', function($rootScope, $scope, $location, $routeParams, localStorageService, SearchService, $sce) {
    $scope.currentUser = $rootScope.checkUser();
    $scope.currentCategory = localStorageService.get('currentCategory');
    $scope.toggle = false;
    $scope.htmlShow = function(str) {
        var key = $scope.name;
        var words = str;
        var color = "#19b2e4";
        var sKey = "<span style='color: " + color + ";'>" + key + "</span>";
        var rStr = new RegExp(key, "g");
        words = words.replace(rStr, sKey);
        return $sce.trustAsHtml(words);
    }
    $scope.focusFunc = function(){
        console.log("focus");
        $scope.toggle = true;
    };
    $scope.isNoData = false;
    //$scope.blurFunc = function(){
    //    console.log("blur");
    //    $scope.toggle = false;
    //};
    $scope.hasData = false;

	$scope.name = $routeParams.key || '';

    $scope.companyArray = [];

	if($scope.name !== undefined){
		SearchService.search({
			monitorTypeCode: $scope.currentCategory,
			//companyName: escape(escape($scope.name)),
			companyName: $scope.name,
			userName: $scope.currentUser
		}, function(result){
			if(result){
				$scope.companyArray = result.company;
                if($scope.companyArray.length > 0){
                    $scope.hasData = true;
                    $scope.isNoData = false;
                }
                else{
                    $scope.hasData = false;
                    $scope.isNoData = true;
                }
			}
		});	

	}

    $scope.search = function() {
        $location.path('/search/' + $scope.key);
    }

    //快速搜索
    $scope.quickFunc = function(manageLevel){
        $scope.isActiveA = false;
        $scope.isActiveB = false;
        $scope.isActiveC = false;
        switch (manageLevel){
            case 1:
                $scope.isActiveA = true;
                $scope.isActiveB = false;
                $scope.isActiveC = false;
                break;
            case 2:
                $scope.isActiveA = false;
                $scope.isActiveB = true;
                $scope.isActiveC = false;
                break;
            case 3:
                $scope.isActiveA = false;
                $scope.isActiveB = false;
                $scope.isActiveC = true;
                break;
            default:
                break;
        }
        
		SearchService.quickSearch({
			monitorTypeCode: $scope.currentCategory,
			manageLevel: manageLevel,
			userName: $scope.currentUser
		}, function(result){
			if(result){
				$scope.companyArray = result.company;
                if($scope.companyArray.length > 0){
                    $scope.hasData = true;
                    $scope.isNoData = false;
                }
                else{
                    $scope.hasData = false;
                    $scope.isNoData = true;
                }
			}
		});	
    };

    //清除历史记录
    $scope.clearHistory = function(){
        $scope.companyArray = [];
    };

})
.filter('keyWords', function(){
	var keyWordsFilter = function(input){
		var text = '';
		var keyWords = '长兴';
		var words = input;
		text = words.replace(keyWords, '<span style="color: red;">' + keyWords + '</span>');
		return text;
	}
	return keyWordsFilter;
});
 


'use strict';

angular.module('fpiwebapp.search.service', ['ngResource']).
	factory('SearchService', ['$resource', 'platformServer', function($resource, platformServer) {
		return $resource(platformServer + '', {callback: 'JSON_CALLBACK'}, {
			query: {method: 'JSONP'},
            search: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getCompany.do'},
            quickSearch: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/QuickSearchCompany.do'}
		});
	}]);


angular.module('fpiwebapp.choose.ctrl', ['LocalStorageModule'])
 
.controller('ChooseController', function($window, $rootScope, $scope, $location, $routeParams, localStorageService) {
    $scope.currentCate = $routeParams.currentCate;
    $scope.companyId = $routeParams.id;
    $scope.currentTime = localStorageService.get("currentDateTime");
	$scope.setCurrentDate = function(date) {
        var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
		$scope.currentTime = time;
        localStorageService.set("currentDateTime", $scope.currentTime);
	}
    $scope.defineFunc = function(){
        $window.location.href = '#/companyDetail/' + $scope.companyId + '/' + $scope.currentCate; 
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
    $scope.transPercentDataTxt = ['传输率', '有效率', '传输有效率'];
    HomeService.getEfficiency({
        monitorTypeCode: $scope.currentCategory,
        regionCode: $scope.currentRegionCode || '',
        dateTime: $scope.preDate,
        userName: $scope.currentUser
    }, function(result){
        if(result){
            $scope.transPercentData = [];
            var trans = result.transEfficients;
            $scope.transPercentData.push({'code': trans[0].transPercent});
            $scope.transPercentData.push({'code': trans[0].efficientPercent});
            $scope.transPercentData.push({'code': trans[0].transEfficientPercent});
            console.log($scope.transPercentData);
        }
    });
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        drawProcess();
    });

    //监测点实时状态
    $scope.stateData = [];
    HomeService.getState({
        monitorTypeCode: $scope.currentCategory,
        regionCode: $scope.currentRegionCode || '',
        userName: $scope.currentUser
    }, function(result){
        if(result){
            $scope.stateData = result.region;
        }
    });

    //超标排行
    $scope.noStandardData = false;
    $scope.overStandardData = [];
    HomeService.getOverStandardData({
        monitorTypeCode: $scope.currentCategory,
        regionCode: $scope.currentRegionCode || '',
        //regionCode: '33010401',
        time: $scope.nowDate,
        userName: $scope.currentUser
    }, function(result){
        if(result){
            if(result.overStandardData.length > 0){
                $scope.overStandardData = result.overStandardData;
            }
            else{
                $scope.noStandardData = true;
            }
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
	
    $scope.showCompanyDetail = function(id, currentCate){
        //$location.path('/companyDetail/:id/:currentCate');
        $window.location.href = '#/companyDetail/' + id + '/' + currentCate;
    }

	function drawProcess() {
        var colors = ['#ffa54b', '#f57d6e', '#53e18c'];
        $('canvas.process').each(function(index) {
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
            context.fillStyle = colors[index];
            context.fill();
            // 画内部空白
            context.beginPath();
            context.moveTo(canpi, canpi);
            context.arc(canpi, canpi, (canpi - 7), 0, Math.PI * 2, true);
            context.closePath();
            context.fillStyle = 'rgba(255,255,255,1)';
            context.fill();

            context.font = "normal 18px arial";
            context.fillStyle = colors[index];
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
            getDetailOverStandardDataByCompany: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getDetailOverStandardDataByCompany.do'},
            getPortsByCompany: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getPortsByCompany.do'},
            getRealDataByTable: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getRealDataByTable.do'},
            get24RealDataByChart: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/get24RealDataByChart.do'},
            get48RealDataByChart: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/get48RealDataByChart.do'},
            getHistoryData: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getHistoryData.do'},
            getHistoryChart: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getHistoryChart.do'},
            getTransmissionEfficientBychildRegion: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getTransmissionEfficientBychildRegion.do'}
		});
	}]);


angular.module('fpiwebapp.exceed.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 
.controller('ExceedController', function($rootScope, $scope, $location, $window, localStorageService, MenuServer, HomeService) {
    $scope.currentCategory = localStorageService.get('currentCategory');
    $scope.currentRegionCode = localStorageService.get('currentRegionCode');
	$scope.nowDate = $rootScope.currentDate(0);
    $scope.currentUser = $rootScope.checkUser();

    //超标统计
    $scope.noStandardData = false;
    $scope.overStandardData = [];
    HomeService.getOverStandardData({
        monitorTypeCode: $scope.currentCategory,
        regionCode: $scope.currentRegionCode || '',
        //regionCode: '33010401',
        time: $scope.nowDate,
        userName: $scope.currentUser
    }, function(result){
        if(result){
            if(result.overStandardData.length > 0){
                $scope.overStandardData = result.overStandardData;
            }
            else{
                $scope.noStandardData = true;
            }
        }
    });
    $scope.showCompanyDetail = function(id, currentCate){
        //$location.path('/companyDetail/:id/:currentCate');
        $window.location.href = '#/companyDetail/' + id + '/' + currentCate;
    }


});
 


angular.module('fpiwebapp.transport.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 
.controller('TransportController', function($rootScope, $scope, $location, $window, localStorageService, MenuServer, HomeService) {
    $scope.currentUser = $rootScope.checkUser();
	$scope.nowDate = $rootScope.currentDate(0);
    $scope.currentCategory = localStorageService.get('currentCategory');
    $scope.currentRegionCode = localStorageService.get('currentRegionCode');

	$scope.transportItems = [];
	HomeService.getTransmissionEfficientBychildRegion({
		regionCode: $scope.currentRegionCode || '',
		dateTime: $scope.nowDate,
		monitorTypeCode: $scope.currentCategory,
		userName: $scope.currentUser,
		dateType: 1
	}, function(result){
		if(result){
			$scope.transportItems = result.transmissionEfficient;
		}
	});
});
 


angular.module('fpiwebapp.personal.ctrl', [ 'LocalStorageModule', 'fpiwebapp.personal.service'])
 
.controller('PersonalController', function($rootScope, $scope, $location, $window, localStorageService, MenuServer, PersonalService) {
    $scope.currentUser = $rootScope.checkUser();
    $scope.attentionCompanyList = [];
    $scope.historyLoading = true;
	PersonalService.showAttention({
        userName: $scope.currentUser
    }, function(result){
        if(result){
            $scope.attentionCompanyList = result.attention;
            if($scope.attentionCompanyList.length > 0){
                $scope.historyLoading = false;
            }
        }
    });
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
.filter('timeFormat', function(){
	var timeFormatFilter = function(input){
		return input.substring(0, 13) + '时';
	};
	return timeFormatFilter;
})
.controller('CompanyDetailController', function($scope, $rootScope, $location, $window, $routeParams, localStorageService, MenuServer, HomeService) {
	$scope.companyId = $routeParams.id;
	$scope.currentItem = $routeParams.currentCate;

	$scope.nowDate = $rootScope.currentDate(0);
    if(!localStorageService.get('currentDateTime')){
        localStorageService.set('currentDateTime', $scope.nowDate);
        //localStorageService.set('currentDateTime', new Date());
    }
    $scope.currentTime = localStorageService.get('currentDateTime');

    $scope.currentCategory = localStorageService.get('currentCategory');
    //类别显示
    $scope.isActive = false;
    $scope.toggleCate = function(){
        $scope.isActive = true;
    };
    //排口
    $scope.portNameArray = [];
    $scope.portsDataByCompany = function(){
        
        HomeService.getPortsByCompany({
            monitorTypeCode: $scope.currentCategory,
            companyId: $scope.companyId
        }, function(result){
            if(result){
                $scope.portNameArray = result.ports;
                //存储排口
                localStorageService.set('currentPorts', {portName: result.ports[0].portName, portId: result.ports[0].portId});
                $scope.currentPorts = localStorageService.get('currentPorts').portName;
                $scope.realDataByTable(result.ports[0].portId, result.ports[0].portName);
                $scope.getHistoryDataFunc(result.ports[0].portId, $scope.nowDate);
                $scope.getOverStandarData(result.ports[0].portId, $scope.nowDate);
            }
        });
    };
    //实时数据
    $scope.realDataByTableArray = [];
    if($scope.realDataByTableArray.length > 0){
        $scope.realLoading = false;
    }
    else{
        $scope.realLoading = true;
    }

    $scope.realDataByTable = function(portId, portName){
        localStorageService.set('currentPorts', {portName: portName, portId: portId});
        $scope.currentPorts = localStorageService.get('currentPorts').portName;
        $scope.isActive = false;
        HomeService.getRealDataByTable({
            monitorTypeCode: $scope.currentCategory,
            portId: portId
        }, function(result){
            if(result){
                $scope.realDataByTableArray = result.realDataTbale;
                $scope.realLoading = false;
            }
        });
    };

    //历史数据
    $scope.historyDataArray = [];
    if($scope.historyDataArray.length > 0){
        $scope.historyLoading = false;
    }
    else{
        $scope.historyLoading = true;
    }
    $scope.getHistoryDataFunc = function(portId, time){

        HomeService.getHistoryData({
            portId: portId,
            monitorTypeCode: $scope.currentCategory,
            factors: '-1',
            dateType: 1,
            time: time
        }, function(result){
            if(result){
                $scope.historyDataArray = result.data;
                $scope.historyLoading = false;
            }
        });
        
    };
    //超标数据
    $scope.overStandarData = [];
    $scope.getOverStandarData = function(portId, time){
        HomeService.getOverStandardDataByCompany({
            monitorTypeCode: $scope.currentCategory,
            portId: portId,
            factorIds: '-1',
            dateType: 1,
            time: time 
        },function(result){
            if(result){
                $scope.overStandarData = result.overStandardData;

                //$scope.factor = [];
                //$scope.factorAll = [];
                //angular.forEach(standarData, function(standarItem){
                //    $scope.factorAll.push({'text': standarItem.fatorName, 'done': true});
                //});
                //var hasCurrentFactor = localStorageService.get('currentFactor');
                //if(hasCurrentFactor){
                //    angular.forEach(hasCurrentFactor, function(fac){
                //        if(!fac.done){
                //            $scope.factor.push(fac.text);
                //        }
                //    });
                //    $scope.overStandarData = (function(){
                //        var factorData = [];
                //        //处理已选中的因子
                //        angular.forEach($scope.factor, function(factor) {
                //            angular.forEach(standarData, function(standar, index){
                //                if(standar.fatorName.toLowerCase() == factor.toLowerCase()){
                //                    standarData.splice(index, 1);
                //                }
                //            });
                //        });

                //        factorData = standarData;
                //        return factorData;
                //    })();
                //}
                //else{
                //    localStorageService.set('currentFactor', $scope.factorAll);
                //    $scope.overStandarData = standarData;
                //}
            }        
        }); 
    };

})
.directive('tabDetail', ['$location', function($location){
    return{
        restrict: 'EA',
        replace: true,
        //scope: {
        //    realDataByTableArray: '@realDataByTableArray'
        //},
        //transclude: true,
        templateUrl: 'partials/company/tab-detail.html',
        link: function(scope, element, attrs){
            scope.isShow = false;
        },
        controller: function($scope, localStorageService){
            $scope.portsDataByCompany();

            var currentItem = $scope.currentItem;
            $('.tab-content').hide();
            $('.tab-content').eq(currentItem).show();
            var tabs = $('.tab').find('a');
            var line = $('.c-line');
            var leftArray = [];
            for(var i = 0; i < tabs.length; i++){
               leftArray.push(tabs[i].offsetLeft);
            }
            //console.log(leftArray);
            line.css('left', leftArray[currentItem] + 'px');
            tabs.click(function(){
                var index = $(this).index();
                controlTab(index);
            });
            controlTab($scope.currentItem);
            function controlTab(index){
                $('.tab-content').hide();
                $('.tab-content').eq(index).show();
                runCurrentLine(index);
                if(index == 0){
                    if(localStorageService.get('currentPorts')){
                        $scope.currentPortsAll = localStorageService.get('currentPorts');
                        $scope.realDataByTable($scope.currentPortsAll.portId, $scope.currentPortsAll.portName);
                    }
                    //window.location.href = '#/companyDetail/' + $scope.companyId + '/' + index; 
                }
                else if(index == 1){
                    if(localStorageService.get('currentPorts')){
                        $scope.currentPortsAll = localStorageService.get('currentPorts');
                        $scope.getHistoryDataFunc($scope.currentPortsAll.portId, $scope.currentTime);
                    }
                    //window.location.href = '#/companyDetail/' + $scope.companyId + '/' + index; 
                }
                else if(index == 2){
                    if(localStorageService.get('currentPorts')){
                        $scope.currentPortsAll = localStorageService.get('currentPorts');
                        $scope.getOverStandarData($scope.currentPortsAll.portId, $scope.currentTime);
                    }
                    //window.location.href = '#/companyDetail/' + $scope.companyId + '/' + index; 
                }
            };
            function runCurrentLine(index){
                line.animate({'left': leftArray[index] + 'px'});
            }
        }
    }
}]);


angular.module('fpiwebapp.companyDetailTab.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 

.controller('CompanyDetailTabController', function($scope, $rootScope, $location, $window, $routeParams, localStorageService, MenuServer, HomeService) {




    //实时数据
    $scope.showChartFunc = function($event){
        HomeService.get24RealDataByChart({
            portId: '2c93871641b6111b0141b61a1f600002',
            monitorTypeCode: 'WW',
            factor: 'F_B01'
        }, function(result){
            if(result){
                
            }
        });

        if($event.currentTarget){
			if(angular.element("#chartTr")){
				angular.element("#chartTr").remove();
			}
            angular.element($event.currentTarget).after('<tr id="chartTr"><td colspan="4">'
					+ '<div class="chartT2448"><a href="javascript:;" class="a24 cur">24小时</a><a href="javascript:;" class="a48">48小时</a></div>'
					+ '<div id="chartcontainer24" style="margin: 0 auto; width: 320px;"></div>'
					+ '<div id="chartcontainer48" style="margin: 0 auto; width: 320px; display: none"></div>'
					+ '</td></tr>');
        }

		function drawChart24(){
			var myData = new Array([10, 20], [15, 10], [20, 30], [25, 10], [30, 5]);
			var myChart = new JSChart('chartcontainer24', 'line');
			myChart.setDataArray(myData);
			myChart.setSize(320, 220);
			myChart.setTitle('fpi');
			myChart.draw();
		}
		function drawChart48(){
			var myData = new Array([10, 20], [15, 10], [20, 30], [25, 10], [30, 5]);
			var myChart = new JSChart('chartcontainer48', 'line');
			myChart.setDataArray(myData);
			myChart.setSize(320, 220);
			myChart.setTitle('fpi');
			myChart.draw();
		}
		drawChart24();
        //addRow
        //$scope.addRow(target);
		$('.chartT2448 > a').each(function(index){
			$(this).click(function(){
				if(index == 0){
					$('.chartT2448 > a').removeClass('cur');
					$(this).addClass('cur');
					$('#chartcontainer24').show();
					$('#chartcontainer48').hide();
					drawChart24();
				}
				else{
					$('.chartT2448 > a').removeClass('cur');
					$(this).addClass('cur');
					$('#chartcontainer24').hide();
					$('#chartcontainer48').show();
					drawChart48();
				}
			});
		});

    };

    
    $scope.addRow = function(target){
        console.log(target.parent);
        //var trs = angular.element("#realTable").find('tr');
        //$(this).after('<tr><td colspan="4">fdsafsa</td></tr>');
    };


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

	$scope.historyChartData = [];
    HomeService.getHistoryChart({
        monitorTypeCode: 'WW',
        portId: '2c93871641b498170141b49cfb6b0004',
        factors: '-1',
        dateType: 1,
        time: '2014-09-09'
    }, function(result){
        if(result){
			$scope.historyChartData = result;
			var chartDataArray = [];
			$.each($scope.historyChartData, function(key, value){
				if(value instanceof Array){
					chartDataArray.push(value);
				}
			});
			var cartAllData = [];
			$.each(chartDataArray, function(index, value){
				var items = value;
				var chartDataArrayNew = [];
				for(var i = 0; i < items.length; i++){
					var item = items[i];
					var codeArray = [];
					codeArray.push(i+1, item.value);
					//codeArray.push(item.time, item.value);
					chartDataArrayNew.push(codeArray);
				}
				cartAllData.push(chartDataArrayNew);
			});


			$scope.showHistoryChart = function(){
				$scope.isActiveHistory = true;
				var myChart = new JSChart('history-chart', 'line');
				//for(var i = 0; i < $scope.historyChartData.length; i++){
				//	myChart.setDataArray([[1, 80],[2, 40],[3, 60],[4, 65],[5, 50],[6, 50],[7, 60],[8, 80],[9, 150],[10, 100]], 'blue');
				//}
				//`for(var i = 0; i < cartAllData.length; i++){
				//`	var item = cartAllData[i];
				//`	myChart.setDataArray(item, 'blue');
				//`}
				myChart.setDataArray([[1, 80.5],[2, 40],[3, 60],[4, 65],[5, 50],[6, 50],[7, 60],[8, 80],[9, 150],[10, 100]], 'blue');
				myChart.setDataArray([[1, 100],[2, 55],[3, 80],[4, 115],[5, 80],[6, 70],[7, 30],[8, 130],[9, 160],[10, 170]], 'green');
				myChart.setDataArray([[1, 150],[2, 25],[3, 100],[4, 80],[5, 20],[6, 65],[7, 0],[8, 155],[9, 190],[10, 200]], 'gray');
				myChart.setAxisPaddingBottom(40);
				myChart.setTextPaddingBottom(10);
				myChart.setAxisValuesNumberY(5);
				myChart.setIntervalStartY(0);
				myChart.setIntervalEndY(200);
				myChart.setLabelX([2,'p1']);
				myChart.setLabelX([4,'p2']);
				myChart.setLabelX([6,'p3']);
				myChart.setLabelX([8,'p4']);
				myChart.setLabelX([10,'p5']);
				myChart.setAxisValuesNumberX(5);
				myChart.setShowXValues(false);
				myChart.setTitleColor('#454545');
				myChart.setAxisValuesColor('#454545');
				myChart.setLineColor('#A4D314', 'green');
				myChart.setLineColor('#BBBBBB', 'gray');
				//myChart.setTooltip([1]);
				//myChart.setTooltip([2]);
				//myChart.setTooltip([3]);
				//myChart.setTooltip([4]);
				//myChart.setTooltip([5]);
				//myChart.setTooltip([6]);
				//myChart.setTooltip([7]);
				//myChart.setTooltip([8]);
				//myChart.setTooltip([9]);
				//myChart.setTooltip([10]);
				myChart.setFlagColor('#9D16FC');
				myChart.setFlagRadius(4);
				//myChart.setBackgroundImage('chart_bg.jpg');
				myChart.setSize(320, 321);
				myChart.setTitle('fpi-inc');
				myChart.draw();
			};

        }
    });

    $scope.isActiveHistory = false;
    $scope.showHistoryTable = function(){
        $scope.isActiveHistory = false;
    };
    

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


angular.module('fpiwebapp.calendar', ['fpiwebapp.service', 'LocalStorageModule'])
  .directive('calendar', function(dateutil, localStorageService) {

	    function CalendarModel(date) {
	    	this.currentDate = date;
	    	
	    	this.weekNumber = dateutil.getWeekNumberOfMonth(date);
	    	this.firstDate = dateutil.getFirstDateOfFirstWeek(date);
	    	
	    	this.fY = this.firstDate.getFullYear();
	    	this.fM = this.firstDate.getMonth();
	    	this.fD = this.firstDate.getDate();
	    };
	    
	    CalendarModel.prototype = {
	    	get: function(index) {
	    		return new Date(this.fY, this.fM, this.fD + index);
	    	},
	    	getDate: function(index) {
	    		return this.get(index).getDate();
	    	},
	    	monthText: function() {
	    		return this.currentDate.getFullYear() + '年' + (this.currentDate.getMonth() + 1) + '月';
	    	},
	    	checkWeek: function(week) {
	    		return this.weekNumber >= week;
	    	},
	    	isCurrentMonth: function(index) {
	    		var date = this.get(index);
	    		
	    		return date.getMonth() == this.currentDate.getMonth();
	    	},
	    	isCurrentDate: function(index) {
	    		var date = this.get(index);
	    		
	    		return date.getFullYear() == this.currentDate.getFullYear() &&
	    			date.getMonth() == this.currentDate.getMonth() &&
	    			date.getDate() == this.currentDate.getDate();
	    	}//,
	    	//nextMonth: function() {
	    	//	scope.calendarModel = new CalendarModel(new Date(this.currentDate.getFullYear(), this.currentDate,getMonth() + 1, this.currentDate.getDate())));
  			//  	scope.$apply(scope.calendarModel);
	    	//}
	    };
	    
    return {
      restrict: 'EA',
      replace: true,
      scope: {
    	  updateDateMethod: '@'
      },
      templateUrl: '/app/partials/calendar.html',
      link: function(scope, element, attrs) {
    	  var nowDate = localStorageService.get('currentDateTime');
          var now = new Date(Date.parse(nowDate.replace(/-/g,   "/")));  
    	  //require(['jquery.mobile-1.4.4.js'], function() {
    	  //    
    	  //    alert($.mobile);
    	  //});
    	  element.on('swiperight', function() {
    		  alert('fuck');
    	  });
    	  $('table a', element).each(function(i) {
    		  $(this).click(function() {
    			  var currentDate = scope.calendarModel.get(i);
    			  
    			  var parentUpdateDateMethod = scope.$parent[scope['updateDateMethod']];
    			  parentUpdateDateMethod && parentUpdateDateMethod(currentDate);
    			  
    			  //scope.calendarModel.currentDate = currentDate;
    			  scope.calendarModel = new CalendarModel(currentDate);
    			  scope.$apply(scope.calendarModel);
    		  });
    	  });
    	  
    	  scope.calendarModel = new CalendarModel(now);
      }
    };
  });


angular.module('fpiwebapp.service', [])
.factory('dateutil', function() {
	return {
		/**
		 * 获取给定日期所在月的周数
		 */
		getWeekNumberOfMonth: function(date) {
			return this.getWeekOfMonth(this.getLastDateOfMonth(date));
		},
		/**
		 * 获取给定日期在当前月的第几周
		 */
		getWeekOfMonth: function(date) {
			var dayOfWeek = date.getDay(),
				dayOfMonth = date.getDate();
			
			return Math.ceil((dayOfMonth - (dayOfWeek + 1) + 7) / 7);
		},
		/**
		 * 获取给定日期所在月的最后一天
		 */
		getLastDateOfMonth: function(date) {
			return new Date(date.getFullYear(), date.getMonth() + 1, 0);
		},
		/**
		 * 获取给定日期所在月的第一周的第一天日期（很有可能是上个月的日期）
		 */
		getFirstDateOfFirstWeek: function(date) {
			var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
			
			d.setDate(1);
			
			var dayOfWeek = d.getDay();
			
			d.setDate(1- dayOfWeek);
			
			return d;
		}
	};
});