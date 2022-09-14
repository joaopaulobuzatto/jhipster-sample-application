import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../licenca.test-samples';

import { LicencaFormService } from './licenca-form.service';

describe('Licenca Form Service', () => {
  let service: LicencaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicencaFormService);
  });

  describe('Service methods', () => {
    describe('createLicencaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLicencaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            dataInicioUtilizacao: expect.any(Object),
            dataInicioFaturamento: expect.any(Object),
            dataPrimeiroVencimentoBoleto: expect.any(Object),
            diaVencimentoBoleto: expect.any(Object),
            produtosContratados: expect.any(Object),
            valoresNegociados: expect.any(Object),
            contratacaoBloqueioIps: expect.any(Object),
            contratacaoEmailProposta: expect.any(Object),
            criarPedido: expect.any(Object),
            criarNegociacoes: expect.any(Object),
            sincronizarDadosCadastroCliente: expect.any(Object),
            sincronizarDadosCarteiraCliente: expect.any(Object),
            bloqueioAcesso: expect.any(Object),
            dataBloqueioAcesso: expect.any(Object),
            motivoBloqueioAcesso: expect.any(Object),
            mensagemBloqueioAcesso: expect.any(Object),
            pessoa: expect.any(Object),
            pessoaResponsavel: expect.any(Object),
            pessoaFinanceiro: expect.any(Object),
            usuarioSuporte: expect.any(Object),
            usuarioRobo: expect.any(Object),
            filialPadrao: expect.any(Object),
          })
        );
      });

      it('passing ILicenca should create a new form with FormGroup', () => {
        const formGroup = service.createLicencaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            dataInicioUtilizacao: expect.any(Object),
            dataInicioFaturamento: expect.any(Object),
            dataPrimeiroVencimentoBoleto: expect.any(Object),
            diaVencimentoBoleto: expect.any(Object),
            produtosContratados: expect.any(Object),
            valoresNegociados: expect.any(Object),
            contratacaoBloqueioIps: expect.any(Object),
            contratacaoEmailProposta: expect.any(Object),
            criarPedido: expect.any(Object),
            criarNegociacoes: expect.any(Object),
            sincronizarDadosCadastroCliente: expect.any(Object),
            sincronizarDadosCarteiraCliente: expect.any(Object),
            bloqueioAcesso: expect.any(Object),
            dataBloqueioAcesso: expect.any(Object),
            motivoBloqueioAcesso: expect.any(Object),
            mensagemBloqueioAcesso: expect.any(Object),
            pessoa: expect.any(Object),
            pessoaResponsavel: expect.any(Object),
            pessoaFinanceiro: expect.any(Object),
            usuarioSuporte: expect.any(Object),
            usuarioRobo: expect.any(Object),
            filialPadrao: expect.any(Object),
          })
        );
      });
    });

    describe('getLicenca', () => {
      it('should return NewLicenca for default Licenca initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLicencaFormGroup(sampleWithNewData);

        const licenca = service.getLicenca(formGroup) as any;

        expect(licenca).toMatchObject(sampleWithNewData);
      });

      it('should return NewLicenca for empty Licenca initial value', () => {
        const formGroup = service.createLicencaFormGroup();

        const licenca = service.getLicenca(formGroup) as any;

        expect(licenca).toMatchObject({});
      });

      it('should return ILicenca', () => {
        const formGroup = service.createLicencaFormGroup(sampleWithRequiredData);

        const licenca = service.getLicenca(formGroup) as any;

        expect(licenca).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILicenca should not enable id FormControl', () => {
        const formGroup = service.createLicencaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLicenca should disable id FormControl', () => {
        const formGroup = service.createLicencaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
