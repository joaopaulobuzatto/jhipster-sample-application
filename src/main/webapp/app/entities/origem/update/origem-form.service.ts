import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IOrigem, NewOrigem } from '../origem.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOrigem for edit and NewOrigemFormGroupInput for create.
 */
type OrigemFormGroupInput = IOrigem | PartialWithRequiredKeyOf<NewOrigem>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IOrigem | NewOrigem> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

type OrigemFormRawValue = FormValueOf<IOrigem>;

type NewOrigemFormRawValue = FormValueOf<NewOrigem>;

type OrigemFormDefaults = Pick<NewOrigem, 'id' | 'dataCriacao'>;

type OrigemFormGroupContent = {
  id: FormControl<OrigemFormRawValue['id'] | NewOrigem['id']>;
  codigo: FormControl<OrigemFormRawValue['codigo']>;
  dataCriacao: FormControl<OrigemFormRawValue['dataCriacao']>;
  descricao: FormControl<OrigemFormRawValue['descricao']>;
  tipo: FormControl<OrigemFormRawValue['tipo']>;
  licenca: FormControl<OrigemFormRawValue['licenca']>;
  usuarioCriador: FormControl<OrigemFormRawValue['usuarioCriador']>;
};

export type OrigemFormGroup = FormGroup<OrigemFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OrigemFormService {
  createOrigemFormGroup(origem: OrigemFormGroupInput = { id: null }): OrigemFormGroup {
    const origemRawValue = this.convertOrigemToOrigemRawValue({
      ...this.getFormDefaults(),
      ...origem,
    });
    return new FormGroup<OrigemFormGroupContent>({
      id: new FormControl(
        { value: origemRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(origemRawValue.codigo),
      dataCriacao: new FormControl(origemRawValue.dataCriacao, {
        validators: [Validators.required],
      }),
      descricao: new FormControl(origemRawValue.descricao, {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      tipo: new FormControl(origemRawValue.tipo, {
        validators: [Validators.required],
      }),
      licenca: new FormControl(origemRawValue.licenca),
      usuarioCriador: new FormControl(origemRawValue.usuarioCriador),
    });
  }

  getOrigem(form: OrigemFormGroup): IOrigem | NewOrigem {
    return this.convertOrigemRawValueToOrigem(form.getRawValue() as OrigemFormRawValue | NewOrigemFormRawValue);
  }

  resetForm(form: OrigemFormGroup, origem: OrigemFormGroupInput): void {
    const origemRawValue = this.convertOrigemToOrigemRawValue({ ...this.getFormDefaults(), ...origem });
    form.reset(
      {
        ...origemRawValue,
        id: { value: origemRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): OrigemFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dataCriacao: currentTime,
    };
  }

  private convertOrigemRawValueToOrigem(rawOrigem: OrigemFormRawValue | NewOrigemFormRawValue): IOrigem | NewOrigem {
    return {
      ...rawOrigem,
      dataCriacao: dayjs(rawOrigem.dataCriacao, DATE_TIME_FORMAT),
    };
  }

  private convertOrigemToOrigemRawValue(
    origem: IOrigem | (Partial<NewOrigem> & OrigemFormDefaults)
  ): OrigemFormRawValue | PartialWithRequiredKeyOf<NewOrigemFormRawValue> {
    return {
      ...origem,
      dataCriacao: origem.dataCriacao ? origem.dataCriacao.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
