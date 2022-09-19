import dayjs from 'dayjs/esm';
import { IUsuario } from 'app/entities/usuario/usuario.model';

export interface IPlano {
  id: number;
  codigo?: number | null;
  dataCriacao?: dayjs.Dayjs | null;
  descricao?: string | null;
  ativo?: boolean | null;
  usuarioCriador?: Pick<IUsuario, 'id'> | null;
}

export type NewPlano = Omit<IPlano, 'id'> & { id: null };
