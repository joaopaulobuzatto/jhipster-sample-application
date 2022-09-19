import dayjs from 'dayjs/esm';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';

export interface IFeriado {
  id: number;
  codigo?: number | null;
  dataCriacao?: dayjs.Dayjs | null;
  data?: dayjs.Dayjs | null;
  nome?: string | null;
  licenca?: Pick<ILicenca, 'id'> | null;
  usuarioCriador?: Pick<IUsuario, 'id'> | null;
}

export type NewFeriado = Omit<IFeriado, 'id'> & { id: null };
