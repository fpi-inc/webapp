angular.module('fpiwebapp.stateDetail.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 
.controller('StateDetailController', function($routeParams, $rootScope, $scope, $location, $window, localStorageService, HomeService) {
    $scope.currentCategory = localStorageService.get('currentCategory');
    $scope.currentRegionCode = localStorageService.get('currentRegionCode');
    $scope.currentUser = $rootScope.checkUser();
    $scope.state = $routeParams.state;

    //监测点实时状态详情
    $scope.noPortData = true;
    $scope.stateDetailData = [];
    HomeService.getDetailState({
        monitorTypeCode: $scope.currentCategory,
        regionCode: $scope.currentRegionCode || '',
        companyName: '',
        state: $scope.state,
        userName: $scope.currentUser
    }, function(result){
        if(result){
            $scope.stateDetailData = result.stateDetail;
        }
    });


});
 
