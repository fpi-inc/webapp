angular.module('fpiwebapp.choose.ctrl', ['LocalStorageModule'])
 
.controller('ChooseController', function($window, $rootScope, $scope, $location, $routeParams, localStorageService) {
    $scope.currentCate = $routeParams.currentCate;
    $scope.companyId = $routeParams.id;
    $scope.currentTime = localStorageService.get("currentDateTime");
	$scope.setCurrentDate = function(date) {
        var time = date.format('yyyy-MM-dd');
		$scope.currentTime = time;
        localStorageService.set("currentDateTime", $scope.currentTime);
	}
    $scope.defineFunc = function(){
        $window.location.href = '#/companyDetail/' + $scope.companyId + '/' + $scope.currentCate; 
    }

	$scope.factorData = localStorageService.get('currentFactor');	
    //操作
    $scope.archive = function() {
        var oldFactor = $scope.factorData;
        oldFactor.splice(this.$index, 1, {'text': this.factor.text, 'done': !this.factor.done});
        localStorageService.set('currentFactor', oldFactor);
        $rootScope.isFactorSave = false;
    };
    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.factorData, function(todo) {
            count += !todo.done ? 0 : 1;
        });
        return count;
    };
});
 
