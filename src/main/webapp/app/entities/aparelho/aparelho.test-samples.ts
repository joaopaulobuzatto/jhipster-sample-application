import dayjs from 'dayjs/esm';

import { ClassificacaoAparelho } from 'app/entities/enumerations/classificacao-aparelho.model';

import { IAparelho, NewAparelho } from './aparelho.model';

export const sampleWithRequiredData: IAparelho = {
  id: 50965,
  dataCriacao: dayjs('2022-09-19T01:09'),
  descricao: 'scale bluetooth',
  nomeTecnico: 'experiences back-end',
};

export const sampleWithPartialData: IAparelho = {
  id: 49671,
  codigo: 'quantify for innovative',
  dataCriacao: dayjs('2022-09-18T23:42'),
  classificacaoAparelho: ClassificacaoAparelho['APARELHO_MOVEL'],
  descricao: 'Visionary',
  nomeTecnico: 'Uruguay Borders revolutionize',
  material: 'azure',
  ativo: false,
};

export const sampleWithFullData: IAparelho = {
  id: 99947,
  codigo: 'invoice Somali Rustic',
  dataCriacao: dayjs('2022-09-19T01:02'),
  classificacaoAparelho: ClassificacaoAparelho['CHIP_MOVEL'],
  descricao: 'Baby',
  nomeTecnico: 'Savings Executive',
  material: 'Bedfordshire District',
  valor: 37363,
  ativo: true,
};

export const sampleWithNewData: NewAparelho = {
  dataCriacao: dayjs('2022-09-19T06:10'),
  descricao: 'salmon',
  nomeTecnico: 'Enhanced',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
