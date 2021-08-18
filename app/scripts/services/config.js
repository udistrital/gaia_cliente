'use strict';


/**
 * @ngdoc service
 * @name resolucionesClienteApp.config
 * @description
 * # config
 * Constant in the resolucionesClienteApp.
 */
var conf_cloud = {
    WSO2_SERVICE: "http://jbpm.udistritaloas.edu.co:8280/services",
    // ACADEMICA_SERVICE: "http://10.20.0.127/urano/index.php?data=B-7djBQWvIdLAEEycbH1n6e-3dACi5eLUOb63vMYhGq0kPBs7NGLYWFCL0RSTCu1yTlE5hH854MOgmjuVfPWyvdpaJDUOyByX-ksEPFIrrQQ7t1p4BkZcBuGD2cgJXeD",
    ADMINISTRATIVA_MID_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/api/administrativa_mid_api/v1/",
    ADMINISTRATIVA_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/api/administrativa_crud_api/v1/",
    RESOLUCIONES_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/resoluciones_docentes_crud/v1/",
    ADMINISTRATIVA_PRUEBAS_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/api/administrativa_amazon_api/v1/",
    CONFIGURACION_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/api/configuracion_crud_api/v1/",
    CORE_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/api/core_api/v1/",
    CORE_AMAZON_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/api/core_amazon_crud/v1/",
    FINANCIERA_MID_SERVICE: "https://tuleap.udistrital.edu.co/go_api/financiera_mid_api/v1/",
    FINANCIERA_SERVICE: "https://tuleap.udistrital.edu.co/go_api/financiera_api/v1/",
    MODELS_SERVICE: "scripts/models/",
    OIKOS_SERVICE: "https://.portaloas.udistrital.edu.co/apioas/oikos_crud_api/v2/",
    TITANDESAGREG_SERVICE: "http://api.intranetoas.udistrital.edu.co:8082/v1/", // titan_api_mid
    CONTRATO_SERVICE: "https://autenticacion.udistrital.edu.co:8244/administrativa_jbpm/v1/",
    NUXEO_SERVICE: "https://documental.portaloas.udistrital.edu.co/nuxeo/",
    HOMOLOGACION_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co:8244/dependencias_api/v1/",
    TOKEN: {
        AUTORIZATION_URL: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize",
        URL_USER_INFO: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/userinfo",
        CLIENTE_ID: "pszmROXqfec4pTShgF_fn2DAAX0a",
        REDIRECT_URL: "resoluciones.portaloas.udistrital.edu.co",
        RESPONSE_TYPE: "id_token token",
        SCOPE: "openid email documento",
        BUTTON_CLASS: "btn btn-warning btn-sm",
        SIGN_OUT_URL: "https://autenticacion.portaloas.udistrital.edu.co/oidc/logout",
        SIGN_OUT_REDIRECT_URL: "resoluciones.portaloas.udistrital.edu.co",
        SIGN_OUT_APPEND_TOKEN: "true",
    },
    MENU_APP: [{
            id: "kronos",
            title: "KRONOS",
            url: "http://10.20.0.254/kronos"
        }, {
            id: "agora",
            title: "AGORA",
            url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/agora"
        },
        {
            id: "argo",
            title: "ARGO",
            url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/argo"
        },
        {
            id: "arka",
            title: "ARKA",
            url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/arka"
        },
        {
            id: "temis",
            title: "TEMIS",
            url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/gefad"
        },
        {
            id: "polux",
            title: "POLUX",
            url: "http://10.20.0.254/polux"
        },
        {
            id: "jano",
            title: "JANO",
            url: "http://10.20.0.254/kronos"
        },
        {
            id: "kyron",
            title: "KYRON",
            url: "http://10.20.0.254/kronos"
        },
        {
            id: "sga",
            title: "SGA",
            url: "http://10.20.0.254/kronos"
        }
    ]
};
var conf_preproduccion = {
    WSO2_SERVICE: "http://jbpm.udistritaloas.edu.co:8280/services",
    // ACADEMICA_SERVICE: "http://10.20.0.127/urano/index.php?data=B-7djBQWvIdLAEEycbH1n6e-3dACi5eLUOb63vMYhGq0kPBs7NGLYWFCL0RSTCu1yTlE5hH854MOgmjuVfPWyvdpaJDUOyByX-ksEPFIrrQQ7t1p4BkZcBuGD2cgJXeD",
    ADMINISTRATIVA_MID_SERVICE: " https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_mid_api/v1/",
    ADMINISTRATIVA_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_crud_api/v1/",
    RESOLUCIONES_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/resoluciones_docentes_crud/v1/",
    ADMINISTRATIVA_PRUEBAS_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_amazon_api/v1/",
    CONFIGURACION_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/",
    CORE_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/core_api/v1/",
    CORE_AMAZON_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/core_amazon_crud/v1/",
    FINANCIERA_MID_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/financiera_mid_api/v1/",
    FINANCIERA_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/financiera_crud_api/v1/",
    MODELS_SERVICE: "scripts/models/",
    OIKOS_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/oikos_crud_api/v2/",
    TITANDESAGREG_SERVICE: "http://api.intranetoas.udistrital.edu.co:8082/v1/", // titan_api_mid
    CONTRATO_SERVICE: "https://autenticacion.udistrital.edu.co:8244/administrativa_jbpm/v1/",
    NUXEO_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/nuxeo_api/v1",
    HOMOLOGACION_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co:8244/dependencias_api/v1/",
    TOKEN: {
        AUTORIZATION_URL: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize",
        URL_USER_INFO: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/userinfo",
        CLIENTE_ID: "IY58o_gpLXWegNtI0VzlugJ9kaQa",
        REDIRECT_URL: "https://pruebasresoluciones.portaloas.udistrital.edu.co",
        RESPONSE_TYPE: "id_token token",
        SCOPE: "openid email documento",
        BUTTON_CLASS: "btn btn-warning btn-sm",
        SIGN_OUT_URL: "https://autenticacion.portaloas.udistrital.edu.co/oidc/logout",
        SIGN_OUT_REDIRECT_URL: "https://pruebasresoluciones.portaloas.udistrital.edu.co",
        SIGN_OUT_APPEND_TOKEN: "true",
    },
    MENU_APP: [{
            id: "kronos",
            title: "KRONOS",
            url: "http://10.20.0.254/kronos"
        }, {
            id: "agora",
            title: "AGORA",
            url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/agora"
        },
        {
            id: "argo",
            title: "ARGO",
            url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/argo"
        },
        {
            id: "arka",
            title: "ARKA",
            url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/arka"
        },
        {
            id: "temis",
            title: "TEMIS",
            url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/gefad"
        },
        {
            id: "polux",
            title: "POLUX",
            url: "http://10.20.0.254/polux"
        },
        {
            id: "jano",
            title: "JANO",
            url: "http://10.20.0.254/kronos"
        },
        {
            id: "kyron",
            title: "KYRON",
            url: "http://10.20.0.254/kronos"
        },
        {
            id: "sga",
            title: "SGA",
            url: "http://10.20.0.254/kronos"
        }
    ]
};

