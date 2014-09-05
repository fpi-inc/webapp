'use strict';

angular.module('login', [ 'ngCookies', 'LocalStorageModule', 'fpiwebapp.login.service']).controller(
    'LoginController',[ '$scope', '$cookieStore', '$http','$window', 'localStorageService', 'LoginService', function($scope, $cookieStore, $http, $window, localStorageService, LoginService) {
	
    $scope.userName = '';
    $scope.passWord = '';
    $scope.login = function(){
        if($scope.userName && $scope.passWord){
            LoginService.query({
                userName: $scope.userName,
                passWord: $scope.passWord
            }, function(data){
                var loginData = data;
                if(loginData.result == 'true'){
                    localStorageService.set('currentUser', $scope.userName);
                    localStorageService.set('currentRegions', loginData.name);
                    $window.location.href = '/app';
                }
                else{
                    error.showTips();
                    console.log("a");
                }
            });
        }
    };

    $('input').on('focus', function(){
        $(this).parent().next().removeClass('border-image-left-right-1px-login').addClass('border-image-left-right-1px-login-current');
        $(this).parent().next().find('.line2').removeClass('border-image-bottom-1px-login').addClass('border-image-bottom-1px-login-current');
    }).on('blur', function(){
        $(this).parent().next().removeClass('border-image-left-right-1px-login-current').addClass('border-image-left-right-1px-login');
        $(this).parent().next().find('.line2').removeClass('border-image-bottom-1px-login-current').addClass('border-image-bottom-1px-login');
    });

    var ErrorTips = function(){
        this.tips = null;
    };
    ErrorTips.prototype = {
        init: function(){
            this.createDom();
        },
        showTips: function(){
            var self = this;
            $(self.tips).show();
        },
        hideTips: function(){
            var self = this;
            $(self.tips).hide();
        },
        createDom: function(){
            var self = this;
            this.tips = $('<div><img src="app/images/error.png" width="15" height="15" border="0"><span>请输入正确的用户名或密码</span></div>');
            $(this.tips).addClass("tipsCls");
            $('body').append(this.tips);
        }
    };

    var error = new ErrorTips();
    error.init();

}]);
