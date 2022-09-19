import dayjs from 'dayjs/esm';
import { ILicenca } from 'app/entities/licenca/licenca.model';

export interface IPessoaFisica {
  id: number;
  nomeCompleto?: string | null;
  cpf?: string | null;
  rg?: string | null;
  dataNascimento?: dayjs.Dayjs | null;
  pessoaFisicaLicenca?: Pick<ILicenca, 'id'> | null;
}

export type NewPessoaFisica = Omit<IPessoaFisica, 'id'> & { id: null };
