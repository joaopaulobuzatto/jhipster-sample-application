import dayjs from 'dayjs/esm';

import { IFeriado, NewFeriado } from './feriado.model';

export const sampleWithRequiredData: IFeriado = {
  id: 78526,
  dataCriacao: dayjs('2022-09-19T01:51'),
  data: dayjs('2022-09-18T21:05'),
  nome: '24/7',
};

export const sampleWithPartialData: IFeriado = {
  id: 86737,
  dataCriacao: dayjs('2022-09-18T13:12'),
  data: dayjs('2022-09-18T14:05'),
  nome: 'invoice',
};

export const sampleWithFullData: IFeriado = {
  id: 2355,
  codigo: 6943,
  dataCriacao: dayjs('2022-09-19T03:57'),
  data: dayjs('2022-09-19T05:29'),
  nome: 'Gorgeous',
};

export const sampleWithNewData: NewFeriado = {
  dataCriacao: dayjs('2022-09-19T06:47'),
  data: dayjs('2022-09-18T15:37'),
  nome: 'Chicken salmon',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
