import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOrigem, NewOrigem } from '../origem.model';

export type PartialUpdateOrigem = Partial<IOrigem> & Pick<IOrigem, 'id'>;

type RestOf<T extends IOrigem | NewOrigem> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

export type RestOrigem = RestOf<IOrigem>;

export type NewRestOrigem = RestOf<NewOrigem>;

export type PartialUpdateRestOrigem = RestOf<PartialUpdateOrigem>;

export type EntityResponseType = HttpResponse<IOrigem>;
export type EntityArrayResponseType = HttpResponse<IOrigem[]>;

@Injectable({ providedIn: 'root' })
export class OrigemService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/origems');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(origem: NewOrigem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(origem);
    return this.http
      .post<RestOrigem>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(origem: IOrigem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(origem);
    return this.http
      .put<RestOrigem>(`${this.resourceUrl}/${this.getOrigemIdentifier(origem)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(origem: PartialUpdateOrigem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(origem);
    return this.http
      .patch<RestOrigem>(`${this.resourceUrl}/${this.getOrigemIdentifier(origem)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestOrigem>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestOrigem[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getOrigemIdentifier(origem: Pick<IOrigem, 'id'>): number {
    return origem.id;
  }

  compareOrigem(o1: Pick<IOrigem, 'id'> | null, o2: Pick<IOrigem, 'id'> | null): boolean {
    return o1 && o2 ? this.getOrigemIdentifier(o1) === this.getOrigemIdentifier(o2) : o1 === o2;
  }

  addOrigemToCollectionIfMissing<Type extends Pick<IOrigem, 'id'>>(
    origemCollection: Type[],
    ...origemsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const origems: Type[] = origemsToCheck.filter(isPresent);
    if (origems.length > 0) {
      const origemCollectionIdentifiers = origemCollection.map(origemItem => this.getOrigemIdentifier(origemItem)!);
      const origemsToAdd = origems.filter(origemItem => {
        const origemIdentifier = this.getOrigemIdentifier(origemItem);
        if (origemCollectionIdentifiers.includes(origemIdentifier)) {
          return false;
        }
        origemCollectionIdentifiers.push(origemIdentifier);
        return true;
      });
      return [...origemsToAdd, ...origemCollection];
    }
    return origemCollection;
  }

  protected convertDateFromClient<T extends IOrigem | NewOrigem | PartialUpdateOrigem>(origem: T): RestOf<T> {
    return {
      ...origem,
      dataCriacao: origem.dataCriacao?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restOrigem: RestOrigem): IOrigem {
    return {
      ...restOrigem,
      dataCriacao: restOrigem.dataCriacao ? dayjs(restOrigem.dataCriacao) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestOrigem>): HttpResponse<IOrigem> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestOrigem[]>): HttpResponse<IOrigem[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
