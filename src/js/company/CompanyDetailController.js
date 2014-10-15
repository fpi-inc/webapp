angular.module('fpiwebapp.companyDetail.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
.filter('timeFormat', function(){
	var timeFormatFilter = function(input){
		return input.substring(0, 13) + '时';
	};
	return timeFormatFilter;
})
.controller('CompanyDetailController', function($route, $scope, $rootScope, $location, $window, $routeParams, localStorageService, MenuServer, HomeService) {

	$scope.companyId = $routeParams.id;
	$scope.currentItem = $routeParams.currentCate;

	$scope.nowDate = $rootScope.currentDate(0);
    if(!localStorageService.get('currentDateTime')){
        localStorageService.set('currentDateTime', {'time': $scope.nowDate, 'longTime': $scope.nowDate, 'type': 1});
        //localStorageService.set('currentDateTime', new Date());
    }
    $scope.currentTime = localStorageService.get('currentDateTime');

    $scope.currentCategory = localStorageService.get('currentCategory') || 'WW';

    $scope.isCompanyUser = false;
    //企业用户
    $scope.currentCompanyOrAdmin = localStorageService.get('currentCompanyOrAdmin');
    if($scope.currentCompanyOrAdmin == 'company'){
        $scope.isCompanyUser = true;
        if($scope.currentCategory == 'WW'){
            $scope.isCompanyActive = true;
            $scope.isSubCompanyActive = false;
        }
        else{
            $scope.isCompanyActive = false;
            $scope.isSubCompanyActive = true;
        }
    }
    $("#isCompanyUserId > a").each(function(){
        $(this).on('click', function(){
            if($(this).index() == 0){
                $scope.isCompanyActive = true;
                $scope.isSubCompanyActive = false;
                localStorageService.set('currentCategory', 'WW');
                $route.reload();
            }
            else{
                $scope.isSubCompanyActive = true;
                $scope.isCompanyActive = false;
                localStorageService.set('currentCategory', 'WG');
                $route.reload();
            }
        });
    });
    $scope.refresh = function(){
        $route.reload();
    };

    //类别显示
    $scope.isActive = false;
    $scope.toggleCate = function(){
        $scope.isActive = true;
    };
    $scope.toggleLeave = function(){
        $scope.isActive = false;
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
                if(!localStorageService.get('currentPorts')){
                    localStorageService.set('currentPorts', {portName: result.ports[0].portName, portId: result.ports[0].portId});
                    $scope.portTitle = result.ports[0].portName;
                    $scope.realDataByTable(result.ports[0].portId, result.ports[0].portName);
                    //$scope.realDataByTableChart(result.ports[0].portId, result.ports[0].portName);
                    $scope.getHistoryDataFunc(result.ports[0].portId, $scope.currentTime);
                    $scope.getHistoryDataFuncChart(result.ports[0].portId, $scope.currentTime);
                    $scope.getOverStandarData(result.ports[0].portId, $scope.currentTime);
                    $scope.setPortsFactorData(result.ports[0].portId, $scope.currentCategory);
                }
                else{
                    $scope.currentPorts = localStorageService.get('currentPorts');
                    $scope.portTitle = $scope.currentPorts.portName;
                    $scope.realDataByTable($scope.currentPorts.portId, $scope.currentPorts.portName);
                    //$scope.realDataByTableChart($scope.currentPorts.portId, $scope.currentPorts.portName);
                    $scope.getHistoryDataFunc($scope.currentPorts.portId, $scope.currentTime);
                    $scope.getHistoryDataFuncChart($scope.currentPorts.portId, $scope.currentTime);
                    $scope.getOverStandarData($scope.currentPorts.portId, $scope.currentTime);
                    //$scope.setPortsFactorData($scope.currentPorts.portId, $scope.currentCategory);
                }
            }
        });
    };

    //操作排口
    $scope.controlAllPorts = function(portId, portName){
        $scope.cartAllData = [];
        $scope.realDataByTable(portId, portName);
        //$scope.realDataByTableChart(portId, portName);
        $scope.getHistoryDataFunc(portId, $scope.currentTime);
        $scope.getHistoryDataFuncChart(portId, $scope.currentTime);
        $scope.getOverStandarData(portId, $scope.currentTime);
        $scope.setPortsFactorData(portId, $scope.currentCategory);
        $scope.isActiveHistory = false;
    };

    //获取排口下的因子
    $scope.factorData = [];
    $scope.setPortsFactorData = function(portId, currentCategory){

        HomeService.getFactorByPort({
            portId: portId,
            monitorTypeCode: $scope.currentCategory
        }, function(result){
            if(result){
                $scope.factorData = result.factor;
                $scope.factorDataCache = [];
                angular.forEach($scope.factorData, function(data){
                    $scope.factorDataCache.push({'textName': data.factorName, 'textCode': data.factorId, 'done': true});
                });
                localStorageService.set('currentFactor', $scope.factorDataCache);	
            }
        });
    };

    //从缓存中获取因子
    $scope.getCacheFactor = function(){
        if(!localStorageService.get('currentFactor')){
            return '-1';
        }
        else{
            var factor = localStorageService.get('currentFactor');
            var factorArray = [];
            var count = 0;
            angular.forEach(factor, function(todo){
                if(todo.done){
                    factorArray.push(todo.textCode);
                }
                //factorArray.push(todo.done ? todo.textCode : null);
                count += todo.done ? 1 : 0;
            });
            if(count == factor.length){
                return '-1';
            }
            else{
                return factorArray.toString();
            }
        }
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
        $scope.portTitle = localStorageService.get('currentPorts').portName;
        $scope.isActive = false;
        HomeService.getRealDataByTable({
            monitorTypeCode: $scope.currentCategory,
            portId: portId
        }, function(result){
            if(result){
                $scope.realDataByTableArray = result.realDataTbale;
                if($scope.realDataByTableArray.length){
                    $scope.clearRealData = true;
                }
                else{
                    $scope.clearRealData = false;
                }
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
            factors: $scope.getCacheFactor(),
            dateType: time.type,
            time: time.time
        }, function(result){
            if(result){
                $scope.historyDataArray = result.data;
                if($scope.historyDataArray.length){
                    $scope.clearData = true;
                }
                else{
                    $scope.clearData = false;
                }
                $scope.historyLoading = false;
            }
        });
        
    };
    //历史数据图表
    $scope.cartAllData = [];
    $scope.keyWords = [];
	$scope.historyChartData = [];
    $scope.yMaxValue = [];
    $scope.xCoordinate = [];
    $scope.getHistoryDataFuncChart = function(portId, time){
        HomeService.getHistoryChart({
            monitorTypeCode: $scope.currentCategory,
            portId: portId,
            factors: $scope.getCacheFactor(),
            dateType: time.type,
            time: time.time 
        }, function(result){
            if(result){
                $scope.historyChartData = result;
                $scope.yMaxValue = $scope.historyChartData.maxVal;
                var chartDataArray = [];
                $.each($scope.historyChartData, function(key, value){
                    if(value instanceof Array && key != 'maxVal'){
                        chartDataArray.push({'key': key, 'value': value});
                        $scope.keyWords.push(key);
                    }
                });
                $.each(chartDataArray, function(index, value){
                    var items = value.value;
                    var xLength = items.length;
                    var xsteep = Math.floor(xLength / 4);
                    var chartDataArrayNew = [];
                    if(index == 0){
                        $scope.xCoordinate.push({'number':1, 'time': formatTime(items[0].time)});
                    }
                    for(var i = 0; i < items.length; i++){
                        var item = items[i];
                        var codeArray = [];
                        codeArray.push(i+1, item.value);
                        //codeArray.push(item.time, item.value);
                        chartDataArrayNew.push(codeArray);
                        if(index == 0){
                            if(i % 4 == 0){
                                if(i == 0 || i == (items.length - 1)){
                                    continue;
                                }
                                else{
                                    $scope.xCoordinate.push({'number': i+1, 'time': formatTime(items[i].time)});
                                }
                            }
                        }
                    }
                    if(index == 0){
                        $scope.xCoordinate.push({'number': items.length, 'time': formatTime(items[items.length - 1].time)});
                    }
                    $scope.cartAllData.push(chartDataArrayNew);
                });
                function formatTime(time){
                    if(time.indexOf(' ') > 0){
                        return time.substring(11) + '时';
                    }
                    else{
                        return time.substring(8) + '日';
                    }
                }

            }
        });
    };
    //超标数据
    $scope.overStandarData = [];
    $scope.getOverStandarData = function(portId, time){
        HomeService.getOverStandardDataByCompany({
            monitorTypeCode: $scope.currentCategory,
            portId: portId,
            factorIds: $scope.getCacheFactor(),
            dateType: time.type,
            time: time.time
        },function(result){
            if(result){
                $scope.overStandarData = result.overStandardData;
                if($scope.overStandarData.length){
                    $scope.clearDataOver = true;
                }
                else{
                    $scope.clearDataOver = false;
                }

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
