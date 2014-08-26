
angular.module('fpiwebapp', [
  'ngRoute', 
  'fpiwebapp.region.service',
  'fpiwebapp.region.ctrl',
  'fpiwebapp.search.ctrl',
  'fpiwebapp.home.ctrl',
  'fpiwebapp.exceed.ctrl',
  'fpiwebapp.transport.ctrl',
  'fpiwebapp.personal.ctrl',
  'fpiwebapp.common'
  ])
 
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
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
  $rootScope.isChoice = false;
  var menu = new MenuServer();
  //系统菜单
  $rootScope.choiceMenu = function(){
    if($rootScope.isChoice){
      return;
    }
    menu.init();
    $rootScope.isChoice = true;
  }

});
 
