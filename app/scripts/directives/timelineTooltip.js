'use strict';

/**
  * @class root.directives.showGame
  * @description Show a game details on click
  */
 angular
 	.module('leagueOfApp')
 		.directive('timelineTooltip', function (DOMElements){
		    return {
		    	restrict: 'A',
		    	scope: true,
		    	link: function (scope, element, attr) 
		    	{
					element.on('mouseenter', function(event) {

						// Prevent default click of selected content
						event.preventDefault();
						
						DOMElements.displayTooltip(element[0], (Math.floor(attr.timestamp/60000))+'&nbsp;minutes');
						
					});

					element.on('mouseleave', function(event) {

						// Prevent default click of selected content
						event.preventDefault();
						
						DOMElements.removeTooltip();
						
					});
			    }
    		}
		});