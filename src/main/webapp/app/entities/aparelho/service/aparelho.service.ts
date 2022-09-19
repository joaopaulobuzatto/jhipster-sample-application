import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAparelho, NewAparelho } from '../aparelho.model';

export type PartialUpdateAparelho = Partial<IAparelho> & Pick<IAparelho, 'id'>;

type RestOf<T extends IAparelho | NewAparelho> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

export type RestAparelho = RestOf<IAparelho>;

export type NewRestAparelho = RestOf<NewAparelho>;

export type PartialUpdateRestAparelho = RestOf<PartialUpdateAparelho>;

export type EntityResponseType = HttpResponse<IAparelho>;
export type EntityArrayResponseType = HttpResponse<IAparelho[]>;

@Injectable({ providedIn: 'root' })
export class AparelhoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/aparelhos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(aparelho: NewAparelho): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(aparelho);
    return this.http
      .post<RestAparelho>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(aparelho: IAparelho): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(aparelho);
    return this.http
      .put<RestAparelho>(`${this.resourceUrl}/${this.getAparelhoIdentifier(aparelho)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(aparelho: PartialUpdateAparelho): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(aparelho);
    return this.http
      .patch<RestAparelho>(`${this.resourceUrl}/${this.getAparelhoIdentifier(aparelho)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAparelho>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAparelho[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAparelhoIdentifier(aparelho: Pick<IAparelho, 'id'>): number {
    return aparelho.id;
  }

  compareAparelho(o1: Pick<IAparelho, 'id'> | null, o2: Pick<IAparelho, 'id'> | null): boolean {
    return o1 && o2 ? this.getAparelhoIdentifier(o1) === this.getAparelhoIdentifier(o2) : o1 === o2;
  }

  addAparelhoToCollectionIfMissing<Type extends Pick<IAparelho, 'id'>>(
    aparelhoCollection: Type[],
    ...aparelhosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const aparelhos: Type[] = aparelhosToCheck.filter(isPresent);
    if (aparelhos.length > 0) {
      const aparelhoCollectionIdentifiers = aparelhoCollection.map(aparelhoItem => this.getAparelhoIdentifier(aparelhoItem)!);
      const aparelhosToAdd = aparelhos.filter(aparelhoItem => {
        const aparelhoIdentifier = this.getAparelhoIdentifier(aparelhoItem);
        if (aparelhoCollectionIdentifiers.includes(aparelhoIdentifier)) {
          return false;
        }
        aparelhoCollectionIdentifiers.push(aparelhoIdentifier);
        return true;
      });
      return [...aparelhosToAdd, ...aparelhoCollection];
    }
    return aparelhoCollection;
  }

  protected convertDateFromClient<T extends IAparelho | NewAparelho | PartialUpdateAparelho>(aparelho: T): RestOf<T> {
    return {
      ...aparelho,
      dataCriacao: aparelho.dataCriacao?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restAparelho: RestAparelho): IAparelho {
    return {
      ...restAparelho,
      dataCriacao: restAparelho.dataCriacao ? dayjs(restAparelho.dataCriacao) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAparelho>): HttpResponse<IAparelho> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAparelho[]>): HttpResponse<IAparelho[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
