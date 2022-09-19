import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPlano, NewPlano } from '../plano.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPlano for edit and NewPlanoFormGroupInput for create.
 */
type PlanoFormGroupInput = IPlano | PartialWithRequiredKeyOf<NewPlano>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IPlano | NewPlano> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

type PlanoFormRawValue = FormValueOf<IPlano>;

type NewPlanoFormRawValue = FormValueOf<NewPlano>;

type PlanoFormDefaults = Pick<NewPlano, 'id' | 'dataCriacao' | 'ativo'>;

type PlanoFormGroupContent = {
  id: FormControl<PlanoFormRawValue['id'] | NewPlano['id']>;
  codigo: FormControl<PlanoFormRawValue['codigo']>;
  dataCriacao: FormControl<PlanoFormRawValue['dataCriacao']>;
  descricao: FormControl<PlanoFormRawValue['descricao']>;
  ativo: FormControl<PlanoFormRawValue['ativo']>;
  usuarioCriador: FormControl<PlanoFormRawValue['usuarioCriador']>;
};

export type PlanoFormGroup = FormGroup<PlanoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PlanoFormService {
  createPlanoFormGroup(plano: PlanoFormGroupInput = { id: null }): PlanoFormGroup {
    const planoRawValue = this.convertPlanoToPlanoRawValue({
      ...this.getFormDefaults(),
      ...plano,
    });
    return new FormGroup<PlanoFormGroupContent>({
      id: new FormControl(
        { value: planoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(planoRawValue.codigo),
      dataCriacao: new FormControl(planoRawValue.dataCriacao, {
        validators: [Validators.required],
      }),
      descricao: new FormControl(planoRawValue.descricao, {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      ativo: new FormControl(planoRawValue.ativo, {
        validators: [Validators.required],
      }),
      usuarioCriador: new FormControl(planoRawValue.usuarioCriador),
    });
  }

  getPlano(form: PlanoFormGroup): IPlano | NewPlano {
    return this.convertPlanoRawValueToPlano(form.getRawValue() as PlanoFormRawValue | NewPlanoFormRawValue);
  }

  resetForm(form: PlanoFormGroup, plano: PlanoFormGroupInput): void {
    const planoRawValue = this.convertPlanoToPlanoRawValue({ ...this.getFormDefaults(), ...plano });
    form.reset(
      {
        ...planoRawValue,
        id: { value: planoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PlanoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dataCriacao: currentTime,
      ativo: false,
    };
  }

  private convertPlanoRawValueToPlano(rawPlano: PlanoFormRawValue | NewPlanoFormRawValue): IPlano | NewPlano {
    return {
      ...rawPlano,
      dataCriacao: dayjs(rawPlano.dataCriacao, DATE_TIME_FORMAT),
    };
  }

  private convertPlanoToPlanoRawValue(
    plano: IPlano | (Partial<NewPlano> & PlanoFormDefaults)
  ): PlanoFormRawValue | PartialWithRequiredKeyOf<NewPlanoFormRawValue> {
    return {
      ...plano,
      dataCriacao: plano.dataCriacao ? plano.dataCriacao.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
