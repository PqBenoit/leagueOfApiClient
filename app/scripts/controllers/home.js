'use strict';

/**
 * @ngdoc function
 * @name leagueOfApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Sets up the svg map
 */

 angular.module('leagueOfApp').controller('HomeCtrl',
 	function ($scope, API) {
 		var json = API.get('euw', 'v1.3/game/by-summoner', ['30412234', 'recent']);
 		$scope.hello = json;
	}
);