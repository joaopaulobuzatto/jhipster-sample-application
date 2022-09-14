import dayjs from 'dayjs/esm';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { IPessoaJuridica } from 'app/entities/pessoa-juridica/pessoa-juridica.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';

export interface IFilial {
  id: number;
  dataCriacao?: dayjs.Dayjs | null;
  licenca?: Pick<ILicenca, 'id'> | null;
  pessoa?: Pick<IPessoaJuridica, 'id'> | null;
  usuarioCriador?: Pick<IUsuario, 'id'> | null;
}

export type NewFilial = Omit<IFilial, 'id'> & { id: null };
