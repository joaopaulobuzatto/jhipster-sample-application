import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IFeriado, NewFeriado } from '../feriado.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFeriado for edit and NewFeriadoFormGroupInput for create.
 */
type FeriadoFormGroupInput = IFeriado | PartialWithRequiredKeyOf<NewFeriado>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IFeriado | NewFeriado> = Omit<T, 'dataCriacao' | 'data'> & {
  dataCriacao?: string | null;
  data?: string | null;
};

type FeriadoFormRawValue = FormValueOf<IFeriado>;

type NewFeriadoFormRawValue = FormValueOf<NewFeriado>;

type FeriadoFormDefaults = Pick<NewFeriado, 'id' | 'dataCriacao' | 'data'>;

type FeriadoFormGroupContent = {
  id: FormControl<FeriadoFormRawValue['id'] | NewFeriado['id']>;
  codigo: FormControl<FeriadoFormRawValue['codigo']>;
  dataCriacao: FormControl<FeriadoFormRawValue['dataCriacao']>;
  data: FormControl<FeriadoFormRawValue['data']>;
  nome: FormControl<FeriadoFormRawValue['nome']>;
  licenca: FormControl<FeriadoFormRawValue['licenca']>;
  usuarioCriador: FormControl<FeriadoFormRawValue['usuarioCriador']>;
};

export type FeriadoFormGroup = FormGroup<FeriadoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FeriadoFormService {
  createFeriadoFormGroup(feriado: FeriadoFormGroupInput = { id: null }): FeriadoFormGroup {
    const feriadoRawValue = this.convertFeriadoToFeriadoRawValue({
      ...this.getFormDefaults(),
      ...feriado,
    });
    return new FormGroup<FeriadoFormGroupContent>({
      id: new FormControl(
        { value: feriadoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(feriadoRawValue.codigo),
      dataCriacao: new FormControl(feriadoRawValue.dataCriacao, {
        validators: [Validators.required],
      }),
      data: new FormControl(feriadoRawValue.data, {
        validators: [Validators.required],
      }),
      nome: new FormControl(feriadoRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      licenca: new FormControl(feriadoRawValue.licenca),
      usuarioCriador: new FormControl(feriadoRawValue.usuarioCriador),
    });
  }

  getFeriado(form: FeriadoFormGroup): IFeriado | NewFeriado {
    return this.convertFeriadoRawValueToFeriado(form.getRawValue() as FeriadoFormRawValue | NewFeriadoFormRawValue);
  }

  resetForm(form: FeriadoFormGroup, feriado: FeriadoFormGroupInput): void {
    const feriadoRawValue = this.convertFeriadoToFeriadoRawValue({ ...this.getFormDefaults(), ...feriado });
    form.reset(
      {
        ...feriadoRawValue,
        id: { value: feriadoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FeriadoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dataCriacao: currentTime,
      data: currentTime,
    };
  }

  private convertFeriadoRawValueToFeriado(rawFeriado: FeriadoFormRawValue | NewFeriadoFormRawValue): IFeriado | NewFeriado {
    return {
      ...rawFeriado,
      dataCriacao: dayjs(rawFeriado.dataCriacao, DATE_TIME_FORMAT),
      data: dayjs(rawFeriado.data, DATE_TIME_FORMAT),
    };
  }

  private convertFeriadoToFeriadoRawValue(
    feriado: IFeriado | (Partial<NewFeriado> & FeriadoFormDefaults)
  ): FeriadoFormRawValue | PartialWithRequiredKeyOf<NewFeriadoFormRawValue> {
    return {
      ...feriado,
      dataCriacao: feriado.dataCriacao ? feriado.dataCriacao.format(DATE_TIME_FORMAT) : undefined,
      data: feriado.data ? feriado.data.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
