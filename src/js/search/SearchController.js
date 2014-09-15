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
	$scope.name = $routeParams.key || $scope.companyName;
    $scope.companyArray = [];
    $scope.search = function(){
        SearchService.query({
            monitorTypeCode: 'WW',
            companyName: $scope.name,
            userName: 'root'
        }, function(result){
            if(result){
                $scope.companyArray = result.company;
            }
        });	
    };
});
 
