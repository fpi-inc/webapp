angular.module('fpiwebapp.companyDetail.ctrl', [ 'LocalStorageModule'])
 
.controller('CompanyDetailController', function($scope, $location, $window, $routeParams, localStorageService, MenuServer) {
	console.log($routeParams);

    
})

.directive('tabDetail', function(){
    return{
        restrict: 'EA',
        replace: true,
        //transclude: true,
        templateUrl: 'partials/company/tab-detail.html',
        link: function(scope, element, attrs){
            scope.isShow = false;
        },
        controller: function(){
            $('.tab-content').hide();
            $('.tab-content').eq(0).show();
            var tabs = $('.tab').find('a');
            var line = $('.c-line');
            var leftArray = [];
            for(var i = 0; i < tabs.length; i++){
               leftArray.push(tabs[i].offsetLeft);
            }
            console.log(leftArray);
            line.css('left', leftArray[0] + 'px');
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
 
