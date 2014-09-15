angular.module('fpiwebapp.search.ctrl', ['LocalStorageModule', 'fpiwebapp.search.service'])
 
.controller('SearchController', function($rootScope, $scope, $location, $routeParams, localStorageService, SearchService) {
	
	//$rootScope.menu.hideItems();
	////查询
	//$scope.searchCompanyName = [];
	//$scope.name = $routeParams.name;
	//$scope.searchCompany = function(){
	//	var name = $scope.name;
	//	//获取数据
	//	// CompanyService.search({name:name},function(result){
	//	// 	$scope.searchCompanyName = result.data;
	//	// });
	//	console.log($scope.name);
	//};
    //$scope.companyName = '';
    //$scope.searchCompany = function(){
    //    SearchService.query({
    //        monitorTypeCode: 'WW',
    //        companyName: $scope.searchCompany,
    //        userName: 'root'
    //    }, function(result){
    //        if(result){
    //        }
    //    });	
    //};
	//$scope.searchName = '';
	//$scope.searchName = $scope.companyName;
    $scope.companyArray = [];
	$scope.name = $routeParams.key;
	if($scope.name !== undefined){
		var name = $scope.name;
		SearchService.query({
			monitorTypeCode: 'WW',
			companyName: name,
			userName: 'root'
		}, function(result){
			if(result){
				$scope.companyArray = result.company;
			}
		});	

	}

    $scope.search = function(){
		$scope.searchName = $scope.companyName;
		$location.url('/search/' + $scope.searchName);
		//$scope.searchFunc();
		//$scope.name = $routeParams.key;
    };
});
 
