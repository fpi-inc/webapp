angular.module('fpiwebapp.search.ctrl', ['LocalStorageModule', 'fpiwebapp.personal.service', 'fpiwebapp.search.service'])
.filter('keyWords', function($sce){
    //var keyWordsFilter = function(input){
    //    var key = "长";
    //    var words = input;
    //    var color = "red";
    //    var sKey = "<span style='color: " + color + ";'>" + key + "</span>";
    //    var rStr = new RegExp(key, "g");
    //    words = words.replace(rStr, sKey);
    //    return $sce.trustAsHtml(words);

    //};
    return keyWordsFilter;
})
.controller('SearchController', function($rootScope, $scope, $location, $routeParams, localStorageService, PersonalService, SearchService, $sce) {
    $scope.currentUser = $rootScope.checkUser();
    $scope.currentCategory = localStorageService.get('currentCategory');
    $scope.toggle = false;
    $scope.htmlShow = function(str) {
        var key = $scope.name;
        var words = str;
        var color = "#19b2e4";
        var sKey = "<span style='color: " + color + ";'>" + key + "</span>";
        var rStr = new RegExp(key, "g");
        words = words.replace(rStr, sKey);
        return $sce.trustAsHtml(words);
    }
    $scope.focusFunc = function(){
        console.log("focus");
        $scope.toggle = true;
    };
    $scope.isNoData = false;
    //$scope.blurFunc = function(){
    //    console.log("blur");
    //    $scope.toggle = false;
    //};
    $scope.hasData = false;

	$scope.name = $routeParams.key || '';

    $scope.companyArray = [];

	if($scope.name !== undefined){
		SearchService.search({
			monitorTypeCode: $scope.currentCategory,
			//companyName: escape(escape($scope.name)),
			companyName: $scope.name,
			userName: $scope.currentUser
		}, function(result){
			if(result){
                $scope.companyAttentionArray = [];
				$scope.companyArray = result.company;
                if($scope.companyArray.length > 0){
                    $scope.hasData = true;
                    $scope.isNoData = false;
                }
                else{
                    $scope.hasData = false;
                    $scope.isNoData = true;
                }
                //attention
                angular.forEach($scope.companyArray, function(value, key){
                    var txt = {};
                    if(value.hasAttention){
                        txt.html = '已关注';
                        txt.css = 'atten';
                    }
                    else{
                        txt.html = '未关注';
                        txt.css = 'addAtten';
                    }
                    $scope.companyAttentionArray.push(txt);
                });
			}
		});	

	}
    $scope.addAttentionFunc = function(compId, txt){
        if(txt == '已关注'){
            return;
        }
        PersonalService.saveAttention({
            userName: $scope.currentUser,
            companyId: compId 
        }, function(result){
            if(result){
                //$window.location.href = "/personal";
                $location.path('/personal');
            }
        });
    };

    $scope.search = function() {
        $location.path('/searchAttention/' + $scope.key);
    }

    //快速搜索
    $scope.quickFunc = function(manageLevel){
        $scope.isActiveA = false;
        $scope.isActiveB = false;
        $scope.isActiveC = false;
        switch (manageLevel){
            case 1:
                $scope.isActiveA = true;
                $scope.isActiveB = false;
                $scope.isActiveC = false;
                break;
            case 2:
                $scope.isActiveA = false;
                $scope.isActiveB = true;
                $scope.isActiveC = false;
                break;
            case 3:
                $scope.isActiveA = false;
                $scope.isActiveB = false;
                $scope.isActiveC = true;
                break;
            default:
                break;
        }
        
		SearchService.quickSearch({
			monitorTypeCode: $scope.currentCategory,
			manageLevel: manageLevel,
			userName: $scope.currentUser
		}, function(result){
			if(result){
				$scope.companyArray = result.company;
                if($scope.companyArray.length > 0){
                    $scope.hasData = true;
                    $scope.isNoData = false;
                }
                else{
                    $scope.hasData = false;
                    $scope.isNoData = true;
                }
			}
		});	
    };

    //清除历史记录
    $scope.clearHistory = function(){
        $scope.companyArray = [];
    };
    //清除排口缓存
    $scope.clearPortsCache = function(){
        localStorageService.remove('currentPorts');
    }; 

})
.filter('keyWords', function(){
	var keyWordsFilter = function(input){
		var text = '';
		var keyWords = '长兴';
		var words = input;
		text = words.replace(keyWords, '<span style="color: red;">' + keyWords + '</span>');
		return text;
	}
	return keyWordsFilter;
});
 
