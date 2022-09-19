import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IHorarioTrabalhoPeriodo, NewHorarioTrabalhoPeriodo } from '../horario-trabalho-periodo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IHorarioTrabalhoPeriodo for edit and NewHorarioTrabalhoPeriodoFormGroupInput for create.
 */
type HorarioTrabalhoPeriodoFormGroupInput = IHorarioTrabalhoPeriodo | PartialWithRequiredKeyOf<NewHorarioTrabalhoPeriodo>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IHorarioTrabalhoPeriodo | NewHorarioTrabalhoPeriodo> = Omit<
  T,
  | 'dataCriacao'
  | 'periodo1Inicio'
  | 'periodo1Fim'
  | 'periodo2Inicio'
  | 'periodo2Fim'
  | 'periodo3Inicio'
  | 'periodo3Fim'
  | 'periodo4Inicio'
  | 'periodo4Fim'
> & {
  dataCriacao?: string | null;
  periodo1Inicio?: string | null;
  periodo1Fim?: string | null;
  periodo2Inicio?: string | null;
  periodo2Fim?: string | null;
  periodo3Inicio?: string | null;
  periodo3Fim?: string | null;
  periodo4Inicio?: string | null;
  periodo4Fim?: string | null;
};

type HorarioTrabalhoPeriodoFormRawValue = FormValueOf<IHorarioTrabalhoPeriodo>;

type NewHorarioTrabalhoPeriodoFormRawValue = FormValueOf<NewHorarioTrabalhoPeriodo>;

type HorarioTrabalhoPeriodoFormDefaults = Pick<
  NewHorarioTrabalhoPeriodo,
  | 'id'
  | 'dataCriacao'
  | 'periodo1Inicio'
  | 'periodo1Fim'
  | 'periodo2Inicio'
  | 'periodo2Fim'
  | 'periodo3Inicio'
  | 'periodo3Fim'
  | 'periodo4Inicio'
  | 'periodo4Fim'
>;

type HorarioTrabalhoPeriodoFormGroupContent = {
  id: FormControl<HorarioTrabalhoPeriodoFormRawValue['id'] | NewHorarioTrabalhoPeriodo['id']>;
  dataCriacao: FormControl<HorarioTrabalhoPeriodoFormRawValue['dataCriacao']>;
  diaDaSemana: FormControl<HorarioTrabalhoPeriodoFormRawValue['diaDaSemana']>;
  periodo1Inicio: FormControl<HorarioTrabalhoPeriodoFormRawValue['periodo1Inicio']>;
  periodo1Fim: FormControl<HorarioTrabalhoPeriodoFormRawValue['periodo1Fim']>;
  periodo2Inicio: FormControl<HorarioTrabalhoPeriodoFormRawValue['periodo2Inicio']>;
  periodo2Fim: FormControl<HorarioTrabalhoPeriodoFormRawValue['periodo2Fim']>;
  periodo3Inicio: FormControl<HorarioTrabalhoPeriodoFormRawValue['periodo3Inicio']>;
  periodo3Fim: FormControl<HorarioTrabalhoPeriodoFormRawValue['periodo3Fim']>;
  periodo4Inicio: FormControl<HorarioTrabalhoPeriodoFormRawValue['periodo4Inicio']>;
  periodo4Fim: FormControl<HorarioTrabalhoPeriodoFormRawValue['periodo4Fim']>;
  licenca: FormControl<HorarioTrabalhoPeriodoFormRawValue['licenca']>;
  usuarioCriador: FormControl<HorarioTrabalhoPeriodoFormRawValue['usuarioCriador']>;
  horarioTrabalho: FormControl<HorarioTrabalhoPeriodoFormRawValue['horarioTrabalho']>;
};

