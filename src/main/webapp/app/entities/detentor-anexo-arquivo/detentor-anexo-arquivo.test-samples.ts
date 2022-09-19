import dayjs from 'dayjs/esm';

import { IDetentorAnexoArquivo, NewDetentorAnexoArquivo } from './detentor-anexo-arquivo.model';

export const sampleWithRequiredData: IDetentorAnexoArquivo = {
  id: 3721,
  dataCriacao: dayjs('2022-09-18T20:11'),
};

export const sampleWithPartialData: IDetentorAnexoArquivo = {
  id: 23554,
  dataCriacao: dayjs('2022-09-18T21:09'),
};

export const sampleWithFullData: IDetentorAnexoArquivo = {
  id: 85911,
  dataCriacao: dayjs('2022-09-18T14:39'),
};

export const sampleWithNewData: NewDetentorAnexoArquivo = {
  dataCriacao: dayjs('2022-09-18T22:07'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
