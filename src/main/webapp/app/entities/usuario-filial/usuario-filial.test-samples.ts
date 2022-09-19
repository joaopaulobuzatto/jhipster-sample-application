import { IUsuarioFilial, NewUsuarioFilial } from './usuario-filial.model';

export const sampleWithRequiredData: IUsuarioFilial = {
  id: 5579,
};

export const sampleWithPartialData: IUsuarioFilial = {
  id: 80018,
};

export const sampleWithFullData: IUsuarioFilial = {
  id: 88542,
};

export const sampleWithNewData: NewUsuarioFilial = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
