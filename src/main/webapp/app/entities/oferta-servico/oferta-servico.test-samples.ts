import { IOfertaServico, NewOfertaServico } from './oferta-servico.model';

export const sampleWithRequiredData: IOfertaServico = {
  id: 91937,
};

export const sampleWithPartialData: IOfertaServico = {
  id: 95155,
};

export const sampleWithFullData: IOfertaServico = {
  id: 67108,
};

export const sampleWithNewData: NewOfertaServico = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
