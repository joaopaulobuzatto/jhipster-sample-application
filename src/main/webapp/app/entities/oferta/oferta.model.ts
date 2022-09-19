import dayjs from 'dayjs/esm';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { IPlano } from 'app/entities/plano/plano.model';

export interface IOferta {
  id: number;
  codigo?: number | null;
  dataCriacao?: dayjs.Dayjs | null;
  descricao?: string | null;
  ativo?: boolean | null;
  valor?: number | null;
  usuarioCriador?: Pick<IUsuario, 'id'> | null;
  plano?: Pick<IPlano, 'id'> | null;
}

export type NewOferta = Omit<IOferta, 'id'> & { id: null };
