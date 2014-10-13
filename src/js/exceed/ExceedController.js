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

    //超标统计
    $scope.noStandardData = false;
    $scope.overStandardData = [];
    HomeService.getOverStandardDataByCompany({
        monitorTypeCode: $scope.currentCategory,
        portId: '',
        factorIds: '',
        dateType: '',
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
 
