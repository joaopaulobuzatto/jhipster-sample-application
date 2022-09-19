import dayjs from 'dayjs/esm';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { ClassificacaoAparelho } from 'app/entities/enumerations/classificacao-aparelho.model';

export interface IAparelho {
  id: number;
  codigo?: string | null;
  dataCriacao?: dayjs.Dayjs | null;
  classificacaoAparelho?: ClassificacaoAparelho | null;
  descricao?: string | null;
  nomeTecnico?: string | null;
  material?: string | null;
  valor?: number | null;
  ativo?: boolean | null;
  usuarioCriador?: Pick<IUsuario, 'id'> | null;
}

export type NewAparelho = Omit<IAparelho, 'id'> & { id: null };
