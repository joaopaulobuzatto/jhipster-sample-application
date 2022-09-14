import dayjs from 'dayjs/esm';

import { IFilial, NewFilial } from './filial.model';

export const sampleWithRequiredData: IFilial = {
  id: 53509,
};

export const sampleWithPartialData: IFilial = {
  id: 29776,
  dataCriacao: dayjs('2022-09-13T21:29'),
};

export const sampleWithFullData: IFilial = {
  id: 9439,
  dataCriacao: dayjs('2022-09-13T14:47'),
};

export const sampleWithNewData: NewFilial = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
