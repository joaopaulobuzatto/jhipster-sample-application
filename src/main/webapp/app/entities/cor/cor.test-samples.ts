import { ICor, NewCor } from './cor.model';

export const sampleWithRequiredData: ICor = {
  id: 39972,
  descricao: 'Alaska',
};

export const sampleWithPartialData: ICor = {
  id: 73977,
  descricao: 'Illinois JSON Identity',
};

export const sampleWithFullData: ICor = {
  id: 12069,
  descricao: 'Alley leading-edge Solomon',
};

export const sampleWithNewData: NewCor = {
  descricao: 'Corner',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
