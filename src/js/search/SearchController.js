angular.module('fpiwebapp.search.ctrl', ['LocalStorageModule', 'fpiwebapp.search.service'])
 
.controller('SearchController', function($rootScope, $scope, $location, $routeParams, localStorageService, SearchService) {
    $scope.toggle = false;
    $scope.focusFunc = function(){
        console.log("focus");
        $scope.toggle = true;
    };
    $scope.blurFunc = function(){
        console.log("blur");
        $scope.toggle = false;
    };

	$scope.name = $routeParams.key || '';

    $scope.companyArray = [];

	if($scope.name !== undefined){
		SearchService.search({
			monitorTypeCode: 'WW',
			//companyName: escape(escape($scope.name)),
			companyName: $scope.name,
			userName: 'root'
		}, function(result){
			if(result){
				$scope.companyArray = result.company;
			}
		});	

	}

    $scope.search = function() {
        $location.path('/search/' + $scope.key);
    }

    //快速搜索
    $scope.quickFunc = function(manageLevel){
        
		SearchService.quickSearch({
			monitorTypeCode: 'WW',
			manageLevel: manageLevel,
			userName: 'root'
		}, function(result){
			if(result){
				$scope.companyArray = result.company;
			}
		});	
    };

});
 
