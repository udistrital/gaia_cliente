'use strict';

/**
 * @ngdoc function
 * @name contractualClienteApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the contractualClienteApp
 */
angular.module('contractualClienteApp')
    .controller('AboutCtrl', function(token_service, cookie, $scope, $sessionStorage) {
        $scope.token_service = token_service;
        $scope.sesion = $sessionStorage.expires_at;
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'

        ];
    });