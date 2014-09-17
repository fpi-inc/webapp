angular.module('fpiwebapp.companyDetail.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 
.controller('CompanyDetailController', function($scope, $rootScope, $location, $window, $routeParams, localStorageService, MenuServer, HomeService) {

	$scope.nowDate = $rootScope.currentDate(0);
    $scope.currentCategory = localStorageService.get('currentCategory');

	$scope.companyId = $routeParams.id;
    $scope.currentItem = 0;
    $scope.portNameArray = [];
    $scope.realDataByTableArray = [];
    if($scope.realDataByTableArray.length > 0){
        $scope.realLoading = false;
    }
    else{
        $scope.realLoading = true;
    }

    HomeService.getPortsByCompany({
        monitorTypeCode: $scope.currentCategory,
        companyId: $scope.companyId
    }, function(result){
        if(result){
            $scope.portNameArray = result.ports;
            //存储排口
            localStorageService.set('currentPorts', {portName: result.ports[0].portName, portId: result.ports[0].portId});
            $scope.currentPorts = localStorageService.get('currentPorts').portName;
            $scope.realDataByTable(result.ports[0].portId, result.ports[0].portName);
            //$scope.getHistoryDataFunc(result.ports[0].portId, $scope.nowDate);
        }
    });

    $scope.realDataByTable = function(portId, portName){
        localStorageService.set('currentPorts', {portName: portName, portId: portId});
        $scope.currentPorts = localStorageService.get('currentPorts').portName;
        $scope.isActive = false;
        HomeService.getRealDataByTable({
            monitorTypeCode: $scope.currentCategory,
            portId: portId
        }, function(result){
            if(result){
                $scope.realDataByTableArray = result.realDataTbale;
                $scope.realLoading = false;
            }
        });
    };

    //类别显示
    $scope.isActive = false;
    $scope.toggleCate = function(){
        $scope.isActive = true;
    };

    //历史数据
    $scope.historyDataArray = [];
    if($scope.historyDataArray.length > 0){
        $scope.historyLoading = false;
    }
    else{
        $scope.historyLoading = true;
    }
    $scope.getHistoryDataFunc = function(portId, time){

        HomeService.getHistoryData({
            portId: portId,
            monitorTypeCode: $scope.currentCategory,
            factors: '-1',
            dateType: 1,
            time: time
        }, function(result){
            if(result){
                $scope.historyDataArray = result.data;
                $scope.historyLoading = false;
            }
        });
    };

    //超标数据
})
.directive('tabDetail', function(){
    return{
        restrict: 'EA',
        replace: true,
        //scope: {
        //    realDataByTableArray: '@realDataByTableArray'
        //},
        //transclude: true,
        templateUrl: 'partials/company/tab-detail.html',
        link: function(scope, element, attrs){
            scope.isShow = false;
        },
        controller: function($scope, localStorageService){
            var currentItem = $scope.currentItem;
            $('.tab-content').hide();
            $('.tab-content').eq(currentItem).show();
            var tabs = $('.tab').find('a');
            var line = $('.c-line');
            var leftArray = [];
            for(var i = 0; i < tabs.length; i++){
               leftArray.push(tabs[i].offsetLeft);
            }
            //console.log(leftArray);
            line.css('left', leftArray[currentItem] + 'px');
            tabs.click(function(){
                var index = $(this).index();
                $('.tab-content').hide();
                $('.tab-content').eq(index).show();
                runCurrentLine(index);
                switch (index){
                    case 0:
                        break;
                    case 1:
                        console.log(2);
                        $scope.currentPortsAll = localStorageService.get('currentPorts');
                        $scope.getHistoryDataFunc($scope.currentPortsAll.portId, $scope.nowDate);
                        break;
                    case 2:
                        console.log(3);
                        break;
                    default:
                        break;
                }
            });
            function runCurrentLine(index){
                line.animate({'left': leftArray[index] + 'px'});
            }
        }
    }
})
.filter('timeFilter', function(){
	var timeCaseFilter = function(input){
		var words = input.substring(0, 13);
		return words;
	};
	return timeCaseFilter;
});
