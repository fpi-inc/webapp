angular.module('fpiwebapp.choose.ctrl', ['LocalStorageModule', 'fpiwebapp.home.service'])
 
.controller('ChooseController', function($window, $rootScope, $scope, $location, $routeParams, localStorageService, HomeService) {
    $scope.currentCategory = localStorageService.get('currentCategory');
    $scope.factorDataCache = localStorageService.get('currentFactor');
    if($scope.factorDataCache.length){
        $scope.noyzData = true;
    }
    else{
        $scope.noyzData = false;
    }
    $scope.currentCate = $routeParams.currentCate;
    $scope.companyId = $routeParams.id;
    $scope.controlFactor = false;
    if($scope.currentCate == 'null'){
        $scope.controlFactor = true;
    }
    //$scope.currentTime = localStorageService.get("currentDateTime");
    $scope.routeTime = $routeParams.date;
	$scope.setCurrentDate = function(date, num) {
        if(num == 1){
            $scope.currentTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            $scope.currentTimeLong = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            localStorageService.set("currentDateTime", {'time': $scope.currentTime, 'longTime': $scope.currentTimeLong, 'type': 1});
        }
        else{
            $scope.currentTime = date.getFullYear() + '-' + (date.getMonth() + 1);
            $scope.currentTimeLong = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            localStorageService.set("currentDateTime", {'time': $scope.currentTime, 'longTime': $scope.currentTimeLong, 'type': 2});
        }
	}
    $scope.defineFunc = function(){
        if($scope.currentCate == 'null'){
            $window.location.href = '#/transport'; 
        }
        else{
            $window.location.href = '#/companyDetail/' + $scope.companyId + '/' + $scope.currentCate; 
        }
    }

    //操作
    $scope.archive = function() {
        var oldFactor = $scope.factorDataCache;
        oldFactor.splice(this.$index, 1, {'textName': this.factor.textName, 'textCode': this.factor.textCode, 'done': !this.factor.done});
        localStorageService.set('currentFactor', oldFactor);
        //$rootScope.isFactorSave = false;
    };
    //因子
    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.factorDataCache, function(todo) {
            count += !todo.done ? 0 : 1;
        });
        return count;
    };

    //$scope.factorData = [];
    //HomeService.getFactorByPort({
    //    portId: $scope.currentPorts.portId,
    //    monitorTypeCode: $scope.currentCategory
    //}, function(result){
    //    if(result){
    //        $scope.factorData = result.factor;
    //        $scope.factorDataCache = [];
    //        angular.forEach($scope.factorData, function(data){
    //            $scope.factorDataCache.push({'textName': data.factorName, 'textCode': data.factorCode, 'done': true});
    //        });
    //        localStorageService.set('currentFactor', $scope.factorDataCache);	
    //        $scope.remaining = function() {
    //            var count = 0;
    //            angular.forEach($scope.factorDataCache, function(todo) {
    //                count += !todo.done ? 0 : 1;
    //            });
    //            return count;
    //        };

    //    }
    //});
});
 
