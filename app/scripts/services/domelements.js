'use strict';

/**
 * @class root.services.DOMElements
 * @description Loader utilities methods
 * 
 */
 angular
  .module('leagueOfApp')
    .service('DOMElements', 

      function(){

        var DOMElements = {

            /**
             * @var loaderHTML
             * @memberof root.services.DOMElements
             * @description HTML element for the loader
             */
            loaderHTML: null,

            /**
             * @var messageHTML
             * @memberof root.services.DOMElements
             * @description HTML element for flash message
             */
            messageHTML: null,
            
            /**
             * @function initLoader
             * @memberof root.services.DOMElements
             * @description Init the loader, set the HTML element and hide it by default.
             * @param {HTMLElement} element
             *
             * @returns {Void}
             */
            initLoader: function(element)
            {
              this.loaderHTML = element;
              this.loaderHTML.style.display = 'none';
            },

            

            /**
             * @function startLoader
             * @memberof root.services.DOMElements
             * @description Start the loader animation
             *
             * @returns {Void}
             */
            startLoader: function()
            {
              this.loaderHTML.style.display = 'block';
              Velocity(this.loaderHTML, {
                  left: "112%"
              },
              {
                duration: 3000,
                loop: true,
                easing: [0.750, 0.000, 0.500, 1.000]
              });
            },

            /**
             * @function stopLoader
             * @memberof root.services.DOMElements
             * @description hide the loader
             *
             * @returns {Void}
             */
            stopLoader: function()
            {
              this.loaderHTML.style.display = 'none';
            },

            /**
             * @function setFlashMessage
             * @memberof root.services.DOMElements
             * @description Set the message, and display it.
             * @param {string} message
             * @param {string} type (errors, infos, warnings, default)
             *
             * @returns {Void}
             */
            setFlashMessage: function(message, type)
            {
              var body = document.getElementsByTagName('body');
              
              this.messageHTML = document.createElement('div');
              this.messageHTML.className = 'flash-'+type;
              this.messageHTML.innerHTML = this.messageHTML.innerHTML+message;

              body[0].appendChild(this.messageHTML);
            },

            /**
             * @function displayFlashMessage
             * @memberof root.services.DOMElements
             * @description display it.
             * @param {string} message
             * @param {string} type (errors, infos, warnings, default)
             * @param {int} displayTime, time to display flash message in ms
             *
             * @returns {Void}
             */
            displayFlashMessage: function(message, type, displayTime)
            {
              this.setFlashMessage(message, type);
              this.messageHTML.style.display = "block";

              setTimeout(function(){
                DOMElements.removeFlashMessage();
              }, displayTime);
            },

            /**
             * @function startLoader
             * @memberof root.services.DOMElements
             * @description Remove it
             *
             * @returns {Void}
             */
            removeFlashMessage: function()
            {
              this.messageHTML.style.display = "none";
              this.messageHTML.innerHTML = '';
            }
        };

        return DOMElements;
    });