var conf_local = {
    WSO2_SERVICE: "http://jbpm.udistritaloas.edu.co:8280/services", //preguntar
    // pruebas
    ADMINISTRATIVA_MID_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_mid_api/v1/",
    ADMINISTRATIVA_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_crud_api/v1/",
    RESOLUCIONES_MID_SERVICE: "http://localhost:8521/v1/",
    RESOLUCIONES_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/resoluciones_docentes_crud/v1/",
    //RESOLUCIONES_SERVICE: "http://pruebasapi2.intranetoas.udistrital.edu.co:8516/v1/",
    //RESOLUCIONES_SERVICE: "http://localhost:8516/v1/",

    ADMINISTRATIVA_PRUEBAS_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_amazon_api/v1/",
    // CONFIGURACION_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/api/configuracion_crud_api/v1/",
    CONFIGURACION_SERVICE: " https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/",
    CORE_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/core_api/v1/",
    CORE_AMAZON_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/core_amazon_crud/v1/",
    FINANCIERA_MID_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/financiera_mid_api/v1/",
    //FINANCIERA_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/financiera_api/v1/", // financiara crud_api
    FINANCIERA_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/financiera_crud_api/v1/",
    // FINANCIERA_MID_SERVICE: "https://tuleap.udistrital.edu.co/go_api/financiera_mid_api/v1/",
    // FINANCIERA_SERVICE: "https://tuleap.udistrital.edu.co/go_api/financiera_api/v1/", // financiara crud_api
    MODELS_SERVICE: "scripts/models/",
    OIKOS_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/oikos_crud_api/v2/", //oikos_crud_api
    // OIKOS_SERVICE: "https://tuleap.udistrital.edu.co/go_api/oikos_api/v1/", //oikos_crud_api
    // OIKOS_AMAZON_SERVICE: "https://tuleap.udistrital.edu.co/go_api/oikos_amazon_api/v1", parece que no se usa
    // RESOLUCION_SERVICE: "http://10.20.0.254/resoluciones_crud/v1/", // recicio debe ser probado si esta en autenticacion.
    TITANDESAGREG_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/titan_api_mid/v1/", // titan_api_mid
    // TITANDESAGREG_SERVICE: "https://autenticacion.udistrital.edu.co/apioas/titan_api_mid/v1/", // titan_api_mid
    // TITAN_SERVICE: "https://tuleap.udistrital.edu.co/go_api/titan_api_crud/v1/", // tal parece que no se usa
    // SICAPITAL_SERVICE: "http://10.20.0.127/sicws/ws/sicapitalAPI.php/?/",
    CONTRATO_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_jbpm/v1/",
    // NUXEO_SERVICE: "https://documental.portaloas.udistrital.edu.co/nuxeo/",
    NUXEO_SERVICE: "https://documental.portaloas.udistrital.edu.co/nuxeo/",
    // NUXEO_SERVICE: "https://autenticacion.udistrital.edu.co/apioas/nuxeo_api/v1 ",
    HOMOLOGACION_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/dependencias_api/v1/", // este se usa solo en archivos se aprovacion que parece ser de cumplidos
    TOKEN: {
        AUTORIZATION_URL: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize",
        URL_USER_INFO: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/userinfo",
        CLIENTE_ID: "sWe9_P_C76DWGOsLcOY4T7BYH6oa",
        REDIRECT_URL: "http://localhost:9000/",
        RESPONSE_TYPE: "id_token token",
        SCOPE: "openid email documento",
        BUTTON_CLASS: "btn btn-warning btn-sm",
        SIGN_OUT_URL: "https://autenticacion.portaloas.udistrital.edu.co/oidc/logout",
        SIGN_OUT_REDIRECT_URL: "http://localhost:9000/",
        SIGN_OUT_APPEND_TOKEN: "true",
    },
    MENU_APP: [{
            id: "kronos",
            title: "KRONOS",
            url: "http://localhost:9000/kronos"
        }, {
            id: "agora",
            title: "AGORA",
            url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/agora"
        },
        {
            id: "argo",
            title: "ARGO",
            url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/argo"
        },
        {
            id: "arka",
            title: "ARKA",
            url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/arka"
        },
        {
            id: "temis",
            title: "TEMIS",
            url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/gefad"
        },
        {
            id: "polux",
            title: "POLUX",
            url: "http://10.20.0.254/polux"
        },
        {
            id: "jano",
            title: "JANO",
            url: "http://10.20.0.254/kronos"
        },
        {
            id: "kyron",
            title: "KYRON",
            url: "http://10.20.0.254/kronos"
        },
        {
            id: "sga",
            title: "SGA",
            url: "http://10.20.0.254/kronos"
        }
    ]
};

