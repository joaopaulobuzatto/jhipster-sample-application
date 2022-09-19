import dayjs from 'dayjs/esm';

import { IOferta, NewOferta } from './oferta.model';

export const sampleWithRequiredData: IOferta = {
  id: 1507,
  dataCriacao: dayjs('2022-09-18T13:35'),
  ativo: true,
  valor: 84422,
};

export const sampleWithPartialData: IOferta = {
  id: 48738,
  dataCriacao: dayjs('2022-09-18T20:05'),
  ativo: true,
  valor: 61474,
};

export const sampleWithFullData: IOferta = {
  id: 19612,
  codigo: 66906,
  dataCriacao: dayjs('2022-09-19T04:29'),
  descricao: 'Cuban',
  ativo: true,
  valor: 20638,
};

export const sampleWithNewData: NewOferta = {
  dataCriacao: dayjs('2022-09-19T00:12'),
  ativo: false,
  valor: 91414,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
