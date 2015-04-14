'use strict';
/**
  * @class root.controllers.HomeController
  *
  * @description root path controller
  */
 angular
 	.module('leagueOfApp')
 		.controller('HomeCtrl',
		 	function ($scope, API) {
		 		/**
	        	 * @var json
	        	 *
	        	 * @memberof root.controllers.HomeController
	        	 *
	        	 * @description json result from lol api
	        	 */
		 		var json = API.get('euw', 'v1.3/game/by-summoner', ['30412234', 'recent']);
		 		$scope.hello = json;
			}
		);