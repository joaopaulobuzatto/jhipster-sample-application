import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITipoDeDocumentoAnexavel, NewTipoDeDocumentoAnexavel } from '../tipo-de-documento-anexavel.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITipoDeDocumentoAnexavel for edit and NewTipoDeDocumentoAnexavelFormGroupInput for create.
 */
type TipoDeDocumentoAnexavelFormGroupInput = ITipoDeDocumentoAnexavel | PartialWithRequiredKeyOf<NewTipoDeDocumentoAnexavel>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITipoDeDocumentoAnexavel | NewTipoDeDocumentoAnexavel> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

type TipoDeDocumentoAnexavelFormRawValue = FormValueOf<ITipoDeDocumentoAnexavel>;

type NewTipoDeDocumentoAnexavelFormRawValue = FormValueOf<NewTipoDeDocumentoAnexavel>;

type TipoDeDocumentoAnexavelFormDefaults = Pick<NewTipoDeDocumentoAnexavel, 'id' | 'dataCriacao'>;

type TipoDeDocumentoAnexavelFormGroupContent = {
  id: FormControl<TipoDeDocumentoAnexavelFormRawValue['id'] | NewTipoDeDocumentoAnexavel['id']>;
  codigo: FormControl<TipoDeDocumentoAnexavelFormRawValue['codigo']>;
  dataCriacao: FormControl<TipoDeDocumentoAnexavelFormRawValue['dataCriacao']>;
  descricao: FormControl<TipoDeDocumentoAnexavelFormRawValue['descricao']>;
  licenca: FormControl<TipoDeDocumentoAnexavelFormRawValue['licenca']>;
  usuarioCriador: FormControl<TipoDeDocumentoAnexavelFormRawValue['usuarioCriador']>;
};

export type TipoDeDocumentoAnexavelFormGroup = FormGroup<TipoDeDocumentoAnexavelFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TipoDeDocumentoAnexavelFormService {
  createTipoDeDocumentoAnexavelFormGroup(
    tipoDeDocumentoAnexavel: TipoDeDocumentoAnexavelFormGroupInput = { id: null }
  ): TipoDeDocumentoAnexavelFormGroup {
    const tipoDeDocumentoAnexavelRawValue = this.convertTipoDeDocumentoAnexavelToTipoDeDocumentoAnexavelRawValue({
      ...this.getFormDefaults(),
      ...tipoDeDocumentoAnexavel,
    });
    return new FormGroup<TipoDeDocumentoAnexavelFormGroupContent>({
      id: new FormControl(
        { value: tipoDeDocumentoAnexavelRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(tipoDeDocumentoAnexavelRawValue.codigo),
      dataCriacao: new FormControl(tipoDeDocumentoAnexavelRawValue.dataCriacao, {
        validators: [Validators.required],
      }),
      descricao: new FormControl(tipoDeDocumentoAnexavelRawValue.descricao, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      licenca: new FormControl(tipoDeDocumentoAnexavelRawValue.licenca),
      usuarioCriador: new FormControl(tipoDeDocumentoAnexavelRawValue.usuarioCriador),
    });
  }

  getTipoDeDocumentoAnexavel(form: TipoDeDocumentoAnexavelFormGroup): ITipoDeDocumentoAnexavel | NewTipoDeDocumentoAnexavel {
    return this.convertTipoDeDocumentoAnexavelRawValueToTipoDeDocumentoAnexavel(
      form.getRawValue() as TipoDeDocumentoAnexavelFormRawValue | NewTipoDeDocumentoAnexavelFormRawValue
    );
  }

  resetForm(form: TipoDeDocumentoAnexavelFormGroup, tipoDeDocumentoAnexavel: TipoDeDocumentoAnexavelFormGroupInput): void {
    const tipoDeDocumentoAnexavelRawValue = this.convertTipoDeDocumentoAnexavelToTipoDeDocumentoAnexavelRawValue({
      ...this.getFormDefaults(),
      ...tipoDeDocumentoAnexavel,
    });
    form.reset(
      {
        ...tipoDeDocumentoAnexavelRawValue,
        id: { value: tipoDeDocumentoAnexavelRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TipoDeDocumentoAnexavelFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dataCriacao: currentTime,
    };
  }

  private convertTipoDeDocumentoAnexavelRawValueToTipoDeDocumentoAnexavel(
    rawTipoDeDocumentoAnexavel: TipoDeDocumentoAnexavelFormRawValue | NewTipoDeDocumentoAnexavelFormRawValue
  ): ITipoDeDocumentoAnexavel | NewTipoDeDocumentoAnexavel {
    return {
      ...rawTipoDeDocumentoAnexavel,
      dataCriacao: dayjs(rawTipoDeDocumentoAnexavel.dataCriacao, DATE_TIME_FORMAT),
    };
  }

  private convertTipoDeDocumentoAnexavelToTipoDeDocumentoAnexavelRawValue(
    tipoDeDocumentoAnexavel: ITipoDeDocumentoAnexavel | (Partial<NewTipoDeDocumentoAnexavel> & TipoDeDocumentoAnexavelFormDefaults)
  ): TipoDeDocumentoAnexavelFormRawValue | PartialWithRequiredKeyOf<NewTipoDeDocumentoAnexavelFormRawValue> {
    return {
      ...tipoDeDocumentoAnexavel,
      dataCriacao: tipoDeDocumentoAnexavel.dataCriacao ? tipoDeDocumentoAnexavel.dataCriacao.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
