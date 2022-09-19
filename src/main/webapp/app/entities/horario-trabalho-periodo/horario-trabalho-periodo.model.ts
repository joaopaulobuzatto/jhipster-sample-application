import dayjs from 'dayjs/esm';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { IHorarioTrabalho } from 'app/entities/horario-trabalho/horario-trabalho.model';

export interface IHorarioTrabalhoPeriodo {
  id: number;
  dataCriacao?: dayjs.Dayjs | null;
  diaDaSemana?: string | null;
  periodo1Inicio?: dayjs.Dayjs | null;
  periodo1Fim?: dayjs.Dayjs | null;
  periodo2Inicio?: dayjs.Dayjs | null;
  periodo2Fim?: dayjs.Dayjs | null;
  periodo3Inicio?: dayjs.Dayjs | null;
  periodo3Fim?: dayjs.Dayjs | null;
  periodo4Inicio?: dayjs.Dayjs | null;
  periodo4Fim?: dayjs.Dayjs | null;
  licenca?: Pick<ILicenca, 'id'> | null;
  usuarioCriador?: Pick<IUsuario, 'id'> | null;
  horarioTrabalho?: Pick<IHorarioTrabalho, 'id'> | null;
}

export type NewHorarioTrabalhoPeriodo = Omit<IHorarioTrabalhoPeriodo, 'id'> & { id: null };
