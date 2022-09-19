import { IArrCep, NewArrCep } from './arr-cep.model';

export const sampleWithRequiredData: IArrCep = {
  id: 95434,
  cepnum: 'Tunisia ',
};

export const sampleWithPartialData: IArrCep = {
  id: 37542,
  cepnum: 'Mexican ',
  cependcompl: 'Supervisor bluetooth Branch',
  cepbai: 'Avon Industrial supply-chains',
  cepmunnom: 'Jersey Future',
};

export const sampleWithFullData: IArrCep = {
  id: 57947,
  cepnum: 'deposit ',
  cependtip: 'Granite',
  cepend: 'Buckinghamshire',
  cependcompl: 'Generic',
  cepbai: 'Corporate',
  cepcid: 'optical',
  cepmuncod: 84341,
  cepmunnom: 'Ghana',
  cepmunuf: 'SQ',
};

export const sampleWithNewData: NewArrCep = {
  cepnum: 'Internal',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
