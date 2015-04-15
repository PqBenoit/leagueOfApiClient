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
 			 * @function getStats
 			 * @memberOf root.controllers.SummonerCtrl
 			 * @description Get summoner's stats by his id
 			 * @param {int} summoner id
 			 * 
 			 * @returns {Void}
 			 */
 			var getStats = function(summonerId)
 			{
 				API.getStatsBySummonerId([summonerId, 'summary'], function(results){
 					console.log(results);
 					$scope.statsResults = results || 'aucune stat pour ce joueur';
 				});
 			};


 			/**
 			 * @function getGames
 			 * @memberOf root.controllers.SummonerCtrl
 			 * @description Get summoner's games by his id
 			 * @param {int} summoner id
 			 * 
 			 * @returns {Void}
 			 */
 			var getGames = function(summonerId)
 			{
 				API.getGamesBySummonerId([summonerId, 'recent'], function(results){
 					console.log(results);
 					$scope.gamesResults = results || 'aucune game';
 				});
 			};

 			/**
 			 * @function getSummoner
 			 * @memberOf root.controllers.SummonerCtrl
 			 * @description Get a summoner id by his name in LOL API
 			 * @param {string} summoner name (the lol player name)
 			 * 
 			 * @returns {Void}
 			 */
 			$scope.getSummoner = function (summoner)
 			{
 				API.getSummonerByName(summoner.name, function(res){
 					var id = res[summoner.name].id;
 					$scope.summonerResult = id || 'aucun résultat';
	            	getGames(id);
	            	getStats(id);
 				});
 			};

 		});