'use strict';

/**
  * @class root.directives.refreshGame
  * @description Directive. Refresh map infos on timeline click
  */
 angular
 	.module('leagueOfApp')
 		.directive('refreshMap', function (API, Helpers, MatchMap){
		    return {
		    	restrict: 'A',
		    	scope: true,
		    	link: function (scope, element, attr) 
		    	{
					element.on('click', function(event) {

						// Prevent default click of selected content
						event.preventDefault();

						// Set selected timestamp
						MatchMap.timestamp = attr.timestamp;
						// Refresh map data
						MatchMap.setTimeline();
			            MatchMap.getParticipantPositions(function(cords){
			            	MatchMap.getEventPositions(function(cordsEvent, eventsWithoutCords){
				            	MatchMap.loadMap(cords, cordsEvent, eventsWithoutCords);
			            	});
			            });
						
					});
			    }
    		}
		});