import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IHorarioTrabalho, NewHorarioTrabalho } from '../horario-trabalho.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IHorarioTrabalho for edit and NewHorarioTrabalhoFormGroupInput for create.
 */
type HorarioTrabalhoFormGroupInput = IHorarioTrabalho | PartialWithRequiredKeyOf<NewHorarioTrabalho>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IHorarioTrabalho | NewHorarioTrabalho> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

type HorarioTrabalhoFormRawValue = FormValueOf<IHorarioTrabalho>;

type NewHorarioTrabalhoFormRawValue = FormValueOf<NewHorarioTrabalho>;

type HorarioTrabalhoFormDefaults = Pick<NewHorarioTrabalho, 'id' | 'dataCriacao'>;

type HorarioTrabalhoFormGroupContent = {
  id: FormControl<HorarioTrabalhoFormRawValue['id'] | NewHorarioTrabalho['id']>;
  codigo: FormControl<HorarioTrabalhoFormRawValue['codigo']>;
  dataCriacao: FormControl<HorarioTrabalhoFormRawValue['dataCriacao']>;
  descricao: FormControl<HorarioTrabalhoFormRawValue['descricao']>;
  licenca: FormControl<HorarioTrabalhoFormRawValue['licenca']>;
  usuarioCriador: FormControl<HorarioTrabalhoFormRawValue['usuarioCriador']>;
};

export type HorarioTrabalhoFormGroup = FormGroup<HorarioTrabalhoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class HorarioTrabalhoFormService {
  createHorarioTrabalhoFormGroup(horarioTrabalho: HorarioTrabalhoFormGroupInput = { id: null }): HorarioTrabalhoFormGroup {
    const horarioTrabalhoRawValue = this.convertHorarioTrabalhoToHorarioTrabalhoRawValue({
      ...this.getFormDefaults(),
      ...horarioTrabalho,
    });
    return new FormGroup<HorarioTrabalhoFormGroupContent>({
      id: new FormControl(
        { value: horarioTrabalhoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(horarioTrabalhoRawValue.codigo),
      dataCriacao: new FormControl(horarioTrabalhoRawValue.dataCriacao, {
        validators: [Validators.required],
      }),
      descricao: new FormControl(horarioTrabalhoRawValue.descricao, {
        validators: [Validators.required, Validators.maxLength(255)],
      }),
      licenca: new FormControl(horarioTrabalhoRawValue.licenca),
      usuarioCriador: new FormControl(horarioTrabalhoRawValue.usuarioCriador),
    });
  }

  getHorarioTrabalho(form: HorarioTrabalhoFormGroup): IHorarioTrabalho | NewHorarioTrabalho {
    return this.convertHorarioTrabalhoRawValueToHorarioTrabalho(
      form.getRawValue() as HorarioTrabalhoFormRawValue | NewHorarioTrabalhoFormRawValue
    );
  }

  resetForm(form: HorarioTrabalhoFormGroup, horarioTrabalho: HorarioTrabalhoFormGroupInput): void {
    const horarioTrabalhoRawValue = this.convertHorarioTrabalhoToHorarioTrabalhoRawValue({ ...this.getFormDefaults(), ...horarioTrabalho });
    form.reset(
      {
        ...horarioTrabalhoRawValue,
        id: { value: horarioTrabalhoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): HorarioTrabalhoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dataCriacao: currentTime,
    };
  }

  private convertHorarioTrabalhoRawValueToHorarioTrabalho(
    rawHorarioTrabalho: HorarioTrabalhoFormRawValue | NewHorarioTrabalhoFormRawValue
  ): IHorarioTrabalho | NewHorarioTrabalho {
    return {
      ...rawHorarioTrabalho,
      dataCriacao: dayjs(rawHorarioTrabalho.dataCriacao, DATE_TIME_FORMAT),
    };
  }

  private convertHorarioTrabalhoToHorarioTrabalhoRawValue(
    horarioTrabalho: IHorarioTrabalho | (Partial<NewHorarioTrabalho> & HorarioTrabalhoFormDefaults)
  ): HorarioTrabalhoFormRawValue | PartialWithRequiredKeyOf<NewHorarioTrabalhoFormRawValue> {
    return {
      ...horarioTrabalho,
      dataCriacao: horarioTrabalho.dataCriacao ? horarioTrabalho.dataCriacao.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
