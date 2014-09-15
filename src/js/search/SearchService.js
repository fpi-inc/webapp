'use strict';

angular.module('fpiwebapp.search.service', ['ngResource']).
	factory('SearchService', ['$resource', 'platformServer', function($resource, platformServer) {
		return $resource(platformServer + '/mobile/mobile/load/getCompany.do', {callback: 'JSON_CALLBACK'}, {
			query: {method: 'JSONP'}
		});
	}]);
