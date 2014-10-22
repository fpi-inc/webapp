/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */



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
  'fpiwebapp.stateDetail.ctrl',
  'fpiwebapp.exceed.ctrl',
  'fpiwebapp.transport.ctrl',
  'fpiwebapp.transport.area.ctrl',
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
    .when('/stateDetail/:state', {
      controller:'StateDetailController',
      templateUrl:'/app/partials/state/stateDetail.html'
    })
    .when('/account', {
      controller: 'AccountController',
      templateUrl: '/app/partials/personal/account.html'
    })
    .when('/selectRegion', {
      controller: 'SelectRegionController',
      templateUrl: '/app/partials/region/region.html'
    })
    .when('/choose/:id/:currentCate/:date', {
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
    .when('/transport/:area', {
      controller:'TransportAreaController',
      templateUrl:'/app/partials/transport/transportarea.html'
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
    $rootScope.contentHeight = $(window).outerHeight(true);
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
 


angular.module('fpiwebapp.search.ctrl', ['LocalStorageModule', 'fpiwebapp.personal.service', 'fpiwebapp.search.service'])
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
.controller('SearchController', function($rootScope, $scope, $location, $routeParams, localStorageService, PersonalService, SearchService, $sce) {
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
                $scope.companyAttentionArray = [];
				$scope.companyArray = result.company;
                if($scope.companyArray.length > 0){
                    $scope.hasData = true;
                    $scope.isNoData = false;
                }
                else{
                    $scope.hasData = false;
                    $scope.isNoData = true;
                }
                //attention
                angular.forEach($scope.companyArray, function(value, key){
                    var txt = {};
                    if(value.hasAttention){
                        txt.html = '已关注';
                        txt.css = 'atten';
                    }
                    else{
                        txt.html = '未关注';
                        txt.css = 'addAtten';
                    }
                    $scope.companyAttentionArray.push(txt);
                });
			}
		});	

	}
    $scope.addAttentionFunc = function(compId, txt){
        if(txt == '已关注'){
            return;
        }
        PersonalService.saveAttention({
            userName: $scope.currentUser,
            companyId: compId 
        }, function(result){
            if(result){
                //$window.location.href = "/personal";
                $location.path('/personal');
            }
        });
    };

    $scope.search = function() {
        $location.path('/searchAttention/' + $scope.key);
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
    //清除排口缓存
    $scope.clearPortsCache = function(){
        localStorageService.remove('currentPorts');
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


angular.module('fpiwebapp.choose.ctrl', ['LocalStorageModule', 'fpiwebapp.home.service'])
 
.controller('ChooseController', function($window, $rootScope, $scope, $location, $routeParams, localStorageService, HomeService) {
    $scope.currentCategory = localStorageService.get('currentCategory');
    $scope.factorDataCache = localStorageService.get('currentFactor');
    if($scope.factorDataCache.length){
        $scope.noyzData = true;
    }
    else{
        $scope.noyzData = false;
    }
    $scope.currentCate = $routeParams.currentCate;
    $scope.companyId = $routeParams.id;
    $scope.controlFactor = false;
    if($scope.currentCate == 'null'){
        $scope.controlFactor = true;
    }
    //$scope.currentTime = localStorageService.get("currentDateTime");
    $scope.routeTime = $routeParams.date;
	$scope.setCurrentDate = function(date, num) {
        if(num == 1){
            $scope.currentTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            $scope.currentTimeLong = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            localStorageService.set("currentDateTime", {'time': $scope.currentTime, 'longTime': $scope.currentTimeLong, 'type': 1});
        }
        else{
            $scope.currentTime = date.getFullYear() + '-' + (date.getMonth() + 1);
            $scope.currentTimeLong = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            localStorageService.set("currentDateTime", {'time': $scope.currentTime, 'longTime': $scope.currentTimeLong, 'type': 2});
        }
	}
    $scope.defineFunc = function(){
        if($scope.currentCate == 'null'){
            $window.location.href = '#/transport'; 
        }
        else if($scope.companyId == 'null'){
            $window.location.href = '#/exceed'; 
        }
        else{
            $window.location.href = '#/companyDetail/' + $scope.companyId + '/' + $scope.currentCate; 
        }
    }

    //操作
    $scope.archive = function() {
        var oldFactor = $scope.factorDataCache;
        oldFactor.splice(this.$index, 1, {'textName': this.factor.textName, 'textCode': this.factor.textCode, 'done': !this.factor.done});
        localStorageService.set('currentFactor', oldFactor);
        //$rootScope.isFactorSave = false;
    };
    //因子
    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.factorDataCache, function(todo) {
            count += !todo.done ? 0 : 1;
        });
        return count;
    };

    //$scope.factorData = [];
    //HomeService.getFactorByPort({
    //    portId: $scope.currentPorts.portId,
    //    monitorTypeCode: $scope.currentCategory
    //}, function(result){
    //    if(result){
    //        $scope.factorData = result.factor;
    //        $scope.factorDataCache = [];
    //        angular.forEach($scope.factorData, function(data){
    //            $scope.factorDataCache.push({'textName': data.factorName, 'textCode': data.factorCode, 'done': true});
    //        });
    //        localStorageService.set('currentFactor', $scope.factorDataCache);	
    //        $scope.remaining = function() {
    //            var count = 0;
    //            angular.forEach($scope.factorDataCache, function(todo) {
    //                count += !todo.done ? 0 : 1;
    //            });
    //            return count;
    //        };

    //    }
    //});
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

    //$scope.hideMask = false;
    ////首次登录导览
    //var mLeft = $('#ckxx').css('margin-left');
    //$('#webapp-mask').css('height', $rootScope.contentHeight + 'px');
    //$('#webapp-mask-img2').css('left', (mLeft - 6) + 'px');
    ////if(localStorageService.get('firstLoginApp') == 'true'){
    ////    $scope.hideMask = false;
    ////}
    ////else{
    ////    $scope.hideMask = true;
    ////}
    //$scope.hideMaskFunc = function(){
    //    $scope.hideMask = true;
    //};
    //console.log($('#ckxx').css('margin-left'));

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
        dateType: 1,
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
            getDetailState: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getDetailState.do'},
            getEfficiency: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getTransmissionEfficientBySelfRegion.do'},
            getOverStandardData: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getOverStandardData.do'},
            getOverStandardDataByCompany: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getOverStandardDataByCompany.do'},
            getOverStandardDataFactor: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getOverStandardDataFactor.do'},
            getDetailOverStandardDataByCompany: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getDetailOverStandardDataByCompany.do'},
            getOverStandardDataByOverData: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getOverStandardDataByOverData.do'},
            getPortsByCompany: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getPortsByCompany.do'},
            getRealDataByTable: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getRealDataByTable.do'},
            get24RealDataByChart: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/get24RealDataByChart.do'},
            get48RealDataByChart: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/get48RealDataByChart.do'},
            getHistoryData: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getHistoryData.do'},
            getHistoryChart: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getHistoryChart.do'},
            getTransmissionEfficientBychildRegion: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getTransmissionEfficientBychildRegion.do'},
            getFactorByPort: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getFactorByPort.do'}
		});
	}]);


