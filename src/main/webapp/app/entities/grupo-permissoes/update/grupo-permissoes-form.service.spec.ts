import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../grupo-permissoes.test-samples';

import { GrupoPermissoesFormService } from './grupo-permissoes-form.service';

describe('GrupoPermissoes Form Service', () => {
  let service: GrupoPermissoesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoPermissoesFormService);
  });

  describe('Service methods', () => {
    describe('createGrupoPermissoesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createGrupoPermissoesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            descricao: expect.any(Object),
            licenca: expect.any(Object),
            usuarioCriador: expect.any(Object),
          })
        );
      });

      it('passing IGrupoPermissoes should create a new form with FormGroup', () => {
        const formGroup = service.createGrupoPermissoesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            descricao: expect.any(Object),
            licenca: expect.any(Object),
            usuarioCriador: expect.any(Object),
          })
        );
      });
    });

    describe('getGrupoPermissoes', () => {
      it('should return NewGrupoPermissoes for default GrupoPermissoes initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createGrupoPermissoesFormGroup(sampleWithNewData);

        const grupoPermissoes = service.getGrupoPermissoes(formGroup) as any;

        expect(grupoPermissoes).toMatchObject(sampleWithNewData);
      });

      it('should return NewGrupoPermissoes for empty GrupoPermissoes initial value', () => {
        const formGroup = service.createGrupoPermissoesFormGroup();

        const grupoPermissoes = service.getGrupoPermissoes(formGroup) as any;

        expect(grupoPermissoes).toMatchObject({});
      });

      it('should return IGrupoPermissoes', () => {
        const formGroup = service.createGrupoPermissoesFormGroup(sampleWithRequiredData);

        const grupoPermissoes = service.getGrupoPermissoes(formGroup) as any;

        expect(grupoPermissoes).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IGrupoPermissoes should not enable id FormControl', () => {
        const formGroup = service.createGrupoPermissoesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewGrupoPermissoes should disable id FormControl', () => {
        const formGroup = service.createGrupoPermissoesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
