import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IAnexoArquivo, NewAnexoArquivo } from '../anexo-arquivo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAnexoArquivo for edit and NewAnexoArquivoFormGroupInput for create.
 */
type AnexoArquivoFormGroupInput = IAnexoArquivo | PartialWithRequiredKeyOf<NewAnexoArquivo>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IAnexoArquivo | NewAnexoArquivo> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

type AnexoArquivoFormRawValue = FormValueOf<IAnexoArquivo>;

type NewAnexoArquivoFormRawValue = FormValueOf<NewAnexoArquivo>;

type AnexoArquivoFormDefaults = Pick<NewAnexoArquivo, 'id' | 'dataCriacao'>;

type AnexoArquivoFormGroupContent = {
  id: FormControl<AnexoArquivoFormRawValue['id'] | NewAnexoArquivo['id']>;
  codigo: FormControl<AnexoArquivoFormRawValue['codigo']>;
  dataCriacao: FormControl<AnexoArquivoFormRawValue['dataCriacao']>;
  descricao: FormControl<AnexoArquivoFormRawValue['descricao']>;
  nomeNuvem: FormControl<AnexoArquivoFormRawValue['nomeNuvem']>;
  nomeOriginal: FormControl<AnexoArquivoFormRawValue['nomeOriginal']>;
  tipoOrigemAnexoArquivo: FormControl<AnexoArquivoFormRawValue['tipoOrigemAnexoArquivo']>;
  licenca: FormControl<AnexoArquivoFormRawValue['licenca']>;
  usuarioCriador: FormControl<AnexoArquivoFormRawValue['usuarioCriador']>;
  detentorAnexoArquivo: FormControl<AnexoArquivoFormRawValue['detentorAnexoArquivo']>;
  tipoDeDocumentoAnexavel: FormControl<AnexoArquivoFormRawValue['tipoDeDocumentoAnexavel']>;
};

export type AnexoArquivoFormGroup = FormGroup<AnexoArquivoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AnexoArquivoFormService {
  createAnexoArquivoFormGroup(anexoArquivo: AnexoArquivoFormGroupInput = { id: null }): AnexoArquivoFormGroup {
    const anexoArquivoRawValue = this.convertAnexoArquivoToAnexoArquivoRawValue({
      ...this.getFormDefaults(),
      ...anexoArquivo,
    });
    return new FormGroup<AnexoArquivoFormGroupContent>({
      id: new FormControl(
        { value: anexoArquivoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(anexoArquivoRawValue.codigo),
      dataCriacao: new FormControl(anexoArquivoRawValue.dataCriacao, {
        validators: [Validators.required],
      }),
      descricao: new FormControl(anexoArquivoRawValue.descricao, {
        validators: [Validators.maxLength(100)],
      }),
      nomeNuvem: new FormControl(anexoArquivoRawValue.nomeNuvem, {
        validators: [Validators.required, Validators.maxLength(255)],
      }),
      nomeOriginal: new FormControl(anexoArquivoRawValue.nomeOriginal, {
        validators: [Validators.maxLength(255)],
      }),
      tipoOrigemAnexoArquivo: new FormControl(anexoArquivoRawValue.tipoOrigemAnexoArquivo),
      licenca: new FormControl(anexoArquivoRawValue.licenca),
      usuarioCriador: new FormControl(anexoArquivoRawValue.usuarioCriador),
      detentorAnexoArquivo: new FormControl(anexoArquivoRawValue.detentorAnexoArquivo),
      tipoDeDocumentoAnexavel: new FormControl(anexoArquivoRawValue.tipoDeDocumentoAnexavel),
    });
  }

  getAnexoArquivo(form: AnexoArquivoFormGroup): IAnexoArquivo | NewAnexoArquivo {
    return this.convertAnexoArquivoRawValueToAnexoArquivo(form.getRawValue() as AnexoArquivoFormRawValue | NewAnexoArquivoFormRawValue);
  }

  resetForm(form: AnexoArquivoFormGroup, anexoArquivo: AnexoArquivoFormGroupInput): void {
    const anexoArquivoRawValue = this.convertAnexoArquivoToAnexoArquivoRawValue({ ...this.getFormDefaults(), ...anexoArquivo });
    form.reset(
      {
        ...anexoArquivoRawValue,
        id: { value: anexoArquivoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AnexoArquivoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dataCriacao: currentTime,
    };
  }

  private convertAnexoArquivoRawValueToAnexoArquivo(
    rawAnexoArquivo: AnexoArquivoFormRawValue | NewAnexoArquivoFormRawValue
  ): IAnexoArquivo | NewAnexoArquivo {
    return {
      ...rawAnexoArquivo,
      dataCriacao: dayjs(rawAnexoArquivo.dataCriacao, DATE_TIME_FORMAT),
    };
  }

  private convertAnexoArquivoToAnexoArquivoRawValue(
    anexoArquivo: IAnexoArquivo | (Partial<NewAnexoArquivo> & AnexoArquivoFormDefaults)
  ): AnexoArquivoFormRawValue | PartialWithRequiredKeyOf<NewAnexoArquivoFormRawValue> {
    return {
      ...anexoArquivo,
      dataCriacao: anexoArquivo.dataCriacao ? anexoArquivo.dataCriacao.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
