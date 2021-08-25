'use strict';

/**
 * @ngdoc directive
 * @name resolucionesClienteApp.directive:btnRegistro
 * @description
 * # btnRegistro
 */
angular.module('resolucionesClienteApp')
    .directive('btnRegistro', function() {
        return {
            restrict: 'E',
            scope: {
                fila: '=',
                funcion: '&',
                grupobotones: '='
            },
            templateUrl: 'views/directives/btn_registro.html',
            link: function(/*scope, elm, attrs*/) {
            }
        };
    });