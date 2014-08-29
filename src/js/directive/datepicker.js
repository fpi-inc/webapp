angular.module('fpiwebapp.directives', [])
  .directive('datepicker', function() {
    return {
      restrict: 'A',
      require: '?ngModel',
      scope: {
        select: '&'        // Bind the select function we refer to the right scope
      },
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) return;

        var optionsObj = {};

        optionsObj.dateFormat = 'mm/dd/yy';
        var updateModel = function(dateTxt) {
          scope.$apply(function () {
            ngModel.$setViewValue(dateTxt);
          });
        };

        optionsObj.onSelect = function(dateTxt, picker) {
          //preventDefault();
          updateModel(dateTxt);
          if (scope.select) {
            scope.$apply(function() {
              scope.select({date: dateTxt});
            });
          }
        };

        ngModel.$render = function() {
          element.datepicker('setDate', ngModel.$viewValue || '');
        };
        element.datepicker(optionsObj);
      }
    };
  });
