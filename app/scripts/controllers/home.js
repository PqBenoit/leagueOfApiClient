'use strict';

/**
 * @class root.controllers.HomeCtrl
 * @description home page controller. Init SVG world map
 * @param {Class} $scope
 * @param {Class} mapService
 */
angular.module('leagueOfApp').controller('HomeCtrl', function ($scope, $timeout, mapService, DOMElements) {
 	
 	// DOMElements.initLoader(document.getElementById('loader'));
 	// DOMElements.startLoader();

	mapService.setMap(function(countries){
		var countries = countries;
		mapService.bindRegions(countries);
		// DOMElements.stopLoader();
	});

});
