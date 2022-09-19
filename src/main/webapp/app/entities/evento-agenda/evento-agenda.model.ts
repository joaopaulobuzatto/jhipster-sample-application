import dayjs from 'dayjs/esm';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';

export interface IEventoAgenda {
  id: number;
  dataCriacao?: dayjs.Dayjs | null;
  data?: dayjs.Dayjs | null;
  descricao?: string | null;
  licenca?: Pick<ILicenca, 'id'> | null;
  usuarioCriador?: Pick<IUsuario, 'id'> | null;
  usuarioResponsavel?: Pick<IUsuario, 'id'> | null;
}

export type NewEventoAgenda = Omit<IEventoAgenda, 'id'> & { id: null };
