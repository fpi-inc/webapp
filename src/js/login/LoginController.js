angular.module('fpiwebapp.login.ctrl', [ 'LocalStorageModule', 'fpiwebapp.login.service'])
 
.controller('LoginController', function($scope, $location, $window, localStorageService, MenuServer, md5, LoginService) {

    $scope.list = [];
    $scope.user = '';
    $scope.passw = '';
    $scope.submit = function() {
        //if ($scope.user && $scope.passw) {
        //    var params = {
        //        username: this.user,
        //        password: md5.createHash(this.passw)
        //    }
        //    LoginService.query(params, function(result){
        //        //
        //    });
        //    $scope.list.push(this.user + ', ' + md5.createHash(this.passw));
        //}
        $location.path('/category');
    };
});
 
