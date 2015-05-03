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

          /** 
           * @var {Namespace} matchData 
           * @memberOf root.services.matchMap
           * @public
           */
          matchData: {},

          /** 
           * @var {String} mapBackground 
           * @memberOf root.services.matchMap
           * @public
           */
          mapBackground: "",

          /** 
           * @var {Int} timestamp 
           * @memberOf root.services.matchMap
           * @public
           */
          timestamp: 0,

          /** 
           * @var {Boolean} eventsRendered 
           * @memberOf root.services.matchMap
           * @public
           */
          eventsRendered: false,
          
          /**
           * @function initMap
           * @memberof root.services.matchMap
           * @description Init LOL map
           * @param {int} gameId
           * @param {int} timestamp
           * @param {$scope} scope
           * @param {function} callback
           * @public
           *
           * @returns {function}
           */
          initMap: function(gameId, gameMode, timestamp, scope, callback) {

            Map.timestamp = timestamp || 0;
            Map.scope = scope;

            if (gameMode == 'ARAM') {
              Map.mapBackground = "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/map/map12.png ";
            } else {
              Map.mapBackground = "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/map/map1.png ";
            }

            // Build cords Array
            API.getMatchById(gameId, true, function(data) {

              Map.matchData = data;
              Map.setTimeline();

              Map.getParticipantPositions(function(cords){
                Map.getEventPositions(function(cordsEvent){
                  Map.loadMap(cords, cordsEvent);

                  // Allow to use match data in root scope
                  data.minuteDuration = Math.floor(data.matchDuration/60);
                  Helpers.setVarToRootScope('match', data, true);

                  return callback();
                });

              });

            });

          },

          /**
           * @function getEventPositions
           * @memberof root.services.matchMap
           * @description set up an array for events coordinates
           * @param {function} callback
           * @public
           *
           * @returns {function}
           */
          getEventPositions: function (callback)
          {
            var cords = [];
            for (var i = 0, j = Map.matchData.timeline.frames.length ; i < j ; i++) {

              // Select the frame tha matched with setted timestamp
              if (Map.matchData.timeline.frames[i].timestamp == Map.timestamp) {
                var eventsFrame = Map.matchData.timeline.frames[i].events;

                // Check if frames exist
                if (eventsFrame) {

                  for (var eventId in eventsFrame) {
                    var positions = eventsFrame[eventId].position;
                    // Check if any positions in this frame
                    if (positions) {
                      console.log(eventsFrame[eventId]);
                      var eventsInfos = eventsFrame[eventId];

                      // Setup cords array
                      cords.push({
                        x: positions.x, 
                        y: positions.y,
                        eventsData: eventsInfos, 
                        type: 'events'
                      });
                    }
                  }
                }
              }   
            }

            return callback(cords);
          },

          /**
           * @function getParticipantPositions
           * @memberof root.services.MatchMap
           * @description set up an array for participants coordinates
           * @param {function} callback
           * @public
           *
           * @returns {Void}
           */
          getParticipantPositions: function (callback)
          {
            var cords = [];
            Map.matchData.participantsInfo = {};
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

                      // Setup the some extra infos
                      for (var ii = 0, jj = Map.matchData.participants.length ; ii < jj ; ii++) {

                        if (Map.matchData.participants[ii].participantId == participantId) {
                          Map.matchData.participantsInfo[participantId] = Map.matchData.participants[ii];
                          participantInfos.championName = Map.scope.champInfos.data[Map.matchData.participants[ii].championId].name;
                          participantInfos.teamId = Map.matchData.participants[ii].teamId;
                        }

                      }

                      // Setup cords array
                      if (parseInt(participantId) <= 5) {
                        cords.push({x: positions.x, y: positions.y, participantData: participantInfos, type: 'participant'});
                      } else {
                        cords.push({x: positions.x, y: positions.y, participantData: participantInfos, type: 'participant'});
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
           * @param {Array} cords, @see root.services.MatchMap.getParticipantPositions
           * @param {Array} cordsEvent, @see root.services.MatchMap.getEventPositions
           * @see d3.js
           * @public
           *
           * @returns {Void}
           */
          loadMap: function (cords, cordsEvent)
          {
            Map.eventsRendered = false;

            var map = document.getElementById('map-game');
            map.innerHTML = "";
        
            var domain = {
                        min: {x: -1000, y: -570},
                        max: {x: 14800, y: 14800}
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

            var map = document.getElementById('map-game');
            var tooltip = document.createElement('div');
            tooltip.className = 'tooltip-map';
            map.appendChild(tooltip);

            var buttonEvents = d3.select('#map-game').append('button')
                .attr('class', 'eventsButton')
                .html('Voir les évènements')
                .on("click", function(e){
                      if (Map.eventsRendered === false) {
                        buttonEvents.html('Cacher les évènements');
                        Map.renderEvents(cordsEvent, svg, xScale, yScale, tooltip);
                      } else {
                        buttonEvents.html('Voir les évènements');
                        Map.removeEvents(svg);
                      }
                });

            svg.append('image')
                .attr('xlink:href', bg)
                .attr('x', '0')
                .attr('y', '0')
                .attr('width', width)
                .attr('height', height);

            
            for (var i = 0, j = Map.matchData.participants.length ; i < j ; i++) {
                svg.append('def')
                    .attr('class', 'avatar')
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
                      if (d.participantData.teamId == 100) {
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
                    .on("mouseover", function(d){
                      tooltip.style.visibility = 'visible';
                      tooltip.innerHTML = d.participantData.championName+" | level: "+d.participantData.level;
                    })
                    .on("mouseout", function(){
                      return tooltip.style.visibility = "hidden";
                    });
          },

          /**
           * @function renderEvents
           * @memberof root.services.MatchMap
           * @description Render events on map
           * @param {Array} cords, @see root.services.MatchMap.getParticipantPositions
           * @param {Array} cordsEvent, @see root.services.MatchMap.getEventPositions
           * @see d3.js
           * @public
           *
           * @returns {Void}
           */
          renderEvents: function (cordsEvent, svg, xScale, yScale, tooltip)
          {
            Map.eventsRendered = true;
            svg.append('def')
                    .attr('class', 'icons')
                    .append('pattern')
                      .attr('id', 'close-icon')
                      .attr('x', '0')
                      .attr('y', '0')
                      .attr('width', 30)
                      .attr('height', 30);

            svg.append('def')
                    .attr('class', 'icons')
                    .append('pattern')
                      .attr('id', 'tower-icon')
                      .attr('x', '0')
                      .attr('y', '0')
                      .attr('width', 30)
                      .attr('height', 30);

            svg.select("#tower-icon")
                .append('rect')
                  .attr('fill', '#000000')
                  .attr('width', 30)
                  .attr('height', 30);
            svg.select("#close-icon")
                .append('rect')
                  .attr('fill', '#000000')
                  .attr('width', 30)
                  .attr('height', 30);

            svg.select("#tower-icon")
                .append('image')
                  .attr('xlink:href', '../../images/appbar.chess.rook.png')
                  .attr('x', '-2.5')
                  .attr('y', '-2.5')
                  .attr('width', 30)
                  .attr('height', 30);
            svg.select("#close-icon")
                .append('image')
                  .attr('xlink:href', '../../images/appbar.close.png')
                  .attr('x', '-2.5')
                  .attr('y', '-2.5')
                  .attr('width', 30)
                  .attr('height', 30);

            svg.append('svg:g').selectAll("circle")
                        .data(cordsEvent)
                        .enter().append("svg:circle")
                            .attr('cx', function(de) { return xScale(de.x) })
                            .attr('cy', function(de) { return yScale(de.y) })
                            .attr('r', 12)
                            .attr('class', 'eventCircles')
                            .attr('stroke', function(de) {
                              if ((de.eventsData.teamId && de.eventsData.teamId <= 100) || (de.eventsData.victimId && de.eventsData.victimId < 5)) {
                                return '#E25041';
                              } else {
                                return '#2C82C9';
                              }
                            })
                            .attr('fill', function(de) {
                                if (de.eventsData.eventType === 'CHAMPION_KILL') {
                                  return 'url(#close-icon)';
                                } else if (de.eventsData.eventType === 'BUILDING_KILL') {
                                  return 'url(#tower-icon)';
                                }
                            })
                            .on("mouseover", function(de){
                              tooltip.style.visibility = 'visible';
                              if (de.eventsData.eventType === 'CHAMPION_KILL') {
                                tooltip.innerHTML = 'victime: '+Map.scope.champInfos.data[Map.matchData.participantsInfo[de.eventsData.victimId].championId].name+" | Tueur: "+Map.scope.champInfos.data[Map.matchData.participantsInfo[de.eventsData.killerId].championId].name;
                              } else if (de.eventsData.eventType === 'BUILDING_KILL'){
                                tooltip.innerHTML = 'Tourelle détruite par: '+Map.scope.champInfos.data[Map.matchData.participantsInfo[de.eventsData.killerId].championId].name;
                              }
                            })
                            .on("mouseout", function(){
                              return tooltip.style.visibility = "hidden";
                            });
          },

          /**
           * @function removeEvents
           * @memberof root.services.MatchMap
           * @description Remove events on map
           * @param {d3.js} svg
           * @see d3.js
           * @public
           *
           * @returns {Void}
           */
          removeEvents: function (svg)
          {
            Map.eventsRendered = false;
            svg.selectAll('.eventCircles').remove();
          },

          /**
           * @function setTimeline
           * @memberof root.services.MatchMap
           * @description Create the timeline, each timeline frames given by lol api 'match' make a part of the timeline
           * @public
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
