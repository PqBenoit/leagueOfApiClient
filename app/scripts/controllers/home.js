'use strict';

/**
 * @class root.controllers.HomeCtrl
 * @description home page controller
 * Load SVG world map
 * @param {Class} $scope
 */
 angular.module('leagueOfApp').controller('HomeCtrl', function ($scope, mapService) { 	
 	
 	var countries = mapService.setMap();
	mapService.bindRegions(countries);

});
