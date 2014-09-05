'use strict';

angular.module('fpiwebapp.region.service', ['ngResource']).
	factory('RegionService', ['$resource', 'platformServer', function($resource, platformServer) {
		return $resource(platformServer + '/mobile/mobile/load/getRegion.do?monitorTypeCode=WW&userName=root', {callback: 'JSON_CALLBACK'}, {
			query: {method: 'JSONP'}
		});
	}]);
