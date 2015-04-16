'use strict';

/**
 * @class root.controllers.HomeCtrl
 * @description home page controller. Init SVG world map
 * @param {Class} $scope
 * @param {Class} mapService
 */
angular.module('leagueOfApp').controller('HomeCtrl', function ($scope, $routeParams, mapService) {
 	
 	var countries = mapService.setMap();
	mapService.bindRegions(countries);

});
