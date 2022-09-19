import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IEventoAgenda, NewEventoAgenda } from '../evento-agenda.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEventoAgenda for edit and NewEventoAgendaFormGroupInput for create.
 */
type EventoAgendaFormGroupInput = IEventoAgenda | PartialWithRequiredKeyOf<NewEventoAgenda>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IEventoAgenda | NewEventoAgenda> = Omit<T, 'dataCriacao' | 'data'> & {
  dataCriacao?: string | null;
  data?: string | null;
};

type EventoAgendaFormRawValue = FormValueOf<IEventoAgenda>;

type NewEventoAgendaFormRawValue = FormValueOf<NewEventoAgenda>;

type EventoAgendaFormDefaults = Pick<NewEventoAgenda, 'id' | 'dataCriacao' | 'data'>;

type EventoAgendaFormGroupContent = {
  id: FormControl<EventoAgendaFormRawValue['id'] | NewEventoAgenda['id']>;
  dataCriacao: FormControl<EventoAgendaFormRawValue['dataCriacao']>;
  data: FormControl<EventoAgendaFormRawValue['data']>;
  descricao: FormControl<EventoAgendaFormRawValue['descricao']>;
  licenca: FormControl<EventoAgendaFormRawValue['licenca']>;
  usuarioCriador: FormControl<EventoAgendaFormRawValue['usuarioCriador']>;
  usuarioResponsavel: FormControl<EventoAgendaFormRawValue['usuarioResponsavel']>;
};

export type EventoAgendaFormGroup = FormGroup<EventoAgendaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EventoAgendaFormService {
  createEventoAgendaFormGroup(eventoAgenda: EventoAgendaFormGroupInput = { id: null }): EventoAgendaFormGroup {
    const eventoAgendaRawValue = this.convertEventoAgendaToEventoAgendaRawValue({
      ...this.getFormDefaults(),
      ...eventoAgenda,
    });
    return new FormGroup<EventoAgendaFormGroupContent>({
      id: new FormControl(
        { value: eventoAgendaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      dataCriacao: new FormControl(eventoAgendaRawValue.dataCriacao, {
        validators: [Validators.required],
      }),
      data: new FormControl(eventoAgendaRawValue.data, {
        validators: [Validators.required],
      }),
      descricao: new FormControl(eventoAgendaRawValue.descricao, {
        validators: [Validators.required, Validators.maxLength(255)],
      }),
      licenca: new FormControl(eventoAgendaRawValue.licenca),
      usuarioCriador: new FormControl(eventoAgendaRawValue.usuarioCriador),
      usuarioResponsavel: new FormControl(eventoAgendaRawValue.usuarioResponsavel),
    });
  }

  getEventoAgenda(form: EventoAgendaFormGroup): IEventoAgenda | NewEventoAgenda {
    return this.convertEventoAgendaRawValueToEventoAgenda(form.getRawValue() as EventoAgendaFormRawValue | NewEventoAgendaFormRawValue);
  }

  resetForm(form: EventoAgendaFormGroup, eventoAgenda: EventoAgendaFormGroupInput): void {
    const eventoAgendaRawValue = this.convertEventoAgendaToEventoAgendaRawValue({ ...this.getFormDefaults(), ...eventoAgenda });
    form.reset(
      {
        ...eventoAgendaRawValue,
        id: { value: eventoAgendaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EventoAgendaFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dataCriacao: currentTime,
      data: currentTime,
    };
  }

  private convertEventoAgendaRawValueToEventoAgenda(
    rawEventoAgenda: EventoAgendaFormRawValue | NewEventoAgendaFormRawValue
  ): IEventoAgenda | NewEventoAgenda {
    return {
      ...rawEventoAgenda,
      dataCriacao: dayjs(rawEventoAgenda.dataCriacao, DATE_TIME_FORMAT),
      data: dayjs(rawEventoAgenda.data, DATE_TIME_FORMAT),
    };
  }

  private convertEventoAgendaToEventoAgendaRawValue(
    eventoAgenda: IEventoAgenda | (Partial<NewEventoAgenda> & EventoAgendaFormDefaults)
  ): EventoAgendaFormRawValue | PartialWithRequiredKeyOf<NewEventoAgendaFormRawValue> {
    return {
      ...eventoAgenda,
      dataCriacao: eventoAgenda.dataCriacao ? eventoAgenda.dataCriacao.format(DATE_TIME_FORMAT) : undefined,
      data: eventoAgenda.data ? eventoAgenda.data.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
