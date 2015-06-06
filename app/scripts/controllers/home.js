'use strict';

/**
 * @class root.controllers.HomeCtrl
 * @description home page controller. Init SVG world map
 * @param {Class} $scope
 * @param {Class} mapService
 */
angular.module('leagueOfApp').controller('HomeCtrl', function ($scope, $timeout, mapService, DOMElements, API, $http, $location, $rootScope) {	


	var $region = document.getElementById('info-container');
		$scope.names = [];

	/**
	 * @function bindRegions
	 * @memberof root.controllers.HomeCtrl
	 * @description bind world map regions
	 * @param {Array} array
	 * @public
	 *
	 * @returns {Namespace} info
	 */
	$scope.bindRegions = function (array)
	{

    	var prevRegion = '';

     	for (var i = 0, j = array.length ; i < j ; i++) {

     		array[i].node.style.opacity = 0.4;


     		array[i].click(function(e) {

     			if (this.node.region) {

     				$location.path('summoner/' + this.node.region);
     				$location.replace();
     				$rootScope.$apply();

     			}

     		});


     		array[i].mouseover(function(e) {

     			if (this.node.region) {

					this.attr({'fill': '#FF9C00'});
					this.node.style.opacity = 1;

                  	$scope.region = this.node.region;

                    for (var ii = 0, jj = array.length ; ii < jj ; ii++) {

	                    if (array[ii].node.region !== this.node.region) {

	                    	continue;
	                    }
                       
						array[ii].attr({'fill': '#FF9C00'});
						array[ii].node.style.opacity = 1;

                    }

                 	if (prevRegion != this.node.region) {
     					$scope.returnFreeChampions(this.node.region);
     				}

                    prevRegion = this.node.region;
     			}

     		});


     		array[i].mouseout(function(e) {

     			if (this.node.region) {

     				for (var iii = 0, jjj = array.length ; iii < jjj ; iii++) {

     					if (array[iii].node.region !== this.node.region) {
     						continue;
     					}

     					array[iii].node.style.opacity = 0.4;
     					array[iii].attr({'fill': '#999999'});
     				}

     			}

     		});

     	}
    };

	/**
	* @function returnFreeChampions
	* @memberof root.controllers.HomeCtrl
	* @description to show free champions for the week
	* @param {String} region
	* @public
	*
	* @returns {Void}
	*/
	$scope.returnFreeChampions = function (region)
	{
	  	var champArray = [], 
			regionInfo = {};

		$region.className = ' info-container-loading';

		$http.get('https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.2/champion?freeToPlay=true&api_key=fa48a883-3b7d-4ba9-a996-805f017b53dc')
			.success(function(freeData, status){
				$http.get('https://global.api.pvp.net/api/lol/static-data/' + region.toLowerCase() + '/v1.2/champion/?champData=image&dataById=true&api_key=525fce0a-e89d-45c6-ad88-8422b0bba969')
					.success(function(data, status){
						
						$scope.names = [];

						for(var i = 0; i < freeData.champions.length; i++){
							$scope.names.push(data.data[freeData.champions[i].id].image.full);
						}

						$region.className = 'info-container-active';
					})
					.error(function(error){
						console.log(error);
					});
			})
			.error(function(error){
				console.log(error);
			});
	};

	/**
	 * Add world map background svg
	 */
	mapService.setMap(function(countries) {	

		$scope.countries = countries

	});

	$scope.bindRegions($scope.countries);
});