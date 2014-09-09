angular.module('fpiwebapp.region.ctrl', ['LocalStorageModule'])
 
.controller('SelectRegionController', function($scope, $location, $rootScope, localStorageService, RegionService) {


	//init 地区
	//$scope.regions = ['滨江', '江干', '西湖', '上城', '拱墅', '萧山', '下城', '余杭', '杭州'];
    $scope.currentName = localStorageService.get('currentRegions');
    $scope.currentCate = localStorageService.get('currentCategory');
    $scope.isLoading = false;
    $scope.regions = [];
	//从服务端获取地区数据
    RegionService.query(function(result){
        var regionData = result.region;
        if(regionData.length > 0){
            for(var i = 0; i < regionData.length; i++){
                var item = regionData[i];
                $scope.regions.push(item.regionName);
            }
            $scope.isLoading = true;
            $scope.dataFunc($scope.regions);
        }
    });

    $scope.dataFunc = function(regions){
        var areas = [];
        for (var i = 0; i < regions.length; i++) {
            if (i % 3 == 0){
                areas.push([]);	
            }
            areas[areas.length-1].push(regions[i]);
        }
        return $scope.areas = areas;
    };

    $scope.dataFunc($scope.regions);

  	$scope.selectFunc = function(name){
  		console.log(name);
  		//localStorageService.clearAll();
    	localStorageService.set('currentRegions', name);
  		$location.path("/cate/" + $scope.currentCate);
  	}
	
});
 
