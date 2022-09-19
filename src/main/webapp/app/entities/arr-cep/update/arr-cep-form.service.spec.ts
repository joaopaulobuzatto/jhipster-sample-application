import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../arr-cep.test-samples';

import { ArrCepFormService } from './arr-cep-form.service';

describe('ArrCep Form Service', () => {
  let service: ArrCepFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrCepFormService);
  });

  describe('Service methods', () => {
    describe('createArrCepFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createArrCepFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cepnum: expect.any(Object),
            cependtip: expect.any(Object),
            cepend: expect.any(Object),
            cependcompl: expect.any(Object),
            cepbai: expect.any(Object),
            cepcid: expect.any(Object),
            cepmuncod: expect.any(Object),
            cepmunnom: expect.any(Object),
            cepmunuf: expect.any(Object),
          })
        );
      });

      it('passing IArrCep should create a new form with FormGroup', () => {
        const formGroup = service.createArrCepFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cepnum: expect.any(Object),
            cependtip: expect.any(Object),
            cepend: expect.any(Object),
            cependcompl: expect.any(Object),
            cepbai: expect.any(Object),
            cepcid: expect.any(Object),
            cepmuncod: expect.any(Object),
            cepmunnom: expect.any(Object),
            cepmunuf: expect.any(Object),
          })
        );
      });
    });

    describe('getArrCep', () => {
      it('should return NewArrCep for default ArrCep initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createArrCepFormGroup(sampleWithNewData);

        const arrCep = service.getArrCep(formGroup) as any;

        expect(arrCep).toMatchObject(sampleWithNewData);
      });

      it('should return NewArrCep for empty ArrCep initial value', () => {
        const formGroup = service.createArrCepFormGroup();

        const arrCep = service.getArrCep(formGroup) as any;

        expect(arrCep).toMatchObject({});
      });

      it('should return IArrCep', () => {
        const formGroup = service.createArrCepFormGroup(sampleWithRequiredData);

        const arrCep = service.getArrCep(formGroup) as any;

        expect(arrCep).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IArrCep should not enable id FormControl', () => {
        const formGroup = service.createArrCepFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewArrCep should disable id FormControl', () => {
        const formGroup = service.createArrCepFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
