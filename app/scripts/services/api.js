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
	        		API.APIKey = apiKey.toLowerCase() || 'fa48a883-3b7d-4ba9-a996-805f017b53dc';
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
	        	 * @returns {Function} Callback(JSON||null)
	        	 */
	            get: function (model, params, callback) 
	            {
	            	var url = '';

	            	if (params === '' || params.length === 0) {
	            		url = 'https://'+API.region+'.api.pvp.net/api/lol/'+API.region+'/'+model+'?api_key='+API.APIKey;
	            	} else {
	            		url = 'https://'+API.region+'.api.pvp.net/api/lol/'+API.region+'/'+model+'/'+params.join('/')+'?api_key='+API.APIKey;
	            	}

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
	        	 * @param {Int} id
	        	 * @param {string} fields, comma-sparated
	        	 *
	        	 * @returns {Function} Callback(JSON||null)
	             */
	            getStaticData: function (model, id, fields, callback) 
	            {
	            	var url = '';

	            	if (fields != '' || fields != null) {
	            		url = 'https://global.api.pvp.net/api/lol/static-data/'+API.region+'/'+model+'/'+id+fields+'&api_key='+API.APIKey;
	            	} else {
	            		url = 'https://global.api.pvp.net/api/lol/static-data/'+API.region+'/'+model+'/'+id+'?api_key='+API.APIKey;
	            	}

	                $http.get(url)
	                	.success(function(data, status, headers, config){
	                		if (status === 200) {

	                			return callback(data);
	                		} else {
	                			console.log('An error occured for get request on lol static api. Status Code: '+status);

	                			return callback(null);
	                		}
	                	})
	                	.error(function(data, status, headers, config){
	                			console.log('An error occured for get request on lol static api. Status Code: '+status);

	                			return callback(null);
	                	});
	            },

	            /**
	             * @function getAssets
	             * @memberof root.services.API
	        	 * @description Send get method to lol CDN. 
	        	 * @param {String} target
	        	 *
	        	 * @returns {String} src
	             */
	            getAssets: function (target)
	            {
	            	var src = 'http://ddragon.leagueoflegends.com/cdn/'+target;

	            	return src;
	            },

	            /**
	        	 * @function getSummonerByName
	        	 * @memberof root.services.API
	        	 * @description Get a summoner by his name
	        	 * @param {String} summonerName
	        	 * @param {Function} callback
	        	 *
	        	 * @returns {Function} Callback(JSON||null)
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
	        	 * @returns {Function} Callback(JSON||null)
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
	        	 * @returns {Function} Callback(JSON||null)
	        	 */
	            getMatchById: function (gameId, callback)
	            {
	            	API.get('v2.2/match', [gameId], function(result){
	            		return callback(result);
	            	});
	            },

				/**
	        	 * @function getStatsBySummonerId
	        	 * @memberof root.services.API
	        	 * @description Get summoner's stats by his id
	        	 * @param {Array} params
	        	 * @param {Function} callback
	        	 *
	        	 * @returns {Function} Callback(JSON||null)
	        	 */
	            getStatsBySummonerId: function (params, callback)
	            {
	            	API.get('v1.3/stats/by-summoner', params, function(results){
	            		return callback(results);
	            	});
	            },

	          //   *
	        	 // * @function getChampion
	        	 // * @memberof root.services.API
	        	 // * @description Get champion object for given champion id
	        	 // * @param {Int} champId
	        	 // * @param {String} fields, comma-separated
	        	 // * @param {Function} callback
	        	 // *
	        	 // * @returns {Function} Callback(JSON||null)
	        	 
	          //   getChampion: function (champId, fields, callback)
	          //   {
	          //   	API.getStaticData('V1.2/champion', champId, '?champData='+fields, function(champion){
	          //   		return callback(champion);
	          //   	});
	          //   }

	        };

	        return API;
    	});