angular.module('fpiwebapp.personal.ctrl', [ 'LocalStorageModule', 'fpiwebapp.personal.service'])
 
.controller('PersonalController', function($rootScope, $scope, $location, $window, localStorageService, MenuServer, PersonalService) {
    $scope.currentUser = $rootScope.checkUser();
    $scope.attentionCompanyList = [];
    $scope.historyLoading = true;
	PersonalService.showAttention({
        userName: $scope.currentUser
    }, function(result){
        if(result){
            $scope.attentionCompanyList = result.attention;
            if($scope.attentionCompanyList.length > 0){
                $scope.historyLoading = false;
            }
        }
    });
});
 
