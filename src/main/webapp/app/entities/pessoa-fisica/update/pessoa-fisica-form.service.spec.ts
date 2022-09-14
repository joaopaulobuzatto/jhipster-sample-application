import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../pessoa-fisica.test-samples';

import { PessoaFisicaFormService } from './pessoa-fisica-form.service';

describe('PessoaFisica Form Service', () => {
  let service: PessoaFisicaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PessoaFisicaFormService);
  });

  describe('Service methods', () => {
    describe('createPessoaFisicaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPessoaFisicaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nomeCompleto: expect.any(Object),
            cpf: expect.any(Object),
            rg: expect.any(Object),
            dataNascimento: expect.any(Object),
            pessoaFisicaLicenca: expect.any(Object),
          })
        );
      });

      it('passing IPessoaFisica should create a new form with FormGroup', () => {
        const formGroup = service.createPessoaFisicaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nomeCompleto: expect.any(Object),
            cpf: expect.any(Object),
            rg: expect.any(Object),
            dataNascimento: expect.any(Object),
            pessoaFisicaLicenca: expect.any(Object),
          })
        );
      });
    });

    describe('getPessoaFisica', () => {
      it('should return NewPessoaFisica for default PessoaFisica initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPessoaFisicaFormGroup(sampleWithNewData);

        const pessoaFisica = service.getPessoaFisica(formGroup) as any;

        expect(pessoaFisica).toMatchObject(sampleWithNewData);
      });

      it('should return NewPessoaFisica for empty PessoaFisica initial value', () => {
        const formGroup = service.createPessoaFisicaFormGroup();

        const pessoaFisica = service.getPessoaFisica(formGroup) as any;

        expect(pessoaFisica).toMatchObject({});
      });

      it('should return IPessoaFisica', () => {
        const formGroup = service.createPessoaFisicaFormGroup(sampleWithRequiredData);

        const pessoaFisica = service.getPessoaFisica(formGroup) as any;

        expect(pessoaFisica).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPessoaFisica should not enable id FormControl', () => {
        const formGroup = service.createPessoaFisicaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPessoaFisica should disable id FormControl', () => {
        const formGroup = service.createPessoaFisicaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
