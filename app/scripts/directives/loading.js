'use strict';

/**
 * @ngdoc directive
 * @name resolucionesClienteApp.directive:loading
 * @description
 * # loading
 */
angular.module('resolucionesClienteApp')
    .directive('loading', function() {
        return {
            restrict: 'E',
            scope: {
                load: '=',
                tam: '='
            },

            template: '<div class="loading" ng-show="load">' +
                '<em class="fa fa-clock-o fa-spin fa-{{tam}}x faa-burst animated  text-info" aria-hidden="true" ></em>' +
                '</div>',
            controller: function() {},
            controllerAs: 'd_loading'
        };
    });
