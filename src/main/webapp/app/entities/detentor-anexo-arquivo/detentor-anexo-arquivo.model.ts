import dayjs from 'dayjs/esm';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';

export interface IDetentorAnexoArquivo {
  id: number;
  dataCriacao?: dayjs.Dayjs | null;
  licenca?: Pick<ILicenca, 'id'> | null;
  usuarioCriador?: Pick<IUsuario, 'id'> | null;
}

export type NewDetentorAnexoArquivo = Omit<IDetentorAnexoArquivo, 'id'> & { id: null };
