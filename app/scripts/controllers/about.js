'use strict';

/**
 * @ngdoc function
 * @name contractualClienteApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the contractualClienteApp
 */
angular.module('contractualClienteApp')
    .controller('AboutCtrl', function(token_service, cookie, $scope, $sessionStorage, $http) {
        $scope.token_service = token_service;
        $scope.sesion = $sessionStorage.expires_at;
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'

        ];
        console.info($scope.token_service.setting_bearer);
        $http.get('https://autenticacion.udistrital.edu.co:8244/configuracion_crud_api/v1/aplicacion/?limit=-1', $scope.token_service.setting_bearer)
        .then(function(response) {
           console.log(response.data);
        });
        
    });