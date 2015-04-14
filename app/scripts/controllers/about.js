'use strict';

/**
 * @ngdoc function
 * @name leagueOfApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the leagueOfApp
 */
angular.module('leagueOfApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
