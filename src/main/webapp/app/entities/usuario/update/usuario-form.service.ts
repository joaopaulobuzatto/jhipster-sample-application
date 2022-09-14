import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IUsuario, NewUsuario } from '../usuario.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUsuario for edit and NewUsuarioFormGroupInput for create.
 */
type UsuarioFormGroupInput = IUsuario | PartialWithRequiredKeyOf<NewUsuario>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IUsuario | NewUsuario> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

type UsuarioFormRawValue = FormValueOf<IUsuario>;

type NewUsuarioFormRawValue = FormValueOf<NewUsuario>;

type UsuarioFormDefaults = Pick<
  NewUsuario,
  | 'id'
  | 'dataCriacao'
  | 'isAdmin'
  | 'isSuporte'
  | 'isConsultor'
  | 'isSupervisor'
  | 'isAtivo'
  | 'isAdministrativo'
  | 'receberEmails'
  | 'isEmailValido'
  | 'isExecutorSac'
  | 'liberarHorarioFeriado'
>;

type UsuarioFormGroupContent = {
  id: FormControl<UsuarioFormRawValue['id'] | NewUsuario['id']>;
  codigo: FormControl<UsuarioFormRawValue['codigo']>;
  dataCriacao: FormControl<UsuarioFormRawValue['dataCriacao']>;
  senha: FormControl<UsuarioFormRawValue['senha']>;
  isAdmin: FormControl<UsuarioFormRawValue['isAdmin']>;
  isSuporte: FormControl<UsuarioFormRawValue['isSuporte']>;
  nomeExibicao: FormControl<UsuarioFormRawValue['nomeExibicao']>;
  isConsultor: FormControl<UsuarioFormRawValue['isConsultor']>;
  isSupervisor: FormControl<UsuarioFormRawValue['isSupervisor']>;
  isAtivo: FormControl<UsuarioFormRawValue['isAtivo']>;
  isAdministrativo: FormControl<UsuarioFormRawValue['isAdministrativo']>;
  receberEmails: FormControl<UsuarioFormRawValue['receberEmails']>;
  isEmailValido: FormControl<UsuarioFormRawValue['isEmailValido']>;
  uuidEmail: FormControl<UsuarioFormRawValue['uuidEmail']>;
  email: FormControl<UsuarioFormRawValue['email']>;
  isExecutorSac: FormControl<UsuarioFormRawValue['isExecutorSac']>;
  liberarHorarioFeriado: FormControl<UsuarioFormRawValue['liberarHorarioFeriado']>;
  licenca: FormControl<UsuarioFormRawValue['licenca']>;
  supervisor: FormControl<UsuarioFormRawValue['supervisor']>;
  usuarioCriador: FormControl<UsuarioFormRawValue['usuarioCriador']>;
  pessoaFisica: FormControl<UsuarioFormRawValue['pessoaFisica']>;
  horarioTrabalho: FormControl<UsuarioFormRawValue['horarioTrabalho']>;
};

export type UsuarioFormGroup = FormGroup<UsuarioFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UsuarioFormService {
  createUsuarioFormGroup(usuario: UsuarioFormGroupInput = { id: null }): UsuarioFormGroup {
    const usuarioRawValue = this.convertUsuarioToUsuarioRawValue({
      ...this.getFormDefaults(),
      ...usuario,
    });
    return new FormGroup<UsuarioFormGroupContent>({
      id: new FormControl(
        { value: usuarioRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(usuarioRawValue.codigo),
      dataCriacao: new FormControl(usuarioRawValue.dataCriacao, {
        validators: [Validators.required],
      }),
      senha: new FormControl(usuarioRawValue.senha, {
        validators: [Validators.required, Validators.maxLength(70)],
      }),
      isAdmin: new FormControl(usuarioRawValue.isAdmin, {
        validators: [Validators.required],
      }),
      isSuporte: new FormControl(usuarioRawValue.isSuporte, {
        validators: [Validators.required],
      }),
      nomeExibicao: new FormControl(usuarioRawValue.nomeExibicao, {
        validators: [Validators.required, Validators.maxLength(70)],
      }),
      isConsultor: new FormControl(usuarioRawValue.isConsultor, {
        validators: [Validators.required],
      }),
      isSupervisor: new FormControl(usuarioRawValue.isSupervisor, {
        validators: [Validators.required],
      }),
      isAtivo: new FormControl(usuarioRawValue.isAtivo, {
        validators: [Validators.required],
      }),
      isAdministrativo: new FormControl(usuarioRawValue.isAdministrativo),
      receberEmails: new FormControl(usuarioRawValue.receberEmails, {
        validators: [Validators.required],
      }),
      isEmailValido: new FormControl(usuarioRawValue.isEmailValido, {
        validators: [Validators.required],
      }),
      uuidEmail: new FormControl(usuarioRawValue.uuidEmail, {
        validators: [Validators.maxLength(50)],
      }),
      email: new FormControl(usuarioRawValue.email, {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      isExecutorSac: new FormControl(usuarioRawValue.isExecutorSac, {
        validators: [Validators.required],
      }),
      liberarHorarioFeriado: new FormControl(usuarioRawValue.liberarHorarioFeriado),
      licenca: new FormControl(usuarioRawValue.licenca),
      supervisor: new FormControl(usuarioRawValue.supervisor),
      usuarioCriador: new FormControl(usuarioRawValue.usuarioCriador),
      pessoaFisica: new FormControl(usuarioRawValue.pessoaFisica),
      horarioTrabalho: new FormControl(usuarioRawValue.horarioTrabalho),
    });
  }

  getUsuario(form: UsuarioFormGroup): IUsuario | NewUsuario {
    return this.convertUsuarioRawValueToUsuario(form.getRawValue() as UsuarioFormRawValue | NewUsuarioFormRawValue);
  }

  resetForm(form: UsuarioFormGroup, usuario: UsuarioFormGroupInput): void {
    const usuarioRawValue = this.convertUsuarioToUsuarioRawValue({ ...this.getFormDefaults(), ...usuario });
    form.reset(
      {
        ...usuarioRawValue,
        id: { value: usuarioRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UsuarioFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dataCriacao: currentTime,
      isAdmin: false,
      isSuporte: false,
      isConsultor: false,
      isSupervisor: false,
      isAtivo: false,
      isAdministrativo: false,
      receberEmails: false,
      isEmailValido: false,
      isExecutorSac: false,
      liberarHorarioFeriado: false,
    };
  }

  private convertUsuarioRawValueToUsuario(rawUsuario: UsuarioFormRawValue | NewUsuarioFormRawValue): IUsuario | NewUsuario {
    return {
      ...rawUsuario,
      dataCriacao: dayjs(rawUsuario.dataCriacao, DATE_TIME_FORMAT),
    };
  }

  private convertUsuarioToUsuarioRawValue(
    usuario: IUsuario | (Partial<NewUsuario> & UsuarioFormDefaults)
  ): UsuarioFormRawValue | PartialWithRequiredKeyOf<NewUsuarioFormRawValue> {
    return {
      ...usuario,
      dataCriacao: usuario.dataCriacao ? usuario.dataCriacao.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
