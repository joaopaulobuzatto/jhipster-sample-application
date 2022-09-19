import { ILicenca } from 'app/entities/licenca/licenca.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { IFilial } from 'app/entities/filial/filial.model';

export interface IUsuarioFilial {
  id: number;
  licenca?: Pick<ILicenca, 'id'> | null;
  usuario?: Pick<IUsuario, 'id'> | null;
  filial?: Pick<IFilial, 'id'> | null;
}

export type NewUsuarioFilial = Omit<IUsuarioFilial, 'id'> & { id: null };
