'use strict';

/**
 * @class root.services.matchMap
 * @description LOL map game service
 */
 angular
  .module('leagueOfApp')
    .service('MatchMap', 
      
      function (Helpers, API, DOMElements, $compile) {

        var Map = {

          matchData: {},

          mapBackground: "",

          timestamp: 0,
          
          /**
           * @function initMap
           * @memberof root.services.MatchMap
           * @description Init LOL map
           * @param {int} gameId
           * @param {int} timestamp
           * @param {function} callback
           *
           * @returns {function}
           */
          initMap: function(gameId, gameMode, timestamp, scope, callback) {

            Map.timestamp = timestamp || 0;
            Map.scope = scope;

            if (gameMode == 'ARAM') {
              Map.mapBackground = "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/map/map12.png "
            } else {
              Map.mapBackground = "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/map/map1.png "
            }

            // Build cords Array
            API.getMatchById(gameId, true, function(data) {
              Map.matchData = data;
              Map.setTimeline();
              var cords = Map.getPositions();
              Map.loadMap(cords);

              // Allow to use match data in root scope
              data.minuteDuration = Math.floor(data.matchDuration/60);
              Helpers.setVarToRootScope('match', data, true);

              return callback();
            });

          },

          /**
           * @function getPositions
           * @memberof root.services.MatchMap
           * @description set up an array for events coordinates
           *
           * @returns {Void}
           */
          getPositions: function ()
          {
            var cords = [];

            for (var i = 0, j = Map.matchData.timeline.frames.length ; i < j ; i++) {

              if (Map.matchData.timeline.frames[i].timestamp == Map.timestamp) {

                var participantFrame = Map.matchData.timeline.frames[i].participantFrames;

                if (participantFrame) {

                  for (var participantId in participantFrame) {
                    var positions = participantFrame[participantId].position;

                    if (positions) {

                      if (parseInt(participantId) <= 5) {
                        cords.push({x: positions.x, y: positions.y, team: 1, participantData: participantFrame[participantId]});
                      } else {
                        cords.push({x: positions.x, y: positions.y, team: 2, participantData: participantFrame[participantId]});
                      }
                    }
                  }
                }
              }   
            }

            return cords;
          },

          /**
           * @function loadMap
           * @memberof root.services.MatchMap
           * @description Create the map with the given events coordiantes
           * @param {Array} cords, @see root.services.MatchMap.getPositions
           *
           * @returns {Void}
           */
          loadMap: function (cords)
          {
            var map = document.getElementById('map-game');
            map.innerHTML = "";
        
            var domain = {
                        min: {x: -570, y: -420},
                        max: {x: 15220, y: 14980}
                },
                width = 512,
                height = 512,
                bg = Map.mapBackground,
                xScale, yScale, svg;

            var color = d3.scale.linear()
                .domain([0, 3])
                .range(["white", "steelblue"])
                .interpolate(d3.interpolateLab);

            var xScale = d3.scale.linear()
              .domain([domain.min.x, domain.max.x])
              .range([0, width]);

            var yScale = d3.scale.linear()
              .domain([domain.min.y, domain.max.y])
              .range([height, 0]);

            var svg = d3.select("#map-game").append("svg:svg")
                .attr("width", width)
                .attr("height", height);

            var tooltip = d3.select("#map-game")
                  .append("div")
                  .style("position", "absolute")
                  .style("z-index", "10")
                  .style("visibility", "hidden");

            svg.append('image')
                .attr('xlink:href', bg)
                .attr('x', '0')
                .attr('y', '0')
                .attr('width', width)
                .attr('height', height);

            svg.append('svg:g').selectAll("circle")
                .data(cords)
                .enter().append("svg:circle")
                    .attr('cx', function(d) { return xScale(d.x) })
                    .attr('cy', function(d) { return yScale(d.y) })
                    .attr('r', 5)
                    .attr('fill', function(d) {
                      if (d.team == 1) {
                        return '#E25041';
                      } else {
                        return '#2C82C9';
                      }
                    })
                    .attr('class', 'kills')
                    .on("mouseover", function(){
                      return tooltip.style("visibility", "visible");
                    })
                    .on("mousemove", function(d){
                      return tooltip.style("top", "0")
                                    .style("left","0")
                                    .attr('class', 'tooltip-map')
                                    .text("level: "+d.participantData.level);
                    })
                    .on("mouseout", function(){
                      return tooltip.style("visibility", "hidden");
                    });
          },

          /**
           * @function setTimeline
           * @memberof root.services.MatchMap
           * @description Create the timeline, each timeline frames given by lol api 'match' make a part of the timeline
           *
           * @returns {Void}
           */
          setTimeline: function ()
          {
            var timeline = document.getElementById('timeline');
            timeline.innerHTML = "";
            
            for (var i = 0, j = Map.matchData.timeline.frames.length ; i < j ; i++) {
              var frame = Map.matchData.timeline.frames[i];
              var timePoint = document.createElement('p');

              timePoint.setAttribute('data-timestamp', frame.timestamp);
              timePoint.setAttribute('refresh-map', '');
              timePoint.setAttribute('timeline-tooltip', '');
              timePoint.className = 'timeline-point';

              timeline.appendChild(timePoint);
              // To make directive, etc ready !
              timePoint = $compile(timePoint)(Map.scope);
            }

          }

        }; 

        return Map;
});
