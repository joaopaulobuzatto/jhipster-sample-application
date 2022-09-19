import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IAparelho, NewAparelho } from '../aparelho.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAparelho for edit and NewAparelhoFormGroupInput for create.
 */
type AparelhoFormGroupInput = IAparelho | PartialWithRequiredKeyOf<NewAparelho>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IAparelho | NewAparelho> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

type AparelhoFormRawValue = FormValueOf<IAparelho>;

type NewAparelhoFormRawValue = FormValueOf<NewAparelho>;

type AparelhoFormDefaults = Pick<NewAparelho, 'id' | 'dataCriacao' | 'ativo'>;

type AparelhoFormGroupContent = {
  id: FormControl<AparelhoFormRawValue['id'] | NewAparelho['id']>;
  codigo: FormControl<AparelhoFormRawValue['codigo']>;
  dataCriacao: FormControl<AparelhoFormRawValue['dataCriacao']>;
  classificacaoAparelho: FormControl<AparelhoFormRawValue['classificacaoAparelho']>;
  descricao: FormControl<AparelhoFormRawValue['descricao']>;
  nomeTecnico: FormControl<AparelhoFormRawValue['nomeTecnico']>;
  material: FormControl<AparelhoFormRawValue['material']>;
  valor: FormControl<AparelhoFormRawValue['valor']>;
  ativo: FormControl<AparelhoFormRawValue['ativo']>;
  usuarioCriador: FormControl<AparelhoFormRawValue['usuarioCriador']>;
};

export type AparelhoFormGroup = FormGroup<AparelhoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AparelhoFormService {
  createAparelhoFormGroup(aparelho: AparelhoFormGroupInput = { id: null }): AparelhoFormGroup {
    const aparelhoRawValue = this.convertAparelhoToAparelhoRawValue({
      ...this.getFormDefaults(),
      ...aparelho,
    });
    return new FormGroup<AparelhoFormGroupContent>({
      id: new FormControl(
        { value: aparelhoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(aparelhoRawValue.codigo),
      dataCriacao: new FormControl(aparelhoRawValue.dataCriacao, {
        validators: [Validators.required],
      }),
      classificacaoAparelho: new FormControl(aparelhoRawValue.classificacaoAparelho),
      descricao: new FormControl(aparelhoRawValue.descricao, {
        validators: [Validators.required],
      }),
      nomeTecnico: new FormControl(aparelhoRawValue.nomeTecnico, {
        validators: [Validators.required],
      }),
      material: new FormControl(aparelhoRawValue.material),
      valor: new FormControl(aparelhoRawValue.valor),
      ativo: new FormControl(aparelhoRawValue.ativo),
      usuarioCriador: new FormControl(aparelhoRawValue.usuarioCriador),
    });
  }

  getAparelho(form: AparelhoFormGroup): IAparelho | NewAparelho {
    return this.convertAparelhoRawValueToAparelho(form.getRawValue() as AparelhoFormRawValue | NewAparelhoFormRawValue);
  }

  resetForm(form: AparelhoFormGroup, aparelho: AparelhoFormGroupInput): void {
    const aparelhoRawValue = this.convertAparelhoToAparelhoRawValue({ ...this.getFormDefaults(), ...aparelho });
    form.reset(
      {
        ...aparelhoRawValue,
        id: { value: aparelhoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AparelhoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dataCriacao: currentTime,
      ativo: false,
    };
  }

  private convertAparelhoRawValueToAparelho(rawAparelho: AparelhoFormRawValue | NewAparelhoFormRawValue): IAparelho | NewAparelho {
    return {
      ...rawAparelho,
      dataCriacao: dayjs(rawAparelho.dataCriacao, DATE_TIME_FORMAT),
    };
  }

  private convertAparelhoToAparelhoRawValue(
    aparelho: IAparelho | (Partial<NewAparelho> & AparelhoFormDefaults)
  ): AparelhoFormRawValue | PartialWithRequiredKeyOf<NewAparelhoFormRawValue> {
    return {
      ...aparelho,
      dataCriacao: aparelho.dataCriacao ? aparelho.dataCriacao.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
