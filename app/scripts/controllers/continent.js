'use strict';

/**
  * @class root.controllers.ContinentCtrl
  * @description data viz page controller
  * Load lol api data
  */
 angular.module('leagueOfApp')
  .controller('ContinentCtrl', function (API) {
    $scope.lolStatus = {};

    API.getStatus($routeParams.region).success(function(data){
      console.log(data);
      $scope.lolStatus = data;
    });
  });