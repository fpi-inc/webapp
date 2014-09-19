angular.module('fpiwebapp.companyDetailTab.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 

.controller('CompanyDetailTabController', function($scope, $rootScope, $location, $window, $routeParams, localStorageService, MenuServer, HomeService) {




    //实时数据
    $scope.showChartFunc = function($event){
        HomeService.get24RealDataByChart({
            portId: '2c93871641b6111b0141b61a1f600002',
            monitorTypeCode: 'WW',
            factor: 'F_B01'
        }, function(result){
            if(result){
                
            }
        });

        if($event.currentTarget){
			if(angular.element("#chartTr")){
				angular.element("#chartTr").remove();
			}
            angular.element($event.currentTarget).after('<tr id="chartTr"><td colspan="4"><div id="chartcontainer" style="margin: 0 auto; width: 320px;">fpi</div></td></tr>');
        }

		var myData = new Array([10, 20], [15, 10], [20, 30], [25, 10], [30, 5]);
		var myChart = new JSChart('chartcontainer', 'line');
		myChart.setDataArray(myData);
		myChart.setSize(320, 220);
        myChart.setTitle('fpi');
		myChart.draw();
        //addRow
        //$scope.addRow(target);
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
    var test = [
{"factorUnit":null,"fatorName":"COD","alarmValueScope":"30.26~30.26","standardValue":30.0,"overTimesScope":"0.01~0.01","hour":1,"companyName":"长兴兴长污水处理有限公司","portId":"2c93871641b498170141b49cfb6b0004","portName":"长兴兴长污水处理有限公司总排口"},
{"factorUnit":null,"fatorName":"NH4","alarmValueScope":"30.26~30.26","standardValue":30.0,"overTimesScope":"0.01~0.01","hour":1,"companyName":"长兴兴长污水处理有限公司","portId":"2c93871641b498170141b49cfb6b0004","portName":"长兴兴长污水处理有限公司总排口"},
{"factorUnit":null,"fatorName":"O3","alarmValueScope":"30.26~30.26","standardValue":30.0,"overTimesScope":"0.01~0.01","hour":1,"companyName":"长兴兴长污水处理有限公司","portId":"2c93871641b498170141b49cfb6b0004","portName":"长兴兴长污水处理有限公司总排口"}
];

    HomeService.getDetailOverStandardDataByCompany({
        monitorTypeCode: 'WW',
        portId: '2c93871641b498170141b49cfb6b0004',
        factorId: '2c93871641b5db390141b5def6f80001',
        standardValue: '30.0',
        companyName: '长兴兴长污水处理有限公司',
        dateType: 1,
        time: '2014-09-09'
    }, function(result){
        if(result){
        }
    });

    HomeService.getHistoryChart({
        monitorTypeCode: 'WW',
        portId: '2c93871641b498170141b49cfb6b0004',
        factors: '-1',
        dateType: 1,
        time: '2014-09-09'
    }, function(result){
        if(result){
        }
    });

    $scope.isActiveHistory = false;
    $scope.showHistoryTable = function(){
        $scope.isActiveHistory = false;
    };
    
    $scope.showHistoryChart = function(){
        $scope.isActiveHistory = true;
        var myChart = new JSChart('history-chart', 'line');
        myChart.setDataArray([[1, 80],[2, 40],[3, 60],[4, 65],[5, 50],[6, 50],[7, 60],[8, 80],[9, 150],[10, 100]], 'blue');
        myChart.setDataArray([[1, 100],[2, 55],[3, 80],[4, 115],[5, 80],[6, 70],[7, 30],[8, 130],[9, 160],[10, 170]], 'green');
        myChart.setDataArray([[1, 150],[2, 25],[3, 100],[4, 80],[5, 20],[6, 65],[7, 0],[8, 155],[9, 190],[10, 200]], 'gray');
        myChart.setAxisPaddingBottom(40);
        myChart.setTextPaddingBottom(10);
        myChart.setAxisValuesNumberY(5);
        myChart.setIntervalStartY(0);
        myChart.setIntervalEndY(200);
        myChart.setLabelX([2,'p1']);
        myChart.setLabelX([4,'p2']);
        myChart.setLabelX([6,'p3']);
        myChart.setLabelX([8,'p4']);
        myChart.setLabelX([10,'p5']);
        myChart.setAxisValuesNumberX(5);
        myChart.setShowXValues(false);
        myChart.setTitleColor('#454545');
        myChart.setAxisValuesColor('#454545');
        myChart.setLineColor('#A4D314', 'green');
        myChart.setLineColor('#BBBBBB', 'gray');
        //myChart.setTooltip([1]);
        //myChart.setTooltip([2]);
        //myChart.setTooltip([3]);
        //myChart.setTooltip([4]);
        //myChart.setTooltip([5]);
        //myChart.setTooltip([6]);
        //myChart.setTooltip([7]);
        //myChart.setTooltip([8]);
        //myChart.setTooltip([9]);
        //myChart.setTooltip([10]);
        myChart.setFlagColor('#9D16FC');
        myChart.setFlagRadius(4);
        //myChart.setBackgroundImage('chart_bg.jpg');
        myChart.setSize(320, 321);
        myChart.setTitle('fpi-inc');
        myChart.draw();
    };

});

