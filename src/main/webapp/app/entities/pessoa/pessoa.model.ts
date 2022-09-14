import { IEndereco } from 'app/entities/endereco/endereco.model';
import { ILicenca } from 'app/entities/licenca/licenca.model';

export interface IPessoa {
  id: number;
  email1?: string | null;
  telefone1?: string | null;
  endereco?: Pick<IEndereco, 'id'> | null;
  licenca?: Pick<ILicenca, 'id'> | null;
}

export type NewPessoa = Omit<IPessoa, 'id'> & { id: null };
