import { IEndereco, NewEndereco } from './endereco.model';

export const sampleWithRequiredData: IEndereco = {
  id: 91029,
};

export const sampleWithPartialData: IEndereco = {
  id: 67595,
  cep: 'Oklahoma',
  logradouro: 'optimize system',
  numero: 'CFP Money',
  complemento: 'transmitting parsing',
  pontoReferencia: 'Practical South',
  cidade: 'Innovative Malawi',
};

export const sampleWithFullData: IEndereco = {
  id: 42007,
  cep: 'architect pixel',
  logradouro: 'Solutions',
  numero: 'Frozen Checking',
  bairro: 'bluetooth Home 1080p',
  complemento: 'scale Automated',
  pontoReferencia: 'Direct e-markets',
  cidade: 'JBOD XML SMTP',
  uf: 'Bu',
};

export const sampleWithNewData: NewEndereco = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
