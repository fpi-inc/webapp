angular.module('fpiwebapp.companyDetailTab.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 

.controller('CompanyDetailTabController', function($scope, $rootScope, $location, $window, $routeParams, localStorageService, MenuServer, HomeService) {
	console.log($routeParams);
    $scope.myText = 'Not Selected';
    $scope.currentDate = '';
    $scope.updateMyText = function(date) {
        $scope.myText = 'Selected';
    };

    //超标数据
    var test = [
{"factorUnit":null,"fatorName":"COD","alarmValueScope":"30.26~30.26","standardValue":30.0,"overTimesScope":"0.01~0.01","hour":1,"companyName":"长兴兴长污水处理有限公司","portId":"2c93871641b498170141b49cfb6b0004","portName":"长兴兴长污水处理有限公司总排口"},
{"factorUnit":null,"fatorName":"NH4","alarmValueScope":"30.26~30.26","standardValue":30.0,"overTimesScope":"0.01~0.01","hour":1,"companyName":"长兴兴长污水处理有限公司","portId":"2c93871641b498170141b49cfb6b0004","portName":"长兴兴长污水处理有限公司总排口"},
{"factorUnit":null,"fatorName":"O3","alarmValueScope":"30.26~30.26","standardValue":30.0,"overTimesScope":"0.01~0.01","hour":1,"companyName":"长兴兴长污水处理有限公司","portId":"2c93871641b498170141b49cfb6b0004","portName":"长兴兴长污水处理有限公司总排口"}
];
    $scope.overStandardData = [];
    $rootScope.factor = ["COD", "O3"];
    HomeService.getOverStandardDataByCompany({
        monitorTypeCode: 'WW',
        portId: '2c93871641b498170141b49cfb6b0004',
        factorIds: '-1',
        dateType: 1,
        time: '2014-09-09'
    },function(result){
        if(result){
            var standarData = test;
            for(var i = 0; i < standarData.length; i++){
                var item = standarData[i];
                //$rootScope.factor.push(item.fatorName);
            }
            console.log($rootScope.factor);
            $scope.overStandarData = (function(){
                var factorData = [];
                angular.forEach(standarData, function(standar, index) {
                    angular.forEach($rootScope.factor, function(factor){
                        if(standar.fatorName == factor){
                            standarData.splice(index, 1);
                        }
                    });
                });
                factorData = standarData;
                return factorData;
            })();
        }        
    }); 

    
});

