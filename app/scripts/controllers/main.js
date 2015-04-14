'use strict';

/**
 * @ngdoc function
 * @name leagueOfApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the leagueOfApp
 */
angular.module('leagueOfApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
