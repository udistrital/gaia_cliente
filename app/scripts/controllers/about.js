'use strict';

/**
 * @ngdoc function
 * @name resolucionesClienteApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the resolucionesClienteApp
 */
angular.module('resolucionesClienteApp')
    .controller('AboutCtrl', function(token_service, cookie, $scope, $sessionStorage, $http) {
        $scope.sesion = $sessionStorage.expires_at;
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'

        ];
    });