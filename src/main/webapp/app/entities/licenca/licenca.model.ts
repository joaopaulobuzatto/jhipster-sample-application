import dayjs from 'dayjs/esm';
import { IPessoa } from 'app/entities/pessoa/pessoa.model';
import { IPessoaFisica } from 'app/entities/pessoa-fisica/pessoa-fisica.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { IFilial } from 'app/entities/filial/filial.model';

export interface ILicenca {
  id: number;
  codigo?: number | null;
  dataCriacao?: dayjs.Dayjs | null;
  dataInicioUtilizacao?: dayjs.Dayjs | null;
  dataInicioFaturamento?: dayjs.Dayjs | null;
  dataPrimeiroVencimentoBoleto?: dayjs.Dayjs | null;
  diaVencimentoBoleto?: number | null;
  produtosContratados?: string | null;
  valoresNegociados?: string | null;
  contratacaoBloqueioIps?: boolean | null;
  contratacaoEmailProposta?: boolean | null;
  criarPedido?: boolean | null;
  criarNegociacoes?: boolean | null;
  sincronizarDadosCadastroCliente?: boolean | null;
  sincronizarDadosCarteiraCliente?: boolean | null;
  bloqueioAcesso?: boolean | null;
  dataBloqueioAcesso?: dayjs.Dayjs | null;
  motivoBloqueioAcesso?: string | null;
  mensagemBloqueioAcesso?: string | null;
  pessoa?: Pick<IPessoa, 'id'> | null;
  pessoaResponsavel?: Pick<IPessoaFisica, 'id'> | null;
  pessoaFinanceiro?: Pick<IPessoaFisica, 'id'> | null;
  usuarioSuporte?: Pick<IUsuario, 'id'> | null;
  usuarioRobo?: Pick<IUsuario, 'id'> | null;
  filialPadrao?: Pick<IFilial, 'id'> | null;
}

export type NewLicenca = Omit<ILicenca, 'id'> & { id: null };
