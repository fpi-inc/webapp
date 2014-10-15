'use strict';

angular.module('fpiwebapp.home.service', ['ngResource']).
	factory('HomeService', ['$resource', 'platformServer', function($resource, platformServer) {
		return $resource(platformServer + '', {callback: 'JSON_CALLBACK'}, {
			query: {method: 'JSONP'},
            getState: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getState.do'},
            getDetailState: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getDetailState.do'},
            getEfficiency: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getTransmissionEfficientBySelfRegion.do'},
            getOverStandardData: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getOverStandardData.do'},
            getOverStandardDataByCompany: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getOverStandardDataByCompany.do'},
            getOverStandardDataFactor: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getOverStandardDataFactor.do'},
            getDetailOverStandardDataByCompany: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getDetailOverStandardDataByCompany.do'},
            getOverStandardDataByOverData: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getOverStandardDataByOverData.do'},
            getPortsByCompany: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getPortsByCompany.do'},
            getRealDataByTable: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getRealDataByTable.do'},
            get24RealDataByChart: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/get24RealDataByChart.do'},
            get48RealDataByChart: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/get48RealDataByChart.do'},
            getHistoryData: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getHistoryData.do'},
            getHistoryChart: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getHistoryChart.do'},
            getTransmissionEfficientBychildRegion: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getTransmissionEfficientBychildRegion.do'},
            getFactorByPort: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/getFactorByPort.do'}
		});
	}]);
