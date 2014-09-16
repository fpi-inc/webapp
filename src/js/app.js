
angular.module('fpiwebapp', [
  'ngRoute', 
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
 
