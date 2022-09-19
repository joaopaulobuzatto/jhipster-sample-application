import dayjs from 'dayjs/esm';

import { TipoOrigemAnexoArquivo } from 'app/entities/enumerations/tipo-origem-anexo-arquivo.model';

import { IAnexoArquivo, NewAnexoArquivo } from './anexo-arquivo.model';

export const sampleWithRequiredData: IAnexoArquivo = {
  id: 8133,
  dataCriacao: dayjs('2022-09-18T18:11'),
  nomeNuvem: 'pixel Personal',
};

export const sampleWithPartialData: IAnexoArquivo = {
  id: 87606,
  codigo: 52688,
  dataCriacao: dayjs('2022-09-19T03:11'),
  descricao: 'neutral Practical',
  nomeNuvem: 'scale incubate Tools',
  nomeOriginal: 'circuit driver withdrawal',
};

export const sampleWithFullData: IAnexoArquivo = {
  id: 78265,
  codigo: 13617,
  dataCriacao: dayjs('2022-09-19T05:56'),
  descricao: 'utilisation workforce',
  nomeNuvem: 'Dollar Investor',
  nomeOriginal: 'payment',
  tipoOrigemAnexoArquivo: TipoOrigemAnexoArquivo['CONFIGURACAO_SISTEMA'],
};

export const sampleWithNewData: NewAnexoArquivo = {
  dataCriacao: dayjs('2022-09-18T23:12'),
  nomeNuvem: 'Light',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
