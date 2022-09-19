import dayjs from 'dayjs/esm';

import { IGrupoPermissoes, NewGrupoPermissoes } from './grupo-permissoes.model';

export const sampleWithRequiredData: IGrupoPermissoes = {
  id: 31621,
  dataCriacao: dayjs('2022-09-18T20:08'),
  descricao: 'protocol',
};

export const sampleWithPartialData: IGrupoPermissoes = {
  id: 74802,
  dataCriacao: dayjs('2022-09-18T10:12'),
  descricao: 'Michigan',
};

export const sampleWithFullData: IGrupoPermissoes = {
  id: 38852,
  codigo: 26785,
  dataCriacao: dayjs('2022-09-18T11:01'),
  descricao: 'Pants',
};

export const sampleWithNewData: NewGrupoPermissoes = {
  dataCriacao: dayjs('2022-09-19T01:33'),
  descricao: 'compressing parse Mountain',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
