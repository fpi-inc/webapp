/**
 * @name: webapp 
 * @version: v0.0.1
 * @company: fpi-inc 
 * @author: pingping_feng 
 */


'use strict';

angular.module('login', [ 'ngCookies', 'LocalStorageModule', 'fpiwebapp.login.service', 'angular-md5']).controller(
    'LoginController',['$location', '$scope', '$rootScope', '$cookieStore', '$http','$window', 'localStorageService', 'LoginService', 'md5', function($location, $scope, $rootScope, $cookieStore, $http, $window, localStorageService, LoginService, md5) {

    $scope.category = "WW";
    $scope.user = localStorageService.get('currentUser'); 
    $scope.categoryin = localStorageService.get('currentCategory'); 
    if($scope.user && $scope.categoryin){
        $window.location.href = '/app/#/cate/' + $scope.categoryin;
    }
    $scope.userName = '';
    $scope.passWord = '';
    $scope.login = function(){
        if($scope.userName && $scope.passWord){
            LoginService.query({
                userName: $scope.userName,
                passWord: md5.createHash($scope.passWord)
            }, function(data){
                var loginData = data;
                if(loginData.result == 'true'){
                    localStorageService.set('currentUser', $scope.userName);
                    localStorageService.set('currentRegions', loginData.name);
                    localStorageService.set('currentRegionCode', loginData.id);
                    localStorageService.set('currentCompanyOrAdmin', loginData.role);
                    //localStorageService.set('currentCategory', $scope.category);
                    if(loginData.role == 'mat'){
                        $window.location.href = '/app/#/cate/' + $scope.category;
                    }
                    else{
                        $window.location.href = '/app/#/companyDetail/' + loginData.id + '/0';
                    }
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


'use strict';

angular.module('fpiwebapp.login.service', ['ngResource']).
	factory('LoginService', ['$resource', function($resource) {
		return $resource('http://122.224.196.67:10001/mobile/mobile/load/login.do', {callback: 'JSON_CALLBACK'}, {
		//return $resource('http://172.19.20.218:8088/mobile/mobile/load/login.do', {callback: 'JSON_CALLBACK'}, {
		//return $resource('http://172.19.20.69:8088/mobile/mobile/load/login.do', {callback: 'JSON_CALLBACK'}, {
			query: {method: 'JSONP'}
		});
	}]);
