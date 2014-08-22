
angular.module('fpiwebapp', [
  'ngRoute', 
  'fpiwebapp.home.ctrl',
  'fpiwebapp.common'
  ])
 
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'HomeController',
      templateUrl:'/app/partials/home/home.html'
    })
    // .when('/edit/:projectId', {
    //   controller:'EditCtrl',
    //   templateUrl:'detail.html'
    // })
    // .when('/new', {
    //   controller:'CreateCtrl',
    //   templateUrl:'detail.html'
    // })
    .otherwise({
      redirectTo:'/'
    });
});
 


angular.module('fpiwebapp.home.ctrl', ['fpiwebapp.category.service'])
 
.controller('HomeController', function($scope, CategoryService) {
  $scope.name = 'fpi';
	var aaa = CategoryService.query(function(){
			$scope.categories = aaa.aaa;

			// if($scope.categories.length > 0){
			// 	$scope.selectCategory($scope.categories[0]);
			// }
		});
});
 



angular.module('fpiwebapp.category.service', ['ngResource']).
	factory('CategoryService', ['$resource', function($resource) {
		return $resource('http://172.19.4.88:8090/demo/image/load/list.do', {callback: 'JSON_CALLBACK'}, {
			query: {method: 'JSONP'},
		});
	}]);