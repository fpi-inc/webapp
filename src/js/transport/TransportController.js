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
 
