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
 			DOMElements.initLoader(document.getElementById('loader'));

 			// Configurates LOL api service
 			API.config('fa48a883-3b7d-4ba9-a996-805f017b53dc', $routeParams.region.toLowerCase());

 			/** 
 			 * @var {HTMLElement} fullScreenSummonerForm 
			 * @memberOf root.controllers.SummonerCtrl
 			 */
 			var fullScreenSummonerForm = document.getElementById('summoner-form');
 			fullScreenSummonerForm.style.display = 'block';

 			/**
        	 * @function setChampsAvatar
        	 * @memberof root.controllers.SummonerCtrl
        	 * @description Set href champion avatar in avatars array
        	 * @param {Object} results
        	 *
        	 * @returns {Void}
        	 */
            var setChampsAvatar = function (results)
            {
            	$scope.avatars = [];

            	for (var i = 0, j = results.games.length ; i < j ; i++) {
            		var c = i

	        		API.getStaticData('v1.2/champion', results.games[i].championId, '?champData=image', function(champion){

	            		$scope.avatars.push(API.getAssets('5.2.1/img/champion/'+champion.image.full));

	            	});

	        	}
            };

            /**
        	 * @function setSpells
        	 * @memberof root.controllers.SummonerCtrl
        	 * @description Set href spells img in spells array
        	 * @param {Object} results
        	 *
        	 * @returns {Void}
        	 */
            var setSpells = function (results)
            {
            	$scope.spells = {first: [], second: []};

            	for (var i = 0, j = results.games.length ; i < j ; i++) {
            		var c = i

	        		API.getStaticData('v1.2/summoner-spell', results.games[i].spell1, '?spellData=image', function(spell){

	            		$scope.spells.first.push(API.getAssets('5.2.1/img/spell/'+spell.image.full));

	            	});
	            	API.getStaticData('v1.2/summoner-spell', results.games[i].spell2, '?spellData=image', function(spell){

	            		$scope.spells.second.push(API.getAssets('5.2.1/img/spell/'+spell.image.full));

	            	});

	        	}
            };

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

 						setChampsAvatar(results);
 						setSpells(results);
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
 				if (!summoner) {

 					DOMElements.displayFlashMessage('Aucun nom renseigné !', 'errors', 4000);

 				} else {

 					DOMElements.startLoader();

 					API.getSummonerByName(summoner.name, function(res){

	 					if(res) {

	 						var id = res[summoner.name.toLowerCase()].id;
	 						
	 						getGames(id);
		            		getStats(id);

	 						DOMElements.removeFlashMessage();

	 						DOMElements.stopLoader();
	            			Velocity(fullScreenSummonerForm, {opacity: 0, duration: 1000}, function(){
	 							fullScreenSummonerForm.style.display = 'none';
	 						});

	 					} else {

	 						DOMElements.stopLoader();
	 						DOMElements.displayFlashMessage('Aucun résultat pour ce nom d\'invocateur', 'errors', 4000);

	 						$scope.summonerErrors = 'Aucun résultat pour ce nom d\'invocateur';
	 					}

	 				});

 				}
 			};

 		});