import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITipoDeDocumentoAnexavel, NewTipoDeDocumentoAnexavel } from '../tipo-de-documento-anexavel.model';

export type PartialUpdateTipoDeDocumentoAnexavel = Partial<ITipoDeDocumentoAnexavel> & Pick<ITipoDeDocumentoAnexavel, 'id'>;

type RestOf<T extends ITipoDeDocumentoAnexavel | NewTipoDeDocumentoAnexavel> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

export type RestTipoDeDocumentoAnexavel = RestOf<ITipoDeDocumentoAnexavel>;

export type NewRestTipoDeDocumentoAnexavel = RestOf<NewTipoDeDocumentoAnexavel>;

export type PartialUpdateRestTipoDeDocumentoAnexavel = RestOf<PartialUpdateTipoDeDocumentoAnexavel>;

export type EntityResponseType = HttpResponse<ITipoDeDocumentoAnexavel>;
export type EntityArrayResponseType = HttpResponse<ITipoDeDocumentoAnexavel[]>;

@Injectable({ providedIn: 'root' })
export class TipoDeDocumentoAnexavelService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-de-documento-anexavels');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(tipoDeDocumentoAnexavel: NewTipoDeDocumentoAnexavel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tipoDeDocumentoAnexavel);
    return this.http
      .post<RestTipoDeDocumentoAnexavel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(tipoDeDocumentoAnexavel: ITipoDeDocumentoAnexavel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tipoDeDocumentoAnexavel);
    return this.http
      .put<RestTipoDeDocumentoAnexavel>(`${this.resourceUrl}/${this.getTipoDeDocumentoAnexavelIdentifier(tipoDeDocumentoAnexavel)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(tipoDeDocumentoAnexavel: PartialUpdateTipoDeDocumentoAnexavel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tipoDeDocumentoAnexavel);
    return this.http
      .patch<RestTipoDeDocumentoAnexavel>(
        `${this.resourceUrl}/${this.getTipoDeDocumentoAnexavelIdentifier(tipoDeDocumentoAnexavel)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTipoDeDocumentoAnexavel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTipoDeDocumentoAnexavel[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTipoDeDocumentoAnexavelIdentifier(tipoDeDocumentoAnexavel: Pick<ITipoDeDocumentoAnexavel, 'id'>): number {
    return tipoDeDocumentoAnexavel.id;
  }

  compareTipoDeDocumentoAnexavel(
    o1: Pick<ITipoDeDocumentoAnexavel, 'id'> | null,
    o2: Pick<ITipoDeDocumentoAnexavel, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getTipoDeDocumentoAnexavelIdentifier(o1) === this.getTipoDeDocumentoAnexavelIdentifier(o2) : o1 === o2;
  }

  addTipoDeDocumentoAnexavelToCollectionIfMissing<Type extends Pick<ITipoDeDocumentoAnexavel, 'id'>>(
    tipoDeDocumentoAnexavelCollection: Type[],
    ...tipoDeDocumentoAnexavelsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tipoDeDocumentoAnexavels: Type[] = tipoDeDocumentoAnexavelsToCheck.filter(isPresent);
    if (tipoDeDocumentoAnexavels.length > 0) {
      const tipoDeDocumentoAnexavelCollectionIdentifiers = tipoDeDocumentoAnexavelCollection.map(
        tipoDeDocumentoAnexavelItem => this.getTipoDeDocumentoAnexavelIdentifier(tipoDeDocumentoAnexavelItem)!
      );
      const tipoDeDocumentoAnexavelsToAdd = tipoDeDocumentoAnexavels.filter(tipoDeDocumentoAnexavelItem => {
        const tipoDeDocumentoAnexavelIdentifier = this.getTipoDeDocumentoAnexavelIdentifier(tipoDeDocumentoAnexavelItem);
        if (tipoDeDocumentoAnexavelCollectionIdentifiers.includes(tipoDeDocumentoAnexavelIdentifier)) {
          return false;
        }
        tipoDeDocumentoAnexavelCollectionIdentifiers.push(tipoDeDocumentoAnexavelIdentifier);
        return true;
      });
      return [...tipoDeDocumentoAnexavelsToAdd, ...tipoDeDocumentoAnexavelCollection];
    }
    return tipoDeDocumentoAnexavelCollection;
  }

  protected convertDateFromClient<T extends ITipoDeDocumentoAnexavel | NewTipoDeDocumentoAnexavel | PartialUpdateTipoDeDocumentoAnexavel>(
    tipoDeDocumentoAnexavel: T
  ): RestOf<T> {
    return {
      ...tipoDeDocumentoAnexavel,
      dataCriacao: tipoDeDocumentoAnexavel.dataCriacao?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restTipoDeDocumentoAnexavel: RestTipoDeDocumentoAnexavel): ITipoDeDocumentoAnexavel {
    return {
      ...restTipoDeDocumentoAnexavel,
      dataCriacao: restTipoDeDocumentoAnexavel.dataCriacao ? dayjs(restTipoDeDocumentoAnexavel.dataCriacao) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTipoDeDocumentoAnexavel>): HttpResponse<ITipoDeDocumentoAnexavel> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTipoDeDocumentoAnexavel[]>): HttpResponse<ITipoDeDocumentoAnexavel[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
