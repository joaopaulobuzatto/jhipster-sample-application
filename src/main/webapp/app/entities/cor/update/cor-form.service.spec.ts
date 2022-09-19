import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../cor.test-samples';

import { CorFormService } from './cor-form.service';

describe('Cor Form Service', () => {
  let service: CorFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorFormService);
  });

  describe('Service methods', () => {
    describe('createCorFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCorFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
          })
        );
      });

      it('passing ICor should create a new form with FormGroup', () => {
        const formGroup = service.createCorFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
          })
        );
      });
    });

    describe('getCor', () => {
      it('should return NewCor for default Cor initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCorFormGroup(sampleWithNewData);

        const cor = service.getCor(formGroup) as any;

        expect(cor).toMatchObject(sampleWithNewData);
      });

      it('should return NewCor for empty Cor initial value', () => {
        const formGroup = service.createCorFormGroup();

        const cor = service.getCor(formGroup) as any;

        expect(cor).toMatchObject({});
      });

      it('should return ICor', () => {
        const formGroup = service.createCorFormGroup(sampleWithRequiredData);

        const cor = service.getCor(formGroup) as any;

        expect(cor).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICor should not enable id FormControl', () => {
        const formGroup = service.createCorFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCor should disable id FormControl', () => {
        const formGroup = service.createCorFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
