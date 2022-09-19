import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../operadora.test-samples';

import { OperadoraFormService } from './operadora-form.service';

describe('Operadora Form Service', () => {
  let service: OperadoraFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperadoraFormService);
  });

  describe('Service methods', () => {
    describe('createOperadoraFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOperadoraFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            descricao: expect.any(Object),
            ativo: expect.any(Object),
          })
        );
      });

      it('passing IOperadora should create a new form with FormGroup', () => {
        const formGroup = service.createOperadoraFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            descricao: expect.any(Object),
            ativo: expect.any(Object),
          })
        );
      });
    });

    describe('getOperadora', () => {
      it('should return NewOperadora for default Operadora initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createOperadoraFormGroup(sampleWithNewData);

        const operadora = service.getOperadora(formGroup) as any;

        expect(operadora).toMatchObject(sampleWithNewData);
      });

      it('should return NewOperadora for empty Operadora initial value', () => {
        const formGroup = service.createOperadoraFormGroup();

        const operadora = service.getOperadora(formGroup) as any;

        expect(operadora).toMatchObject({});
      });

      it('should return IOperadora', () => {
        const formGroup = service.createOperadoraFormGroup(sampleWithRequiredData);

        const operadora = service.getOperadora(formGroup) as any;

        expect(operadora).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOperadora should not enable id FormControl', () => {
        const formGroup = service.createOperadoraFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOperadora should disable id FormControl', () => {
        const formGroup = service.createOperadoraFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
