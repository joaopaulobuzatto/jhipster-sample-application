import { ILicenca } from 'app/entities/licenca/licenca.model';

export interface IEndereco {
  id: number;
  cep?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  bairro?: string | null;
  complemento?: string | null;
  pontoReferencia?: string | null;
  cidade?: string | null;
  uf?: string | null;
  licenca?: Pick<ILicenca, 'id'> | null;
}

export type NewEndereco = Omit<IEndereco, 'id'> & { id: null };
