import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../aparelho.test-samples';

import { AparelhoFormService } from './aparelho-form.service';

describe('Aparelho Form Service', () => {
  let service: AparelhoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AparelhoFormService);
  });

  describe('Service methods', () => {
    describe('createAparelhoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAparelhoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            classificacaoAparelho: expect.any(Object),
            descricao: expect.any(Object),
            nomeTecnico: expect.any(Object),
            material: expect.any(Object),
            valor: expect.any(Object),
            ativo: expect.any(Object),
            usuarioCriador: expect.any(Object),
          })
        );
      });

      it('passing IAparelho should create a new form with FormGroup', () => {
        const formGroup = service.createAparelhoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            classificacaoAparelho: expect.any(Object),
            descricao: expect.any(Object),
            nomeTecnico: expect.any(Object),
            material: expect.any(Object),
            valor: expect.any(Object),
            ativo: expect.any(Object),
            usuarioCriador: expect.any(Object),
          })
        );
      });
    });

    describe('getAparelho', () => {
      it('should return NewAparelho for default Aparelho initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAparelhoFormGroup(sampleWithNewData);

        const aparelho = service.getAparelho(formGroup) as any;

        expect(aparelho).toMatchObject(sampleWithNewData);
      });

      it('should return NewAparelho for empty Aparelho initial value', () => {
        const formGroup = service.createAparelhoFormGroup();

        const aparelho = service.getAparelho(formGroup) as any;

        expect(aparelho).toMatchObject({});
      });

      it('should return IAparelho', () => {
        const formGroup = service.createAparelhoFormGroup(sampleWithRequiredData);

        const aparelho = service.getAparelho(formGroup) as any;

        expect(aparelho).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAparelho should not enable id FormControl', () => {
        const formGroup = service.createAparelhoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAparelho should disable id FormControl', () => {
        const formGroup = service.createAparelhoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
