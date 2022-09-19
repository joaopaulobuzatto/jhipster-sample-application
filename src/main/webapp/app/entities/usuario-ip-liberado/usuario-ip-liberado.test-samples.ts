import { IUsuarioIpLiberado, NewUsuarioIpLiberado } from './usuario-ip-liberado.model';

export const sampleWithRequiredData: IUsuarioIpLiberado = {
  id: 54604,
};

export const sampleWithPartialData: IUsuarioIpLiberado = {
  id: 86180,
};

export const sampleWithFullData: IUsuarioIpLiberado = {
  id: 92144,
};

export const sampleWithNewData: NewUsuarioIpLiberado = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
