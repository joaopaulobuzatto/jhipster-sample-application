import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPlano, NewPlano } from '../plano.model';

export type PartialUpdatePlano = Partial<IPlano> & Pick<IPlano, 'id'>;

type RestOf<T extends IPlano | NewPlano> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

export type RestPlano = RestOf<IPlano>;

export type NewRestPlano = RestOf<NewPlano>;

export type PartialUpdateRestPlano = RestOf<PartialUpdatePlano>;

export type EntityResponseType = HttpResponse<IPlano>;
export type EntityArrayResponseType = HttpResponse<IPlano[]>;

@Injectable({ providedIn: 'root' })
export class PlanoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/planos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(plano: NewPlano): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(plano);
    return this.http.post<RestPlano>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(plano: IPlano): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(plano);
    return this.http
      .put<RestPlano>(`${this.resourceUrl}/${this.getPlanoIdentifier(plano)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(plano: PartialUpdatePlano): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(plano);
    return this.http
      .patch<RestPlano>(`${this.resourceUrl}/${this.getPlanoIdentifier(plano)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestPlano>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPlano[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPlanoIdentifier(plano: Pick<IPlano, 'id'>): number {
    return plano.id;
  }

  comparePlano(o1: Pick<IPlano, 'id'> | null, o2: Pick<IPlano, 'id'> | null): boolean {
    return o1 && o2 ? this.getPlanoIdentifier(o1) === this.getPlanoIdentifier(o2) : o1 === o2;
  }

  addPlanoToCollectionIfMissing<Type extends Pick<IPlano, 'id'>>(
    planoCollection: Type[],
    ...planosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const planos: Type[] = planosToCheck.filter(isPresent);
    if (planos.length > 0) {
      const planoCollectionIdentifiers = planoCollection.map(planoItem => this.getPlanoIdentifier(planoItem)!);
      const planosToAdd = planos.filter(planoItem => {
        const planoIdentifier = this.getPlanoIdentifier(planoItem);
        if (planoCollectionIdentifiers.includes(planoIdentifier)) {
          return false;
        }
        planoCollectionIdentifiers.push(planoIdentifier);
        return true;
      });
      return [...planosToAdd, ...planoCollection];
    }
    return planoCollection;
  }

  protected convertDateFromClient<T extends IPlano | NewPlano | PartialUpdatePlano>(plano: T): RestOf<T> {
    return {
      ...plano,
      dataCriacao: plano.dataCriacao?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restPlano: RestPlano): IPlano {
    return {
      ...restPlano,
      dataCriacao: restPlano.dataCriacao ? dayjs(restPlano.dataCriacao) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPlano>): HttpResponse<IPlano> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPlano[]>): HttpResponse<IPlano[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
