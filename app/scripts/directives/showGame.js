'use strict';

/**
  * @class root.directives.showGame
  * @description Show a game details on click
  */
 angular
 	.module('leagueOfApp')
 		.directive('showGame', function (API, Helpers, Map){
		    return {
		    	restrict: 'A',
		    	scope: true,
		    	link: function (scope, element, attr) 
		    	{
					element.on('click', function(event) {

						// Prevent default click of selected content
						event.preventDefault();
						
						var gameSection = document.getElementById('game');
						gameSection.className = 'animate-show opacity-0';

						Map.initMap(attr.game, attr.mode, attr.timestamp, scope, function(){
              				gameSection.className = gameSection.className + ' opacity-1';
						});
						
					});
			    }
    		}
		});