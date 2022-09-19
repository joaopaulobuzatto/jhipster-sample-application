import dayjs from 'dayjs/esm';

import { IServico, NewServico } from './servico.model';

export const sampleWithRequiredData: IServico = {
  id: 45750,
  dataCriacao: dayjs('2022-09-19T06:32'),
  ativo: true,
  valor: 22551,
};

export const sampleWithPartialData: IServico = {
  id: 643,
  codigo: 46943,
  dataCriacao: dayjs('2022-09-18T11:07'),
  ativo: true,
  valor: 35969,
};

export const sampleWithFullData: IServico = {
  id: 95549,
  codigo: 16250,
  dataCriacao: dayjs('2022-09-19T02:18'),
  descricao: 'deposit quantifying',
  ativo: true,
  valor: 47319,
};

export const sampleWithNewData: NewServico = {
  dataCriacao: dayjs('2022-09-18T22:14'),
  ativo: false,
  valor: 42879,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
