import dayjs from 'dayjs/esm';

export interface IOperadora {
  id: number;
  codigo?: number | null;
  dataCriacao?: dayjs.Dayjs | null;
  descricao?: string | null;
  ativo?: boolean | null;
}

export type NewOperadora = Omit<IOperadora, 'id'> & { id: null };