export type HorarioTrabalhoPeriodoFormGroup = FormGroup<HorarioTrabalhoPeriodoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class HorarioTrabalhoPeriodoFormService {
  createHorarioTrabalhoPeriodoFormGroup(
    horarioTrabalhoPeriodo: HorarioTrabalhoPeriodoFormGroupInput = { id: null }
  ): HorarioTrabalhoPeriodoFormGroup {
    const horarioTrabalhoPeriodoRawValue = this.convertHorarioTrabalhoPeriodoToHorarioTrabalhoPeriodoRawValue({
      ...this.getFormDefaults(),
      ...horarioTrabalhoPeriodo,
    });
    return new FormGroup<HorarioTrabalhoPeriodoFormGroupContent>({
      id: new FormControl(
        { value: horarioTrabalhoPeriodoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      dataCriacao: new FormControl(horarioTrabalhoPeriodoRawValue.dataCriacao, {
        validators: [Validators.required],
      }),
      diaDaSemana: new FormControl(horarioTrabalhoPeriodoRawValue.diaDaSemana, {
        validators: [Validators.maxLength(50)],
      }),
      periodo1Inicio: new FormControl(horarioTrabalhoPeriodoRawValue.periodo1Inicio),
      periodo1Fim: new FormControl(horarioTrabalhoPeriodoRawValue.periodo1Fim),
      periodo2Inicio: new FormControl(horarioTrabalhoPeriodoRawValue.periodo2Inicio),
      periodo2Fim: new FormControl(horarioTrabalhoPeriodoRawValue.periodo2Fim),
      periodo3Inicio: new FormControl(horarioTrabalhoPeriodoRawValue.periodo3Inicio),
      periodo3Fim: new FormControl(horarioTrabalhoPeriodoRawValue.periodo3Fim),
      periodo4Inicio: new FormControl(horarioTrabalhoPeriodoRawValue.periodo4Inicio),
      periodo4Fim: new FormControl(horarioTrabalhoPeriodoRawValue.periodo4Fim),
      licenca: new FormControl(horarioTrabalhoPeriodoRawValue.licenca),
      usuarioCriador: new FormControl(horarioTrabalhoPeriodoRawValue.usuarioCriador),
      horarioTrabalho: new FormControl(horarioTrabalhoPeriodoRawValue.horarioTrabalho),
    });
  }

  getHorarioTrabalhoPeriodo(form: HorarioTrabalhoPeriodoFormGroup): IHorarioTrabalhoPeriodo | NewHorarioTrabalhoPeriodo {
    return this.convertHorarioTrabalhoPeriodoRawValueToHorarioTrabalhoPeriodo(
      form.getRawValue() as HorarioTrabalhoPeriodoFormRawValue | NewHorarioTrabalhoPeriodoFormRawValue
    );
  }

  resetForm(form: HorarioTrabalhoPeriodoFormGroup, horarioTrabalhoPeriodo: HorarioTrabalhoPeriodoFormGroupInput): void {
    const horarioTrabalhoPeriodoRawValue = this.convertHorarioTrabalhoPeriodoToHorarioTrabalhoPeriodoRawValue({
      ...this.getFormDefaults(),
      ...horarioTrabalhoPeriodo,
    });
    form.reset(
      {
        ...horarioTrabalhoPeriodoRawValue,
        id: { value: horarioTrabalhoPeriodoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): HorarioTrabalhoPeriodoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dataCriacao: currentTime,
      periodo1Inicio: currentTime,
      periodo1Fim: currentTime,
      periodo2Inicio: currentTime,
      periodo2Fim: currentTime,
      periodo3Inicio: currentTime,
      periodo3Fim: currentTime,
      periodo4Inicio: currentTime,
      periodo4Fim: currentTime,
    };
  }

  private convertHorarioTrabalhoPeriodoRawValueToHorarioTrabalhoPeriodo(
    rawHorarioTrabalhoPeriodo: HorarioTrabalhoPeriodoFormRawValue | NewHorarioTrabalhoPeriodoFormRawValue
  ): IHorarioTrabalhoPeriodo | NewHorarioTrabalhoPeriodo {
    return {
      ...rawHorarioTrabalhoPeriodo,
      dataCriacao: dayjs(rawHorarioTrabalhoPeriodo.dataCriacao, DATE_TIME_FORMAT),
      periodo1Inicio: dayjs(rawHorarioTrabalhoPeriodo.periodo1Inicio, DATE_TIME_FORMAT),
      periodo1Fim: dayjs(rawHorarioTrabalhoPeriodo.periodo1Fim, DATE_TIME_FORMAT),
      periodo2Inicio: dayjs(rawHorarioTrabalhoPeriodo.periodo2Inicio, DATE_TIME_FORMAT),
      periodo2Fim: dayjs(rawHorarioTrabalhoPeriodo.periodo2Fim, DATE_TIME_FORMAT),
      periodo3Inicio: dayjs(rawHorarioTrabalhoPeriodo.periodo3Inicio, DATE_TIME_FORMAT),
      periodo3Fim: dayjs(rawHorarioTrabalhoPeriodo.periodo3Fim, DATE_TIME_FORMAT),
      periodo4Inicio: dayjs(rawHorarioTrabalhoPeriodo.periodo4Inicio, DATE_TIME_FORMAT),
      periodo4Fim: dayjs(rawHorarioTrabalhoPeriodo.periodo4Fim, DATE_TIME_FORMAT),
    };
  }

  private convertHorarioTrabalhoPeriodoToHorarioTrabalhoPeriodoRawValue(
    horarioTrabalhoPeriodo: IHorarioTrabalhoPeriodo | (Partial<NewHorarioTrabalhoPeriodo> & HorarioTrabalhoPeriodoFormDefaults)
  ): HorarioTrabalhoPeriodoFormRawValue | PartialWithRequiredKeyOf<NewHorarioTrabalhoPeriodoFormRawValue> {
    return {
      ...horarioTrabalhoPeriodo,
      dataCriacao: horarioTrabalhoPeriodo.dataCriacao ? horarioTrabalhoPeriodo.dataCriacao.format(DATE_TIME_FORMAT) : undefined,
      periodo1Inicio: horarioTrabalhoPeriodo.periodo1Inicio ? horarioTrabalhoPeriodo.periodo1Inicio.format(DATE_TIME_FORMAT) : undefined,
      periodo1Fim: horarioTrabalhoPeriodo.periodo1Fim ? horarioTrabalhoPeriodo.periodo1Fim.format(DATE_TIME_FORMAT) : undefined,
      periodo2Inicio: horarioTrabalhoPeriodo.periodo2Inicio ? horarioTrabalhoPeriodo.periodo2Inicio.format(DATE_TIME_FORMAT) : undefined,
      periodo2Fim: horarioTrabalhoPeriodo.periodo2Fim ? horarioTrabalhoPeriodo.periodo2Fim.format(DATE_TIME_FORMAT) : undefined,
      periodo3Inicio: horarioTrabalhoPeriodo.periodo3Inicio ? horarioTrabalhoPeriodo.periodo3Inicio.format(DATE_TIME_FORMAT) : undefined,
      periodo3Fim: horarioTrabalhoPeriodo.periodo3Fim ? horarioTrabalhoPeriodo.periodo3Fim.format(DATE_TIME_FORMAT) : undefined,
      periodo4Inicio: horarioTrabalhoPeriodo.periodo4Inicio ? horarioTrabalhoPeriodo.periodo4Inicio.format(DATE_TIME_FORMAT) : undefined,
      periodo4Fim: horarioTrabalhoPeriodo.periodo4Fim ? horarioTrabalhoPeriodo.periodo4Fim.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
