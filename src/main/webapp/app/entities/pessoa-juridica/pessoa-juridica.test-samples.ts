import dayjs from 'dayjs/esm';

import { IPessoaJuridica, NewPessoaJuridica } from './pessoa-juridica.model';

export const sampleWithRequiredData: IPessoaJuridica = {
  id: 81139,
  nomeFantasia: 'bluetooth Spur',
};

export const sampleWithPartialData: IPessoaJuridica = {
  id: 39718,
  cnpj: 'Kenya Analyst',
  nomeFantasia: 'Bedfordshire Metal pixel',
  codigoCnaePrincipal: 'deliverables Rustic',
};

export const sampleWithFullData: IPessoaJuridica = {
  id: 35776,
  cnpj: 'transmitting A',
  razaoSocial: 'compress Vision-oriented Accountability',
  nomeFantasia: 'generate static',
  codigoCnae: 'connect Palladium',
  dataAbertura: dayjs('2022-09-13T18:40'),
  codigoCnaePrincipal: 'innovate',
  codigoNaturezaJuridica: 'Proactive redundant Cambridgeshire',
  quantidadeFuncionarios: 87210,
};

export const sampleWithNewData: NewPessoaJuridica = {
  nomeFantasia: 'Keyboard Corporate SCSI',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
