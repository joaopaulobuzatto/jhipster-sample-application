export interface ICor {
  id: number;
  descricao?: string | null;
}

export type NewCor = Omit<ICor, 'id'> & { id: null };
