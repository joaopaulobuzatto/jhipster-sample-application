import { ILicenca } from 'app/entities/licenca/licenca.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { IIpLiberado } from 'app/entities/ip-liberado/ip-liberado.model';

export interface IUsuarioIpLiberado {
  id: number;
  licenca?: Pick<ILicenca, 'id'> | null;
  usuario?: Pick<IUsuario, 'id'> | null;
  ipLiberado?: Pick<IIpLiberado, 'id'> | null;
}

export type NewUsuarioIpLiberado = Omit<IUsuarioIpLiberado, 'id'> & { id: null };
