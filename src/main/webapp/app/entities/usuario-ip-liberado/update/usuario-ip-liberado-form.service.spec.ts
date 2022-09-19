import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../usuario-ip-liberado.test-samples';

import { UsuarioIpLiberadoFormService } from './usuario-ip-liberado-form.service';

describe('UsuarioIpLiberado Form Service', () => {
  let service: UsuarioIpLiberadoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioIpLiberadoFormService);
  });

  describe('Service methods', () => {
    describe('createUsuarioIpLiberadoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUsuarioIpLiberadoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            licenca: expect.any(Object),
            usuario: expect.any(Object),
            ipLiberado: expect.any(Object),
          })
        );
      });

      it('passing IUsuarioIpLiberado should create a new form with FormGroup', () => {
        const formGroup = service.createUsuarioIpLiberadoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            licenca: expect.any(Object),
            usuario: expect.any(Object),
            ipLiberado: expect.any(Object),
          })
        );
      });
    });

    describe('getUsuarioIpLiberado', () => {
      it('should return NewUsuarioIpLiberado for default UsuarioIpLiberado initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createUsuarioIpLiberadoFormGroup(sampleWithNewData);

        const usuarioIpLiberado = service.getUsuarioIpLiberado(formGroup) as any;

        expect(usuarioIpLiberado).toMatchObject(sampleWithNewData);
      });

      it('should return NewUsuarioIpLiberado for empty UsuarioIpLiberado initial value', () => {
        const formGroup = service.createUsuarioIpLiberadoFormGroup();

        const usuarioIpLiberado = service.getUsuarioIpLiberado(formGroup) as any;

        expect(usuarioIpLiberado).toMatchObject({});
      });

      it('should return IUsuarioIpLiberado', () => {
        const formGroup = service.createUsuarioIpLiberadoFormGroup(sampleWithRequiredData);

        const usuarioIpLiberado = service.getUsuarioIpLiberado(formGroup) as any;

        expect(usuarioIpLiberado).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUsuarioIpLiberado should not enable id FormControl', () => {
        const formGroup = service.createUsuarioIpLiberadoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUsuarioIpLiberado should disable id FormControl', () => {
        const formGroup = service.createUsuarioIpLiberadoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
