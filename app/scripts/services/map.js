'use strict';

/**
 * @class root.services.Map
 * @description LOL map game service
 */
 angular
  .module('leagueOfApp')
    .service('Map', 
      
      function (Helpers, API, $compile) {

        var Map = {

          matchData: {},

          mapBackground: "",

          timestamp: 0,
          
          /**
             * @function initMap
             * @memberof root.services.Map
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

              return callback();
            });

          },

          /**
           *
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
                        cords.push({x: positions.x, y: positions.y, team: 1});
                      } else {
                        cords.push({x: positions.x, y: positions.y, team: 2});
                      }
                    }
                  }
                }
              }   
            }

            return cords;
          },

          /**
           *
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
                        return '#000000';
                      } else {
                        return '#444444';
                      }
                    })
                    .attr('class', 'kills');
          },

          /**
           *
           */
          setTimeline: function ()
          {
            var timeline = document.getElementById('timeline');
            timeline.innerHTML = "";
            
            for (var i = 0, j = Map.matchData.timeline.frames.length ; i < j ; i++) {
              var frame = Map.matchData.timeline.frames[i];
              var timePoint = document.createElement('p');

              timePoint.setAttribute('data-timestamp', frame.timestamp);
              timePoint.setAttribute('refresh-game', '');
              timePoint.className = 'timeline-point';

              timeline.appendChild(timePoint);
              // To make directive, etc ready !
              timePoint = $compile(timePoint)(Map.scope);
            }

          }

        }; 

        return Map;
});
