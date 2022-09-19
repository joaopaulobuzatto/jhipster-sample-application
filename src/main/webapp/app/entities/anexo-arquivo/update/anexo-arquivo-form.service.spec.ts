import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../anexo-arquivo.test-samples';

import { AnexoArquivoFormService } from './anexo-arquivo-form.service';

describe('AnexoArquivo Form Service', () => {
  let service: AnexoArquivoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnexoArquivoFormService);
  });

  describe('Service methods', () => {
    describe('createAnexoArquivoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAnexoArquivoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            descricao: expect.any(Object),
            nomeNuvem: expect.any(Object),
            nomeOriginal: expect.any(Object),
            tipoOrigemAnexoArquivo: expect.any(Object),
            licenca: expect.any(Object),
            usuarioCriador: expect.any(Object),
            detentorAnexoArquivo: expect.any(Object),
            tipoDeDocumentoAnexavel: expect.any(Object),
          })
        );
      });

      it('passing IAnexoArquivo should create a new form with FormGroup', () => {
        const formGroup = service.createAnexoArquivoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            descricao: expect.any(Object),
            nomeNuvem: expect.any(Object),
            nomeOriginal: expect.any(Object),
            tipoOrigemAnexoArquivo: expect.any(Object),
            licenca: expect.any(Object),
            usuarioCriador: expect.any(Object),
            detentorAnexoArquivo: expect.any(Object),
            tipoDeDocumentoAnexavel: expect.any(Object),
          })
        );
      });
    });

    describe('getAnexoArquivo', () => {
      it('should return NewAnexoArquivo for default AnexoArquivo initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAnexoArquivoFormGroup(sampleWithNewData);

        const anexoArquivo = service.getAnexoArquivo(formGroup) as any;

        expect(anexoArquivo).toMatchObject(sampleWithNewData);
      });

      it('should return NewAnexoArquivo for empty AnexoArquivo initial value', () => {
        const formGroup = service.createAnexoArquivoFormGroup();

        const anexoArquivo = service.getAnexoArquivo(formGroup) as any;

        expect(anexoArquivo).toMatchObject({});
      });

      it('should return IAnexoArquivo', () => {
        const formGroup = service.createAnexoArquivoFormGroup(sampleWithRequiredData);

        const anexoArquivo = service.getAnexoArquivo(formGroup) as any;

        expect(anexoArquivo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAnexoArquivo should not enable id FormControl', () => {
        const formGroup = service.createAnexoArquivoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAnexoArquivo should disable id FormControl', () => {
        const formGroup = service.createAnexoArquivoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
