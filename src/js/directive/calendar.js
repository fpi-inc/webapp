angular.module('fpiwebapp.calendar', ['fpiwebapp.service', 'LocalStorageModule'])
  .directive('calendar', function(dateutil, localStorageService) {

	    function CalendarModel(date) {
	    	this.currentDate = date;
	    	
	    	this.weekNumber = dateutil.getWeekNumberOfMonth(date);
	    	this.firstDate = dateutil.getFirstDateOfFirstWeek(date);
            this.firstMonth = dateutil.getMonthOfYear(date);
	    	
	    	this.fY = this.firstDate.getFullYear();
	    	this.fM = this.firstDate.getMonth();
	    	this.fD = this.firstDate.getDate();

	    	this.fY1 = this.firstMonth.getFullYear();
	    	this.fM1 = this.firstMonth.getMonth();
	    	this.fD1 = this.firstMonth.getDate();
	    };
	    
	    CalendarModel.prototype = {
	    	get: function(index) {
	    		return new Date(this.fY, this.fM, this.fD + index);
	    	},
	    	getMonthId: function(index) {
	    		return new Date(this.fY1, this.fM1 + index, this.fD1);
	    	},
	    	getDate: function(index) {
	    		return this.get(index).getDate();
	    	},
	    	getMonth: function(index) {
	    		return this.getMonthId(index).getMonth() + 1;
	    	},
	    	monthText: function() {
	    		return this.currentDate.getFullYear() + '年' + (this.currentDate.getMonth() + 1) + '月' + this.currentDate.getDate() + '日';
	    	},
	    	showMonthText: function() {
	    		return this.currentDate.getFullYear() + '年' + (this.currentDate.getMonth() + 1) + '月';
	    	},
	    	checkWeek: function(week) {
	    		return this.weekNumber >= week;
	    	},
	    	isCurrentMonth: function(index) {
	    		var date = this.get(index);
	    		
	    		return date.getMonth() == this.currentDate.getMonth();
	    	},
	    	isCurrentMonthNumber: function(index) {
	    		//var date = this.get(index);
	    		
	    		return index == this.currentDate.getMonth();
	    	},
	    	isCurrentDate: function(index) {
	    		var date = this.get(index);
	    		
	    		return date.getFullYear() == this.currentDate.getFullYear() &&
	    			date.getMonth() == this.currentDate.getMonth() &&
	    			date.getDate() == this.currentDate.getDate();
	    	}//,
	    	//nextMonth: function() {
	    	//	scope.calendarModel = new CalendarModel(new Date(this.currentDate.getFullYear(), this.currentDate,getMonth() + 1, this.currentDate.getDate())));
  			//  	scope.$apply(scope.calendarModel);
	    	//}
	    };
	    
    return {
      restrict: 'EA',
      replace: true,
      scope: {
    	  updateDateMethod: '@'
      },
      templateUrl: '/app/partials/calendar.html',
      link: function(scope, element, attrs) {
          autoTabShow(scope.$parent.routeTime);

          function autoTabShow(time){
              var isMonthDay = time.indexOf('-', 5);
              if(isMonthDay != -1){
                  $('.choose-p-t-r a').eq(0).addClass('cur').siblings().removeClass('cur');
                  $('#dayArea').show();
                  $('#monthArea').hide();
                  $('#isShowDay').show();
                  $('#isShowMonth').hide();
              }
              else{
                  $('.choose-p-t-r a').eq(1).addClass('cur').siblings().removeClass('cur');
                  $('#dayArea').hide();
                  $('#monthArea').show();
                  $('#isShowDay').hide();
                  $('#isShowMonth').show();
              }
          }
    	  var nowDate = localStorageService.get('currentDateTime');
          var now = new Date(Date.parse(nowDate.longTime.replace(/-/g,   "/")));  
    	  //require(['jquery.mobile-1.4.4.js'], function() {
    	  //    
    	  //    alert($.mobile);
    	  //});
    	  element.on('swiperight', function() {
    		  alert('fuck');
    	  });
    	  $('.fpiwebapp-calendar a', element).each(function(i) {
    		  $(this).on('click', function() {
    			  var currentDate = scope.calendarModel.get(i);
    			  
    			  var parentUpdateDateMethod = scope.$parent[scope['updateDateMethod']];
    			  parentUpdateDateMethod && parentUpdateDateMethod(currentDate, 1);
    			  
    			  //scope.calendarModel.currentDate = currentDate;
    			  scope.calendarModel = new CalendarModel(currentDate);
    			  scope.$apply(scope.calendarModel);
    		  });
    	  });
    	  $('.fpiwebapp-calendar-month a', element).each(function(i) {
    		  $(this).on('click', function() {
    			  var currentMonth = scope.calendarModel.getMonthId(i);
    			  
    			  var parentUpdateMonthMethod = scope.$parent[scope['updateDateMethod']];
    			  parentUpdateMonthMethod && parentUpdateMonthMethod(currentMonth, 2);
    			  
    			  scope.calendarModel = new CalendarModel(currentMonth);
    			  scope.$apply(scope.calendarModel);
    		  });
    	  });

          $('.choose-p-t-r a').each(function(){
              $(this).on('click', function(){
                  $(this).addClass('cur').siblings().removeClass('cur');
                  if($(this).index() == 0){
                      $('#dayArea').show();
                      $('#monthArea').hide();
                      $('#isShowDay').show();
                      $('#isShowMonth').hide();
                  }
                  else{
                      $('#dayArea').hide();
                      $('#monthArea').show();
                      $('#isShowDay').hide();
                      $('#isShowMonth').show();
                  }
              })
          });
    	  
    	  scope.calendarModel = new CalendarModel(now);
      }
    };
  });
