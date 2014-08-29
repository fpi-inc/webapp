angular.module('fpiwebapp.companyDetailTab.ctrl', [ 'LocalStorageModule', 'fpiwebapp.directives'])
 

.controller('CompanyDetailTabController', function($scope, $location, $window, $routeParams, localStorageService, MenuServer) {
	console.log($routeParams);
    $scope.myText = 'Not Selected';
    $scope.currentDate = '';
    $scope.updateMyText = function(date) {
        $scope.myText = 'Selected';
    };
    require(
        [
        'echarts',
        'echarts/chart/line',   // 按需加载所需图表
        'echarts/chart/bar'
        ],
        function (ec) {
            var myChart = ec.init(document.getElementById('linemain'));
            option = {
                tooltip : {
                    trigger: 'axis'
                },
                //legend: {
                //    data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                //},
                toolbox: {
                    show : false,
                    feature : {
                        mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                    }
                },
                calculable : true,
                xAxis : [
                {
                        type : 'category',
                        boundaryGap : false,
                        data : ['12:00','13:00','14:00','15:00','16:00','17:00','18:00']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                grid: {
                    x: 40,
                    y: 5,
                    x2: 20,
                    y2: 30
                },
                series : [
                {
                    name:'COD',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'NH3-N',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'COD',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'PH',
                    type:'line',
                    stack: '总量',
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'O3',
                    type:'line',
                    stack: '总量',
                    data:[620, 232, 501, 334, 290, 330, 320]
                }
            ]
            };
            myChart.setOption(option);
        }
        );
    
});

