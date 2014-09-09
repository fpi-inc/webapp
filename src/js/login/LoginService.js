'use strict';

angular.module('fpiwebapp.login.service', ['ngResource']).
	factory('LoginService', ['$resource', function($resource) {
		//return $resource('http://122.224.196.67:10001/mobile/mobile/load/login.do', {callback: 'JSON_CALLBACK'}, {
		return $resource('http://172.19.20.69:8088/mobile/mobile/load/login.do', {callback: 'JSON_CALLBACK'}, {
			query: {method: 'JSONP'}
		});
	}]);
