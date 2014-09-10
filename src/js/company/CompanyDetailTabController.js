angular.module('fpiwebapp.companyDetailTab.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 

.controller('CompanyDetailTabController', function($scope, $location, $window, $routeParams, localStorageService, MenuServer, HomeService) {
	console.log($routeParams);
    $scope.myText = 'Not Selected';
    $scope.currentDate = '';
    $scope.updateMyText = function(date) {
        $scope.myText = 'Selected';
    };

    //超标数据
    $scope.overStandarData = [];
    HomeService.getOverStandardDataByCompany({
        monitorTypeCode: 'WW',
        portId: '2c93871641b498170141b49cfb6b0004',
        factorIds: '-1',
        dateType: 1,
        time: '2014-09-09'
    },function(result){
        if(result){
            $scope.overStandarData = result.overStandardData;
        }        
    }); 

    
});

