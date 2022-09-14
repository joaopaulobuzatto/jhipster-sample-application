import dayjs from 'dayjs/esm';
import { ILicenca } from 'app/entities/licenca/licenca.model';

export interface IPessoaJuridica {
  id: number;
  cnpj?: string | null;
  razaoSocial?: string | null;
  nomeFantasia?: string | null;
  codigoCnae?: string | null;
  dataAbertura?: dayjs.Dayjs | null;
  codigoCnaePrincipal?: string | null;
  codigoNaturezaJuridica?: string | null;
  quantidadeFuncionarios?: number | null;
  pessoaJuridicaLicenca?: Pick<ILicenca, 'id'> | null;
}

export type NewPessoaJuridica = Omit<IPessoaJuridica, 'id'> & { id: null };
