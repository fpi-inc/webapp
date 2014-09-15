angular.module('fpiwebapp.calendar', ['fpiwebapp.service'])
  .directive('calendar', function(dateutil) {

	    function CalendarModel(date) {
	    	this.currentDate = date;
	    	
	    	this.weekNumber = dateutil.getWeekNumberOfMonth(date);
	    	this.firstDate = dateutil.getFirstDateOfFirstWeek(date);
	    	
	    	this.fY = this.firstDate.getFullYear();
	    	this.fM = this.firstDate.getMonth();
	    	this.fD = this.firstDate.getDate();
	    };
	    
	    CalendarModel.prototype = {
	    	get: function(index) {
	    		return new Date(this.fY, this.fM, this.fD + index);
	    	},
	    	getDate: function(index) {
	    		return this.get(index).getDate();
	    	},
	    	monthText: function() {
	    		return this.currentDate.getFullYear() + '年' + (this.currentDate.getMonth() + 1) + '月';
	    	},
	    	checkWeek: function(week) {
	    		return this.weekNumber >= week;
	    	},
	    	isCurrentMonth: function(index) {
	    		var date = this.get(index);
	    		
	    		return date.getMonth() == this.currentDate.getMonth();
	    	},
	    	isCurrentDate: function(index) {
	    		var date = this.get(index);
	    		
	    		return date.getFullYear() == this.currentDate.getFullYear() &&
	    			date.getMonth() == this.currentDate.getMonth() &&
	    			date.getDate() == this.currentDate.getDate();
	    	},
	    	nextMonth: function() {
	    		scope.calendarModel = new CalendarModel(new Date(this.currentDate.getFullYear(), this.currentDate,getMonth() + 1, this.currentDate.getDate())));
  			  	scope.$apply(scope.calendarModel);
	    	}
	    };
	    
    return {
      restrict: 'EA',
      replace: true,
      scope: {
    	  updateDateMethod: '@'
      },
      templateUrl: '/app/partials/calendar.html',
      link: function(scope, element, attrs) {
    	  var now = new Date();
    	  require(['jquery.mobile-1.4.4.js'], function() {
    		  
    		  alert($.mobile);
    	  });
    	  element.on('swiperight', function() {
    		  alert('fuck');
    	  });
    	  $('table a', element).each(function(i) {
    		  $(this).click(function() {
    			  var currentDate = scope.calendarModel.get(i);
    			  
    			  var parentUpdateDateMethod = scope.$parent[scope['updateDateMethod']];
    			  parentUpdateDateMethod && parentUpdateDateMethod(currentDate);
    			  
    			  //scope.calendarModel.currentDate = currentDate;
    			  scope.calendarModel = new CalendarModel(currentDate);
    			  scope.$apply(scope.calendarModel);
    		  });
    	  });
    	  
    	  scope.calendarModel = new CalendarModel(now);
      }
    };
  });
