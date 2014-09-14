angular.module('fpiwebapp.homeCate.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 
.controller('HomeCateController', function($route, $scope, $rootScope, $routeParams, $location, $window, localStorageService, MenuServer, RegionService, HomeService) {
	//var cateCode = $routeParams.cateCode;
	//console.log(cateCode);
	$scope.nowDate = $rootScope.currentDate(0);
	$scope.preDate = $rootScope.currentDate(-1);
    $scope.currentUser = $rootScope.checkUser();

    $scope.routeCategory = $routeParams.cateCode;

	localStorageService.set('currentCategory', $scope.routeCategory);
    $scope.currentCategory = localStorageService.get('currentCategory');
    $scope.currentRegion = localStorageService.get('currentRegions');
    //$scope.currentUser = localStorageService.get('currentUser');
    $scope.currentRegionCode = localStorageService.get('currentRegionCode');
	
	if($scope.currentCategory == 'WW'){
		$scope.isActive = true;
	}
	if($scope.currentCategory == 'WG'){
		$scope.isSubActive = true;
	}
	
    $scope.refresh = function(){
        $route.reload();
    };
	console.log($scope.currentCategory);

    //数据传输有效率
    $scope.transPercentData = [];
    $scope.transPercentDataTxt = ['传输率', '有效率', '传输有效率'];
    HomeService.getEfficiency({
        monitorTypeCode: $scope.currentCategory,
        regionCode: $scope.currentRegionCode,
        dateTime: $scope.preDate,
        userName: $scope.currentUser
    }, function(result){
        if(result){
            var trans = result.transEfficients;
            $scope.transPercentData.push(trans[0].transPercent);
            $scope.transPercentData.push(trans[0].efficientPercent);
            $scope.transPercentData.push(trans[0].transEfficientPercent);
        }
    });
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        drawProcess();
    });

    //监测点实时状态
    $scope.stateData = [];
    HomeService.getState({
        monitorTypeCode: $scope.currentCategory,
        regionCode: $scope.currentRegionCode,
        userName: $scope.currentUser
    }, function(result){
        if(result){
            $scope.stateData = result.region;
        }
    });

    //超标排行
    $scope.overStandardData = [];
    HomeService.getOverStandardData({
        monitorTypeCode: $scope.currentCategory,
        //regionCode: $scope.currentRegionCode,
        regionCode: '33010401',
        time: $scope.nowDate,
        userName: $scope.currentUser
    }, function(result){
        if(result){
            $scope.overStandardData = result.overStandardData;
        }
    });

    //RegionService.query(function(result){
    //    var data = result.region;
    //    if(data){
    //        $scope.regionName = localStorageService.get('currentRegion') || data[0].regionName;
    //        //localStorageService.set('currentRegion', $scope.regionName);
    //    }
    //});
	//$scope.regionName = localStorageService.get('currentRegion');
	
    $scope.showCompanyDetail = function(){
        var id = 5;
        $location.path('/companyDetail/:id');
    }

	function drawProcess() {
        $('canvas.process').each(function() {
            var canpi = 40;
            //var text = commonutil.stringTrim($(this).text());
            var text = $(this).text();
            var process = text.substring(0, text.length-1);
            var canvas = this;
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canpi, canpi);
            context.beginPath();
            context.moveTo(canpi, canpi);
            context.arc(canpi, canpi, canpi, 0, Math.PI * 2, false);
            context.closePath();
            context.fillStyle = '#f5f5f5';
            context.fill();
            // 画进度
            context.beginPath();
            context.moveTo(canpi, canpi);
            context.arc(canpi, canpi, canpi, 0, Math.PI * 2 * process / 100, false);
            context.closePath();
            context.fillStyle = '#ffa54b';
            context.fill();
            // 画内部空白
            context.beginPath();
            context.moveTo(canpi, canpi);
            context.arc(canpi, canpi, (canpi - 7), 0, Math.PI * 2, true);
            context.closePath();
            context.fillStyle = 'rgba(255,255,255,1)';
            context.fill();

            context.font = "normal 20px Calibri";
            context.fillStyle = '#ffa54b';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.moveTo(canpi, canpi);
            context.fillText(text, canpi, canpi);
        })

    };



})
.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});
 
