angular.module('fpiwebapp.companyDetailTab.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 

.controller('CompanyDetailTabController', function($scope, $rootScope, $location, $window, $routeParams, localStorageService, MenuServer, HomeService) {
	//console.log($routeParams);
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
    $scope.overStandarData = [];
    HomeService.getOverStandardDataByCompany({
        monitorTypeCode: 'WW',
        portId: '2c93871641b498170141b49cfb6b0004',
        factorIds: '-1',
        dateType: 1,
        time: '2014-09-09'
    },function(result){
        if(result){
            var standarData = result.overStandardData;

            $scope.factor = [];
            $scope.factorAll = [];
            angular.forEach(standarData, function(standarItem){
                $scope.factorAll.push({'text': standarItem.fatorName, 'done': true});
            });
            var hasCurrentFactor = localStorageService.get('currentFactor');
            if(hasCurrentFactor){
                angular.forEach(hasCurrentFactor, function(fac){
                    if(!fac.done){
                        $scope.factor.push(fac.text);
                    }
                });
                $scope.overStandarData = (function(){
                    var factorData = [];
                    //处理已选中的因子
                    angular.forEach($scope.factor, function(factor) {
                        angular.forEach(standarData, function(standar, index){
                            if(standar.fatorName.toLowerCase() == factor.toLowerCase()){
                                standarData.splice(index, 1);
                            }
                        });
                    });

                    factorData = standarData;
                    return factorData;
                })();
            }
            else{
                localStorageService.set('currentFactor', $scope.factorAll);
                $scope.overStandarData = standarData;
            }
        }        
    }); 

    HomeService.getDetailOverStandardDataByCompany({
        monitorTypeCode: 'WW',
        portId: '2c93871641b498170141b49cfb6b0004',
        factorId: '2c93871641b5db390141b5def6f80001',
        standardValue: '30.0',
        companyName: '长兴兴长污水处理有限公司',
        dateType: 1,
        time: '2014-09-09'
    }, function(result){
        if(result){
        }
    });
    
});

