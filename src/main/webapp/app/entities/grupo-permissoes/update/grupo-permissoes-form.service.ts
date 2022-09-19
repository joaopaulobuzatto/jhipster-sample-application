import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IGrupoPermissoes, NewGrupoPermissoes } from '../grupo-permissoes.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGrupoPermissoes for edit and NewGrupoPermissoesFormGroupInput for create.
 */
type GrupoPermissoesFormGroupInput = IGrupoPermissoes | PartialWithRequiredKeyOf<NewGrupoPermissoes>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IGrupoPermissoes | NewGrupoPermissoes> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

type GrupoPermissoesFormRawValue = FormValueOf<IGrupoPermissoes>;

type NewGrupoPermissoesFormRawValue = FormValueOf<NewGrupoPermissoes>;

type GrupoPermissoesFormDefaults = Pick<NewGrupoPermissoes, 'id' | 'dataCriacao'>;

type GrupoPermissoesFormGroupContent = {
  id: FormControl<GrupoPermissoesFormRawValue['id'] | NewGrupoPermissoes['id']>;
  codigo: FormControl<GrupoPermissoesFormRawValue['codigo']>;
  dataCriacao: FormControl<GrupoPermissoesFormRawValue['dataCriacao']>;
  descricao: FormControl<GrupoPermissoesFormRawValue['descricao']>;
  licenca: FormControl<GrupoPermissoesFormRawValue['licenca']>;
  usuarioCriador: FormControl<GrupoPermissoesFormRawValue['usuarioCriador']>;
};

export type GrupoPermissoesFormGroup = FormGroup<GrupoPermissoesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GrupoPermissoesFormService {
  createGrupoPermissoesFormGroup(grupoPermissoes: GrupoPermissoesFormGroupInput = { id: null }): GrupoPermissoesFormGroup {
    const grupoPermissoesRawValue = this.convertGrupoPermissoesToGrupoPermissoesRawValue({
      ...this.getFormDefaults(),
      ...grupoPermissoes,
    });
    return new FormGroup<GrupoPermissoesFormGroupContent>({
      id: new FormControl(
        { value: grupoPermissoesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(grupoPermissoesRawValue.codigo),
      dataCriacao: new FormControl(grupoPermissoesRawValue.dataCriacao, {
        validators: [Validators.required],
      }),
      descricao: new FormControl(grupoPermissoesRawValue.descricao, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      licenca: new FormControl(grupoPermissoesRawValue.licenca),
      usuarioCriador: new FormControl(grupoPermissoesRawValue.usuarioCriador),
    });
  }

  getGrupoPermissoes(form: GrupoPermissoesFormGroup): IGrupoPermissoes | NewGrupoPermissoes {
    return this.convertGrupoPermissoesRawValueToGrupoPermissoes(
      form.getRawValue() as GrupoPermissoesFormRawValue | NewGrupoPermissoesFormRawValue
    );
  }

  resetForm(form: GrupoPermissoesFormGroup, grupoPermissoes: GrupoPermissoesFormGroupInput): void {
    const grupoPermissoesRawValue = this.convertGrupoPermissoesToGrupoPermissoesRawValue({ ...this.getFormDefaults(), ...grupoPermissoes });
    form.reset(
      {
        ...grupoPermissoesRawValue,
        id: { value: grupoPermissoesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): GrupoPermissoesFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dataCriacao: currentTime,
    };
  }

  private convertGrupoPermissoesRawValueToGrupoPermissoes(
    rawGrupoPermissoes: GrupoPermissoesFormRawValue | NewGrupoPermissoesFormRawValue
  ): IGrupoPermissoes | NewGrupoPermissoes {
    return {
      ...rawGrupoPermissoes,
      dataCriacao: dayjs(rawGrupoPermissoes.dataCriacao, DATE_TIME_FORMAT),
    };
  }

  private convertGrupoPermissoesToGrupoPermissoesRawValue(
    grupoPermissoes: IGrupoPermissoes | (Partial<NewGrupoPermissoes> & GrupoPermissoesFormDefaults)
  ): GrupoPermissoesFormRawValue | PartialWithRequiredKeyOf<NewGrupoPermissoesFormRawValue> {
    return {
      ...grupoPermissoes,
      dataCriacao: grupoPermissoes.dataCriacao ? grupoPermissoes.dataCriacao.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
