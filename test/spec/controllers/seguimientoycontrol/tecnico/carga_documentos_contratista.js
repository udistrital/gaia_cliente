'use strict';

describe('Controller: CargaDocumentosContratistaCtrl', function () {

  // load the controller's module
  beforeEach(module('contractualClienteApp'));

  var cargaDocumentosContratistaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    cargaDocumentosContratistaCtrl = $controller('cargaDocumentosContratistaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
    cargaDocumentosContratistaCtrl.Documento=1015438743;

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
    cargaDocumentosContratistaCtrl.obtener_informacion_contratos_contratista();
    expect(cargaDocumentosContratistaCtrl.informacion_contratos.length).toBe(1);
  });

});
