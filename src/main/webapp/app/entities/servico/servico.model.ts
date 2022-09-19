import dayjs from 'dayjs/esm';
import { IUsuario } from 'app/entities/usuario/usuario.model';

export interface IServico {
  id: number;
  codigo?: number | null;
  dataCriacao?: dayjs.Dayjs | null;
  descricao?: string | null;
  ativo?: boolean | null;
  valor?: number | null;
  usuarioCriador?: Pick<IUsuario, 'id'> | null;
}

export type NewServico = Omit<IServico, 'id'> & { id: null };
