import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tipo-de-documento-anexavel.test-samples';

import { TipoDeDocumentoAnexavelFormService } from './tipo-de-documento-anexavel-form.service';

describe('TipoDeDocumentoAnexavel Form Service', () => {
  let service: TipoDeDocumentoAnexavelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoDeDocumentoAnexavelFormService);
  });

  describe('Service methods', () => {
    describe('createTipoDeDocumentoAnexavelFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTipoDeDocumentoAnexavelFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            descricao: expect.any(Object),
            licenca: expect.any(Object),
            usuarioCriador: expect.any(Object),
          })
        );
      });

      it('passing ITipoDeDocumentoAnexavel should create a new form with FormGroup', () => {
        const formGroup = service.createTipoDeDocumentoAnexavelFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            descricao: expect.any(Object),
            licenca: expect.any(Object),
            usuarioCriador: expect.any(Object),
          })
        );
      });
    });

    describe('getTipoDeDocumentoAnexavel', () => {
      it('should return NewTipoDeDocumentoAnexavel for default TipoDeDocumentoAnexavel initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTipoDeDocumentoAnexavelFormGroup(sampleWithNewData);

        const tipoDeDocumentoAnexavel = service.getTipoDeDocumentoAnexavel(formGroup) as any;

        expect(tipoDeDocumentoAnexavel).toMatchObject(sampleWithNewData);
      });

      it('should return NewTipoDeDocumentoAnexavel for empty TipoDeDocumentoAnexavel initial value', () => {
        const formGroup = service.createTipoDeDocumentoAnexavelFormGroup();

        const tipoDeDocumentoAnexavel = service.getTipoDeDocumentoAnexavel(formGroup) as any;

        expect(tipoDeDocumentoAnexavel).toMatchObject({});
      });

      it('should return ITipoDeDocumentoAnexavel', () => {
        const formGroup = service.createTipoDeDocumentoAnexavelFormGroup(sampleWithRequiredData);

        const tipoDeDocumentoAnexavel = service.getTipoDeDocumentoAnexavel(formGroup) as any;

        expect(tipoDeDocumentoAnexavel).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITipoDeDocumentoAnexavel should not enable id FormControl', () => {
        const formGroup = service.createTipoDeDocumentoAnexavelFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTipoDeDocumentoAnexavel should disable id FormControl', () => {
        const formGroup = service.createTipoDeDocumentoAnexavelFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
