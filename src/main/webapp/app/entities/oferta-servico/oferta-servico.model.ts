import { IOferta } from 'app/entities/oferta/oferta.model';
import { IServico } from 'app/entities/servico/servico.model';

export interface IOfertaServico {
  id: number;
  oferta?: Pick<IOferta, 'id'> | null;
  servico?: Pick<IServico, 'id'> | null;
}

export type NewOfertaServico = Omit<IOfertaServico, 'id'> & { id: null };
