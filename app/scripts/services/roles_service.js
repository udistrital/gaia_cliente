'use strict';

/**
 * @ngdoc service
 * @name resolucionesClienteApp.rolesService
 * @description
 * # rolesService
 * Service in the resolucionesClienteApp.
 */
angular.module('resolucionesClienteApp')
    .service('rolesService', function ($http, token_service) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        self = this;

        /**
        * @ngdoc method
        * @name resolucionesClienteApp.rolesService#roles //.# 
        * @methodOf resolucionesClienteApp.rolesService // .
        * @returns {Array} retorna la tista de roles para esta sesion
        */
        self.roles = function () {
            var roles = [];

            if (token_service.live_token()) {
                if (typeof token_service.token.role === "object") {
                    token_service.token.role.forEach(function (rol) {
                        if (rol.indexOf("/") < 0) {
                            roles.push(rol);
                        }
                    });
                }
            };
            roles = "DECANO%2CORDENADOR_DEL_GASTO%2CASISTENTE_DECANATURA"; //se debe de quitar este rol que seda, solo se usa para prueba del 254
            return roles;
        };

        /**
        * @ngdoc method
        * @name resolucionesClienteApp.rolesService#buttons //.# 
        * @methodOf resolucionesClienteApp.rolesService // .
        * @param {controller, roles=}   // devuelve los bottones a partir del controlador y del array de roles
        * @returns {object} lista de botones asociados al controlador, cada boton tiene su matriz de roles (true,false)
        *                   si se especifica roles, debuelve un objeto con los botones habilitados para esos roles y controlador
        */
        self.buttons = function (controller, roles) {
            return new Promise(function (resolve, reject) {
                $http.get("scripts/models/buttons.json").then(function (response) {
                    self.buttonsData = response.data;
                    var buttonsWithRoles = self.buttonsData.Controllers[controller].Buttons;
                    if (Array.isArray(roles)) {
                        var buttons = {};
                        for (var button in buttonsWithRoles) {
                            if (!buttonsWithRoles.hasOwnProperty(button)) {
                                continue;
                            }
                            var b1 = buttonsWithRoles[button];
                            roles.forEach(function (rol) {
                                if (b1.hasOwnProperty(rol) && b1[rol]) {
                                    buttons[button] = true;
                                }
                            });

                        }
                        resolve(buttons);
                    } else {
                        resolve(buttonsWithRoles);
                    }
                });
            });
        }
    });
