import dayjs from 'dayjs/esm';

import { IUsuario, NewUsuario } from './usuario.model';

export const sampleWithRequiredData: IUsuario = {
  id: 19585,
  dataCriacao: dayjs('2022-09-19T02:52'),
  senha: 'Shilling knowledge',
  isAdmin: true,
  isSuporte: true,
  nomeExibicao: 'Berkshire cyan auxiliary',
  isConsultor: false,
  isSupervisor: true,
  isAtivo: false,
  receberEmails: true,
  isEmailValido: false,
  email: 'Elise88@yahoo.com',
  isExecutorSac: true,
};

export const sampleWithPartialData: IUsuario = {
  id: 75438,
  dataCriacao: dayjs('2022-09-19T02:38'),
  senha: 'Bedfordshire Ford transmitter',
  isAdmin: true,
  isSuporte: false,
  nomeExibicao: 'bypassing Personal migration',
  isConsultor: true,
  isSupervisor: true,
  isAtivo: false,
  receberEmails: false,
  isEmailValido: false,
  email: 'Kaylin_Wyman@hotmail.com',
  isExecutorSac: true,
  liberarHorarioFeriado: false,
};

export const sampleWithFullData: IUsuario = {
  id: 79719,
  codigo: 15184,
  dataCriacao: dayjs('2022-09-18T11:17'),
  senha: 'invoice',
  isAdmin: false,
  isSuporte: false,
  nomeExibicao: 'Marketing',
  isConsultor: false,
  isSupervisor: false,
  isAtivo: false,
  isAdministrativo: false,
  receberEmails: false,
  isEmailValido: false,
  uuidEmail: 'calculate Integration',
  email: 'Francis.Kunze68@hotmail.com',
  isExecutorSac: true,
  liberarHorarioFeriado: true,
};

export const sampleWithNewData: NewUsuario = {
  dataCriacao: dayjs('2022-09-19T05:12'),
  senha: 'calculating',
  isAdmin: false,
  isSuporte: false,
  nomeExibicao: 'Bedfordshire sexy Armenia',
  isConsultor: false,
  isSupervisor: true,
  isAtivo: false,
  receberEmails: false,
  isEmailValido: true,
  email: 'Adrain_Tremblay@yahoo.com',
  isExecutorSac: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
