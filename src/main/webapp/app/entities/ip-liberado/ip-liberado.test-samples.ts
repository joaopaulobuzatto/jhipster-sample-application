import dayjs from 'dayjs/esm';

import { IIpLiberado, NewIpLiberado } from './ip-liberado.model';

export const sampleWithRequiredData: IIpLiberado = {
  id: 82993,
  dataCriacao: dayjs('2022-09-18T14:02'),
  descricao: 'Chicken',
  ipLiberado: 'models Kentucky',
};

export const sampleWithPartialData: IIpLiberado = {
  id: 91199,
  codigo: 36380,
  dataCriacao: dayjs('2022-09-19T08:08'),
  descricao: 'XSS Liberia',
  ipLiberado: 'Fish',
};

export const sampleWithFullData: IIpLiberado = {
  id: 52521,
  codigo: 7600,
  dataCriacao: dayjs('2022-09-18T13:32'),
  descricao: 'azure parse haptic',
  ipLiberado: 'Maine 1080p',
};

export const sampleWithNewData: NewIpLiberado = {
  dataCriacao: dayjs('2022-09-19T06:59'),
  descricao: 'front-end integrate',
  ipLiberado: 'moderator senso',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
