'use strict';

/**
  * @class root.controllers.SummonerCtrl
  * @description data viz page controller
  * Load lol api data
  */
 angular
 	.module('leagueOfApp')
 		.controller('SummonerCtrl', function ($rootScope, $scope, API, DOMElements) {

 			// Init loader and hide it
 			DOMElements.initLoader(document.getElementById('loader'));

 			// Configurates LOL api service
 			API.config('fa48a883-3b7d-4ba9-a996-805f017b53dc', $rootScope.region);

 			/** 
 			 * @var {HTMLElement} fullScreenSummonerForm 
			 * @memberOf root.controllers.SummonerCtrl
 			 */
 			var fullScreenSummonerForm = document.getElementById('summoner-form');
 			fullScreenSummonerForm.style.display = 'block';

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

 				if(!summoner) {

 				}

 				API.getSummonerByName(summoner.name, function(summoner){
 					if(summoner) {
 						$scope.summonerErrors = null;

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