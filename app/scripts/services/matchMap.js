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

              Map.getParticipantPositions(function(cords){

                Map.loadMap(cords);

                // Allow to use match data in root scope
                data.minuteDuration = Math.floor(data.matchDuration/60);
                Helpers.setVarToRootScope('match', data, true);

                return callback();

              });

            });

          },

          getEventsPositions: function (callback)
          {

          },

          /**
           * @function getPositions
           * @memberof root.services.MatchMap
           * @description set up an array for events coordinates
           *
           * @returns {Void}
           */
          getParticipantPositions: function (callback)
          {
            var cords = [];
            for (var i = 0, j = Map.matchData.timeline.frames.length ; i < j ; i++) {

              // Select the frame tha matched with setted timestamp
              if (Map.matchData.timeline.frames[i].timestamp == Map.timestamp) {
                var participantFrame = Map.matchData.timeline.frames[i].participantFrames;

                // Check if frames exist
                if (participantFrame) {

                  for (var participantId in participantFrame) {
                    var positions = participantFrame[participantId].position;

                    // Check if any positions in this frame
                    if (positions) {
                      var participantInfos = participantFrame[participantId];

                      // Setup the champion name
                      for (var ii = 0, jj = Map.matchData.participants.length ; ii < jj ; ii++) {

                        if (Map.matchData.participants[ii].participantId == participantId) {
                          participantInfos.championName = Map.scope.champInfos.data[Map.matchData.participants[ii].championId].name;
                        }

                      }

                      // Setup cords array
                      if (parseInt(participantId) <= 5) {
                        cords.push({x: positions.x, y: positions.y, team: 1, participantData: participantInfos, type: 'participant'});
                      } else {
                        cords.push({x: positions.x, y: positions.y, team: 2, participantData: participantInfos, type: 'participant'});
                      }
                    }
                  }
                }
              }   
            }

            return callback(cords);
          },

          /**
           * @function loadMap
           * @memberof root.services.MatchMap
           * @description Create the map with the given events coordiantes
           * @param {Array} cords, @see root.services.MatchMap.getPositions
           * @see d3.js
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

            
            for (var i = 0, j = Map.matchData.participants.length ; i < j ; i++) {
                svg.append('def')
                    .attr('id', 'avatar')
                    .append('pattern')
                      .attr('id', 'p-'+Map.matchData.participants[i].participantId)
                      .attr('x', '0')
                      .attr('y', '0')
                      .attr('width', 30)
                      .attr('height', 30)
                      .append('image')
                        .attr('xlink:href', 'http://ddragon.leagueoflegends.com/cdn/5.8.1/img/champion/'+Map.scope.avatars.data[Map.matchData.participants[i].championId].image.full)
                        .attr('x', '0')
                        .attr('y', '0')
                        .attr('width', 30)
                        .attr('height', 30);
            }

            svg.append('svg:g').selectAll("circle")
                .data(cords)
                .enter().append("svg:circle")
                    .attr('cx', function(d) { return xScale(d.x) })
                    .attr('cy', function(d) { return yScale(d.y) })
                    .attr('r', 12)
                    .attr('stroke', function(d) {
                      if (d.team == 1) {
                        return '#E25041';
                      } else {
                        return '#2C82C9';
                      }
                    })
                    .attr('stroke-width', 2)
                    .attr('fill', function(d) {
                        return 'url(#p-'+d.participantData.participantId+')';
                    })
                    .attr('class', 'kills')
                    .on("mouseover", function(){
                      return tooltip.style("visibility", "visible");
                    })
                    .on("mousemove", function(d){
                      if (d.type === 'participant') {
                        return tooltip.style("top", "0")
                                    .style("left","0")
                                    .attr('class', 'tooltip-map')
                                    .html(d.participantData.championName+"<br>level: "+d.participantData.level);
                      }
                      
                    })
                    .on("mouseout", function(){
                      return tooltip.style("visibility", "hidden");
                    })
                    .on("click", function(){
                      
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

          },

          /**
           * @function setTimelineEvents
           * @memberof root.services.MatchMap
           * @description Create the timeline, each timeline frames given by lol api 'match' make a part of the timeline
           *
           * @returns {Void}
           */
          setTimelineEvents: function ()
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
