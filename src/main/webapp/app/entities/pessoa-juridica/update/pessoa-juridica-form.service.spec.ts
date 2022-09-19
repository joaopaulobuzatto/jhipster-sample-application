import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../pessoa-juridica.test-samples';

import { PessoaJuridicaFormService } from './pessoa-juridica-form.service';

describe('PessoaJuridica Form Service', () => {
  let service: PessoaJuridicaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PessoaJuridicaFormService);
  });

  describe('Service methods', () => {
    describe('createPessoaJuridicaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPessoaJuridicaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cnpj: expect.any(Object),
            razaoSocial: expect.any(Object),
            nomeFantasia: expect.any(Object),
            codigoCnae: expect.any(Object),
            dataAbertura: expect.any(Object),
            codigoCnaePrincipal: expect.any(Object),
            codigoNaturezaJuridica: expect.any(Object),
            quantidadeFuncionarios: expect.any(Object),
            pessoaJuridicaLicenca: expect.any(Object),
          })
        );
      });

      it('passing IPessoaJuridica should create a new form with FormGroup', () => {
        const formGroup = service.createPessoaJuridicaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cnpj: expect.any(Object),
            razaoSocial: expect.any(Object),
            nomeFantasia: expect.any(Object),
            codigoCnae: expect.any(Object),
            dataAbertura: expect.any(Object),
            codigoCnaePrincipal: expect.any(Object),
            codigoNaturezaJuridica: expect.any(Object),
            quantidadeFuncionarios: expect.any(Object),
            pessoaJuridicaLicenca: expect.any(Object),
          })
        );
      });
    });

    describe('getPessoaJuridica', () => {
      it('should return NewPessoaJuridica for default PessoaJuridica initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPessoaJuridicaFormGroup(sampleWithNewData);

        const pessoaJuridica = service.getPessoaJuridica(formGroup) as any;

        expect(pessoaJuridica).toMatchObject(sampleWithNewData);
      });

      it('should return NewPessoaJuridica for empty PessoaJuridica initial value', () => {
        const formGroup = service.createPessoaJuridicaFormGroup();

        const pessoaJuridica = service.getPessoaJuridica(formGroup) as any;

        expect(pessoaJuridica).toMatchObject({});
      });

      it('should return IPessoaJuridica', () => {
        const formGroup = service.createPessoaJuridicaFormGroup(sampleWithRequiredData);

        const pessoaJuridica = service.getPessoaJuridica(formGroup) as any;

        expect(pessoaJuridica).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPessoaJuridica should not enable id FormControl', () => {
        const formGroup = service.createPessoaJuridicaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPessoaJuridica should disable id FormControl', () => {
        const formGroup = service.createPessoaJuridicaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
