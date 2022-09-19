import dayjs from 'dayjs/esm';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { TipoOrigem } from 'app/entities/enumerations/tipo-origem.model';

export interface IOrigem {
  id: number;
  codigo?: number | null;
  dataCriacao?: dayjs.Dayjs | null;
  descricao?: string | null;
  tipo?: TipoOrigem | null;
  licenca?: Pick<ILicenca, 'id'> | null;
  usuarioCriador?: Pick<IUsuario, 'id'> | null;
}

export type NewOrigem = Omit<IOrigem, 'id'> & { id: null };
