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
 
