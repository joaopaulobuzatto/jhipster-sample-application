import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IGrupoPermissoes, NewGrupoPermissoes } from '../grupo-permissoes.model';

export type PartialUpdateGrupoPermissoes = Partial<IGrupoPermissoes> & Pick<IGrupoPermissoes, 'id'>;

type RestOf<T extends IGrupoPermissoes | NewGrupoPermissoes> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

export type RestGrupoPermissoes = RestOf<IGrupoPermissoes>;

export type NewRestGrupoPermissoes = RestOf<NewGrupoPermissoes>;

export type PartialUpdateRestGrupoPermissoes = RestOf<PartialUpdateGrupoPermissoes>;

export type EntityResponseType = HttpResponse<IGrupoPermissoes>;
export type EntityArrayResponseType = HttpResponse<IGrupoPermissoes[]>;

@Injectable({ providedIn: 'root' })
export class GrupoPermissoesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/grupo-permissoes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(grupoPermissoes: NewGrupoPermissoes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(grupoPermissoes);
    return this.http
      .post<RestGrupoPermissoes>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(grupoPermissoes: IGrupoPermissoes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(grupoPermissoes);
    return this.http
      .put<RestGrupoPermissoes>(`${this.resourceUrl}/${this.getGrupoPermissoesIdentifier(grupoPermissoes)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(grupoPermissoes: PartialUpdateGrupoPermissoes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(grupoPermissoes);
    return this.http
      .patch<RestGrupoPermissoes>(`${this.resourceUrl}/${this.getGrupoPermissoesIdentifier(grupoPermissoes)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestGrupoPermissoes>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestGrupoPermissoes[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getGrupoPermissoesIdentifier(grupoPermissoes: Pick<IGrupoPermissoes, 'id'>): number {
    return grupoPermissoes.id;
  }

  compareGrupoPermissoes(o1: Pick<IGrupoPermissoes, 'id'> | null, o2: Pick<IGrupoPermissoes, 'id'> | null): boolean {
    return o1 && o2 ? this.getGrupoPermissoesIdentifier(o1) === this.getGrupoPermissoesIdentifier(o2) : o1 === o2;
  }

  addGrupoPermissoesToCollectionIfMissing<Type extends Pick<IGrupoPermissoes, 'id'>>(
    grupoPermissoesCollection: Type[],
    ...grupoPermissoesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const grupoPermissoes: Type[] = grupoPermissoesToCheck.filter(isPresent);
    if (grupoPermissoes.length > 0) {
      const grupoPermissoesCollectionIdentifiers = grupoPermissoesCollection.map(
        grupoPermissoesItem => this.getGrupoPermissoesIdentifier(grupoPermissoesItem)!
      );
      const grupoPermissoesToAdd = grupoPermissoes.filter(grupoPermissoesItem => {
        const grupoPermissoesIdentifier = this.getGrupoPermissoesIdentifier(grupoPermissoesItem);
        if (grupoPermissoesCollectionIdentifiers.includes(grupoPermissoesIdentifier)) {
          return false;
        }
        grupoPermissoesCollectionIdentifiers.push(grupoPermissoesIdentifier);
        return true;
      });
      return [...grupoPermissoesToAdd, ...grupoPermissoesCollection];
    }
    return grupoPermissoesCollection;
  }

  protected convertDateFromClient<T extends IGrupoPermissoes | NewGrupoPermissoes | PartialUpdateGrupoPermissoes>(
    grupoPermissoes: T
  ): RestOf<T> {
    return {
      ...grupoPermissoes,
      dataCriacao: grupoPermissoes.dataCriacao?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restGrupoPermissoes: RestGrupoPermissoes): IGrupoPermissoes {
    return {
      ...restGrupoPermissoes,
      dataCriacao: restGrupoPermissoes.dataCriacao ? dayjs(restGrupoPermissoes.dataCriacao) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestGrupoPermissoes>): HttpResponse<IGrupoPermissoes> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestGrupoPermissoes[]>): HttpResponse<IGrupoPermissoes[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
