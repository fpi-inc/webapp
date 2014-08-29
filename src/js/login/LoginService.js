'use strict';

angular.module('fpiwebapp.login.service', ['ngResource']).
	factory('LoginService', ['$resource', 'platformServer', function($resource, platformServer) {
		return $resource(platformServer + '', {callback: 'JSON_CALLBACK'}, {
			query: {method: 'JSONP'}
		});
	}]);
