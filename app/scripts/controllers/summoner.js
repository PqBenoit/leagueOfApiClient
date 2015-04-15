'use strict';

/**
  * @class root.controllers.SummonerCtrl
  * @description data viz page controller
  * Load lol api data
  */
 angular
 	.module('leagueOfApp')
 		.controller('SummonerCtrl', function ($rootScope, $scope, API) {

 			API.config('fa48a883-3b7d-4ba9-a996-805f017b53dc', $rootScope.region);

 			/**
 			 * @function getSummoner
 			 * @memberOf root.controllers.SummonerCtrl
 			 * @description Get a summoner id by his name in LOL API
 			 * @param {string} summoner name (the lol player name)
 			 * 
 			 * @returns
 			 */
 			$scope.getSummoner = function (summoner)
 			{
 				API.getSummonerByName(summoner.name, function(summoner){
 					$scope.summonerResult = summoner || 'aucun résultat';
 				});
 			};
 		});