angular.module('fpiwebapp.companyDetail.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
.filter('timeFormat', function(){
	var timeFormatFilter = function(input){
		return input.substring(0, 13) + '时';
	};
	return timeFormatFilter;
})
.controller('CompanyDetailController', function($scope, $rootScope, $location, $window, $routeParams, localStorageService, MenuServer, HomeService) {
	$scope.companyId = $routeParams.id;
	$scope.currentItem = $routeParams.currentCate;

	$scope.nowDate = $rootScope.currentDate(0);
    if(!localStorageService.get('currentDateTime')){
        localStorageService.set('currentDateTime', {'time': $scope.nowDate, 'type': 1});
        //localStorageService.set('currentDateTime', new Date());
    }
    $scope.currentTime = localStorageService.get('currentDateTime');

    $scope.currentCategory = localStorageService.get('currentCategory');
    //类别显示
    $scope.isActive = false;
    $scope.toggleCate = function(){
        $scope.isActive = true;
    };
    //排口
    $scope.portNameArray = [];
    $scope.portsDataByCompany = function(){
        
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
                $scope.getHistoryDataFunc(result.ports[0].portId, $scope.currentTime);
                $scope.getOverStandarData(result.ports[0].portId, $scope.currentTime);
            }
        });
    };
    //实时数据
    $scope.realDataByTableArray = [];
    if($scope.realDataByTableArray.length > 0){
        $scope.realLoading = false;
    }
    else{
        $scope.realLoading = true;
    }

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
            factors: 'F_011',
            dateType: time.type,
            time: time.time
        }, function(result){
            if(result){
                $scope.historyDataArray = result.data;
                $scope.historyLoading = false;
            }
        });
        
    };
    //超标数据
    $scope.overStandarData = [];
    $scope.getOverStandarData = function(portId, time){
        HomeService.getOverStandardDataByCompany({
            monitorTypeCode: $scope.currentCategory,
            portId: portId,
            factorIds: '-1',
            dateType: time.type,
            time: time.time
        },function(result){
            if(result){
                $scope.overStandarData = result.overStandardData;

                //$scope.factor = [];
                //$scope.factorAll = [];
                //angular.forEach(standarData, function(standarItem){
                //    $scope.factorAll.push({'text': standarItem.fatorName, 'done': true});
                //});
                //var hasCurrentFactor = localStorageService.get('currentFactor');
                //if(hasCurrentFactor){
                //    angular.forEach(hasCurrentFactor, function(fac){
                //        if(!fac.done){
                //            $scope.factor.push(fac.text);
                //        }
                //    });
                //    $scope.overStandarData = (function(){
                //        var factorData = [];
                //        //处理已选中的因子
                //        angular.forEach($scope.factor, function(factor) {
                //            angular.forEach(standarData, function(standar, index){
                //                if(standar.fatorName.toLowerCase() == factor.toLowerCase()){
                //                    standarData.splice(index, 1);
                //                }
                //            });
                //        });

                //        factorData = standarData;
                //        return factorData;
                //    })();
                //}
                //else{
                //    localStorageService.set('currentFactor', $scope.factorAll);
                //    $scope.overStandarData = standarData;
                //}
            }        
        }); 
    };

})
.directive('tabDetail', ['$location', function($location){
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
            $scope.portsDataByCompany();

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
                controlTab(index);
            });
            controlTab($scope.currentItem);
            function controlTab(index){
                $('.tab-content').hide();
                $('.tab-content').eq(index).show();
                runCurrentLine(index);
                if(index == 0){
                    if(localStorageService.get('currentPorts')){
                        $scope.currentPortsAll = localStorageService.get('currentPorts');
                        $scope.realDataByTable($scope.currentPortsAll.portId, $scope.currentPortsAll.portName);
                    }
                    //window.location.href = '#/companyDetail/' + $scope.companyId + '/' + index; 
                }
                else if(index == 1){
                    if(localStorageService.get('currentPorts')){
                        $scope.currentPortsAll = localStorageService.get('currentPorts');
                        $scope.getHistoryDataFunc($scope.currentPortsAll.portId, $scope.currentTime);
                    }
                    //window.location.href = '#/companyDetail/' + $scope.companyId + '/' + index; 
                }
                else if(index == 2){
                    if(localStorageService.get('currentPorts')){
                        $scope.currentPortsAll = localStorageService.get('currentPorts');
                        $scope.getOverStandarData($scope.currentPortsAll.portId, $scope.currentTime);
                    }
                    //window.location.href = '#/companyDetail/' + $scope.companyId + '/' + index; 
                }
            };
            function runCurrentLine(index){
                line.animate({'left': leftArray[index] + 'px'});
            }
        }
    }
}]);
