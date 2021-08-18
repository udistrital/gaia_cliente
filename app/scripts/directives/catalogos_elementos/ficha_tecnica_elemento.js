'use strict';

/**
 * @ngdoc directive
 * @name resolucionesClienteApp.directive:catalogosElementos/fichaTecnicaElemento
 * @description
 * # catalogosElementos/fichaTecnicaElemento
 */
angular.module('resolucionesClienteApp')
  .directive('catalogosElementos/fichaTecnicaElemento', function () {
    return {
      restrict: 'E',
      templateUrl: 'add-view.html',
      controller:function(){
      },
      controllerAs:'d_catalogosElementos/fichaTecnicaElemento'
    };
  });
