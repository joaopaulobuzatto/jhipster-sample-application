import dayjs from 'dayjs/esm';

import { TipoOrigem } from 'app/entities/enumerations/tipo-origem.model';

import { IOrigem, NewOrigem } from './origem.model';

export const sampleWithRequiredData: IOrigem = {
  id: 84685,
  dataCriacao: dayjs('2022-09-14T00:17'),
  descricao: 'transmitting Small backing',
  tipo: TipoOrigem['LEAD'],
};

export const sampleWithPartialData: IOrigem = {
  id: 86815,
  dataCriacao: dayjs('2022-09-14T00:39'),
  descricao: 'infrastructures initiatives',
  tipo: TipoOrigem['LEAD'],
};

export const sampleWithFullData: IOrigem = {
  id: 42087,
  codigo: 32553,
  dataCriacao: dayjs('2022-09-13T18:44'),
  descricao: 'Object-based proactive',
  tipo: TipoOrigem['MAILING'],
};

export const sampleWithNewData: NewOrigem = {
  dataCriacao: dayjs('2022-09-14T07:36'),
  descricao: 'input',
  tipo: TipoOrigem['CLIENTE'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
