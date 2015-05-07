'use strict';

/**
  * @class root.directives.showGame
  * @description Directive. Set up game section on click
  */
 angular
 	.module('leagueOfApp')
 		.directive('showGame', function (DOMElements, MatchMap){
		    return {
		    	restrict: 'A',
		    	scope: true,
		    	link: function (scope, element, attr) 
		    	{
					element.on('click', function(event) {

						// Prevent default click of selected content
						event.preventDefault();

						// DOMElements.startLoader();
						
						var gameSection = document.getElementById('game');
						gameSection.className = 'animate-show opacity-0';

						MatchMap.initMap(attr.game, attr.mode, attr.timestamp, scope, function(){

              				gameSection.className = 'animate-show opacity-1';

							// DOMElements.stopLoader();
						});
						
					});
			    }
    		}
		});