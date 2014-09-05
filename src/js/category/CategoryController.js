angular.module('fpiwebapp.category.ctrl', [ 'LocalStorageModule'])
 
.controller('CategoryController', function($scope, $rootScope, $location, $window, localStorageService, MenuServer) {
    $rootScope.checkUser();
    $('.category').css('height', $rootScope.contentHeight + 'px');
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
 
