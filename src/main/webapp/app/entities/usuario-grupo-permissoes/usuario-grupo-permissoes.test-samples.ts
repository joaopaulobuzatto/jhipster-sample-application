import { IUsuarioGrupoPermissoes, NewUsuarioGrupoPermissoes } from './usuario-grupo-permissoes.model';

export const sampleWithRequiredData: IUsuarioGrupoPermissoes = {
  id: 73043,
};

export const sampleWithPartialData: IUsuarioGrupoPermissoes = {
  id: 76459,
};

export const sampleWithFullData: IUsuarioGrupoPermissoes = {
  id: 723,
};

export const sampleWithNewData: NewUsuarioGrupoPermissoes = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
