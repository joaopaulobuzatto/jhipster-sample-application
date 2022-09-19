import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../oferta-servico.test-samples';

import { OfertaServicoFormService } from './oferta-servico-form.service';

describe('OfertaServico Form Service', () => {
  let service: OfertaServicoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfertaServicoFormService);
  });

  describe('Service methods', () => {
    describe('createOfertaServicoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOfertaServicoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            oferta: expect.any(Object),
            servico: expect.any(Object),
          })
        );
      });

      it('passing IOfertaServico should create a new form with FormGroup', () => {
        const formGroup = service.createOfertaServicoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            oferta: expect.any(Object),
            servico: expect.any(Object),
          })
        );
      });
    });

    describe('getOfertaServico', () => {
      it('should return NewOfertaServico for default OfertaServico initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createOfertaServicoFormGroup(sampleWithNewData);

        const ofertaServico = service.getOfertaServico(formGroup) as any;

        expect(ofertaServico).toMatchObject(sampleWithNewData);
      });

      it('should return NewOfertaServico for empty OfertaServico initial value', () => {
        const formGroup = service.createOfertaServicoFormGroup();

        const ofertaServico = service.getOfertaServico(formGroup) as any;

        expect(ofertaServico).toMatchObject({});
      });

      it('should return IOfertaServico', () => {
        const formGroup = service.createOfertaServicoFormGroup(sampleWithRequiredData);

        const ofertaServico = service.getOfertaServico(formGroup) as any;

        expect(ofertaServico).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOfertaServico should not enable id FormControl', () => {
        const formGroup = service.createOfertaServicoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOfertaServico should disable id FormControl', () => {
        const formGroup = service.createOfertaServicoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
