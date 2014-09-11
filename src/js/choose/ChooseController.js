angular.module('fpiwebapp.choose.ctrl', ['LocalStorageModule'])
 
.controller('ChooseController', function($rootScope, $scope, $location, $routeParams, localStorageService) {
	$scope.factorData = $rootScope.factor;	
	//$scope.factorData = ['a', 'b'];

});
 
