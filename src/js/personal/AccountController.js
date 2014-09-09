angular.module('fpiwebapp.account.ctrl', [ 'LocalStorageModule'])
 
.controller('AccountController', function($route, $scope, $rootScope, $location, $window, localStorageService, MenuServer) {

    $scope.currentUser = $rootScope.checkUser();
    //$scope.currentUser = localStorageService.get('currentUser');
    $scope.signOut = function(){
        localStorageService.clearAll();
        $route.reload();
    };
});
 
