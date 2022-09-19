import dayjs from 'dayjs/esm';

import { IHorarioTrabalhoPeriodo, NewHorarioTrabalhoPeriodo } from './horario-trabalho-periodo.model';

export const sampleWithRequiredData: IHorarioTrabalhoPeriodo = {
  id: 23269,
  dataCriacao: dayjs('2022-09-19T08:51'),
};

export const sampleWithPartialData: IHorarioTrabalhoPeriodo = {
  id: 50746,
  dataCriacao: dayjs('2022-09-18T10:20'),
  periodo1Inicio: dayjs('2022-09-18T18:34'),
  periodo1Fim: dayjs('2022-09-18T19:28'),
  periodo3Fim: dayjs('2022-09-18T14:32'),
  periodo4Inicio: dayjs('2022-09-19T04:14'),
  periodo4Fim: dayjs('2022-09-18T23:33'),
};

export const sampleWithFullData: IHorarioTrabalhoPeriodo = {
  id: 53563,
  dataCriacao: dayjs('2022-09-18T14:10'),
  diaDaSemana: 'up',
  periodo1Inicio: dayjs('2022-09-18T21:27'),
  periodo1Fim: dayjs('2022-09-19T06:02'),
  periodo2Inicio: dayjs('2022-09-18T11:07'),
  periodo2Fim: dayjs('2022-09-18T21:20'),
  periodo3Inicio: dayjs('2022-09-18T17:10'),
  periodo3Fim: dayjs('2022-09-19T08:47'),
  periodo4Inicio: dayjs('2022-09-19T07:23'),
  periodo4Fim: dayjs('2022-09-18T15:25'),
};

export const sampleWithNewData: NewHorarioTrabalhoPeriodo = {
  dataCriacao: dayjs('2022-09-18T22:55'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
