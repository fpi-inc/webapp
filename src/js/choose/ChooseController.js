angular.module('fpiwebapp.choose.ctrl', ['LocalStorageModule'])
 
.controller('ChooseController', function($rootScope, $scope, $location, $routeParams, localStorageService) {
	$scope.currentDate = new Date();
	$scope.setCurrentDate = function(date) {
		$scope.currentDate = date;
	}
});
 
