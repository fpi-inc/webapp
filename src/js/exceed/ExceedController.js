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
 
