(function() {
  'use strict';

  function tweetsPanel() {

    function tweetLink(scope, element, attr) {

      scope.changePanelOrder(attr.position, 0);

      //element[0].setAttribute('draggable', true);
      element.css({
        cursor: 'pointer'
      });

      element.on('dragstart', function(e) {
        scope.draggedFrom = attr.position;
        element.css({
          //position: 'relative',
          borderColor: 'black',
          //backgroundColor: 'lightgrey',
          opacity: 0.5,
          cursor: 'move'
        });
      });

      element.on('dragover', function(e) {
        //e.preventDefault();
        scope.draggedTo = attr.position;
        console.log(scope.draggedFrom, scope.draggedTo);
        //scope.changePanelOrder(scope.draggedFrom, scope.draggedTo);
        //scope.draggedFrom = scope.draggedTo;
        //scope.changePanelOrder(scope.draggedFrom, scope.draggedTo);
      });

      element.on('dragout', function(e) {
        console.log(e);
      });

      element.on('dragend', function(e) {
        scope.changePanelOrder(scope.draggedFrom, scope.draggedTo);
        element.css({
          opacity: null,
          border: null,
          cursor: null
        });
        delete scope.draggedFrom;
        delete scope.draggedTo;
      });


      function allowDrop(ev) {}

      function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
      }

      function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
      }

    }

    return {
      restrict: "E",
      //replace: true,
      //transclude: true,
      scope: {},
      //template: "<span><a href='#' ng-click='sort()' ng-transclude></a></span>",
      link: tweetLink
    };
  }

  angular.module('twitter-demo').directive('tweetsPanel', [tweetsPanel]);

})();
