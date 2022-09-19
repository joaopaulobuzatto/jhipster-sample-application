import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IOperadora, NewOperadora } from '../operadora.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOperadora for edit and NewOperadoraFormGroupInput for create.
 */
type OperadoraFormGroupInput = IOperadora | PartialWithRequiredKeyOf<NewOperadora>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IOperadora | NewOperadora> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

type OperadoraFormRawValue = FormValueOf<IOperadora>;

type NewOperadoraFormRawValue = FormValueOf<NewOperadora>;

type OperadoraFormDefaults = Pick<NewOperadora, 'id' | 'dataCriacao' | 'ativo'>;

type OperadoraFormGroupContent = {
  id: FormControl<OperadoraFormRawValue['id'] | NewOperadora['id']>;
  codigo: FormControl<OperadoraFormRawValue['codigo']>;
  dataCriacao: FormControl<OperadoraFormRawValue['dataCriacao']>;
  descricao: FormControl<OperadoraFormRawValue['descricao']>;
  ativo: FormControl<OperadoraFormRawValue['ativo']>;
};

export type OperadoraFormGroup = FormGroup<OperadoraFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OperadoraFormService {
  createOperadoraFormGroup(operadora: OperadoraFormGroupInput = { id: null }): OperadoraFormGroup {
    const operadoraRawValue = this.convertOperadoraToOperadoraRawValue({
      ...this.getFormDefaults(),
      ...operadora,
    });
    return new FormGroup<OperadoraFormGroupContent>({
      id: new FormControl(
        { value: operadoraRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(operadoraRawValue.codigo),
      dataCriacao: new FormControl(operadoraRawValue.dataCriacao, {
        validators: [Validators.required],
      }),
      descricao: new FormControl(operadoraRawValue.descricao, {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      ativo: new FormControl(operadoraRawValue.ativo, {
        validators: [Validators.required],
      }),
    });
  }

  getOperadora(form: OperadoraFormGroup): IOperadora | NewOperadora {
    return this.convertOperadoraRawValueToOperadora(form.getRawValue() as OperadoraFormRawValue | NewOperadoraFormRawValue);
  }

  resetForm(form: OperadoraFormGroup, operadora: OperadoraFormGroupInput): void {
    const operadoraRawValue = this.convertOperadoraToOperadoraRawValue({ ...this.getFormDefaults(), ...operadora });
    form.reset(
      {
        ...operadoraRawValue,
        id: { value: operadoraRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): OperadoraFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dataCriacao: currentTime,
      ativo: false,
    };
  }

  private convertOperadoraRawValueToOperadora(rawOperadora: OperadoraFormRawValue | NewOperadoraFormRawValue): IOperadora | NewOperadora {
    return {
      ...rawOperadora,
      dataCriacao: dayjs(rawOperadora.dataCriacao, DATE_TIME_FORMAT),
    };
  }

  private convertOperadoraToOperadoraRawValue(
    operadora: IOperadora | (Partial<NewOperadora> & OperadoraFormDefaults)
  ): OperadoraFormRawValue | PartialWithRequiredKeyOf<NewOperadoraFormRawValue> {
    return {
      ...operadora,
      dataCriacao: operadora.dataCriacao ? operadora.dataCriacao.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
