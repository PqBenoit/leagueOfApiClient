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
             * @public
             */
            loaderHTML: null,

            /**
             * @var messageHTML
             * @memberof root.services.DOMElements
             * @description HTML element for flash message
             * @public
             */
            messageHTML: null,

            /**
             * @var tooltipHTML
             * @memberof root.services.DOMElements
             * @description HTML element for tooltip
             * @public
             */
            tooltipHTML: null,
            
            /**
             * @function initLoader
             * @memberof root.services.DOMElements
             * @description Init the loader, set the HTML element and hide it by default.
             * @param {HTMLElement} element
             * @public
             *
             * @returns {Void}
             */
            initLoader: function (element)
            {
              this.loaderHTML = element;
              this.loaderHTML.style.display = 'none';
            },

            /**
             * @function startLoader
             * @memberof root.services.DOMElements
             * @description Start the loader animation
             * @public
             *
             * @returns {Void}
             */
            startLoader: function ()
            {
              this.loaderHTML.style.display = 'block';
            },

            /**
             * @function stopLoader
             * @memberof root.services.DOMElements
             * @description hide the loader
             * @public
             *
             * @returns {Void}
             */
            stopLoader: function ()
            {
              this.loaderHTML.style.display = 'none';
            },

            /**
             * @function setFlashMessage
             * @memberof root.services.DOMElements
             * @description Set the message, and display it.
             * @param {string} message
             * @param {string} type (errors, infos, warnings, default)
             * @public
             *
             * @returns {Void}
             */
            setFlashMessage: function (message, type)
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
             * @public
             *
             * @returns {Void}
             */
            displayFlashMessage: function (message, type, displayTime)
            {
              if (this.messageHTML) {
                this.removeFlashMessage();
              } 
              
              this.setFlashMessage(message, type);
              this.messageHTML.style.display = "block";

              setTimeout(function(){
                DOMElements.removeFlashMessage();
              }, displayTime);
            },

            /**
             * @function removeFlashMessage
             * @memberof root.services.DOMElements
             * @description Remove it
             * @public
             *
             * @returns {Void}
             */
            removeFlashMessage: function ()
            {
              if (this.messageHTML) {  
                this.messageHTML.style.display = "none";
                this.messageHTML.innerHTML = '';
              }
            },

            /**
             * @function displayTooltip
             * @memberof root.services.DOMElements
             * @description set up the tooltip HTMLElement
             * @param {HTMLElement} parentElement
             * @public
             *
             * @returns {Void}
             */
            displayTooltip: function (parentElement, content)
            {
              this.tooltipHTML = document.createElement('span');
              var xpos = parentElement.offsetLeft;
              var ypos = parentElement.offsetTop;

              parentElement.style.position = 'relative';

              this.tooltipHTML.className = 'tooltip';
              this.tooltipHTML.innerHTML = content;
              this.tooltipHTML.style.position = 'absolute';
              this.tooltipHTML.style.left = "0";
              this.tooltipHTML.style.top = "-50px";

              parentElement.appendChild(this.tooltipHTML);
            },

            /**
             * @function removeTooltip
             * @memberof root.services.DOMElements
             * @description remove the tooltip HTMLElement of DOM
             * @public
             *
             * @returns {Void}
             */
            removeTooltip: function ()
            {
              this.tooltipHTML.remove();
            }
        };

        return DOMElements;
    });