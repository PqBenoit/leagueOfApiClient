'use strict';

/**
 * @class root.controllers.HomeCtrl
 * @description home page controller. Init SVG world map
 * @param {Class} $scope
 * @param {Class} mapService
 */
angular.module('leagueOfApp').controller('HomeCtrl', function ($scope, $timeout, mapService, DOMElements, API, $http, $location, $rootScope) {	

	mapService.setMap(function(countries){		
		$scope.countries = countries
	});

	$scope.bindRegions = function(array){

            var prevRegion = '';
            var $region = document.getElementById('info-container');
            var info = {};

         	for(var i = 0; i < array.length; i++){

         		array[i].node.style.opacity = 0.4;

         		array[i].click(function(e){
         			if(this.node.region){
         				$location.path('summoner/' + this.node.region);
         				$location.replace();
         				$rootScope.$apply();
         			}
         		})

         		array[i].mouseover(function(e){



         			if(this.node.region){

         				if(prevRegion != this.node.region){
         					$region.className -= ' info-container-loading';
         					console.log('different region');
         					$scope.returnFreeChampions(this.node.region);
         				}

		                  this.attr({'fill': '#FF9C00'});
		                  this.node.style.opacity = 1;

		                  var region = this.node.region;

		                  $http.get('http://status.leagueoflegends.com/shards/' + region.toLowerCase())
		                  	.success(function(data){
		                  		$scope.status = data.services.status;
		                  		console.log($scope.status);
		                  	})
		                  	.error(function(err){
		                  		$scope.status = 'online';
		                  	});

		                  	setTimeout(function(){
		                  		$scope.region = region;
		                  	}, 1000);

	                     	var region = this.node.region;

		                     for(var i = 0; i < array.length; i++){
		                        if(array[i].node.region === region){
		                           array[i].attr({'fill': '#FF9C00'});
		                           array[i].node.style.opacity = 1;
		                        }
		                     }

		                     prevRegion = this.node.region;

         			}
         		});

         		array[i].mouseout(function(e){

         			this.attr({'fill': '#999999'});
                  	this.node.style.opacity = 0.4;

         			if(this.node.region){

         				var region = this.node.region;

         				for(var i = 0; i < array.length; i++){
         					if(array[i].node.region === region){
         						array[i].node.style.opacity = 0.4;
         						array[i].attr({'fill': '#999999'});
         					}
         				}
         			}
         		});
         	}

            return info;

         }

         $scope.returnFreeChampions = function(region){

		  var $region = document.getElementById('info-container');
		  var champArray = [];

		  $region.className = ' info-container-loading';

		  var regionInfo = {};

		  $scope.nameArray = [];

		  $http.get('https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.2/champion?freeToPlay=true&api_key=fa48a883-3b7d-4ba9-a996-805f017b53dc')
		     .success(function(data, status){
				for(var i = 0; i < data.champions.length; i++){

					$http.get('https://global.api.pvp.net/api/lol/static-data/' + region.toLowerCase() + '/v1.2/champion/' + data.champions[i].id + '?champData=image&api_key=525fce0a-e89d-45c6-ad88-8422b0bba969')
						.success(function(data, status){
							$scope.nameArray.push(data.image.full);
						})
						.error(function(error){
							console.log(error);
						});
				}

		     })
		     .error(function(error){
		        console.log(error);
		     });

		     setTimeout(function(){
		     	$region.className = '';
		     	$region.className = 'info-container-active';
		     }, 5000);

		}

		$scope.infos = $scope.bindRegions($scope.countries);
});