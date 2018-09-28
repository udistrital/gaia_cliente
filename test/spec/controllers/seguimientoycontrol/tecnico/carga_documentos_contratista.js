'use strict';

describe('Controller: CargaDocumentosContratistaCtrl', function () {

  // load the controller's module
  beforeEach(module('contractualClienteApp'));

  var cargaDocumentosContratistaCtrl,
    scope, $httpBackend, $adminMidRequest, contratos_contratista_handler, CONF ;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope,$injector) {
    scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    $adminMidRequest=$injector.get('$httpBackend');
    CONF = $injector.get('CONF');

    $httpBackend.when('GET',CONF.GENERAL.ADMINISTRATIVA_PRUEBAS_SERVICE+'informacion_proveedor/?query=NumDocumento%3A123&limit=0')
    .respond({num:1});

    $httpBackend.when('GET',CONF.GENERAL.ADMINISTRATIVA_MID_SERVICE+'aprobacion_pago/contratos_contratista/123')
    .respond([{num:1}]);

    cargaDocumentosContratistaCtrl = $controller('cargaDocumentosContratistaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
   // cargaDocumentosContratistaCtrl.Documento=1015438743;

  }));



  it('Debe obtener un arreglo con el año actual y el anterior', function () {
    cargaDocumentosContratistaCtrl.solicitar_pago();

    expect(cargaDocumentosContratistaCtrl.anios).toEqual([new Date().getFullYear(),new Date().getFullYear()-1]);
  });

  it('Debe obtener una lista con los 12 meses', function () {
    cargaDocumentosContratistaCtrl.getMeses(2017);
    expect(cargaDocumentosContratistaCtrl.meses.length).toBe(12);
  });

  it('Debe obtener una lista con los 9 primeros meses del año', function () {
    cargaDocumentosContratistaCtrl.getMeses(2018);
    expect(cargaDocumentosContratistaCtrl.meses.length).toBe(9);
  });

  it('Debe obtener un arreglo de contratos del contratista', function () {
    // cargaDocumentosContratistaCtrl.obtener_informacion_contratos_contratista();
    // $adminMidRequest.expectGET('aprobacion_pago/contratos_contratista/123');
  
    cargaDocumentosContratistaCtrl.obtener_informacion_contratista();



   // $httpBackend.expectGET(CONF.GENERAL.ADMINISTRATIVA_PRUEBAS_SERVICE+'informacion_proveedor/?query=NumDocumento%3A123&limit=0');

    //$httpBackend.flush();

    expect(cargaDocumentosContratistaCtrl.info_contratista).toBe({num:1});


 //   $httpBackend.flush();
   });

  it('Debe obtener un arreglo de contratos del contratista', function () {
   // cargaDocumentosContratistaCtrl.obtener_informacion_contratos_contratista();
   // $adminMidRequest.expectGET('aprobacion_pago/contratos_contratista/123');
 
   $httpBackend.expectGET(CONF.GENERAL.ADMINISTRATIVA_MID_SERVICE+'/aprobacion_pago/contratos_contratista/123');
       $httpBackend.flush();
  });

});
