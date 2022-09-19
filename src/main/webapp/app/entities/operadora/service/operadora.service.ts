import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOperadora, NewOperadora } from '../operadora.model';

export type PartialUpdateOperadora = Partial<IOperadora> & Pick<IOperadora, 'id'>;

type RestOf<T extends IOperadora | NewOperadora> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

export type RestOperadora = RestOf<IOperadora>;

export type NewRestOperadora = RestOf<NewOperadora>;

export type PartialUpdateRestOperadora = RestOf<PartialUpdateOperadora>;

export type EntityResponseType = HttpResponse<IOperadora>;
export type EntityArrayResponseType = HttpResponse<IOperadora[]>;

@Injectable({ providedIn: 'root' })
export class OperadoraService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/operadoras');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(operadora: NewOperadora): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(operadora);
    return this.http
      .post<RestOperadora>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(operadora: IOperadora): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(operadora);
    return this.http
      .put<RestOperadora>(`${this.resourceUrl}/${this.getOperadoraIdentifier(operadora)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(operadora: PartialUpdateOperadora): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(operadora);
    return this.http
      .patch<RestOperadora>(`${this.resourceUrl}/${this.getOperadoraIdentifier(operadora)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestOperadora>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestOperadora[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getOperadoraIdentifier(operadora: Pick<IOperadora, 'id'>): number {
    return operadora.id;
  }

  compareOperadora(o1: Pick<IOperadora, 'id'> | null, o2: Pick<IOperadora, 'id'> | null): boolean {
    return o1 && o2 ? this.getOperadoraIdentifier(o1) === this.getOperadoraIdentifier(o2) : o1 === o2;
  }

  addOperadoraToCollectionIfMissing<Type extends Pick<IOperadora, 'id'>>(
    operadoraCollection: Type[],
    ...operadorasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const operadoras: Type[] = operadorasToCheck.filter(isPresent);
    if (operadoras.length > 0) {
      const operadoraCollectionIdentifiers = operadoraCollection.map(operadoraItem => this.getOperadoraIdentifier(operadoraItem)!);
      const operadorasToAdd = operadoras.filter(operadoraItem => {
        const operadoraIdentifier = this.getOperadoraIdentifier(operadoraItem);
        if (operadoraCollectionIdentifiers.includes(operadoraIdentifier)) {
          return false;
        }
        operadoraCollectionIdentifiers.push(operadoraIdentifier);
        return true;
      });
      return [...operadorasToAdd, ...operadoraCollection];
    }
    return operadoraCollection;
  }

  protected convertDateFromClient<T extends IOperadora | NewOperadora | PartialUpdateOperadora>(operadora: T): RestOf<T> {
    return {
      ...operadora,
      dataCriacao: operadora.dataCriacao?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restOperadora: RestOperadora): IOperadora {
    return {
      ...restOperadora,
      dataCriacao: restOperadora.dataCriacao ? dayjs(restOperadora.dataCriacao) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestOperadora>): HttpResponse<IOperadora> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestOperadora[]>): HttpResponse<IOperadora[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
