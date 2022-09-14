import { IPessoa, NewPessoa } from './pessoa.model';

export const sampleWithRequiredData: IPessoa = {
  id: 82183,
};

export const sampleWithPartialData: IPessoa = {
  id: 84003,
};

export const sampleWithFullData: IPessoa = {
  id: 76717,
  email1: 'Internal',
  telefone1: 'Bedfordshir',
};

export const sampleWithNewData: NewPessoa = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
