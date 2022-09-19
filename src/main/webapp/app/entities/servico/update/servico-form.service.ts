import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IServico, NewServico } from '../servico.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IServico for edit and NewServicoFormGroupInput for create.
 */
type ServicoFormGroupInput = IServico | PartialWithRequiredKeyOf<NewServico>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IServico | NewServico> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

type ServicoFormRawValue = FormValueOf<IServico>;

type NewServicoFormRawValue = FormValueOf<NewServico>;

type ServicoFormDefaults = Pick<NewServico, 'id' | 'dataCriacao' | 'ativo'>;

type ServicoFormGroupContent = {
  id: FormControl<ServicoFormRawValue['id'] | NewServico['id']>;
  codigo: FormControl<ServicoFormRawValue['codigo']>;
  dataCriacao: FormControl<ServicoFormRawValue['dataCriacao']>;
  descricao: FormControl<ServicoFormRawValue['descricao']>;
  ativo: FormControl<ServicoFormRawValue['ativo']>;
  valor: FormControl<ServicoFormRawValue['valor']>;
  usuarioCriador: FormControl<ServicoFormRawValue['usuarioCriador']>;
};

export type ServicoFormGroup = FormGroup<ServicoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ServicoFormService {
  createServicoFormGroup(servico: ServicoFormGroupInput = { id: null }): ServicoFormGroup {
    const servicoRawValue = this.convertServicoToServicoRawValue({
      ...this.getFormDefaults(),
      ...servico,
    });
    return new FormGroup<ServicoFormGroupContent>({
      id: new FormControl(
        { value: servicoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(servicoRawValue.codigo),
      dataCriacao: new FormControl(servicoRawValue.dataCriacao, {
        validators: [Validators.required],
      }),
      descricao: new FormControl(servicoRawValue.descricao, {
        validators: [Validators.maxLength(100)],
      }),
      ativo: new FormControl(servicoRawValue.ativo, {
        validators: [Validators.required],
      }),
      valor: new FormControl(servicoRawValue.valor, {
        validators: [Validators.required],
      }),
      usuarioCriador: new FormControl(servicoRawValue.usuarioCriador),
    });
  }

  getServico(form: ServicoFormGroup): IServico | NewServico {
    return this.convertServicoRawValueToServico(form.getRawValue() as ServicoFormRawValue | NewServicoFormRawValue);
  }

  resetForm(form: ServicoFormGroup, servico: ServicoFormGroupInput): void {
    const servicoRawValue = this.convertServicoToServicoRawValue({ ...this.getFormDefaults(), ...servico });
    form.reset(
      {
        ...servicoRawValue,
        id: { value: servicoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ServicoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dataCriacao: currentTime,
      ativo: false,
    };
  }

  private convertServicoRawValueToServico(rawServico: ServicoFormRawValue | NewServicoFormRawValue): IServico | NewServico {
    return {
      ...rawServico,
      dataCriacao: dayjs(rawServico.dataCriacao, DATE_TIME_FORMAT),
    };
  }

  private convertServicoToServicoRawValue(
    servico: IServico | (Partial<NewServico> & ServicoFormDefaults)
  ): ServicoFormRawValue | PartialWithRequiredKeyOf<NewServicoFormRawValue> {
    return {
      ...servico,
      dataCriacao: servico.dataCriacao ? servico.dataCriacao.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
