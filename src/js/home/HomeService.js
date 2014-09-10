'use strict';

angular.module('fpiwebapp.home.service', ['ngResource']).
	factory('HomeService', ['$resource', 'platformServer', function($resource, platformServer) {
		return $resource(platformServer + '', {callback: 'JSON_CALLBACK'}, {
			query: {method: 'JSONP'},
            getState: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getState.do'},
            getEfficiency: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getTransmissionEfficientBySelfRegion.do'},
            getOverStandardData: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getOverStandardData.do'},
            getOverStandardDataByCompany: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getOverStandardDataByCompany.do'}
		});
	}]);
