import dayjs from 'dayjs/esm';

import { IPessoaFisica, NewPessoaFisica } from './pessoa-fisica.model';

export const sampleWithRequiredData: IPessoaFisica = {
  id: 54147,
  nomeCompleto: 'New Bolivar',
};

export const sampleWithPartialData: IPessoaFisica = {
  id: 91372,
  nomeCompleto: 'pixel',
  rg: 'Account',
};

export const sampleWithFullData: IPessoaFisica = {
  id: 52122,
  nomeCompleto: 'Cotton primary innovative',
  cpf: 'Swaziland invo',
  rg: 'Berkshire',
  dataNascimento: dayjs('2022-09-14T06:26'),
};

export const sampleWithNewData: NewPessoaFisica = {
  nomeCompleto: 'up',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
