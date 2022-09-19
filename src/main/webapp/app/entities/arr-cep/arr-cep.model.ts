export interface IArrCep {
  id: number;
  cepnum?: string | null;
  cependtip?: string | null;
  cepend?: string | null;
  cependcompl?: string | null;
  cepbai?: string | null;
  cepcid?: string | null;
  cepmuncod?: number | null;
  cepmunnom?: string | null;
  cepmunuf?: string | null;
}

export type NewArrCep = Omit<IArrCep, 'id'> & { id: null };
