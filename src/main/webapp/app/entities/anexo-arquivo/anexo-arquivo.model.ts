import dayjs from 'dayjs/esm';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { IDetentorAnexoArquivo } from 'app/entities/detentor-anexo-arquivo/detentor-anexo-arquivo.model';
import { ITipoDeDocumentoAnexavel } from 'app/entities/tipo-de-documento-anexavel/tipo-de-documento-anexavel.model';
import { TipoOrigemAnexoArquivo } from 'app/entities/enumerations/tipo-origem-anexo-arquivo.model';

export interface IAnexoArquivo {
  id: number;
  codigo?: number | null;
  dataCriacao?: dayjs.Dayjs | null;
  descricao?: string | null;
  nomeNuvem?: string | null;
  nomeOriginal?: string | null;
  tipoOrigemAnexoArquivo?: TipoOrigemAnexoArquivo | null;
  licenca?: Pick<ILicenca, 'id'> | null;
  usuarioCriador?: Pick<IUsuario, 'id'> | null;
  detentorAnexoArquivo?: Pick<IDetentorAnexoArquivo, 'id'> | null;
  tipoDeDocumentoAnexavel?: Pick<ITipoDeDocumentoAnexavel, 'id'> | null;
}

export type NewAnexoArquivo = Omit<IAnexoArquivo, 'id'> & { id: null };
