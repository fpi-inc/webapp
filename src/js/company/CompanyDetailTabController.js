angular.module('fpiwebapp.companyDetailTab.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 

.controller('CompanyDetailTabController', function($scope, $rootScope, $location, $window, $routeParams, localStorageService, MenuServer, HomeService) {

    $scope.curPorts = localStorageService.get('currentPorts');
    //实时数据图表操作
    $scope.showChartFunc = function($event, factoryCode){
        $scope.curPorts = localStorageService.get('currentPorts');
        //实时数据图表24小时
        HomeService.get24RealDataByChart({
            portId: $scope.curPorts.portId,
            monitorTypeCode: $scope.currentCategory,
            factor: factoryCode
        }, function(result){
            if(result){
                //var codeText = factoryCode.substring(2);
                $scope.real24ChartData = [];
                $scope.real24Data = result;
                $scope.maxData = $scope.real24Data.maxVal[0].maxVal;
                $scope.all24Data = $scope.real24Data[factoryCode];
                
                angular.forEach($scope.all24Data, function(value, key){
                    var itemArray = [];
                    itemArray.push(key);
                    itemArray.push(value.value);
                    $scope.real24ChartData.push(itemArray);
                });

                drawChart24($scope.maxData, $scope.real24ChartData);
            }
        });
        //实时数据图表48小时

        HomeService.get48RealDataByChart({
            portId: $scope.curPorts.portId,
            monitorTypeCode: $scope.currentCategory,
            factor: factoryCode
        }, function(result){
            if(result){
                //var codeText = factoryCode.substring(2);
                $scope.real48ChartData = [];
                $scope.real48Data = result;
                $scope.max48Data = $scope.real48Data.maxVal[0].maxVal;
                $scope.all48Data = $scope.real48Data[factoryCode];
                
                angular.forEach($scope.all48Data, function(value, key){
                    var itemArray = [];
                    itemArray.push(key);
                    itemArray.push(value.value);
                    $scope.real48ChartData.push(itemArray);
                });

                drawChart48($scope.max48Data, $scope.real48ChartData);
            }
        });

        if($event.currentTarget){
			if(angular.element("#chartTr")){
				angular.element("#chartTr").remove();
			}
            angular.element($event.currentTarget).after('<tr id="chartTr"><td colspan="4">'
					+ '<div class="chartT2448"><a href="javascript:;" class="a24 cur">24小时</a><a href="javascript:;" class="a48">48小时</a></div>'
					+ '<div id="chartcontainer24" style="margin: 0 auto; width: 320px;"></div>'
					+ '<div id="chartcontainer48" style="margin: 0 auto; width: 320px; display: none"></div>'
					+ '</td></tr>');
        }

		function drawChart24(maxValue, chartData){
			var myData = chartData;
			var myChart = new JSChart('chartcontainer24', 'line');
			myChart.setDataArray(myData);
			myChart.setSize(320, 220);
            myChart.setIntervalStartY(0);
            myChart.setIntervalEndY(maxValue);
            myChart.setAxisNameX('');
            myChart.setAxisNameY('');
			myChart.setTitle('24小时实时数据');
			myChart.draw();
		}
		function drawChart48(maxValue, chartData){
			var myData = chartData;
			var myChart = new JSChart('chartcontainer48', 'line');
			myChart.setDataArray(myData);
			myChart.setSize(320, 220);
            myChart.setIntervalStartY(0);
            myChart.setIntervalEndY(maxValue);
            myChart.setAxisNameX('');
            myChart.setAxisNameY('');
			myChart.setTitle('48小时实时数据');
			myChart.draw();
		}
		//drawChart24();
        //addRow
        //$scope.addRow(target);
		$('.chartT2448 > a').each(function(index){
			$(this).click(function(){
				if(index == 0){
					$('.chartT2448 > a').removeClass('cur');
					$(this).addClass('cur');
					$('#chartcontainer24').show();
					$('#chartcontainer48').hide();
                    drawChart24($scope.maxData, $scope.real24ChartData);
				}
				else{
					$('.chartT2448 > a').removeClass('cur');
					$(this).addClass('cur');
					$('#chartcontainer24').hide();
					$('#chartcontainer48').show();
                    drawChart48($scope.max48Data, $scope.real48ChartData);
				}
			});
		});

    };


    
    $scope.addRow = function(target){
        console.log(target.parent);
        //var trs = angular.element("#realTable").find('tr');
        //$(this).after('<tr><td colspan="4">fdsafsa</td></tr>');
    };


	//console.log($routeParams);
    $scope.myText = 'Not Selected';
    $scope.currentDate = '';
    $scope.updateMyText = function(date) {
        $scope.myText = 'Selected';
    };

    //超标数据
    //var test = [
//{"fa//ctorUnit":null,"fatorName":"COD","alarmValueScope":"30.26~30.26","standardValue":30.0,"overTimesScope":"0.01~0.01","hour":1,"companyName":"长兴兴长污水处理有限公司","portId":"2c93871641b498170141b49cfb6b0004","portName":"长兴兴长污水处理有限公司总排口"},
//{"fa//ctorUnit":null,"fatorName":"NH4","alarmValueScope":"30.26~30.26","standardValue":30.0,"overTimesScope":"0.01~0.01","hour":1,"companyName":"长兴兴长污水处理有限公司","portId":"2c93871641b498170141b49cfb6b0004","portName":"长兴兴长污水处理有限公司总排口"},
//{"fa//ctorUnit":null,"fatorName":"O3","alarmValueScope":"30.26~30.26","standardValue":30.0,"overTimesScope":"0.01~0.01","hour":1,"companyName":"长兴兴长污水处理有限公司","portId":"2c93871641b498170141b49cfb6b0004","portName":"长兴兴长污水处理有限公司总排口"}
//];

    //HomeService.getDetailOverStandardDataByCompany({
    //    monitorTypeCode: 'WW',
    //    portId: '2c93871641b498170141b49cfb6b0004',
    //    factorId: '2c93871641b5db390141b5def6f80001',
    //    standardValue: '30.0',
    //    companyName: '长兴兴长污水处理有限公司',
    //    dateType: 1,
    //    time: '2014-09-09'
    //}, function(result){
    //    if(result){
    //    }
    //});


    $scope.showHistoryChart = function(){
        $scope.isActiveHistory = true;
        var colorArray = [];
        if($scope.cartAllData.length){
            $('#history-chart').show();
            $('#chart-text').hide();
            var myChart = new JSChart('history-chart', 'line');
            colorArray = [{
                name: 'red',
                    value: '#fb1929',
                    text: 'COD'
            },{
                name: 'yellow',
                    value: '#ffc600',
                    text: ''
            },{
                name: 'blue',
                    value: '#387eff',
                    text: ''
            },{
                name: 'green',
                    value: '#30ff00',
                    text: ''
            },{
                name: 'violet',
                    value: '#fa00fd',
                    text: ''
            },{
                name: 'hunan',
                value: '#00e4ff',
                text: ''
            },{
                name: 'zhise',
                value: '#ff00e4',
                text: ''
            },{
                name: 'meihong',
                value: '#ff007e',
                text: ''
            }];
            for(var i = 0; i < $scope.cartAllData.length; i++){
                var item = $scope.cartAllData[i];
                myChart.setDataArray(item, colorArray[i].name);
                myChart.setLineColor(colorArray[i].value, colorArray[i].name);
                myChart.setLegendShow(true);
                myChart.setLegendPosition('top center');
                myChart.setLegendForLine(colorArray[i].name, $scope.keyWords[i]);
            }

            //myChart.setDataArray($scope.cartAllData[0], 'green');
            //myChart.setDataArray($scope.cartAllData[1], 'red');
            //myChart.setDataArray($scope.cartAllData[2], 'blue');
            //myChart.setDataArray([[1, 80.5],[2, 40],[3, 60],[4, 65],[5, 50],[6, 50],[7, 60],[8, 80],[9, 150],[10, 100]], 'blue');
            //myChart.setDataArray([[1, 100],[2, 55],[3, 80],[4, 115],[5, 80],[6, 70],[7, 30],[8, 130],[9, 160],[10, 170]], 'green');
            //myChart.setDataArray([[1, 150],[2, 25],[3, 100],[4, 80],[5, 20],[6, 65],[7, 0],[8, 155],[9, 190],[10, 200]], 'gray');
            myChart.setAxisPaddingBottom(40);
            myChart.setTextPaddingBottom(10);
            //myChart.setAxisValuesNumberY(5);
            myChart.setIntervalStartY(0);
            myChart.setIntervalEndY($scope.yMaxValue[0].maxVal);
            myChart.setAxisNameX('');
            myChart.setAxisNameY('');
            
            for(var j = 0; j < $scope.xCoordinate.length; j++){
                var jitem = $scope.xCoordinate[j];
                myChart.setLabelX([jitem.number, jitem.time]);
            }
            //myChart.setLabelX([1,'10时']);
            //myChart.setLabelX([23,'10时']);
            //myChart.setLabelX([6,'p3']);
            //myChart.setLabelX([8,'p4']);
            //myChart.setLabelX([10,'p5']);
            myChart.setAxisValuesNumberX(5);
            myChart.setShowXValues(false);
            myChart.setTitleColor('#454545');
            myChart.setAxisValuesColor('#454545');
            myChart.setFlagColor('#9D16FC');
            myChart.setFlagRadius(4);
            //myChart.setBackgroundImage('chart_bg.jpg');
            myChart.setSize(320, 321);
            myChart.setTitle('历史数据图表');
            myChart.draw();
        }
        else{
            $('#history-chart').hide();
            $('#chart-text').html('<div class="no-chart-text">暂无图表数据</div>');
        }
    };

    $scope.isActiveHistory = false;
    $scope.showHistoryTable = function(){
        $scope.isActiveHistory = false;
    };
    

});

