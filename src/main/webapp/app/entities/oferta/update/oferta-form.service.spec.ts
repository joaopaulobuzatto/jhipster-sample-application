import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../oferta.test-samples';

import { OfertaFormService } from './oferta-form.service';

describe('Oferta Form Service', () => {
  let service: OfertaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfertaFormService);
  });

  describe('Service methods', () => {
    describe('createOfertaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOfertaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            descricao: expect.any(Object),
            ativo: expect.any(Object),
            valor: expect.any(Object),
            usuarioCriador: expect.any(Object),
            plano: expect.any(Object),
          })
        );
      });

      it('passing IOferta should create a new form with FormGroup', () => {
        const formGroup = service.createOfertaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            descricao: expect.any(Object),
            ativo: expect.any(Object),
            valor: expect.any(Object),
            usuarioCriador: expect.any(Object),
            plano: expect.any(Object),
          })
        );
      });
    });

    describe('getOferta', () => {
      it('should return NewOferta for default Oferta initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createOfertaFormGroup(sampleWithNewData);

        const oferta = service.getOferta(formGroup) as any;

        expect(oferta).toMatchObject(sampleWithNewData);
      });

      it('should return NewOferta for empty Oferta initial value', () => {
        const formGroup = service.createOfertaFormGroup();

        const oferta = service.getOferta(formGroup) as any;

        expect(oferta).toMatchObject({});
      });

      it('should return IOferta', () => {
        const formGroup = service.createOfertaFormGroup(sampleWithRequiredData);

        const oferta = service.getOferta(formGroup) as any;

        expect(oferta).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOferta should not enable id FormControl', () => {
        const formGroup = service.createOfertaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOferta should disable id FormControl', () => {
        const formGroup = service.createOfertaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
