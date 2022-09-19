import dayjs from 'dayjs/esm';

import { ILicenca, NewLicenca } from './licenca.model';

export const sampleWithRequiredData: ILicenca = {
  id: 66184,
  dataCriacao: dayjs('2022-09-19T03:25'),
  contratacaoBloqueioIps: true,
  contratacaoEmailProposta: false,
  bloqueioAcesso: true,
  dataBloqueioAcesso: dayjs('2022-09-18T22:21'),
};

export const sampleWithPartialData: ILicenca = {
  id: 54214,
  dataCriacao: dayjs('2022-09-19T06:27'),
  diaVencimentoBoleto: 37333,
  produtosContratados: 'Squares Buckinghamshire e-tailers',
  contratacaoBloqueioIps: true,
  contratacaoEmailProposta: true,
  criarPedido: false,
  criarNegociacoes: true,
  sincronizarDadosCadastroCliente: false,
  sincronizarDadosCarteiraCliente: false,
  bloqueioAcesso: true,
  dataBloqueioAcesso: dayjs('2022-09-18T12:54'),
};

export const sampleWithFullData: ILicenca = {
  id: 24943,
  codigo: 78398,
  dataCriacao: dayjs('2022-09-18T23:13'),
  dataInicioUtilizacao: dayjs('2022-09-18T23:48'),
  dataInicioFaturamento: dayjs('2022-09-18T10:09'),
  dataPrimeiroVencimentoBoleto: dayjs('2022-09-18T20:34'),
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
  dataBloqueioAcesso: dayjs('2022-09-19T05:00'),
  motivoBloqueioAcesso: 'Phased',
  mensagemBloqueioAcesso: 'Supervisor',
};

export const sampleWithNewData: NewLicenca = {
  dataCriacao: dayjs('2022-09-18T23:16'),
  contratacaoBloqueioIps: true,
  contratacaoEmailProposta: true,
  bloqueioAcesso: false,
  dataBloqueioAcesso: dayjs('2022-09-19T06:42'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
