import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IOferta, NewOferta } from '../oferta.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOferta for edit and NewOfertaFormGroupInput for create.
 */
type OfertaFormGroupInput = IOferta | PartialWithRequiredKeyOf<NewOferta>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IOferta | NewOferta> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

type OfertaFormRawValue = FormValueOf<IOferta>;

type NewOfertaFormRawValue = FormValueOf<NewOferta>;

type OfertaFormDefaults = Pick<NewOferta, 'id' | 'dataCriacao' | 'ativo'>;

type OfertaFormGroupContent = {
  id: FormControl<OfertaFormRawValue['id'] | NewOferta['id']>;
  codigo: FormControl<OfertaFormRawValue['codigo']>;
  dataCriacao: FormControl<OfertaFormRawValue['dataCriacao']>;
  descricao: FormControl<OfertaFormRawValue['descricao']>;
  ativo: FormControl<OfertaFormRawValue['ativo']>;
  valor: FormControl<OfertaFormRawValue['valor']>;
  usuarioCriador: FormControl<OfertaFormRawValue['usuarioCriador']>;
  plano: FormControl<OfertaFormRawValue['plano']>;
};

export type OfertaFormGroup = FormGroup<OfertaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OfertaFormService {
  createOfertaFormGroup(oferta: OfertaFormGroupInput = { id: null }): OfertaFormGroup {
    const ofertaRawValue = this.convertOfertaToOfertaRawValue({
      ...this.getFormDefaults(),
      ...oferta,
    });
    return new FormGroup<OfertaFormGroupContent>({
      id: new FormControl(
        { value: ofertaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(ofertaRawValue.codigo),
      dataCriacao: new FormControl(ofertaRawValue.dataCriacao, {
        validators: [Validators.required],
      }),
      descricao: new FormControl(ofertaRawValue.descricao, {
        validators: [Validators.maxLength(100)],
      }),
      ativo: new FormControl(ofertaRawValue.ativo, {
        validators: [Validators.required],
      }),
      valor: new FormControl(ofertaRawValue.valor, {
        validators: [Validators.required],
      }),
      usuarioCriador: new FormControl(ofertaRawValue.usuarioCriador),
      plano: new FormControl(ofertaRawValue.plano),
    });
  }

  getOferta(form: OfertaFormGroup): IOferta | NewOferta {
    return this.convertOfertaRawValueToOferta(form.getRawValue() as OfertaFormRawValue | NewOfertaFormRawValue);
  }

  resetForm(form: OfertaFormGroup, oferta: OfertaFormGroupInput): void {
    const ofertaRawValue = this.convertOfertaToOfertaRawValue({ ...this.getFormDefaults(), ...oferta });
    form.reset(
      {
        ...ofertaRawValue,
        id: { value: ofertaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): OfertaFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dataCriacao: currentTime,
      ativo: false,
    };
  }

  private convertOfertaRawValueToOferta(rawOferta: OfertaFormRawValue | NewOfertaFormRawValue): IOferta | NewOferta {
    return {
      ...rawOferta,
      dataCriacao: dayjs(rawOferta.dataCriacao, DATE_TIME_FORMAT),
    };
  }

  private convertOfertaToOfertaRawValue(
    oferta: IOferta | (Partial<NewOferta> & OfertaFormDefaults)
  ): OfertaFormRawValue | PartialWithRequiredKeyOf<NewOfertaFormRawValue> {
    return {
      ...oferta,
      dataCriacao: oferta.dataCriacao ? oferta.dataCriacao.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
