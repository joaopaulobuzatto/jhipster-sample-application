import dayjs from 'dayjs/esm';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { IPessoaFisica } from 'app/entities/pessoa-fisica/pessoa-fisica.model';
import { IHorarioTrabalho } from 'app/entities/horario-trabalho/horario-trabalho.model';

export interface IUsuario {
  id: number;
  codigo?: number | null;
  dataCriacao?: dayjs.Dayjs | null;
  senha?: string | null;
  isAdmin?: boolean | null;
  isSuporte?: boolean | null;
  nomeExibicao?: string | null;
  isConsultor?: boolean | null;
  isSupervisor?: boolean | null;
  isAtivo?: boolean | null;
  isAdministrativo?: boolean | null;
  receberEmails?: boolean | null;
  isEmailValido?: boolean | null;
  uuidEmail?: string | null;
  email?: string | null;
  isExecutorSac?: boolean | null;
  liberarHorarioFeriado?: boolean | null;
  licenca?: Pick<ILicenca, 'id'> | null;
  supervisor?: Pick<IUsuario, 'id'> | null;
  usuarioCriador?: Pick<IUsuario, 'id'> | null;
  pessoaFisica?: Pick<IPessoaFisica, 'id'> | null;
  horarioTrabalho?: Pick<IHorarioTrabalho, 'id'> | null;
}

export type NewUsuario = Omit<IUsuario, 'id'> & { id: null };
