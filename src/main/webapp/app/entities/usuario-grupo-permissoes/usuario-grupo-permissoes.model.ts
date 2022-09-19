import { ILicenca } from 'app/entities/licenca/licenca.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { IGrupoPermissoes } from 'app/entities/grupo-permissoes/grupo-permissoes.model';

export interface IUsuarioGrupoPermissoes {
  id: number;
  licenca?: Pick<ILicenca, 'id'> | null;
  usuario?: Pick<IUsuario, 'id'> | null;
  grupoPermissoes?: Pick<IGrupoPermissoes, 'id'> | null;
}

export type NewUsuarioGrupoPermissoes = Omit<IUsuarioGrupoPermissoes, 'id'> & { id: null };
