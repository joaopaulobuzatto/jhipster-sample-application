import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IFilial, NewFilial } from '../filial.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFilial for edit and NewFilialFormGroupInput for create.
 */
type FilialFormGroupInput = IFilial | PartialWithRequiredKeyOf<NewFilial>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IFilial | NewFilial> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

type FilialFormRawValue = FormValueOf<IFilial>;

type NewFilialFormRawValue = FormValueOf<NewFilial>;

type FilialFormDefaults = Pick<NewFilial, 'id' | 'dataCriacao'>;

type FilialFormGroupContent = {
  id: FormControl<FilialFormRawValue['id'] | NewFilial['id']>;
  dataCriacao: FormControl<FilialFormRawValue['dataCriacao']>;
  licenca: FormControl<FilialFormRawValue['licenca']>;
  pessoa: FormControl<FilialFormRawValue['pessoa']>;
  usuarioCriador: FormControl<FilialFormRawValue['usuarioCriador']>;
};

export type FilialFormGroup = FormGroup<FilialFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FilialFormService {
  createFilialFormGroup(filial: FilialFormGroupInput = { id: null }): FilialFormGroup {
    const filialRawValue = this.convertFilialToFilialRawValue({
      ...this.getFormDefaults(),
      ...filial,
    });
    return new FormGroup<FilialFormGroupContent>({
      id: new FormControl(
        { value: filialRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      dataCriacao: new FormControl(filialRawValue.dataCriacao),
      licenca: new FormControl(filialRawValue.licenca),
      pessoa: new FormControl(filialRawValue.pessoa),
      usuarioCriador: new FormControl(filialRawValue.usuarioCriador),
    });
  }

  getFilial(form: FilialFormGroup): IFilial | NewFilial {
    return this.convertFilialRawValueToFilial(form.getRawValue() as FilialFormRawValue | NewFilialFormRawValue);
  }

  resetForm(form: FilialFormGroup, filial: FilialFormGroupInput): void {
    const filialRawValue = this.convertFilialToFilialRawValue({ ...this.getFormDefaults(), ...filial });
    form.reset(
      {
        ...filialRawValue,
        id: { value: filialRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FilialFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dataCriacao: currentTime,
    };
  }

  private convertFilialRawValueToFilial(rawFilial: FilialFormRawValue | NewFilialFormRawValue): IFilial | NewFilial {
    return {
      ...rawFilial,
      dataCriacao: dayjs(rawFilial.dataCriacao, DATE_TIME_FORMAT),
    };
  }

  private convertFilialToFilialRawValue(
    filial: IFilial | (Partial<NewFilial> & FilialFormDefaults)
  ): FilialFormRawValue | PartialWithRequiredKeyOf<NewFilialFormRawValue> {
    return {
      ...filial,
      dataCriacao: filial.dataCriacao ? filial.dataCriacao.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
