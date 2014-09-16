angular.module('fpiwebapp.companyDetail.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 
.controller('CompanyDetailController', function($scope, $location, $window, $routeParams, localStorageService, MenuServer, HomeService) {
	$scope.companyId = $routeParams.id;
    $scope.currentItem = 0;
    $scope.portNameArray = [];
    $scope.realDataByTableArray = [];

    HomeService.getPortsByCompany({
        monitorTypeCode: 'WW',
        companyId: $scope.companyId
    }, function(result){
        if(result){
            $scope.portNameArray = result.ports;
            $scope.realDataByTable(result.ports[0].portId);
        }
    });

    $scope.realDataByTable = function(portId){

        HomeService.getRealDataByTable({
            monitorTypeCode: 'WW',
            portId: portId
        }, function(result){
            if(result){
                $scope.realDataByTableArray = result.realDataTbale;
            }
        });
    };
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
        controller: function($scope){
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
            });
            function runCurrentLine(index){
                line.animate({'left': leftArray[index] + 'px'});
            }
        }
    }
});

