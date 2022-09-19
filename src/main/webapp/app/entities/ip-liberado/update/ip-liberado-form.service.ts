import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IIpLiberado, NewIpLiberado } from '../ip-liberado.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IIpLiberado for edit and NewIpLiberadoFormGroupInput for create.
 */
type IpLiberadoFormGroupInput = IIpLiberado | PartialWithRequiredKeyOf<NewIpLiberado>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IIpLiberado | NewIpLiberado> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

type IpLiberadoFormRawValue = FormValueOf<IIpLiberado>;

type NewIpLiberadoFormRawValue = FormValueOf<NewIpLiberado>;

type IpLiberadoFormDefaults = Pick<NewIpLiberado, 'id' | 'dataCriacao'>;

type IpLiberadoFormGroupContent = {
  id: FormControl<IpLiberadoFormRawValue['id'] | NewIpLiberado['id']>;
  codigo: FormControl<IpLiberadoFormRawValue['codigo']>;
  dataCriacao: FormControl<IpLiberadoFormRawValue['dataCriacao']>;
  descricao: FormControl<IpLiberadoFormRawValue['descricao']>;
  ipLiberado: FormControl<IpLiberadoFormRawValue['ipLiberado']>;
  licenca: FormControl<IpLiberadoFormRawValue['licenca']>;
  usuarioCriador: FormControl<IpLiberadoFormRawValue['usuarioCriador']>;
};

export type IpLiberadoFormGroup = FormGroup<IpLiberadoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class IpLiberadoFormService {
  createIpLiberadoFormGroup(ipLiberado: IpLiberadoFormGroupInput = { id: null }): IpLiberadoFormGroup {
    const ipLiberadoRawValue = this.convertIpLiberadoToIpLiberadoRawValue({
      ...this.getFormDefaults(),
      ...ipLiberado,
    });
    return new FormGroup<IpLiberadoFormGroupContent>({
      id: new FormControl(
        { value: ipLiberadoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(ipLiberadoRawValue.codigo),
      dataCriacao: new FormControl(ipLiberadoRawValue.dataCriacao, {
        validators: [Validators.required],
      }),
      descricao: new FormControl(ipLiberadoRawValue.descricao, {
        validators: [Validators.required, Validators.maxLength(70)],
      }),
      ipLiberado: new FormControl(ipLiberadoRawValue.ipLiberado, {
        validators: [Validators.required, Validators.maxLength(15)],
      }),
      licenca: new FormControl(ipLiberadoRawValue.licenca),
      usuarioCriador: new FormControl(ipLiberadoRawValue.usuarioCriador),
    });
  }

  getIpLiberado(form: IpLiberadoFormGroup): IIpLiberado | NewIpLiberado {
    return this.convertIpLiberadoRawValueToIpLiberado(form.getRawValue() as IpLiberadoFormRawValue | NewIpLiberadoFormRawValue);
  }

  resetForm(form: IpLiberadoFormGroup, ipLiberado: IpLiberadoFormGroupInput): void {
    const ipLiberadoRawValue = this.convertIpLiberadoToIpLiberadoRawValue({ ...this.getFormDefaults(), ...ipLiberado });
    form.reset(
      {
        ...ipLiberadoRawValue,
        id: { value: ipLiberadoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): IpLiberadoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dataCriacao: currentTime,
    };
  }

  private convertIpLiberadoRawValueToIpLiberado(
    rawIpLiberado: IpLiberadoFormRawValue | NewIpLiberadoFormRawValue
  ): IIpLiberado | NewIpLiberado {
    return {
      ...rawIpLiberado,
      dataCriacao: dayjs(rawIpLiberado.dataCriacao, DATE_TIME_FORMAT),
    };
  }

  private convertIpLiberadoToIpLiberadoRawValue(
    ipLiberado: IIpLiberado | (Partial<NewIpLiberado> & IpLiberadoFormDefaults)
  ): IpLiberadoFormRawValue | PartialWithRequiredKeyOf<NewIpLiberadoFormRawValue> {
    return {
      ...ipLiberado,
      dataCriacao: ipLiberado.dataCriacao ? ipLiberado.dataCriacao.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
