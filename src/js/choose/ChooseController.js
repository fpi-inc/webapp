angular.module('fpiwebapp.choose.ctrl', ['LocalStorageModule'])
 
.controller('ChooseController', function($rootScope, $scope, $location, $routeParams, localStorageService) {
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
 
