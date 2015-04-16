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
 			
 			function ($http) {

	        var API = {

	        	/**
	        	 * @var APIKey
	        	 * @memberof root.services.API
	        	 * @description League of Legend API Key
	        	 */
	        	APIKey: '',

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
	        	 * @var region
	        	 * @memberof root.services.API
	        	 * @description The region for lol api
	        	 * @see {@link config}
	        	 */
	        	region: '',

	        	/**
	        	 * @function config
	        	 * @memberof root.services.API
	        	 * @description Init some config
	        	 * @param {String} apiKey
	        	 * @param {String} region
	        	 *
	        	 * @returns {Void}
	        	 */
	        	config: function (apiKey, region)
	        	{
	        		API.APIKey = apiKey || 'fa48a883-3b7d-4ba9-a996-805f017b53dc';
	        		API.region = region || 'euw';
	        	},

	        	/**
	        	 * @function get
	        	 * @memberof root.services.API
	        	 * @description Sends get method to LOL API
	        	 * @param {String} model
	        	 * @param {Array} params
	        	 * @param {Function} callback
	        	 *
	        	 * @returns {JSON} Get request result
	        	 */
	            get: function (model, params, callback) 
	            {
	            	var url = 'https://'+API.region+'.api.pvp.net/api/lol/'+API.region+'/'+model+'/'+params.join('/')+'?api_key='+API.APIKey;

	                $http.get(url)
	                	.success(function(data, status, headers, config){
	                		if (status === 200) {

	                			return callback(data);
	                		} else {
	                			console.log('An error occured for get request on lol api. Status Code: '+status);

	                			return callback(null);
	                		}
	                	})
	                	.error(function(data, status, headers, config){
	                			console.log('An error occured for get request on lol api. Status Code: '+status);

	                			return callback(null);
	                	});
	            },

	            /**
	             * @function getStaticData
	             * @memberof root.services.API
	        	 * @description Sends get method to LOL Static API
	        	 * @param {String} model
	        	 * @param {Array} params
	        	 *
	        	 * @returns {JSON} Get request result
	             */
	            getStaticData: function (model, params) 
	            {
	            	return $http.get('');
	            },

	            /**
	        	 * @function getSummonerByName
	        	 * @memberof root.services.API
	        	 * @description Get a summoner by his name
	        	 * @param {String} summonerName
	        	 * @param {Function} callback
	        	 *
	        	 * @returns {JSON} Get request result
	        	 */
	            getSummonerByName: function (summonerName, callback)
	            {
	            	API.get('v1.4/summoner/by-name', [summonerName], function(summoner){

	            		return callback(summoner);
	            	});
	            },

	            /**
	        	 * @function getGamesBySummonerId
	        	 * @memberof root.services.API
	        	 * @description Get summoner's games by his id
	        	 * @param {Array} params
	        	 * @param {Function} callback
	        	 *
	        	 * @returns {JSON} Get request result
	        	 */
	            getGamesBySummonerId: function (params, callback)
	            {
	            	API.get('v1.3/game/by-summoner', params, function(results){
	            		return callback(results);
	            	});
	            },

	            /**
	        	 * @function getGameById
	        	 * @memberof root.services.API
	        	 * @description Get match data by the game id
	        	 * @param {Array} params
	        	 * @param {Function} callback
	        	 *
	        	 * @returns {JSON} Get request result
	        	 */
	            getMatchById: function (gameId, callback)
	            {
	            	API.get('v2.2/match', [gameId], function(results){
	            		return callback(results);
	            	});
	            },

				/**
	        	 * @function getStatsBySummonerId
	        	 * @memberof root.services.API
	        	 * @description Get summoner's stats by his id
	        	 * @param {Array} params
	        	 * @param {Function} callback
	        	 *
	        	 * @returns {JSON} Get request result
	        	 */
	            getStatsBySummonerId: function (params, callback)
	            {
	            	API.get('v1.3/stats/by-summoner', params, function(results){
	            		return callback(results);
	            	});
	            }

	        };

	        return API;
    	});