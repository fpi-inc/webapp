angular.module('fpiwebapp.category.ctrl', [ 'LocalStorageModule'])
 
.controller('CategoryController', function($scope, $location, $window, localStorageService, MenuServer) {
    $scope.list = [];
    $scope.user = '';
    $scope.passw = '';
    $scope.submit = function() {
        //if ($scope.text) {
        //    $scope.list.push(this.user);
        //    $scope.text = '';
        //}
        $location.path('/main');
    };
});
 
