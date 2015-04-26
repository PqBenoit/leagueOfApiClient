'use strict';

/**
  * @class root.directives.showGame
  * @description Show a game details on click
  */
 angular
 	.module('leagueOfApp')
 		.directive('showGame', function($animate, $timeout){
		    return {
		    	restrict: 'A',
		    	link: function(scope, element, attr) 
		    	{

					element.on('click', function(event) {
						// Prevent default click of selected content
						event.preventDefault();
						var gameSection = document.getElementById('game');
						gameSection.className = gameSection.className + ' opacity-1';
					});
					
			    }
    		}
		});