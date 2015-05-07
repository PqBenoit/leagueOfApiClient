'use strict';

/**
 * @class root.services.Helpers
 * @description Helpers
 * 
 */
 angular
  .module('leagueOfApp')
    .service('Helpers', 
      
      function ($rootScope) {

        var helpersFunc = {
          
          /**
             * @function in_array
             * @memberof root.services.Helpers
             * @description Check if given needle is in given haystack
             * @param {String} needle
             * @param {Array|Object} haystack
             * @param {Bool} argStrict
             *
             * @returns {Bool}
             */
          in_array: function(needle, haystack, argStrict) {
            var key = '',
                strict = !! argStrict;

            if (strict) {
              for (key in haystack) {
                if (haystack[key] === needle) {
                  return true;
                }
              }
            } else {
              for (key in haystack) {
                if (haystack[key] == needle) {
                  return true;
                }
              }
            }

            return false;
          },

          /**
             * @function setVarToRootScope
             * @memberof root.services.Helpers
             * @description Add var to the $rootScope
             * set force to true to rewrite the var named by given name, if it already exist.
             * @param {String} name
             * @param {mixed} value
             * @param {Boolean} force
             *
             * @returns {void}
             */
          setVarToRootScope: function(name, value, force) 
          {
            if (!$rootScope[name] || ($rootScope[name] && force)) {
              $rootScope[name] = value;
            }
          }

        }; 

        return helpersFunc;
});
