'use strict';

/**
  * @class root.directives.refreshGame
  * @description Show a game details on click
  */
 angular
 	.module('leagueOfApp')
 		.directive('refreshGame', function (API, Helpers, Map){
		    return {
		    	restrict: 'A',
		    	scope: true,
		    	link: function (scope, element, attr) 
		    	{
					element.on('click', function(event) {
						
						// Prevent default click of selected content
						event.preventDefault();

						// Set selected timestamp
						Map.timestamp = attr.timestamp;
						// Refresh map data
						Map.setTimeline();
			            var cords = Map.getPositions();
			            Map.loadMap(cords);
						
					});
			    }
    		}
		});