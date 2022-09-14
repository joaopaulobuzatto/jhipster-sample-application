import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../usuario.test-samples';

import { UsuarioFormService } from './usuario-form.service';

describe('Usuario Form Service', () => {
  let service: UsuarioFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioFormService);
  });

  describe('Service methods', () => {
    describe('createUsuarioFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUsuarioFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            senha: expect.any(Object),
            isAdmin: expect.any(Object),
            isSuporte: expect.any(Object),
            nomeExibicao: expect.any(Object),
            isConsultor: expect.any(Object),
            isSupervisor: expect.any(Object),
            isAtivo: expect.any(Object),
            isAdministrativo: expect.any(Object),
            receberEmails: expect.any(Object),
            isEmailValido: expect.any(Object),
            uuidEmail: expect.any(Object),
            email: expect.any(Object),
            isExecutorSac: expect.any(Object),
            liberarHorarioFeriado: expect.any(Object),
            licenca: expect.any(Object),
            supervisor: expect.any(Object),
            usuarioCriador: expect.any(Object),
            pessoaFisica: expect.any(Object),
            horarioTrabalho: expect.any(Object),
          })
        );
      });

      it('passing IUsuario should create a new form with FormGroup', () => {
        const formGroup = service.createUsuarioFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            senha: expect.any(Object),
            isAdmin: expect.any(Object),
            isSuporte: expect.any(Object),
            nomeExibicao: expect.any(Object),
            isConsultor: expect.any(Object),
            isSupervisor: expect.any(Object),
            isAtivo: expect.any(Object),
            isAdministrativo: expect.any(Object),
            receberEmails: expect.any(Object),
            isEmailValido: expect.any(Object),
            uuidEmail: expect.any(Object),
            email: expect.any(Object),
            isExecutorSac: expect.any(Object),
            liberarHorarioFeriado: expect.any(Object),
            licenca: expect.any(Object),
            supervisor: expect.any(Object),
            usuarioCriador: expect.any(Object),
            pessoaFisica: expect.any(Object),
            horarioTrabalho: expect.any(Object),
          })
        );
      });
    });

    describe('getUsuario', () => {
      it('should return NewUsuario for default Usuario initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createUsuarioFormGroup(sampleWithNewData);

        const usuario = service.getUsuario(formGroup) as any;

        expect(usuario).toMatchObject(sampleWithNewData);
      });

      it('should return NewUsuario for empty Usuario initial value', () => {
        const formGroup = service.createUsuarioFormGroup();

        const usuario = service.getUsuario(formGroup) as any;

        expect(usuario).toMatchObject({});
      });

      it('should return IUsuario', () => {
        const formGroup = service.createUsuarioFormGroup(sampleWithRequiredData);

        const usuario = service.getUsuario(formGroup) as any;

        expect(usuario).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUsuario should not enable id FormControl', () => {
        const formGroup = service.createUsuarioFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUsuario should disable id FormControl', () => {
        const formGroup = service.createUsuarioFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});