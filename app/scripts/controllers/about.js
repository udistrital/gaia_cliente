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
        $scope.sesion = $sessionStorage.expires_at;
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'

        ];
        console.info(token_service.getHeader());
        $http.get('https://autenticacion.udistrital.edu.co:8244/configuracion_crud_api/v1/aplicacion/?limit=-1', token_service.getHeader())
        .then(function(response) {
           console.log(response.data);
        });
        
    });