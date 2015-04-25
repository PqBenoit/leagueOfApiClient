'use strict';

/**
 * @class root.services.Helpers
 * @description Helpers
 * 
 */
 angular
  .module('leagueOfApp')
    .service('Helpers', 
      
      function () {

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
          }

        }; 

        return helpersFunc;
});
