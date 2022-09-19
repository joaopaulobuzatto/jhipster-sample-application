import dayjs from 'dayjs/esm';

import { IHorarioTrabalho, NewHorarioTrabalho } from './horario-trabalho.model';

export const sampleWithRequiredData: IHorarioTrabalho = {
  id: 88361,
  dataCriacao: dayjs('2022-09-18T13:06'),
  descricao: 'superstructure Technician',
};

export const sampleWithPartialData: IHorarioTrabalho = {
  id: 12008,
  dataCriacao: dayjs('2022-09-19T10:01'),
  descricao: 'Configurable Tasty Handcrafted',
};

export const sampleWithFullData: IHorarioTrabalho = {
  id: 65603,
  codigo: 72642,
  dataCriacao: dayjs('2022-09-18T10:16'),
  descricao: 'Stand-alone Lesotho',
};

export const sampleWithNewData: NewHorarioTrabalho = {
  dataCriacao: dayjs('2022-09-18T16:47'),
  descricao: 'Handmade',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