var conf_resoluciones_preprod = {
    WSO2_SERVICE: "http://jbpm.udistritaloas.edu.co:8280/services",
    // ACADEMICA_SERVICE: "http://10.20.0.127/urano/index.php?data=B-7djBQWvIdLAEEycbH1n6e-3dACi5eLUOb63vMYhGq0kPBs7NGLYWFCL0RSTCu1yTlE5hH854MOgmjuVfPWyvdpaJDUOyByX-ksEPFIrrQQ7t1p4BkZcBuGD2cgJXeD",
    CONFIGURACION_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/",
    //Servicio apuntando a servidores de la oficina 
    ADMINISTRATIVA_MID_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_mid_api/v1/",
    //ADMINISTRATIVA_MID_SERVICE: "http://localhost:8091/v1/",
    ADMINISTRATIVA_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_crud_api/v1/",
    RESOLUCIONES_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/resoluciones_docentes_crud/v1/",
    CORE_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/core_api/v1/",
    CORE_AMAZON_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/core_amazon_crud/v1/",
    // RESOLUCION_SERVICE: "http://10.20.0.254/resoluciones_crud/v1/",
    ADMINISTRATIVA_PRUEBAS_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_amazon_api/v1/",
    FINANCIERA_MID_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/financiera_mid_api/v1/",
    FINANCIERA_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/financiera_crud_api/v1/",
    MODELS_SERVICE: "scripts/models/",
    OIKOS_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/oikos_crud_api/v2/",
    //OIKOS_AMAZON_SERVICE: "https://tuleap.udistrital.edu.co/go_api/oikos_amazon_api/v1",
    //TITAN_SERVICE: "https://tuleap.udistrital.edu.co/go_api/titan_api_crud/v1/",
    //TITANDESAGREG_SERVICE : "https://tuleap.udistrital.edu.co/go_api/titan_api_crud/v1/",
    TITANDESAGREG_SERVICE: "http://api.intranetoas.udistrital.edu.co:8082/v1/",
    //SICAPITAL_SERVICE: "http://10.20.0.127/sicws/ws/sicapitalAPI.php/?/",
    CONTRATO_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_jbpm/v1/",
    NUXEO_SERVICE: "https://documental.portaloas.udistrital.edu.co/nuxeo/",
    HOMOLOGACION_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/dependencias_api/v1/",
    TOKEN: {
        AUTORIZATION_URL: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize",
        URL_USER_INFO: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/userinfo",
        CLIENTE_ID: "IY58o_gpLXWegNtI0VzlugJ9kaQa",
        REDIRECT_URL: "https://pruebasresoluciones.portaloas.udistrital.edu.co",
        RESPONSE_TYPE: "id_token token",
        SCOPE: "openid email documento",
        BUTTON_CLASS: "btn btn-warning btn-sm",
        SIGN_OUT_URL: "https://autenticacion.portaloas.udistrital.edu.co/oidc/logout",
        SIGN_OUT_REDIRECT_URL: "https://pruebasresoluciones.portaloas.udistrital.edu.co",
        SIGN_OUT_APPEND_TOKEN: "true",
    },
    MENU_APP: [{
            id: "kronos",
            title: "KRONOS",
            url: "http://10.20.0.254/kronos"
        }, {
            id: "agora",
            title: "AGORA",
            url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/agora"
        },
        {
            id: "argo",
            title: "ARGO",
            url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/argo"
        },
        {
            id: "arka",
            title: "ARKA",
            url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/arka"
        },
        {
            id: "temis",
            title: "TEMIS",
            url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/gefad"
        },
        {
            id: "polux",
            title: "POLUX",
            url: "http://10.20.0.254/polux"
        },
        {
            id: "jano",
            title: "JANO",
            url: "http://10.20.0.254/kronos"
        },
        {
            id: "kyron",
            title: "KYRON",
            url: "http://10.20.0.254/kronos"
        },
        {
            id: "sga",
            title: "SGA",
            url: "http://10.20.0.254/kronos"
        }
    ]
};