angular.module('fpiwebapp.stateDetail.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 
.controller('StateDetailController', function($routeParams, $rootScope, $scope, $location, $window, localStorageService, HomeService) {
    //清除排口缓存
    $scope.clearPortsCache = function(){
        localStorageService.remove('currentPorts');
    }; 
    $scope.currentCategory = localStorageService.get('currentCategory');
    $scope.currentRegionCode = localStorageService.get('currentRegionCode');
    $scope.currentUser = $rootScope.checkUser();
    $scope.state = $routeParams.state;

    //监测点实时状态详情
    $scope.noPortData = true;
    $scope.stateDetailData = [];
    HomeService.getDetailState({
        monitorTypeCode: $scope.currentCategory,
        regionCode: $scope.currentRegionCode || '',
        companyName: '',
        state: $scope.state,
        userName: $scope.currentUser
    }, function(result){
        if(result){
            $scope.stateDetailData = result.stateDetail;
        }
    });


});
 


angular.module('fpiwebapp.exceed.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 
.controller('ExceedController', function($rootScope, $scope, $location, $window, localStorageService, MenuServer, HomeService) {
    
    $scope.currentCategory = localStorageService.get('currentCategory');
    $scope.currentRegionCode = localStorageService.get('currentRegionCode');
    $scope.currentUser = $rootScope.checkUser();

	$scope.nowDate = $rootScope.currentDate(0);
    if(!localStorageService.get('currentDateTime')){
        localStorageService.set('currentDateTime', {'time': $scope.nowDate, 'longTime': $scope.nowDate, 'type': 1});
        //localStorageService.set('currentDateTime', new Date());
    }
    $scope.currentTime = localStorageService.get('currentDateTime');

    //从缓存中获取因子
    $scope.getCacheFactor = function(){
        if(!localStorageService.get('currentFactor')){
            return '-1';
        }
        else{
            var factor = localStorageService.get('currentFactor');
            var factorArray = [];
            var count = 0;
            angular.forEach(factor, function(todo){
                if(todo.done){
                    factorArray.push(todo.textCode);
                }
                //factorArray.push(todo.done ? todo.textCode : null);
                count += todo.done ? 1 : 0;
            });
            if(count == factor.length){
                return '-1';
            }
            else{
                return factorArray.toString();
            }
        }
    };

    //超标统计
    $scope.noStandardData = false;
    $scope.overStandardData = [];
    HomeService.getOverStandardDataByOverData({
        monitorTypeCode: $scope.currentCategory,
        regionCode: $scope.currentRegionCode || '',
        time: $scope.currentTime.time,
        dateType: $scope.currentTime.type,
        factorIds: $scope.getCacheFactor(),
        userName: $scope.currentUser
    }, function(result){
        if(result){
            if(result.overStandardData.length > 0){
                $scope.overStandardData = result.overStandardData;
            }
            else{
                $scope.noStandardData = true;
            }
            $scope.setPortsFactorData();
        }
    });
    $scope.showCompanyDetail = function(id, currentCate){
        //$location.path('/companyDetail/:id/:currentCate');
        $window.location.href = '#/companyDetail/' + id + '/' + currentCate;
    }


    //获取超标排口下的因子
    $scope.factorData = [];
    $scope.setPortsFactorData = function(currentCategory){
        if(!localStorageService.get('currentFactor')){

            HomeService.getOverStandardDataFactor({
                monitorTypeCode: $scope.currentCategory
            }, function(result){
                if(result){
                    $scope.factorData = result.factor;
                    $scope.factorDataCache = [];
                    angular.forEach($scope.factorData, function(data){
                        $scope.factorDataCache.push({'textName': data.factorName, 'textCode': data.factorId, 'done': true});
                    });
                    localStorageService.set('currentFactor', $scope.factorDataCache);	
                }
            });
        }
    };

});
 


angular.module('fpiwebapp.transport.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 
.controller('TransportController', function($rootScope, $scope, $location, $window, localStorageService, MenuServer, HomeService) {
    $scope.currentUser = $rootScope.checkUser();
	$scope.nowDate = $rootScope.currentDate(0);
	$scope.preDate = $rootScope.currentDate(-1);
    $scope.currentCategory = localStorageService.get('currentCategory');
    $scope.currentRegionCode = localStorageService.get('currentRegionCode');

    if(!localStorageService.get('currentDateTime')){
        localStorageService.set('currentDateTime', {'time': $scope.preDate, 'longTime': $scope.preDate, 'type': 1});
        //localStorageService.set('currentDateTime', new Date());
    }
    $scope.currentTime = localStorageService.get('currentDateTime');

	$scope.transportItems = [];
	HomeService.getTransmissionEfficientBychildRegion({
		regionCode: '',
		dateTime: $scope.currentTime.time,
		monitorTypeCode: $scope.currentCategory,
		userName: $scope.currentUser,
		dateType: $scope.currentTime.type
	}, function(result){
		if(result){
			$scope.transportItems = result.transmissionEfficient;
		}
	});
});
 


angular.module('fpiwebapp.transport.area.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 
.controller('TransportAreaController', function($routeParams, $rootScope, $scope, $location, $window, localStorageService, MenuServer, HomeService) {
    //清除排口缓存
    $scope.clearPortsCache = function(){
        localStorageService.remove('currentPorts');
    }; 
    $scope.currentUser = $rootScope.checkUser();
	$scope.nowDate = $rootScope.currentDate(0);
	$scope.preDate = $rootScope.currentDate(-1);
    $scope.currentCategory = localStorageService.get('currentCategory');
    $scope.currentRegionCode = localStorageService.get('currentRegionCode');
    $scope.areaCode = $routeParams.area;

    if(!localStorageService.get('currentDateTime')){
        localStorageService.set('currentDateTime', {'time': $scope.preDate, 'longTime': $scope.preDate, 'type': 1});
        //localStorageService.set('currentDateTime', new Date());
    }
    $scope.currentTime = localStorageService.get('currentDateTime');

	$scope.transportItems = [];
	HomeService.getTransmissionEfficientBychildRegion({
		regionCode: $scope.areaCode,
		dateTime: $scope.currentTime.time,
		monitorTypeCode: $scope.currentCategory,
		userName: $scope.currentUser,
		dateType: $scope.currentTime.type
	}, function(result){
		if(result){
			$scope.transportItems = result.transmissionEfficient;
		}
	});

});
 


angular.module('fpiwebapp.personal.ctrl', [ 'LocalStorageModule', 'fpiwebapp.personal.service'])
 
.controller('PersonalController', function($rootScope, $scope, $location, $window, localStorageService, MenuServer, PersonalService) {
    $scope.currentCategory = localStorageService.get('currentCategory');
    //清除排口缓存
    $scope.clearPortsCache = function(){
        localStorageService.remove('currentPorts');
    }; 
    $scope.currentUser = $rootScope.checkUser();
    $scope.attentionCompanyList = [];
    $scope.historyLoading = true;
    $scope.noAttenData = true;
    $scope.showAttentionFunc = function(){
        PersonalService.showAttention({
            monitorTypeCode: $scope.currentCategory,
            userName: $scope.currentUser
        }, function(result){
            if(result){
                $scope.attentionCompanyList = result.attention;
                console.log($scope.attentionCompanyList.length);
                if($scope.attentionCompanyList.length >= 0){
                    $scope.historyLoading = false;
                }
                if($scope.attentionCompanyList.length == 0){
                    $scope.noAttenData = false;
                }
                else{
                    $scope.noAttenData = true;
                }
            }
        });
    };
    $scope.showAttentionFunc();
    //是否关注
    $scope.isComp = false;
    $scope.delAttention = [];
    $scope.isAttentionFunc = function(target, companyId){
        $scope.currentHeart = angular.element(target);
        if($scope.currentHeart.context.className == 'icon-heart'){
            $scope.currentHeart.context.className = 'icon-heart-empty';           
            $scope.delAttention.push(companyId);
            if($scope.delAttention.length > 0){
                $scope.isComp = true;
            }
            else{
                $scope.isComp = false;
            }
        }
        else{
            $scope.currentHeart.context.className = 'icon-heart';           
            $scope.remove($scope.delAttention, companyId);
            if($scope.delAttention.length > 0){
                $scope.isComp = true;
            }
            else{
                $scope.isComp = false;
            }
        }
    };
    $scope.remove = function(obj, val){
        var index = $scope.indexOf(obj, val);
        if(index > -1){
            obj.splice(index, 1);
        }
    };
    $scope.indexOf = function(obj, val){
        for(var i = 0; i < obj.length; i++){
            if(obj[i] == val){
                return i;
            }
            else{
                return -1;
            }
        }
    };
    $scope.complateFunc = function(){
        angular.forEach($scope.delAttention, function(value){
            PersonalService.deleteAttention({
                //monitorTypeCode: $scope.currentCategory,
                userName: $scope.currentUser,
                companyId: value
            }, function(result){
                
                $scope.showAttentionFunc();
            });
        });
    };
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
 


'use strict';

angular.module('fpiwebapp.personal.service', ['ngResource']).
	factory('PersonalService', ['$resource', 'platformServer', function($resource, platformServer) {
		return $resource(platformServer + '', {callback: 'JSON_CALLBACK'}, {
			query: {method: 'JSONP'},
            //添加关注
            saveAttention: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/saveAttention.do'},
            //判断是否关注
            hasAttention: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/hasAttention.do'},
            //取消关注
            deleteAttention: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/deleteAttention.do'},
            //关注列表
            showAttention: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/showAttention.do'}
		});
	}]);


angular.module('fpiwebapp.personal.add.ctrl', ['LocalStorageModule', 'fpiwebapp.personal.service', 'fpiwebapp.home.service'])
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
.controller('AddCompanyController', function($rootScope, $window, $scope, $location, $routeParams, localStorageService, PersonalService, SearchService, $sce) {
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
                $scope.companyAttentionArray = [];
				$scope.companyArray = result.company;
                if($scope.companyArray.length > 0){
                    $scope.hasData = true;
                    $scope.isNoData = false;
                }
                else{
                    $scope.hasData = false;
                    $scope.isNoData = true;
                }
                //attention
                angular.forEach($scope.companyArray, function(value, key){
                    var txt = {};
                    if(value.hasAttention){
                        txt.html = '已关注';
                        txt.css = 'atten';
                    }
                    else{
                        txt.html = '未关注';
                        txt.css = 'addAtten';
                    }
                    $scope.companyAttentionArray.push(txt);
                });
			}
		});	
	}
    $scope.addAttentionFunc = function(compId, txt){
        if(txt == '已关注'){
            return;
        }
        PersonalService.saveAttention({
            userName: $scope.currentUser,
            companyId: compId 
        }, function(result){
            if(result){
                //$window.location.href = "/personal";
                $location.path('/personal');
            }
        });
    };

    $scope.search = function() {
        $location.path('/searchAttention/' + $scope.key);
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
 


angular.module('fpiwebapp.companyDetail.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
.filter('timeFormat', function(){
	var timeFormatFilter = function(input){
		return input.substring(0, 13) + '时';
	};
	return timeFormatFilter;
})
.controller('CompanyDetailController', function($route, $scope, $rootScope, $location, $window, $routeParams, localStorageService, MenuServer, HomeService) {

	$scope.companyId = $routeParams.id;
	$scope.currentItem = $routeParams.currentCate;

	$scope.nowDate = $rootScope.currentDate(0);
    if(!localStorageService.get('currentDateTime')){
        localStorageService.set('currentDateTime', {'time': $scope.nowDate, 'longTime': $scope.nowDate, 'type': 1});
        //localStorageService.set('currentDateTime', new Date());
    }
    $scope.currentTime = localStorageService.get('currentDateTime');

    $scope.currentCategory = localStorageService.get('currentCategory') || 'WW';

    $scope.isCompanyUser = false;
    //企业用户
    $scope.currentCompanyOrAdmin = localStorageService.get('currentCompanyOrAdmin');
    if($scope.currentCompanyOrAdmin == 'company'){
        $scope.isCompanyUser = true;
        if($scope.currentCategory == 'WW'){
            $scope.isCompanyActive = true;
            $scope.isSubCompanyActive = false;
        }
        else{
            $scope.isCompanyActive = false;
            $scope.isSubCompanyActive = true;
        }
    }
    $("#isCompanyUserId > a").each(function(){
        $(this).on('click', function(){
            if($(this).index() == 0){
                $scope.isCompanyActive = true;
                $scope.isSubCompanyActive = false;
                localStorageService.set('currentCategory', 'WW');
                $route.reload();
            }
            else{
                $scope.isSubCompanyActive = true;
                $scope.isCompanyActive = false;
                localStorageService.set('currentCategory', 'WG');
                $route.reload();
            }
        });
    });
    $scope.refresh = function(){
        $route.reload();
    };

    //类别显示
    $scope.isActive = false;
    $scope.toggleCate = function(){
        $scope.isActive = true;
    };
    $scope.toggleLeave = function(){
        $scope.isActive = false;
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
                if($scope.portNameArray.length > 0){
                    //存储排口
                    if(!localStorageService.get('currentPorts')){
                        localStorageService.set('currentPorts', {portName: result.ports[0].portName, portId: result.ports[0].portId});
                        $scope.portTitle = result.ports[0].portName;
                        $scope.realDataByTable(result.ports[0].portId, result.ports[0].portName);
                        //$scope.realDataByTableChart(result.ports[0].portId, result.ports[0].portName);
                        $scope.getHistoryDataFunc(result.ports[0].portId, $scope.currentTime);
                        $scope.getHistoryDataFuncChart(result.ports[0].portId, $scope.currentTime);
                        $scope.getOverStandarData(result.ports[0].portId, $scope.currentTime);
                        $scope.setPortsFactorData(result.ports[0].portId, $scope.currentCategory);
                    }
                    else{
                        $scope.currentPorts = localStorageService.get('currentPorts');
                        $scope.portTitle = $scope.currentPorts.portName;
                        $scope.realDataByTable($scope.currentPorts.portId, $scope.currentPorts.portName);
                        //$scope.realDataByTableChart($scope.currentPorts.portId, $scope.currentPorts.portName);
                        $scope.getHistoryDataFunc($scope.currentPorts.portId, $scope.currentTime);
                        $scope.getHistoryDataFuncChart($scope.currentPorts.portId, $scope.currentTime);
                        $scope.getOverStandarData($scope.currentPorts.portId, $scope.currentTime);
                        //$scope.setPortsFactorData($scope.currentPorts.portId, $scope.currentCategory);
                    }
                }
            }
        });
    };

    //操作排口
    $scope.controlAllPorts = function(portId, portName){
        $scope.cartAllData = [];
        $scope.realDataByTable(portId, portName);
        //$scope.realDataByTableChart(portId, portName);
        $scope.getHistoryDataFunc(portId, $scope.currentTime);
        $scope.getHistoryDataFuncChart(portId, $scope.currentTime);
        $scope.getOverStandarData(portId, $scope.currentTime);
        $scope.setPortsFactorData(portId, $scope.currentCategory);
        $scope.isActiveHistory = false;
    };

    //获取排口下的因子
    $scope.factorData = [];
    $scope.setPortsFactorData = function(portId, currentCategory){

        HomeService.getFactorByPort({
            portId: portId,
            monitorTypeCode: $scope.currentCategory
        }, function(result){
            if(result){
                $scope.factorData = result.factor;
                $scope.factorDataCache = [];
                angular.forEach($scope.factorData, function(data){
                    $scope.factorDataCache.push({'textName': data.factorName, 'textCode': data.factorId, 'done': true});
                });
                localStorageService.set('currentFactor', $scope.factorDataCache);	
            }
        });
    };

    //从缓存中获取因子
    $scope.getCacheFactor = function(){
        if(!localStorageService.get('currentFactor')){
            return '-1';
        }
        else{
            var factor = localStorageService.get('currentFactor');
            var factorArray = [];
            var count = 0;
            angular.forEach(factor, function(todo){
                if(todo.done){
                    factorArray.push(todo.textCode);
                }
                //factorArray.push(todo.done ? todo.textCode : null);
                count += todo.done ? 1 : 0;
            });
            if(count == factor.length){
                return '-1';
            }
            else{
                return factorArray.toString();
            }
        }
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
        $scope.portTitle = localStorageService.get('currentPorts').portName;
        $scope.isActive = false;
        HomeService.getRealDataByTable({
            monitorTypeCode: $scope.currentCategory,
            portId: portId
        }, function(result){
            if(result){
                $scope.realDataByTableArray = result.realDataTbale;
                if($scope.realDataByTableArray.length){
                    $scope.clearRealData = true;
                }
                else{
                    $scope.clearRealData = false;
                }
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
            factors: $scope.getCacheFactor(),
            dateType: time.type,
            time: time.time
        }, function(result){
            if(result){
                $scope.historyDataArray = result.data;
                if($scope.historyDataArray.length){
                    $scope.clearData = true;
                }
                else{
                    $scope.clearData = false;
                }
                $scope.historyLoading = false;
            }
        });
        
    };
    //历史数据图表
    $scope.cartAllData = [];
    $scope.keyWords = [];
	$scope.historyChartData = [];
    $scope.yMaxValue = [];
    $scope.xCoordinate = [];
    $scope.getHistoryDataFuncChart = function(portId, time){
        HomeService.getHistoryChart({
            monitorTypeCode: $scope.currentCategory,
            portId: portId,
            factors: $scope.getCacheFactor(),
            dateType: time.type,
            time: time.time 
        }, function(result){
            if(result){
                $scope.historyChartData = result;
                $scope.yMaxValue = $scope.historyChartData.maxVal;
                var chartDataArray = [];
                $.each($scope.historyChartData, function(key, value){
                    if(value instanceof Array && key != 'maxVal'){
                        chartDataArray.push({'key': key, 'value': value});
                        $scope.keyWords.push(key);
                    }
                });
                $.each(chartDataArray, function(index, value){
                    var items = value.value;
                    var xLength = items.length;
                    var xsteep = Math.floor(xLength / 4);
                    var chartDataArrayNew = [];
                    if(index == 0){
                        $scope.xCoordinate.push({'number':1, 'time': formatTime(items[0].time)});
                    }
                    for(var i = 0; i < items.length; i++){
                        var item = items[i];
                        var codeArray = [];
                        codeArray.push(i+1, item.value);
                        //codeArray.push(item.time, item.value);
                        chartDataArrayNew.push(codeArray);
                        if(index == 0){
                            if(i % 4 == 0){
                                if(i == 0 || i == (items.length - 1)){
                                    continue;
                                }
                                else{
                                    $scope.xCoordinate.push({'number': i+1, 'time': formatTime(items[i].time)});
                                }
                            }
                        }
                    }
                    if(index == 0){
                        $scope.xCoordinate.push({'number': items.length, 'time': formatTime(items[items.length - 1].time)});
                    }
                    $scope.cartAllData.push(chartDataArrayNew);
                });
                function formatTime(time){
                    if(time.indexOf(' ') > 0){
                        return time.substring(11) + '时';
                    }
                    else{
                        return time.substring(8) + '日';
                    }
                }

            }
        });
    };
    //超标数据
    $scope.overStandarData = [];
    $scope.getOverStandarData = function(portId, time){
        HomeService.getOverStandardDataByCompany({
            monitorTypeCode: $scope.currentCategory,
            portId: portId,
            factorIds: $scope.getCacheFactor(),
            dateType: time.type,
            time: time.time
        },function(result){
            if(result){
                $scope.overStandarData = result.overStandardData;
                if($scope.overStandarData.length){
                    $scope.clearDataOver = true;
                }
                else{
                    $scope.clearDataOver = false;
                }

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

    $scope.curPorts = localStorageService.get('currentPorts');
    //实时数据图表操作
    $scope.showChartFunc = function($event, factoryCode){
        $scope.curPorts = localStorageService.get('currentPorts');
        //实时数据图表24小时
        HomeService.get24RealDataByChart({
            portId: $scope.curPorts.portId,
            monitorTypeCode: $scope.currentCategory,
            factor: factoryCode
        }, function(result){
            if(result){
                //var codeText = factoryCode.substring(2);
                $scope.real24ChartData = [];
                $scope.real24Data = result;
                $scope.maxData = $scope.real24Data.maxVal[0].maxVal;
                $scope.all24Data = $scope.real24Data[factoryCode];
                
                angular.forEach($scope.all24Data, function(value, key){
                    var itemArray = [];
                    itemArray.push(key);
                    itemArray.push(value.value);
                    $scope.real24ChartData.push(itemArray);
                });

                drawChart24($scope.maxData, $scope.real24ChartData);
            }
        });
        //实时数据图表48小时

        HomeService.get48RealDataByChart({
            portId: $scope.curPorts.portId,
            monitorTypeCode: $scope.currentCategory,
            factor: factoryCode
        }, function(result){
            if(result){
                //var codeText = factoryCode.substring(2);
                $scope.real48ChartData = [];
                $scope.real48Data = result;
                $scope.max48Data = $scope.real48Data.maxVal[0].maxVal;
                $scope.all48Data = $scope.real48Data[factoryCode];
                
                angular.forEach($scope.all48Data, function(value, key){
                    var itemArray = [];
                    itemArray.push(key);
                    itemArray.push(value.value);
                    $scope.real48ChartData.push(itemArray);
                });

                drawChart48($scope.max48Data, $scope.real48ChartData);
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

		function drawChart24(maxValue, chartData){
			var myData = chartData;
			var myChart = new JSChart('chartcontainer24', 'line');
			myChart.setDataArray(myData);
			myChart.setSize(320, 220);
            myChart.setIntervalStartY(0);
            myChart.setIntervalEndY(maxValue);
            myChart.setAxisNameX('');
            myChart.setAxisNameY('');
			myChart.setTitle('24小时实时数据');
			myChart.draw();
		}
		function drawChart48(maxValue, chartData){
			var myData = chartData;
			var myChart = new JSChart('chartcontainer48', 'line');
			myChart.setDataArray(myData);
			myChart.setSize(320, 220);
            myChart.setIntervalStartY(0);
            myChart.setIntervalEndY(maxValue);
            myChart.setAxisNameX('');
            myChart.setAxisNameY('');
			myChart.setTitle('48小时实时数据');
			myChart.draw();
		}
		//drawChart24();
        //addRow
        //$scope.addRow(target);
		$('.chartT2448 > a').each(function(index){
			$(this).click(function(){
				if(index == 0){
					$('.chartT2448 > a').removeClass('cur');
					$(this).addClass('cur');
					$('#chartcontainer24').show();
					$('#chartcontainer48').hide();
                    drawChart24($scope.maxData, $scope.real24ChartData);
				}
				else{
					$('.chartT2448 > a').removeClass('cur');
					$(this).addClass('cur');
					$('#chartcontainer24').hide();
					$('#chartcontainer48').show();
                    drawChart48($scope.max48Data, $scope.real48ChartData);
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
    //var test = [
//{"fa//ctorUnit":null,"fatorName":"COD","alarmValueScope":"30.26~30.26","standardValue":30.0,"overTimesScope":"0.01~0.01","hour":1,"companyName":"长兴兴长污水处理有限公司","portId":"2c93871641b498170141b49cfb6b0004","portName":"长兴兴长污水处理有限公司总排口"},
//{"fa//ctorUnit":null,"fatorName":"NH4","alarmValueScope":"30.26~30.26","standardValue":30.0,"overTimesScope":"0.01~0.01","hour":1,"companyName":"长兴兴长污水处理有限公司","portId":"2c93871641b498170141b49cfb6b0004","portName":"长兴兴长污水处理有限公司总排口"},
//{"fa//ctorUnit":null,"fatorName":"O3","alarmValueScope":"30.26~30.26","standardValue":30.0,"overTimesScope":"0.01~0.01","hour":1,"companyName":"长兴兴长污水处理有限公司","portId":"2c93871641b498170141b49cfb6b0004","portName":"长兴兴长污水处理有限公司总排口"}
//];

    //HomeService.getDetailOverStandardDataByCompany({
    //    monitorTypeCode: 'WW',
    //    portId: '2c93871641b498170141b49cfb6b0004',
    //    factorId: '2c93871641b5db390141b5def6f80001',
    //    standardValue: '30.0',
    //    companyName: '长兴兴长污水处理有限公司',
    //    dateType: 1,
    //    time: '2014-09-09'
    //}, function(result){
    //    if(result){
    //    }
    //});


    $scope.showHistoryChart = function(){
        $scope.isActiveHistory = true;
        var colorArray = [];
        if($scope.cartAllData.length){
            $('#history-chart').show();
            $('#chart-text').hide();
            var myChart = new JSChart('history-chart', 'line');
            colorArray = [{
                name: 'red',
                    value: '#fb1929',
                    text: 'COD'
            },{
                name: 'yellow',
                    value: '#ffc600',
                    text: ''
            },{
                name: 'blue',
                    value: '#387eff',
                    text: ''
            },{
                name: 'green',
                    value: '#30ff00',
                    text: ''
            },{
                name: 'violet',
                    value: '#fa00fd',
                    text: ''
            },{
                name: 'hunan',
                value: '#00e4ff',
                text: ''
            },{
                name: 'zhise',
                value: '#ff00e4',
                text: ''
            },{
                name: 'meihong',
                value: '#ff007e',
                text: ''
            }];
            for(var i = 0; i < $scope.cartAllData.length; i++){
                var item = $scope.cartAllData[i];
                myChart.setDataArray(item, colorArray[i].name);
                myChart.setLineColor(colorArray[i].value, colorArray[i].name);
                myChart.setLegendShow(true);
                myChart.setLegendPosition('top center');
                myChart.setLegendForLine(colorArray[i].name, $scope.keyWords[i]);
            }

            //myChart.setDataArray($scope.cartAllData[0], 'green');
            //myChart.setDataArray($scope.cartAllData[1], 'red');
            //myChart.setDataArray($scope.cartAllData[2], 'blue');
            //myChart.setDataArray([[1, 80.5],[2, 40],[3, 60],[4, 65],[5, 50],[6, 50],[7, 60],[8, 80],[9, 150],[10, 100]], 'blue');
            //myChart.setDataArray([[1, 100],[2, 55],[3, 80],[4, 115],[5, 80],[6, 70],[7, 30],[8, 130],[9, 160],[10, 170]], 'green');
            //myChart.setDataArray([[1, 150],[2, 25],[3, 100],[4, 80],[5, 20],[6, 65],[7, 0],[8, 155],[9, 190],[10, 200]], 'gray');
            myChart.setAxisPaddingBottom(40);
            myChart.setTextPaddingBottom(10);
            //myChart.setAxisValuesNumberY(5);
            myChart.setIntervalStartY(0);
            myChart.setIntervalEndY($scope.yMaxValue[0].maxVal);
            myChart.setAxisNameX('');
            myChart.setAxisNameY('');
            
            for(var j = 0; j < $scope.xCoordinate.length; j++){
                var jitem = $scope.xCoordinate[j];
                myChart.setLabelX([jitem.number, jitem.time]);
            }
            //myChart.setLabelX([1,'10时']);
            //myChart.setLabelX([23,'10时']);
            //myChart.setLabelX([6,'p3']);
            //myChart.setLabelX([8,'p4']);
            //myChart.setLabelX([10,'p5']);
            myChart.setAxisValuesNumberX(5);
            myChart.setShowXValues(false);
            myChart.setTitleColor('#454545');
            myChart.setAxisValuesColor('#454545');
            myChart.setFlagColor('#9D16FC');
            myChart.setFlagRadius(4);
            //myChart.setBackgroundImage('chart_bg.jpg');
            myChart.setSize(320, 321);
            myChart.setTitle('历史数据图表');
            myChart.draw();
        }
        else{
            $('#history-chart').hide();
            $('#chart-text').html('<div class="no-chart-text">暂无图表数据</div>');
        }
    };

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
            this.firstMonth = dateutil.getMonthOfYear(date);
	    	
	    	this.fY = this.firstDate.getFullYear();
	    	this.fM = this.firstDate.getMonth();
	    	this.fD = this.firstDate.getDate();

	    	this.fY1 = this.firstMonth.getFullYear();
	    	this.fM1 = this.firstMonth.getMonth();
	    	this.fD1 = this.firstMonth.getDate();
	    };
	    
	    CalendarModel.prototype = {
	    	get: function(index) {
	    		return new Date(this.fY, this.fM, this.fD + index);
	    	},
	    	getMonthId: function(index) {
	    		return new Date(this.fY1, this.fM1 + index, this.fD1);
	    	},
	    	getDate: function(index) {
	    		return this.get(index).getDate();
	    	},
	    	getMonth: function(index) {
	    		return this.getMonthId(index).getMonth() + 1;
	    	},
	    	monthText: function() {
	    		return this.currentDate.getFullYear() + '年' + (this.currentDate.getMonth() + 1) + '月' + this.currentDate.getDate() + '日';
	    	},
	    	showMonthText: function() {
	    		return this.currentDate.getFullYear() + '年' + (this.currentDate.getMonth() + 1) + '月';
	    	},
	    	checkWeek: function(week) {
	    		return this.weekNumber >= week;
	    	},
	    	isCurrentMonth: function(index) {
	    		var date = this.get(index);
	    		
	    		return date.getMonth() == this.currentDate.getMonth();
	    	},
	    	isCurrentMonthNumber: function(index) {
	    		//var date = this.get(index);
	    		
	    		return index == this.currentDate.getMonth();
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
          autoTabShow(scope.$parent.routeTime);

          function autoTabShow(time){
              var isMonthDay = time.indexOf('-', 5);
              if(isMonthDay != -1){
                  $('.choose-p-t-r a').eq(0).addClass('cur').siblings().removeClass('cur');
                  $('#dayArea').show();
                  $('#monthArea').hide();
                  $('#isShowDay').show();
                  $('#isShowMonth').hide();
              }
              else{
                  $('.choose-p-t-r a').eq(1).addClass('cur').siblings().removeClass('cur');
                  $('#dayArea').hide();
                  $('#monthArea').show();
                  $('#isShowDay').hide();
                  $('#isShowMonth').show();
              }
          }
    	  var nowDate = localStorageService.get('currentDateTime');
          var now = new Date(Date.parse(nowDate.longTime.replace(/-/g,   "/")));  
    	  //require(['jquery.mobile-1.4.4.js'], function() {
    	  //    
    	  //    alert($.mobile);
    	  //});
    	  element.on('swiperight', function() {
    		  alert('fuck');
    	  });
    	  $('.fpiwebapp-calendar a', element).each(function(i) {
    		  $(this).on('click', function() {
    			  var currentDate = scope.calendarModel.get(i);
    			  
    			  var parentUpdateDateMethod = scope.$parent[scope['updateDateMethod']];
    			  parentUpdateDateMethod && parentUpdateDateMethod(currentDate, 1);
    			  
    			  //scope.calendarModel.currentDate = currentDate;
    			  scope.calendarModel = new CalendarModel(currentDate);
    			  scope.$apply(scope.calendarModel);
    		  });
    	  });
    	  $('.fpiwebapp-calendar-month a', element).each(function(i) {
    		  $(this).on('click', function() {
    			  var currentMonth = scope.calendarModel.getMonthId(i);
    			  
    			  var parentUpdateMonthMethod = scope.$parent[scope['updateDateMethod']];
    			  parentUpdateMonthMethod && parentUpdateMonthMethod(currentMonth, 2);
    			  
    			  scope.calendarModel = new CalendarModel(currentMonth);
    			  scope.$apply(scope.calendarModel);
    		  });
    	  });

          $('.choose-p-t-r a').each(function(){
              $(this).on('click', function(){
                  $(this).addClass('cur').siblings().removeClass('cur');
                  if($(this).index() == 0){
                      $('#dayArea').show();
                      $('#monthArea').hide();
                      $('#isShowDay').show();
                      $('#isShowMonth').hide();
                  }
                  else{
                      $('#dayArea').hide();
                      $('#monthArea').show();
                      $('#isShowDay').hide();
                      $('#isShowMonth').show();
                  }
              })
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
		 * 获取给定日期在当前年的第一个月
		 */
		getMonthOfYear: function(date) {
			var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            d.setMonth(0);
			return d; 
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
