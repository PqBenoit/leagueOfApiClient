'use strict';

/**
  * @class root.directives.fadeIn
  * @description To animate html elements with fade in style
  */
 angular
 	.module('leagueOfApp')
 		.directive('fadeIn', function($timeout){
		    return {
		        restrict: 'A',
		        link: function($scope, $element, attrs){
		            $element.addClass("ng-hide-remove");
		            $element.on('load', function() {
		                $element.addClass("ng-hide-add");
		            });
		        }
		    }
});