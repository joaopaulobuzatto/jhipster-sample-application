import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../detentor-anexo-arquivo.test-samples';

import { DetentorAnexoArquivoFormService } from './detentor-anexo-arquivo-form.service';

describe('DetentorAnexoArquivo Form Service', () => {
  let service: DetentorAnexoArquivoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetentorAnexoArquivoFormService);
  });

  describe('Service methods', () => {
    describe('createDetentorAnexoArquivoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDetentorAnexoArquivoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dataCriacao: expect.any(Object),
            licenca: expect.any(Object),
            usuarioCriador: expect.any(Object),
          })
        );
      });

      it('passing IDetentorAnexoArquivo should create a new form with FormGroup', () => {
        const formGroup = service.createDetentorAnexoArquivoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dataCriacao: expect.any(Object),
            licenca: expect.any(Object),
            usuarioCriador: expect.any(Object),
          })
        );
      });
    });

    describe('getDetentorAnexoArquivo', () => {
      it('should return NewDetentorAnexoArquivo for default DetentorAnexoArquivo initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDetentorAnexoArquivoFormGroup(sampleWithNewData);

        const detentorAnexoArquivo = service.getDetentorAnexoArquivo(formGroup) as any;

        expect(detentorAnexoArquivo).toMatchObject(sampleWithNewData);
      });

      it('should return NewDetentorAnexoArquivo for empty DetentorAnexoArquivo initial value', () => {
        const formGroup = service.createDetentorAnexoArquivoFormGroup();

        const detentorAnexoArquivo = service.getDetentorAnexoArquivo(formGroup) as any;

        expect(detentorAnexoArquivo).toMatchObject({});
      });

      it('should return IDetentorAnexoArquivo', () => {
        const formGroup = service.createDetentorAnexoArquivoFormGroup(sampleWithRequiredData);

        const detentorAnexoArquivo = service.getDetentorAnexoArquivo(formGroup) as any;

        expect(detentorAnexoArquivo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDetentorAnexoArquivo should not enable id FormControl', () => {
        const formGroup = service.createDetentorAnexoArquivoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDetentorAnexoArquivo should disable id FormControl', () => {
        const formGroup = service.createDetentorAnexoArquivoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
