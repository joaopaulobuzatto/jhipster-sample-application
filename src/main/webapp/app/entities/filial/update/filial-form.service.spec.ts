import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../filial.test-samples';

import { FilialFormService } from './filial-form.service';

describe('Filial Form Service', () => {
  let service: FilialFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilialFormService);
  });

  describe('Service methods', () => {
    describe('createFilialFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFilialFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dataCriacao: expect.any(Object),
            licenca: expect.any(Object),
            pessoa: expect.any(Object),
            usuarioCriador: expect.any(Object),
          })
        );
      });

      it('passing IFilial should create a new form with FormGroup', () => {
        const formGroup = service.createFilialFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dataCriacao: expect.any(Object),
            licenca: expect.any(Object),
            pessoa: expect.any(Object),
            usuarioCriador: expect.any(Object),
          })
        );
      });
    });

    describe('getFilial', () => {
      it('should return NewFilial for default Filial initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFilialFormGroup(sampleWithNewData);

        const filial = service.getFilial(formGroup) as any;

        expect(filial).toMatchObject(sampleWithNewData);
      });

      it('should return NewFilial for empty Filial initial value', () => {
        const formGroup = service.createFilialFormGroup();

        const filial = service.getFilial(formGroup) as any;

        expect(filial).toMatchObject({});
      });

      it('should return IFilial', () => {
        const formGroup = service.createFilialFormGroup(sampleWithRequiredData);

        const filial = service.getFilial(formGroup) as any;

        expect(filial).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFilial should not enable id FormControl', () => {
        const formGroup = service.createFilialFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFilial should disable id FormControl', () => {
        const formGroup = service.createFilialFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
