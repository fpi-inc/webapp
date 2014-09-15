angular.module('fpiwebapp.service', [])
.factory('dateutil', function() {
	return {
		/**
		 * 获取给定日期所在月的周数
		 */
		getWeekNumberOfMonth: function(date) {
			return this.getWeekOfMonth(this.getLastDateOfMonth(date));
		},
		/**
		 * 获取给定日期在当前月的第几周
		 */
		getWeekOfMonth: function(date) {
			var dayOfWeek = date.getDay(),
				dayOfMonth = date.getDate();
			
			return Math.ceil((dayOfMonth - (dayOfWeek + 1) + 7) / 7);
		},
		/**
		 * 获取给定日期所在月的最后一天
		 */
		getLastDateOfMonth: function(date) {
			return new Date(date.getFullYear(), date.getMonth() + 1, 0);
		},
		/**
		 * 获取给定日期所在月的第一周的第一天日期（很有可能是上个月的日期）
		 */
		getFirstDateOfFirstWeek: function(date) {
			var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
			
			d.setDate(1);
			
			var dayOfWeek = d.getDay();
			
			d.setDate(1- dayOfWeek);
			
			return d;
		}
	};
});