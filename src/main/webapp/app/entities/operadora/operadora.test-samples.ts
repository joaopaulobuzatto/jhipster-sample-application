import dayjs from 'dayjs/esm';

import { IOperadora, NewOperadora } from './operadora.model';

export const sampleWithRequiredData: IOperadora = {
  id: 43436,
  dataCriacao: dayjs('2022-09-19T07:40'),
  descricao: 'payment 1080p Mongolia',
  ativo: true,
};

export const sampleWithPartialData: IOperadora = {
  id: 66664,
  codigo: 30888,
  dataCriacao: dayjs('2022-09-18T13:53'),
  descricao: 'line input',
  ativo: true,
};

export const sampleWithFullData: IOperadora = {
  id: 39173,
  codigo: 26796,
  dataCriacao: dayjs('2022-09-19T02:44'),
  descricao: 'Cheese Bedfordshire',
  ativo: false,
};

export const sampleWithNewData: NewOperadora = {
  dataCriacao: dayjs('2022-09-18T22:42'),
  descricao: 'Internal Spur Moldova',
  ativo: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
