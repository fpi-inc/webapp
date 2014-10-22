/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */



angular.module('fpiwebapp', [
  'ngRoute', 
  'fpiwebapp.region.service',
  'fpiwebapp.region.ctrl',
  'fpiwebapp.search.ctrl',
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
 
