'use strict';

angular.module('fpiwebapp.personal.service', ['ngResource']).
	factory('PersonalService', ['$resource', 'platformServer', function($resource, platformServer) {
		return $resource(platformServer + '', {callback: 'JSON_CALLBACK'}, {
			query: {method: 'JSONP'},
            saveAttention: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/saveAttention.do'}
		});
	}]);
