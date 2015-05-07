'use strict';

// Copied from the Angular's sources.
var NG_HIDE_CLASS = 'ng-hide';
var NG_HIDE_IN_PROGRESS_CLASS = 'ng-hide-animate';

/**
  * @class root.directives.fadeIn
  * @description Directive. To animate html elements with fade in style
  */
 angular
 	.module('leagueOfApp')
 		.directive('fadeIn', function($animate, $timeout){
		    return {
		        restrict: 'A',
		        link: function(scope, element, attrs){
		            element.addClass("ng-hide");
		            element.on('load', function() {
		                $timeout(function () {
		                    $animate.removeClass(element, NG_HIDE_CLASS, {
		                        tempClasses: NG_HIDE_IN_PROGRESS_CLASS
		                    });
		                });
		            });
		        }
    		}
});