angular.module('fpiwebapp.search.key.ctrl', ['LocalStorageModule', 'fpiwebapp.search.service'])
 
.controller('SearchKeyController', function($rootScope, $scope, $location, $routeParams, localStorageService, SearchService) {
	
	//$rootScope.menu.hideItems();
	////查询
	//$scope.searchCompanyName = [];

	$scope.name = $routeParams.key || $scope.companyName;
	//$scope.searchCompany = function(){
	//	var name = $scope.name;
	//	//获取数据
	//	// CompanyService.search({name:name},function(result){
	//	// 	$scope.searchCompanyName = result.data;
	//	// });
	//	console.log($scope.name);
	//};
    $scope.companyArray = [];
    SearchService.query({
        monitorTypeCode: 'WW',
        companyName: $scope.name,
        userName: 'root'
    }, function(result){
        if(result){
            $scope.companyArray = result.company;
        }
    });	
});
 
