import dayjs from 'dayjs/esm';

import { IEventoAgenda, NewEventoAgenda } from './evento-agenda.model';

export const sampleWithRequiredData: IEventoAgenda = {
  id: 91718,
  dataCriacao: dayjs('2022-09-18T16:42'),
  data: dayjs('2022-09-19T01:11'),
  descricao: 'index methodologies',
};

export const sampleWithPartialData: IEventoAgenda = {
  id: 59633,
  dataCriacao: dayjs('2022-09-18T16:32'),
  data: dayjs('2022-09-18T15:49'),
  descricao: 'driver Metal orange',
};

export const sampleWithFullData: IEventoAgenda = {
  id: 61271,
  dataCriacao: dayjs('2022-09-18T20:08'),
  data: dayjs('2022-09-19T07:51'),
  descricao: 'Sweden XML Interface',
};

export const sampleWithNewData: NewEventoAgenda = {
  dataCriacao: dayjs('2022-09-19T00:11'),
  data: dayjs('2022-09-19T06:16'),
  descricao: 'Analyst 1080p Bacon',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
