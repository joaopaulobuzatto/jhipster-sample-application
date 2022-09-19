import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../feriado.test-samples';

import { FeriadoFormService } from './feriado-form.service';

describe('Feriado Form Service', () => {
  let service: FeriadoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeriadoFormService);
  });

  describe('Service methods', () => {
    describe('createFeriadoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFeriadoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            data: expect.any(Object),
            nome: expect.any(Object),
            licenca: expect.any(Object),
            usuarioCriador: expect.any(Object),
          })
        );
      });

      it('passing IFeriado should create a new form with FormGroup', () => {
        const formGroup = service.createFeriadoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            data: expect.any(Object),
            nome: expect.any(Object),
            licenca: expect.any(Object),
            usuarioCriador: expect.any(Object),
          })
        );
      });
    });

    describe('getFeriado', () => {
      it('should return NewFeriado for default Feriado initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFeriadoFormGroup(sampleWithNewData);

        const feriado = service.getFeriado(formGroup) as any;

        expect(feriado).toMatchObject(sampleWithNewData);
      });

      it('should return NewFeriado for empty Feriado initial value', () => {
        const formGroup = service.createFeriadoFormGroup();

        const feriado = service.getFeriado(formGroup) as any;

        expect(feriado).toMatchObject({});
      });

      it('should return IFeriado', () => {
        const formGroup = service.createFeriadoFormGroup(sampleWithRequiredData);

        const feriado = service.getFeriado(formGroup) as any;

        expect(feriado).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFeriado should not enable id FormControl', () => {
        const formGroup = service.createFeriadoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFeriado should disable id FormControl', () => {
        const formGroup = service.createFeriadoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
