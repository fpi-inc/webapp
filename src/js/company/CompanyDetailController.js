angular.module('fpiwebapp.companyDetail.ctrl', [ 'LocalStorageModule', 'fpiwebapp.home.service'])
 

.directive('tabDetail', function(){
    return{
        restrict: 'EA',
        replace: true,
        //scope: {
        //    current: '@'
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
            console.log(leftArray);
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
})
.controller('CompanyDetailController', function($scope, $location, $window, $routeParams, localStorageService, MenuServer, HomeService) {
	console.log($routeParams);
    $scope.currentItem = 2;
    //HomeService.getOverStandardDataByCompany({
    //    monitorTypeCode: 'WW',
    //    portId: '2c93871641b498170141b49cfb6b0004',
    //    factorIds: '-1',
    //    dateType: 1,
    //    time: '2014-09-09'
    //},function(result){
    //    if(result){
    //    }        
    //}); 
});

