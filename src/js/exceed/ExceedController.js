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

    //从缓存中获取因子
    $scope.getCacheFactor = function(){
        if(!localStorageService.get('currentFactor')){
            return '-1';
        }
        else{
            var factor = localStorageService.get('currentFactor');
            var factorArray = [];
            var count = 0;
            angular.forEach(factor, function(todo){
                if(todo.done){
                    factorArray.push(todo.textCode);
                }
                //factorArray.push(todo.done ? todo.textCode : null);
                count += todo.done ? 1 : 0;
            });
            if(count == factor.length){
                return '-1';
            }
            else{
                return factorArray.toString();
            }
        }
    };

    //超标统计
    $scope.noStandardData = false;
    $scope.overStandardData = [];
    HomeService.getOverStandardDataByOverData({
        monitorTypeCode: $scope.currentCategory,
        regionCode: $scope.currentRegionCode || '',
        time: $scope.currentTime.time,
        dateType: $scope.currentTime.type,
        factorIds: $scope.getCacheFactor(),
        userName: $scope.currentUser
    }, function(result){
        if(result){
            if(result.overStandardData.length > 0){
                $scope.overStandardData = result.overStandardData;
            }
            else{
                $scope.noStandardData = true;
            }
            $scope.setPortsFactorData();
        }
    });
    $scope.showCompanyDetail = function(id, currentCate){
        //$location.path('/companyDetail/:id/:currentCate');
        $window.location.href = '#/companyDetail/' + id + '/' + currentCate;
    }


    //获取超标排口下的因子
    $scope.factorData = [];
    $scope.setPortsFactorData = function(currentCategory){
        if(!localStorageService.get('currentFactor')){

            HomeService.getOverStandardDataFactor({
                monitorTypeCode: $scope.currentCategory
            }, function(result){
                if(result){
                    $scope.factorData = result.factor;
                    $scope.factorDataCache = [];
                    angular.forEach($scope.factorData, function(data){
                        $scope.factorDataCache.push({'textName': data.factorName, 'textCode': data.factorId, 'done': true});
                    });
                    localStorageService.set('currentFactor', $scope.factorDataCache);	
                }
            });
        }
    };

});
 
