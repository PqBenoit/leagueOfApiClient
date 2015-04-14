'use strict';

 /**
  * @module root.leagueOfApp
  * @description Main module for AngularJs App 
  *
  * @param {Module} ngResource
  * @param {Module} ngRoute
  * @param {Module} ngTouch
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
      .otherwise({
        redirectTo: '/'
      });
  });

