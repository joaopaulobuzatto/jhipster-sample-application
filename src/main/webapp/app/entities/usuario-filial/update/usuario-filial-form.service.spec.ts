import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../usuario-filial.test-samples';

import { UsuarioFilialFormService } from './usuario-filial-form.service';

describe('UsuarioFilial Form Service', () => {
  let service: UsuarioFilialFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioFilialFormService);
  });

  describe('Service methods', () => {
    describe('createUsuarioFilialFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUsuarioFilialFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            licenca: expect.any(Object),
            usuario: expect.any(Object),
            filial: expect.any(Object),
          })
        );
      });

      it('passing IUsuarioFilial should create a new form with FormGroup', () => {
        const formGroup = service.createUsuarioFilialFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            licenca: expect.any(Object),
            usuario: expect.any(Object),
            filial: expect.any(Object),
          })
        );
      });
    });

    describe('getUsuarioFilial', () => {
      it('should return NewUsuarioFilial for default UsuarioFilial initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createUsuarioFilialFormGroup(sampleWithNewData);

        const usuarioFilial = service.getUsuarioFilial(formGroup) as any;

        expect(usuarioFilial).toMatchObject(sampleWithNewData);
      });

      it('should return NewUsuarioFilial for empty UsuarioFilial initial value', () => {
        const formGroup = service.createUsuarioFilialFormGroup();

        const usuarioFilial = service.getUsuarioFilial(formGroup) as any;

        expect(usuarioFilial).toMatchObject({});
      });

      it('should return IUsuarioFilial', () => {
        const formGroup = service.createUsuarioFilialFormGroup(sampleWithRequiredData);

        const usuarioFilial = service.getUsuarioFilial(formGroup) as any;

        expect(usuarioFilial).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUsuarioFilial should not enable id FormControl', () => {
        const formGroup = service.createUsuarioFilialFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUsuarioFilial should disable id FormControl', () => {
        const formGroup = service.createUsuarioFilialFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
