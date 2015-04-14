'use strict';

/**
 * @class root.services.API
 * @description League of Legend API REST client
 * 
 * @param $http
 */
 angular
 	.module('leagueOfApp')
 		.service('API', 
 			
 			function($http) {

	        var API = {

	        	/**
	        	 * @var APIKey
	        	 * @memberof root.services.API
	        	 * @description League of Legend API Key
	        	 */
	        	APIKey: 'fa48a883-3b7d-4ba9-a996-805f017b53dc',

	        	/**
	        	 * @var baseUrlStaticData
	        	 * @memberof root.services.API
	        	 * @description base url for League of Legend API statis data
	        	 */
	        	baseUrlStaticData: 'https://global.api.pvp.net/api/lol/static-data/',

	        	/**
	        	 * @var versionSaticData
	        	 * @memberof root.services.API
	        	 * @description League of Legend API statis data version
	        	 */
	        	versionSaticData: 'v1.2',

	        	/**
	        	 * @function get
	        	 * @memberof root.services.API
	        	 * @description Sends get method to LOL API
	        	 * @param {String} region
	        	 * @param {String} model
	        	 * @param {Array} params
	        	 *
	        	 * @return {JSON} Get request result
	        	 */
	            get: function(region, model, params) 
	            {
	                return $http.get('https://'+region+'.api.pvp.net/api/lol/'+region+'/'+model+'/'+params.join('/')+'?api_key='+API.APIKey);
	            },

	            /**
	             * @function getStaticData
	             * @memberof root.services.API
	        	 * @description Sends get method to LOL Static API
	        	 * @param {String} model
	        	 * @param {Array} params
	        	 *
	        	 * @return {JSON} Get request result
	             */
	            getStaticData: function(model, params) 
	            {
	            	return $http.get('');
	            }
	        };

	        return API;
    	});