var conf_resoluciones = {
    WSO2_SERVICE: "http://jbpm.udistritaloas.edu.co:8280/services",
    // ACADEMICA_SERVICE: "http://10.20.0.127/urano/index.php?data=B-7djBQWvIdLAEEycbH1n6e-3dACi5eLUOb63vMYhGq0kPBs7NGLYWFCL0RSTCu1yTlE5hH854MOgmjuVfPWyvdpaJDUOyByX-ksEPFIrrQQ7t1p4BkZcBuGD2cgJXeD",
    CONFIGURACION_SERVICE: "http://pruebasapi.intranetoas.udistrital.edu.co:8086/v1/",
    //Servicio apuntando a servidores de la oficina 
    // ADMINISTRATIVA_MID_SERVICE: "http://pruebasapi.intranetoas.udistrital.edu.co:8091/v1/",
    ADMINISTRATIVA_MID_SERVICE: "http://localhost:8091/v1/",
    ADMINISTRATIVA_SERVICE: "http://pruebasapi.intranetoas.udistrital.edu.co:8090/v1/",
    RESOLUCIONES_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/resoluciones_docentes_crud/v1/",
    CORE_SERVICE: "http://pruebasapi.intranetoas.udistrital.edu.co:8092/v1/",
    CORE_AMAZON_SERVICE: "http://pruebasapi.intranetoas.udistrital.edu.co:8106/v1/",
    // RESOLUCION_SERVICE: "http://10.20.0.254/resoluciones_crud/v1/",
    ADMINISTRATIVA_PRUEBAS_SERVICE: "http://pruebasapi.intranetoas.udistrital.edu.co:8104/v1/",
    FINANCIERA_MID_SERVICE: "http://pruebasapi.intranetoas.udistrital.edu.co:8089/v1/",
    FINANCIERA_SERVICE: "http://pruebasapi.intranetoas.udistrital.edu.co:8084/v1/",
    MODELS_SERVICE: "scripts/models/",
    OIKOS_SERVICE: "http://pruebasapi.intranetoas.udistrital.edu.co:8087/v2/",
    //OIKOS_AMAZON_SERVICE: "https://tuleap.udistrital.edu.co/go_api/oikos_amazon_api/v1",
    //TITAN_SERVICE: "https://tuleap.udistrital.edu.co/go_api/titan_api_crud/v1/",
    //TITANDESAGREG_SERVICE : "https://tuleap.udistrital.edu.co/go_api/titan_api_crud/v1/",
    TITANDESAGREG_SERVICE: "http://api.intranetoas.udistrital.edu.co:8082/v1/",
    //SICAPITAL_SERVICE: "http://10.20.0.127/sicws/ws/sicapitalAPI.php/?/",
    CONTRATO_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_jbpm/v1/",
    NUXEO_SERVICE: "https://documental.portaloas.udistrital.edu.co/nuxeo/",
    HOMOLOGACION_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/dependencias_api/v1/",
    TOKEN: {
        AUTORIZATION_URL: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize",
        URL_USER_INFO: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/userinfo",
        CLIENTE_ID: "sWe9_P_C76DWGOsLcOY4T7BYH6oa",
        REDIRECT_URL: "http://localhost:9000/",
        RESPONSE_TYPE: "id_token token",
        SCOPE: "openid email documento",
        BUTTON_CLASS: "btn btn-warning btn-sm",
        SIGN_OUT_URL: "http://localhost:9000/",
        SIGN_OUT_REDIRECT_URL: "https://pruebasadministrativa.portaloas.udistrital.edu.co",
        SIGN_OUT_APPEND_TOKEN: "true",
    },
    MENU_APP: [{
            id: "kronos",
            title: "KRONOS",
            url: "http://10.20.0.254/kronos"
        }, {
            id: "agora",
            title: "AGORA",
            url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/agora"
        },
        {
            id: "argo",
            title: "ARGO",
            url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/argo"
        },
        {
            id: "arka",
            title: "ARKA",
            url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/arka"
        },
        {
            id: "temis",
            title: "TEMIS",
            url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/gefad"
        },
        {
            id: "polux",
            title: "POLUX",
            url: "http://10.20.0.254/polux"
        },
        {
            id: "jano",
            title: "JANO",
            url: "http://10.20.0.254/kronos"
        },
        {
            id: "kyron",
            title: "KYRON",
            url: "http://10.20.0.254/kronos"
        },
        {
            id: "sga",
            title: "SGA",
            url: "http://10.20.0.254/kronos"
        }
    ]
};

angular.module('resolucionesClienteApp')
    .constant('CONF', {
        //GENERAL: conf_resoluciones_preprod,
        GENERAL: conf_local,
    });