'use strict';

 /**
  * @module root.leagueOfApp
  * @description Main module for AngularJs App
  */
angular
  .module('leagueOfApp', [
    'ngResource',
    'ngRoute',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/summoner/:region', {
        templateUrl: 'views/summoner.html',
        controller: 'SummonerCtrl'
      })
      .when('/continent', {
        templateUrl: 'views/continent.html',
        controller: 'ContinentCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

