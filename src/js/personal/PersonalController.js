angular.module('fpiwebapp.personal.ctrl', [ 'LocalStorageModule', 'fpiwebapp.personal.service'])
 
.controller('PersonalController', function($rootScope, $scope, $location, $window, localStorageService, MenuServer, PersonalService) {
    $scope.currentCategory = localStorageService.get('currentCategory');
    //清除排口缓存
    $scope.clearPortsCache = function(){
        localStorageService.remove('currentPorts');
    }; 
    $scope.currentUser = $rootScope.checkUser();
    $scope.attentionCompanyList = [];
    $scope.historyLoading = true;
    $scope.noAttenData = true;
    $scope.showAttentionFunc = function(){
        PersonalService.showAttention({
            monitorTypeCode: $scope.currentCategory,
            userName: $scope.currentUser
        }, function(result){
            if(result){
                $scope.attentionCompanyList = result.attention;
                if($scope.attentionCompanyList.length >= 0){
                    $scope.historyLoading = false;
                }
                if($scope.attentionCompanyList.length == 0){
                    $scope.noAttenData = false;
                }
                else{
                    $scope.noAttenData = true;
                }
            }
        });
    };
    $scope.showAttentionFunc();
    //是否关注
    $scope.isComp = false;
    $scope.delAttention = [];
    $scope.isAttentionFunc = function(target, companyId){
        $scope.currentHeart = angular.element(target);
        if($scope.currentHeart.context.className == 'icon-heart'){
            $scope.currentHeart.context.className = 'icon-heart-empty';           
            $scope.delAttention.push(companyId);
            if($scope.delAttention.length > 0){
                $scope.isComp = true;
            }
            else{
                $scope.isComp = false;
            }
        }
        else{
            $scope.currentHeart.context.className = 'icon-heart';           
            $scope.remove($scope.delAttention, companyId);
            if($scope.delAttention.length > 0){
                $scope.isComp = true;
            }
            else{
                $scope.isComp = false;
            }
        }
    };
    $scope.remove = function(obj, val){
        var index = $scope.indexOf(obj, val);
        if(index > -1){
            obj.splice(index, 1);
        }
    };
    $scope.indexOf = function(obj, val){
        for(var i = 0; i < obj.length; i++){
            if(obj[i] == val){
                return i;
            }
            else{
                return -1;
            }
        }
    };
    $scope.complateFunc = function(){
        angular.forEach($scope.delAttention, function(value){
            PersonalService.deleteAttention({
                //monitorTypeCode: $scope.currentCategory,
                userName: $scope.currentUser,
                companyId: value
            }, function(result){
                
                $scope.showAttentionFunc();
            });
        });
    };
});
 
