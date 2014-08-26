angular.module('fpiwebapp.region.ctrl', ['LocalStorageModule'])
 
.controller('SelectRegionController', function($scope, $location, $rootScope, localStorageService) {

	$(".coverCls").remove();
	$(".menuItemCls").remove();
	$rootScope.isChoice = false;
	//init 地区
	var regions = ['滨江', '江干', '西湖', '上城', '拱墅', '萧山', '下城', '余杭', '杭州'];
	//从服务端获取地区数据
	//
	$scope.currentName = localStorageService.get('currentRegion');

	$scope.dataFunc = function(){
		var areas = [];
	    for (var i = 0; i < regions.length; i++ ) {
	        if (i % 3 == 0){
	        	areas.push([]);	
	        }
	        areas[areas.length-1].push(regions[i]);
	    }
	  	return $scope.areas = areas;
	  }();

  	$scope.selectFunc = function(name){
  		console.log(name);
  		// Start fresh
  		localStorageService.clearAll();
  		// Set a key
    	localStorageService.set('currentRegion', name);
  		$location.path("#/");
  	}
	
});
 
