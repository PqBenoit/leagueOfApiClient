'use strict';

/**
 * @ngdoc function
 * @name leagueOfApp.service:API
 * @description
 * # League of Legend API
 *
 * Client REST for League of Legend API
 */

 angular.module('leagueOfApp').service('API', function($http) {
        var API = {
        	APIKey: 'fa48a883-3b7d-4ba9-a996-805f017b53dc',
        	baseUrlStaticData: 'https://global.api.pvp.net/api/lol/static-data/',
        	versionSaticData: 'v1.2',

        	/**
        	 * @function
        	 * @description
        	 * Sends get method to LOL API
        	 */
            get: function(region, model, params) 
            {
                return $http.get('https://'+region+'.api.pvp.net/api/lol/'+region+'/'+model+'/'+params.join('/')+'?api_key='+API.APIKey);
            },

            /**
             * @function
        	 * @description
        	 * Sends get method to LOL Static API
             */
            getStaticData: function() 
            {

            }
        };

        return API;
    });