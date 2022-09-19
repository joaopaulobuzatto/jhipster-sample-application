import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../usuario-grupo-permissoes.test-samples';

import { UsuarioGrupoPermissoesFormService } from './usuario-grupo-permissoes-form.service';

describe('UsuarioGrupoPermissoes Form Service', () => {
  let service: UsuarioGrupoPermissoesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioGrupoPermissoesFormService);
  });

  describe('Service methods', () => {
    describe('createUsuarioGrupoPermissoesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUsuarioGrupoPermissoesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            licenca: expect.any(Object),
            usuario: expect.any(Object),
            grupoPermissoes: expect.any(Object),
          })
        );
      });

      it('passing IUsuarioGrupoPermissoes should create a new form with FormGroup', () => {
        const formGroup = service.createUsuarioGrupoPermissoesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            licenca: expect.any(Object),
            usuario: expect.any(Object),
            grupoPermissoes: expect.any(Object),
          })
        );
      });
    });

    describe('getUsuarioGrupoPermissoes', () => {
      it('should return NewUsuarioGrupoPermissoes for default UsuarioGrupoPermissoes initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createUsuarioGrupoPermissoesFormGroup(sampleWithNewData);

        const usuarioGrupoPermissoes = service.getUsuarioGrupoPermissoes(formGroup) as any;

        expect(usuarioGrupoPermissoes).toMatchObject(sampleWithNewData);
      });

      it('should return NewUsuarioGrupoPermissoes for empty UsuarioGrupoPermissoes initial value', () => {
        const formGroup = service.createUsuarioGrupoPermissoesFormGroup();

        const usuarioGrupoPermissoes = service.getUsuarioGrupoPermissoes(formGroup) as any;

        expect(usuarioGrupoPermissoes).toMatchObject({});
      });

      it('should return IUsuarioGrupoPermissoes', () => {
        const formGroup = service.createUsuarioGrupoPermissoesFormGroup(sampleWithRequiredData);

        const usuarioGrupoPermissoes = service.getUsuarioGrupoPermissoes(formGroup) as any;

        expect(usuarioGrupoPermissoes).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUsuarioGrupoPermissoes should not enable id FormControl', () => {
        const formGroup = service.createUsuarioGrupoPermissoesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUsuarioGrupoPermissoes should disable id FormControl', () => {
        const formGroup = service.createUsuarioGrupoPermissoesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
