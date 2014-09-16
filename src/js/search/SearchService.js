'use strict';

angular.module('fpiwebapp.search.service', ['ngResource']).
	factory('SearchService', ['$resource', 'platformServer', function($resource, platformServer) {
		return $resource(platformServer + '', {callback: 'JSON_CALLBACK'}, {
			query: {method: 'JSONP'},
            search: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getCompany.do'},
            quickSearch: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/QuickSearchCompany.do'}
		});
	}]);
