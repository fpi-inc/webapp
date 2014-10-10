angular.module('fpiwebapp.choose.ctrl', ['LocalStorageModule', 'fpiwebapp.home.service'])
 
.controller('ChooseController', function($window, $rootScope, $scope, $location, $routeParams, localStorageService, HomeService) {
    $scope.currentCategory = localStorageService.get('currentCategory');
    $scope.currentPorts = localStorageService.get('currentPorts');
    $scope.currentCate = $routeParams.currentCate;
    $scope.companyId = $routeParams.id;
    //$scope.currentTime = localStorageService.get("currentDateTime");
    $scope.routeTime = $routeParams.date;
	$scope.setCurrentDate = function(date, num) {
        var time = '';
        if(num == 1){
            time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            $scope.currentTime = time;
            localStorageService.set("currentDateTime", {'time': $scope.currentTime, 'type': 1});
        }
        else{
            time = date.getFullYear() + '-' + (date.getMonth() + 1);
            $scope.currentTime = time;
            localStorageService.set("currentDateTime", {'time': $scope.currentTime, 'type': 2});
        }
	}
    $scope.defineFunc = function(){
        $window.location.href = '#/companyDetail/' + $scope.companyId + '/' + $scope.currentCate; 
    }

    //操作
    $scope.archive = function() {
        var oldFactor = $scope.factorDataCache;
        oldFactor.splice(this.$index, 1, {'textName': this.factor.textName, 'textCode': this.factor.textCode, 'done': !this.factor.done});
        localStorageService.set('currentFactor', oldFactor);
        //$rootScope.isFactorSave = false;
    };
    //因子
    $scope.factorData = [];
    HomeService.getFactorByPort({
        portId: $scope.currentPorts.portId,
        monitorTypeCode: $scope.currentCategory
    }, function(result){
        if(result){
            $scope.factorData = result.factor;
            $scope.factorDataCache = [];
            angular.forEach($scope.factorData, function(data){
                $scope.factorDataCache.push({'textName': data.factorName, 'textCode': data.factorCode, 'done': true});
            });
            localStorageService.set('currentFactor', $scope.factorDataCache);	
            $scope.remaining = function() {
                var count = 0;
                angular.forEach($scope.factorDataCache, function(todo) {
                    count += !todo.done ? 0 : 1;
                });
                return count;
            };

        }
    });
});
 
