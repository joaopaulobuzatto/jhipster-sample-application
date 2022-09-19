import dayjs from 'dayjs/esm';

import { ITipoDeDocumentoAnexavel, NewTipoDeDocumentoAnexavel } from './tipo-de-documento-anexavel.model';

export const sampleWithRequiredData: ITipoDeDocumentoAnexavel = {
  id: 87603,
  dataCriacao: dayjs('2022-09-18T11:35'),
  descricao: 'recontextualize Berkshire Chicken',
};

export const sampleWithPartialData: ITipoDeDocumentoAnexavel = {
  id: 91454,
  codigo: 34422,
  dataCriacao: dayjs('2022-09-19T01:36'),
  descricao: 'alarm transmitter',
};

export const sampleWithFullData: ITipoDeDocumentoAnexavel = {
  id: 52335,
  codigo: 2377,
  dataCriacao: dayjs('2022-09-19T02:44'),
  descricao: 'reinvent contextually-based Rupee',
};

export const sampleWithNewData: NewTipoDeDocumentoAnexavel = {
  dataCriacao: dayjs('2022-09-18T11:01'),
  descricao: 'Cambridgeshire',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
