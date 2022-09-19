import { IEndereco } from 'app/entities/endereco/endereco.model';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { IOperadora } from 'app/entities/operadora/operadora.model';

export interface IPessoa {
  id: number;
  email1?: string | null;
  telefone1?: string | null;
  endereco?: Pick<IEndereco, 'id'> | null;
  licenca?: Pick<ILicenca, 'id'> | null;
  operadoraTelefone1?: Pick<IOperadora, 'id'> | null;
}

export type NewPessoa = Omit<IPessoa, 'id'> & { id: null };
