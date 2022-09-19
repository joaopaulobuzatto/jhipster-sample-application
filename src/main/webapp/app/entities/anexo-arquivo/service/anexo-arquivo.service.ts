import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAnexoArquivo, NewAnexoArquivo } from '../anexo-arquivo.model';

export type PartialUpdateAnexoArquivo = Partial<IAnexoArquivo> & Pick<IAnexoArquivo, 'id'>;

type RestOf<T extends IAnexoArquivo | NewAnexoArquivo> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

export type RestAnexoArquivo = RestOf<IAnexoArquivo>;

export type NewRestAnexoArquivo = RestOf<NewAnexoArquivo>;

export type PartialUpdateRestAnexoArquivo = RestOf<PartialUpdateAnexoArquivo>;

export type EntityResponseType = HttpResponse<IAnexoArquivo>;
export type EntityArrayResponseType = HttpResponse<IAnexoArquivo[]>;

@Injectable({ providedIn: 'root' })
export class AnexoArquivoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/anexo-arquivos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(anexoArquivo: NewAnexoArquivo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(anexoArquivo);
    return this.http
      .post<RestAnexoArquivo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(anexoArquivo: IAnexoArquivo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(anexoArquivo);
    return this.http
      .put<RestAnexoArquivo>(`${this.resourceUrl}/${this.getAnexoArquivoIdentifier(anexoArquivo)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(anexoArquivo: PartialUpdateAnexoArquivo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(anexoArquivo);
    return this.http
      .patch<RestAnexoArquivo>(`${this.resourceUrl}/${this.getAnexoArquivoIdentifier(anexoArquivo)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAnexoArquivo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAnexoArquivo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAnexoArquivoIdentifier(anexoArquivo: Pick<IAnexoArquivo, 'id'>): number {
    return anexoArquivo.id;
  }

  compareAnexoArquivo(o1: Pick<IAnexoArquivo, 'id'> | null, o2: Pick<IAnexoArquivo, 'id'> | null): boolean {
    return o1 && o2 ? this.getAnexoArquivoIdentifier(o1) === this.getAnexoArquivoIdentifier(o2) : o1 === o2;
  }

  addAnexoArquivoToCollectionIfMissing<Type extends Pick<IAnexoArquivo, 'id'>>(
    anexoArquivoCollection: Type[],
    ...anexoArquivosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const anexoArquivos: Type[] = anexoArquivosToCheck.filter(isPresent);
    if (anexoArquivos.length > 0) {
      const anexoArquivoCollectionIdentifiers = anexoArquivoCollection.map(
        anexoArquivoItem => this.getAnexoArquivoIdentifier(anexoArquivoItem)!
      );
      const anexoArquivosToAdd = anexoArquivos.filter(anexoArquivoItem => {
        const anexoArquivoIdentifier = this.getAnexoArquivoIdentifier(anexoArquivoItem);
        if (anexoArquivoCollectionIdentifiers.includes(anexoArquivoIdentifier)) {
          return false;
        }
        anexoArquivoCollectionIdentifiers.push(anexoArquivoIdentifier);
        return true;
      });
      return [...anexoArquivosToAdd, ...anexoArquivoCollection];
    }
    return anexoArquivoCollection;
  }

  protected convertDateFromClient<T extends IAnexoArquivo | NewAnexoArquivo | PartialUpdateAnexoArquivo>(anexoArquivo: T): RestOf<T> {
    return {
      ...anexoArquivo,
      dataCriacao: anexoArquivo.dataCriacao?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restAnexoArquivo: RestAnexoArquivo): IAnexoArquivo {
    return {
      ...restAnexoArquivo,
      dataCriacao: restAnexoArquivo.dataCriacao ? dayjs(restAnexoArquivo.dataCriacao) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAnexoArquivo>): HttpResponse<IAnexoArquivo> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAnexoArquivo[]>): HttpResponse<IAnexoArquivo[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
