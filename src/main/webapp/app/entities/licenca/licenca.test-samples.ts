import dayjs from 'dayjs/esm';

import { ILicenca, NewLicenca } from './licenca.model';

export const sampleWithRequiredData: ILicenca = {
  id: 66184,
  dataCriacao: dayjs('2022-09-14T07:40'),
  contratacaoBloqueioIps: true,
  contratacaoEmailProposta: false,
  bloqueioAcesso: true,
  dataBloqueioAcesso: dayjs('2022-09-14T02:35'),
};

export const sampleWithPartialData: ILicenca = {
  id: 54214,
  dataCriacao: dayjs('2022-09-14T10:42'),
  diaVencimentoBoleto: 37333,
  produtosContratados: 'Squares Buckinghamshire e-tailers',
  contratacaoBloqueioIps: true,
  contratacaoEmailProposta: true,
  criarPedido: false,
  criarNegociacoes: true,
  sincronizarDadosCadastroCliente: false,
  sincronizarDadosCarteiraCliente: false,
  bloqueioAcesso: true,
  dataBloqueioAcesso: dayjs('2022-09-13T17:09'),
};

export const sampleWithFullData: ILicenca = {
  id: 24943,
  codigo: 78398,
  dataCriacao: dayjs('2022-09-14T03:28'),
  dataInicioUtilizacao: dayjs('2022-09-14T04:03'),
  dataInicioFaturamento: dayjs('2022-09-13T14:24'),
  dataPrimeiroVencimentoBoleto: dayjs('2022-09-14T00:49'),
  diaVencimentoBoleto: 88710,
  produtosContratados: 'repurpose array',
  valoresNegociados: 'blue',
  contratacaoBloqueioIps: false,
  contratacaoEmailProposta: false,
  criarPedido: false,
  criarNegociacoes: true,
  sincronizarDadosCadastroCliente: false,
  sincronizarDadosCarteiraCliente: true,
  bloqueioAcesso: false,
  dataBloqueioAcesso: dayjs('2022-09-14T09:15'),
  motivoBloqueioAcesso: 'Phased',
  mensagemBloqueioAcesso: 'Supervisor',
};

export const sampleWithNewData: NewLicenca = {
  dataCriacao: dayjs('2022-09-14T03:31'),
  contratacaoBloqueioIps: true,
  contratacaoEmailProposta: true,
  bloqueioAcesso: false,
  dataBloqueioAcesso: dayjs('2022-09-14T10:57'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
