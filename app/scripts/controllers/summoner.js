'use strict';

/**
  * @class root.controllers.SummonerCtrl
  * @description data viz page controller
  * Load lol api data
  */
 angular
 	.module('leagueOfApp')
 		.controller('SummonerCtrl', function ($rootScope, $scope, $routeParams, API, DOMElements) {

 			// Init loader and hide it
 			DOMElements.initLoader(document.getElementById('loader'));

 			console.log($routeParams.region);

 			// Configurates LOL api service
 			API.config('fa48a883-3b7d-4ba9-a996-805f017b53dc', $routeParams.region);

 			/** 
 			 * @var {HTMLElement} fullScreenSummonerForm 
			 * @memberOf root.controllers.SummonerCtrl
 			 */
 			var fullScreenSummonerForm = document.getElementById('summoner-form');
 			fullScreenSummonerForm.style.display = 'block';

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
 				DOMElements.startLoader();

 				API.getSummonerByName(summoner.name, function(res){
 					if(res) {
 						$scope.summonerErrors = null;

 						var id = res[summoner.name].id;
 						
 						getGames(id);
	            		getStats(id);

 						DOMElements.stopLoader();
 						DOMElements.removeFlashMessage();

 						Velocity(fullScreenSummonerForm, {opacity: 0, duration: 1000}, function(){
 							fullScreenSummonerForm.style.display = 'none';
 						});
 					} else {

 						DOMElements.stopLoader();
 						DOMElements.displayFlashMessage('Aucun résultat pour ce nom d\'invocateur', 'errors', 4000);

 						$scope.summonerErrors = 'Aucun résultat pour ce nom d\'invocateur';
 					}
 				});
 			};

 		});