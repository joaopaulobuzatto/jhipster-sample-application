import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFilial, NewFilial } from '../filial.model';

export type PartialUpdateFilial = Partial<IFilial> & Pick<IFilial, 'id'>;

type RestOf<T extends IFilial | NewFilial> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

export type RestFilial = RestOf<IFilial>;

export type NewRestFilial = RestOf<NewFilial>;

export type PartialUpdateRestFilial = RestOf<PartialUpdateFilial>;

export type EntityResponseType = HttpResponse<IFilial>;
export type EntityArrayResponseType = HttpResponse<IFilial[]>;

@Injectable({ providedIn: 'root' })
export class FilialService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/filials');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(filial: NewFilial): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(filial);
    return this.http
      .post<RestFilial>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(filial: IFilial): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(filial);
    return this.http
      .put<RestFilial>(`${this.resourceUrl}/${this.getFilialIdentifier(filial)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(filial: PartialUpdateFilial): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(filial);
    return this.http
      .patch<RestFilial>(`${this.resourceUrl}/${this.getFilialIdentifier(filial)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestFilial>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFilial[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFilialIdentifier(filial: Pick<IFilial, 'id'>): number {
    return filial.id;
  }

  compareFilial(o1: Pick<IFilial, 'id'> | null, o2: Pick<IFilial, 'id'> | null): boolean {
    return o1 && o2 ? this.getFilialIdentifier(o1) === this.getFilialIdentifier(o2) : o1 === o2;
  }

  addFilialToCollectionIfMissing<Type extends Pick<IFilial, 'id'>>(
    filialCollection: Type[],
    ...filialsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const filials: Type[] = filialsToCheck.filter(isPresent);
    if (filials.length > 0) {
      const filialCollectionIdentifiers = filialCollection.map(filialItem => this.getFilialIdentifier(filialItem)!);
      const filialsToAdd = filials.filter(filialItem => {
        const filialIdentifier = this.getFilialIdentifier(filialItem);
        if (filialCollectionIdentifiers.includes(filialIdentifier)) {
          return false;
        }
        filialCollectionIdentifiers.push(filialIdentifier);
        return true;
      });
      return [...filialsToAdd, ...filialCollection];
    }
    return filialCollection;
  }

  protected convertDateFromClient<T extends IFilial | NewFilial | PartialUpdateFilial>(filial: T): RestOf<T> {
    return {
      ...filial,
      dataCriacao: filial.dataCriacao?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restFilial: RestFilial): IFilial {
    return {
      ...restFilial,
      dataCriacao: restFilial.dataCriacao ? dayjs(restFilial.dataCriacao) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFilial>): HttpResponse<IFilial> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFilial[]>): HttpResponse<IFilial[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
