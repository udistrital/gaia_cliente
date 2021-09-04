'use strict';

/**
 * @ngdoc function
 * @name resolucionesClienteApp.controller:NotificacionesCtrl
 * @description
 * # NotificacionesCtrl
 * Controller of the resolucionesClienteApp
 */
angular.module('resolucionesClienteApp')
  .controller('NotificacionesCtrl', function($scope, notificacion) {
    $scope.imagePath = 'images/yeoman.png';
    $scope.notificacion = notificacion;
  });
