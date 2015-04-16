'use strict';

/**
 * @ngdoc function
 * @name leagueOfApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Sets up the svg map
 */

 angular.module('leagueOfApp').controller('HomeCtrl', function ($scope, $routeParams, mapService) { 	
 	
 	var countries = mapService.setMap();
	mapService.bindRegions(countries);

	

});
