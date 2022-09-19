import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../origem.test-samples';

import { OrigemFormService } from './origem-form.service';

describe('Origem Form Service', () => {
  let service: OrigemFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrigemFormService);
  });

  describe('Service methods', () => {
    describe('createOrigemFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOrigemFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            descricao: expect.any(Object),
            tipo: expect.any(Object),
            licenca: expect.any(Object),
            usuarioCriador: expect.any(Object),
          })
        );
      });

      it('passing IOrigem should create a new form with FormGroup', () => {
        const formGroup = service.createOrigemFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            descricao: expect.any(Object),
            tipo: expect.any(Object),
            licenca: expect.any(Object),
            usuarioCriador: expect.any(Object),
          })
        );
      });
    });

    describe('getOrigem', () => {
      it('should return NewOrigem for default Origem initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createOrigemFormGroup(sampleWithNewData);

        const origem = service.getOrigem(formGroup) as any;

        expect(origem).toMatchObject(sampleWithNewData);
      });

      it('should return NewOrigem for empty Origem initial value', () => {
        const formGroup = service.createOrigemFormGroup();

        const origem = service.getOrigem(formGroup) as any;

        expect(origem).toMatchObject({});
      });

      it('should return IOrigem', () => {
        const formGroup = service.createOrigemFormGroup(sampleWithRequiredData);

        const origem = service.getOrigem(formGroup) as any;

        expect(origem).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOrigem should not enable id FormControl', () => {
        const formGroup = service.createOrigemFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOrigem should disable id FormControl', () => {
        const formGroup = service.createOrigemFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
