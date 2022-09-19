import dayjs from 'dayjs/esm';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';

export interface ITipoDeDocumentoAnexavel {
  id: number;
  codigo?: number | null;
  dataCriacao?: dayjs.Dayjs | null;
  descricao?: string | null;
  licenca?: Pick<ILicenca, 'id'> | null;
  usuarioCriador?: Pick<IUsuario, 'id'> | null;
}

export type NewTipoDeDocumentoAnexavel = Omit<ITipoDeDocumentoAnexavel, 'id'> & { id: null };
