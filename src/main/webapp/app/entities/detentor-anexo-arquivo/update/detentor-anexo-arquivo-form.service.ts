import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IDetentorAnexoArquivo, NewDetentorAnexoArquivo } from '../detentor-anexo-arquivo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDetentorAnexoArquivo for edit and NewDetentorAnexoArquivoFormGroupInput for create.
 */
type DetentorAnexoArquivoFormGroupInput = IDetentorAnexoArquivo | PartialWithRequiredKeyOf<NewDetentorAnexoArquivo>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IDetentorAnexoArquivo | NewDetentorAnexoArquivo> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

type DetentorAnexoArquivoFormRawValue = FormValueOf<IDetentorAnexoArquivo>;

type NewDetentorAnexoArquivoFormRawValue = FormValueOf<NewDetentorAnexoArquivo>;

type DetentorAnexoArquivoFormDefaults = Pick<NewDetentorAnexoArquivo, 'id' | 'dataCriacao'>;

type DetentorAnexoArquivoFormGroupContent = {
  id: FormControl<DetentorAnexoArquivoFormRawValue['id'] | NewDetentorAnexoArquivo['id']>;
  dataCriacao: FormControl<DetentorAnexoArquivoFormRawValue['dataCriacao']>;
  licenca: FormControl<DetentorAnexoArquivoFormRawValue['licenca']>;
  usuarioCriador: FormControl<DetentorAnexoArquivoFormRawValue['usuarioCriador']>;
};

export type DetentorAnexoArquivoFormGroup = FormGroup<DetentorAnexoArquivoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DetentorAnexoArquivoFormService {
  createDetentorAnexoArquivoFormGroup(
    detentorAnexoArquivo: DetentorAnexoArquivoFormGroupInput = { id: null }
  ): DetentorAnexoArquivoFormGroup {
    const detentorAnexoArquivoRawValue = this.convertDetentorAnexoArquivoToDetentorAnexoArquivoRawValue({
      ...this.getFormDefaults(),
      ...detentorAnexoArquivo,
    });
    return new FormGroup<DetentorAnexoArquivoFormGroupContent>({
      id: new FormControl(
        { value: detentorAnexoArquivoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      dataCriacao: new FormControl(detentorAnexoArquivoRawValue.dataCriacao, {
        validators: [Validators.required],
      }),
      licenca: new FormControl(detentorAnexoArquivoRawValue.licenca),
      usuarioCriador: new FormControl(detentorAnexoArquivoRawValue.usuarioCriador),
    });
  }

  getDetentorAnexoArquivo(form: DetentorAnexoArquivoFormGroup): IDetentorAnexoArquivo | NewDetentorAnexoArquivo {
    return this.convertDetentorAnexoArquivoRawValueToDetentorAnexoArquivo(
      form.getRawValue() as DetentorAnexoArquivoFormRawValue | NewDetentorAnexoArquivoFormRawValue
    );
  }

  resetForm(form: DetentorAnexoArquivoFormGroup, detentorAnexoArquivo: DetentorAnexoArquivoFormGroupInput): void {
    const detentorAnexoArquivoRawValue = this.convertDetentorAnexoArquivoToDetentorAnexoArquivoRawValue({
      ...this.getFormDefaults(),
      ...detentorAnexoArquivo,
    });
    form.reset(
      {
        ...detentorAnexoArquivoRawValue,
        id: { value: detentorAnexoArquivoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DetentorAnexoArquivoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dataCriacao: currentTime,
    };
  }

  private convertDetentorAnexoArquivoRawValueToDetentorAnexoArquivo(
    rawDetentorAnexoArquivo: DetentorAnexoArquivoFormRawValue | NewDetentorAnexoArquivoFormRawValue
  ): IDetentorAnexoArquivo | NewDetentorAnexoArquivo {
    return {
      ...rawDetentorAnexoArquivo,
      dataCriacao: dayjs(rawDetentorAnexoArquivo.dataCriacao, DATE_TIME_FORMAT),
    };
  }

  private convertDetentorAnexoArquivoToDetentorAnexoArquivoRawValue(
    detentorAnexoArquivo: IDetentorAnexoArquivo | (Partial<NewDetentorAnexoArquivo> & DetentorAnexoArquivoFormDefaults)
  ): DetentorAnexoArquivoFormRawValue | PartialWithRequiredKeyOf<NewDetentorAnexoArquivoFormRawValue> {
    return {
      ...detentorAnexoArquivo,
      dataCriacao: detentorAnexoArquivo.dataCriacao ? detentorAnexoArquivo.dataCriacao.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
