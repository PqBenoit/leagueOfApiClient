'use strict';

/**
  * @class root.controllers.SummonerCtrl
  * @description data viz page controller
  * Load lol api data
  */
 angular
	.module('leagueOfApp')
		.controller('SummonerCtrl', function ($rootScope, $scope, $routeParams, API, DOMElements, Helpers) {

			// Init loader and hide it
			DOMElements.initLoader(document.getElementById('loader-content'));

			// Configurates LOL api service
			API.config('fa48a883-3b7d-4ba9-a996-805f017b53dc', $routeParams.region.toLowerCase());

			/** 
			 * @var {HTMLElement} fullScreenSummonerForm 
			 * @memberOf root.controllers.SummonerCtrl
			 * @private
			 */
			var fullScreenSummonerForm = document.getElementById('summoner-form');
			fullScreenSummonerForm.style.display = 'block';

			/** 
			 * @var {HTMLElement} summonerStats 
			 * @memberOf root.controllers.SummonerCtrl
			 * @private
			 */
			var summonerStats = document.getElementById('summoner-stats');
			summonerStats.style.display = 'none';

			/** 
			 * @var {HTMLElement} SummonerMatchHistory 
			 * @memberOf root.controllers.SummonerCtrl
			 * @private
			 */
			var SummonerMatchHistory = document.getElementById('summoner-history');

			/**
			 * @function setChampsAvatar
			 * @memberof root.controllers.SummonerCtrl
			 * @description Set champion image infos in scope
			 * @param {Function} callback
			 * @private
			 *
			 * @returns {Void}
			 */
			var setChampsAvatar = function (callback)
			{
				$scope.avatars = {};

				API.getStaticData('v1.2/champion', '', '?champData=image&dataById=true', function(data){
					$scope.avatars = data;
					callback();
				});
			};

			/**
			 * @function setChampsInfos
			 * @memberof root.controllers.SummonerCtrl
			 * @description Set champion infos in scope
			 * @param {Function} callback
			 * @private
			 *
			 * @returns {Void}
			 */
			var setChampsInfos = function (callback)
			{
				$scope.champInfos = {};

				API.getStaticData('v1.2/champion', '', '?champData=info&dataById=true', function(data){
					$scope.champInfos = data;
					callback();
				});
			};

			/**
			 * @function setSpells
			 * @memberof root.controllers.SummonerCtrl
			 * @description Set spell images info in scope
			 * @param {Function} callback
			 * @private
			 *
			 * @returns {Void}
			 */
			var setSpells = function (callback)
			{
				$scope.spells = {};

				API.getStaticData('v1.2/summoner-spell', '', '?spellData=image&dataById=true&version=5.8.1&locale=fr_FR', function(data){
					$scope.spells = data;
					callback();
				});

			};

			/**
			 * @function getStats
			 * @memberOf root.controllers.SummonerCtrl
			 * @description Get summoner's stats by his id
			 * @param {int} summoner id
			 * @param {Function} callback
			 * @private
			 * 
			 * @returns {Void}
			 */
			var getStats = function(summonerId, callback)
			{
				API.getStatsBySummonerId([summonerId, 'summary'], function(results){

					$scope.statsResults = results || 'aucune stat pour ce joueur';
					callback();

				});
			};


			/**
			 * @function getGames
			 * @memberOf root.controllers.SummonerCtrl
			 * @description Get summoner's games by his id
			 * @param {int} summoner id
			 * @param {Function} callback
			 * @private
			 * 
			 * @returns {Void}
			 */
			var getGames = function(summonerId, callback)
			{
				API.getGamesBySummonerId([summonerId, 'recent'], function(results){

						setChampsAvatar(function(){	

							setSpells(function() {

								setChampsInfos(function(){
									$scope.gamesResults = results || 'aucune game';
									callback();
								})

							});

						});
		
				});
			};

			/**
			 * @function getSummoner
			 * @memberOf root.controllers.SummonerCtrl
			 * @description Get a summoner id by his name in LOL API
			 * @param {string} summoner, the LOL player name
			 * @public
			 * 
			 * @returns {Void}
			 */
			$scope.getSummoner = function (summoner)
			{
				if (!summoner) {

					DOMElements.displayFlashMessage('Aucun nom renseigné !', 'errors', 4000);

				} else {

					DOMElements.startLoader();

					API.getSummonerByName(summoner.name, function(res){

						if(res) {

							var id = res[summoner.name.toLowerCase()].id;
							
							getGames(id, function() {

								getStats(id, function() {

									DOMElements.removeFlashMessage();

									DOMElements.stopLoader();
									Velocity(fullScreenSummonerForm, {opacity: 0, duration: 1000}, function(){
										fullScreenSummonerForm.style.display = 'none';
										
										SummonerMatchHistory.style.display = 'block';
										summonerStats.style.display = 'block';
										Velocity(SummonerMatchHistory, {opacity: 1, duration: 1000});
										Velocity(summonerStats, {opacity: 1, duration: 1000});
									});

								});

							});

							

						} else {

							DOMElements.stopLoader();
							DOMElements.displayFlashMessage('Aucun résultat pour ce nom d\'invocateur', 'errors', 4000);

							$scope.summonerErrors = 'Aucun résultat pour ce nom d\'invocateur';
						}

					});

				}
			};
			$scope.selected;
			$scope.select = function(key){
				$scope.selected = key;
			}
		});