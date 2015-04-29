'use strict';

// Copied from the Angular's sources.
var NG_HIDE_CLASS = 'ng-hide';
var NG_HIDE_IN_PROGRESS_CLASS = 'ng-hide-animate';

/**
  * @class root.directives.spoiler
  * @description To set up a spoile on the element
  */
 angular
 	.module('leagueOfApp')
 		.directive('spoiler', function($animate, $timeout){
		    return {
		        // restrict: 'A',
		        // link: function(scope, element, attrs){
		        //     element.addClass("ng-hide");
		        //     element.on('load', function() {
		        //         $timeout(function () {
		        //             $animate.removeClass(element, NG_HIDE_CLASS, {
		        //                 tempClasses: NG_HIDE_IN_PROGRESS_CLASS
		        //             });
		        //         });
		        //     });
		        // }
    		}
});