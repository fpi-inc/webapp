'use strict';

angular.module('fpiwebapp.personal.service', ['ngResource']).
	factory('PersonalService', ['$resource', 'platformServer', function($resource, platformServer) {
		return $resource(platformServer + '', {callback: 'JSON_CALLBACK'}, {
			query: {method: 'JSONP'},
            //添加关注
            saveAttention: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/saveAttention.do'},
            //判断是否关注
            hasAttention: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/hasAttention.do'},
            //取消关注
            deleteAttention: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/deleteAttention.do'},
            //关注列表
            showAttention: {method: 'JSONP', url: platformServer + '/mobile/mobile/load/showAttention.do'}
		});
	}]);
