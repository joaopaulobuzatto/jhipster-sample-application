import dayjs from 'dayjs/esm';

import { IPlano, NewPlano } from './plano.model';

export const sampleWithRequiredData: IPlano = {
  id: 4231,
  dataCriacao: dayjs('2022-09-18T22:21'),
  descricao: 'Account',
  ativo: true,
};

export const sampleWithPartialData: IPlano = {
  id: 84862,
  dataCriacao: dayjs('2022-09-19T06:53'),
  descricao: 'Tennessee',
  ativo: true,
};

export const sampleWithFullData: IPlano = {
  id: 99179,
  codigo: 1289,
  dataCriacao: dayjs('2022-09-19T03:28'),
  descricao: 'productize matrix',
  ativo: false,
};

export const sampleWithNewData: NewPlano = {
  dataCriacao: dayjs('2022-09-18T10:59'),
  descricao: 'data-warehouse Coordinator',
  ativo: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
