'use strict';
/**
 * @ngdoc function
 * @name contractualClienteApp.controller:menuCtrl
 * @description
 * # menuCtrl
 * Controller of the contractualClienteApp
 */
angular.module('contractualClienteApp')
    .controller('menuCtrl', function ($location, $http, rolesService, $window, $scope, $rootScope, token_service, configuracionRequest, notificacion, $translate, $route, $mdSidenav) {
        var paths = [];
        $scope.language = {
            es: "btn btn-primary btn-circle btn-outline active",
            en: "btn btn-primary btn-circle btn-outline"
        };

        $scope.notificacion = notificacion;
        $scope.actual = "";
        $scope.token_service = token_service;
        $scope.breadcrumb = [];

        $scope.perfil = "ADMINISTRADOR ARGO";

        //Rama cumplidos
        $scope.logout = function(){
            token_service.logout();
        };
        if(token_service.live_token()){
            $scope.token = token_service.getPayload();
            if (!angular.isUndefined($scope.token.role)){
                console.log("entro al undefined");
                console.log($scope.token.role)
                var roles="";
                if ( typeof $scope.token.role === "object" ) {
                    console.log("entro all if object");
                  var rl = [];
                  for (var index = 0; index < $scope.token.role.length; index++) {
                    if ($scope.token.role[index].indexOf("/") < 0 ){
                      rl.push($scope.token.role[index]);
                    }
                  }
                  roles = rl.toString();
                } else {
                  roles = $scope.token.role;
                }
    
                roles = roles.replace(/,/g, '%2C');
                configuracionRequest.get('menu_opcion_padre/ArbolMenus/' + roles + '/Argo','').then(function(response) {
                    console.log(response);
                    console.log("se hizo la peticion");
                    $rootScope.my_menu = response.data;
    
                })
                .catch(
                    function(response) {
                        console.log(response);
                        $rootScope.my_menu = response.data;
        
                    });
            } else {
                console.log("el token no se puede traer desde este modo de autenticacion, se traera un menu por defecto en prueba");
                var roles = "DECANO%2CORDENADOR_DEL_GASTO%2CASISTENTE_DECANATURA";
                console.info(roles)
                configuracionRequest.get('menu_opcion_padre/ArbolMenus/' + roles + '/Argo', '').then(function (response) {

                    $rootScope.my_menu = response.data;

                }); 
            }
}

        // $scope.traerMenu = function () {
        //     $scope.token = token_service.getPayload();
        // console.info($scope.token.role.toString());
        // console.info($scope.token.role.toString().replace(/,/g, '%2C') );
        // console.info($scope.token.role);
        // var rl = [];
        //           for (var index = 0; index < $scope.token.role.length; index++) {
        //             if ($scope.token.role[index].indexOf("/") < 0 ){
        //               rl.push($scope.token.role[index]);
        //             }
        //             if (index === ($scope.token.role.length -1) ) {
        //                 var roles = "";
        //                 roles = rl.toString().replace(/,/g, '%2C')
        //                 console.log();
        //                 configuracionRequest.get('menu_opcion_padre/ArbolMenus/' + roles + '/Argo', '').then(function (response) {
        //                     console.log("traigo su menu señor :3")
        //                     $rootScope.my_menu = response.data;
                
        //                 }); 
        //             }
        //           }
        // };

        // setTimeout($scope.traerMenu(), 2000);

        // obtiene los menús segun el rol
        // var roles = rolesService.roles().toString().replace(/,/g, '%2C');
        
        // var roles = "DECANO%2CORDENADOR_DEL_GASTO%2CASISTENTE_DECANATURA";
        // console.info(roles)
        // configuracionRequest.get('menu_opcion_padre/ArbolMenus/' + roles + '/Argo', '').then(function (response) {

        //     $rootScope.my_menu = response.data;

        // }); 

        /*
        configuracionRequest.get('menu_opcion_padre/ArbolMenus/' + "ADMINISTRADOR_ARGO" + '/Argo', '').then(function(response) {
            $rootScope.my_menu = response.data;
          });
            /*configuracionRequest.update_menu(https://10.20.0.162:9443/store/apis/authenticate response.data);
            $scope.menu_service = configuracionRequest.get_menu();*/


        var update_url = function () {
            $scope.breadcrumb = [''];
            for (var i = 0; i < paths.length; i++) {
                if ($scope.actual === "/" + paths[i].path) {
                    $scope.breadcrumb = paths[i].padre;
                } else if ('/' === $scope.actual) {
                    $scope.breadcrumb = [''];
                }
            }
        };

        $scope.redirect_url = function (path) {
            var path_sub = path.substring(0, 4);
            switch (path_sub.toUpperCase()) {
                case "HTTP":
                    $window.open(path, "_blank");
                    break;
                default:
                    $location.path(path);
                    break;
            }
        };


        $http.get("scripts/models/app_menus.json")
            .then(function (response) {
                $scope.menu_app = response.data;
            });

        $scope.$on('$routeChangeStart', function ( /*next, current*/) {
            $scope.actual = $location.path();
            update_url();
        });

        $scope.changeLanguage = function (key) {
            $translate.use(key);
            switch (key) {
                case 'es':
                    $scope.language.es = "btn btn-primary btn-circle btn-outline active";
                    $scope.language.en = "btn btn-primary btn-circle btn-outline";
                    break;
                case 'en':
                    $scope.language.en = "btn btn-primary btn-circle btn-outline active";
                    $scope.language.es = "btn btn-primary btn-circle btn-outline";
                    break;
                default:
            }
            $route.reload();
        };

        function buildToggler(componentId) {
            return function () {
                $mdSidenav(componentId).toggle();
            };
        }

        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');

        //Pendiente por definir json del menu
        (function ($) {
            $(document).ready(function () {
                $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    $(this).parent().siblings().removeClass('open');
                    $(this).parent().toggleClass('open');
                });
            });
        })(jQuery);
    });
