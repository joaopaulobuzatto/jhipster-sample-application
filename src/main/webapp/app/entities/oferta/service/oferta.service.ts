import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOferta, NewOferta } from '../oferta.model';

export type PartialUpdateOferta = Partial<IOferta> & Pick<IOferta, 'id'>;

type RestOf<T extends IOferta | NewOferta> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

export type RestOferta = RestOf<IOferta>;

export type NewRestOferta = RestOf<NewOferta>;

export type PartialUpdateRestOferta = RestOf<PartialUpdateOferta>;

export type EntityResponseType = HttpResponse<IOferta>;
export type EntityArrayResponseType = HttpResponse<IOferta[]>;

@Injectable({ providedIn: 'root' })
export class OfertaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ofertas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(oferta: NewOferta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oferta);
    return this.http
      .post<RestOferta>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(oferta: IOferta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oferta);
    return this.http
      .put<RestOferta>(`${this.resourceUrl}/${this.getOfertaIdentifier(oferta)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(oferta: PartialUpdateOferta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oferta);
    return this.http
      .patch<RestOferta>(`${this.resourceUrl}/${this.getOfertaIdentifier(oferta)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestOferta>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestOferta[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getOfertaIdentifier(oferta: Pick<IOferta, 'id'>): number {
    return oferta.id;
  }

  compareOferta(o1: Pick<IOferta, 'id'> | null, o2: Pick<IOferta, 'id'> | null): boolean {
    return o1 && o2 ? this.getOfertaIdentifier(o1) === this.getOfertaIdentifier(o2) : o1 === o2;
  }

  addOfertaToCollectionIfMissing<Type extends Pick<IOferta, 'id'>>(
    ofertaCollection: Type[],
    ...ofertasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const ofertas: Type[] = ofertasToCheck.filter(isPresent);
    if (ofertas.length > 0) {
      const ofertaCollectionIdentifiers = ofertaCollection.map(ofertaItem => this.getOfertaIdentifier(ofertaItem)!);
      const ofertasToAdd = ofertas.filter(ofertaItem => {
        const ofertaIdentifier = this.getOfertaIdentifier(ofertaItem);
        if (ofertaCollectionIdentifiers.includes(ofertaIdentifier)) {
          return false;
        }
        ofertaCollectionIdentifiers.push(ofertaIdentifier);
        return true;
      });
      return [...ofertasToAdd, ...ofertaCollection];
    }
    return ofertaCollection;
  }

  protected convertDateFromClient<T extends IOferta | NewOferta | PartialUpdateOferta>(oferta: T): RestOf<T> {
    return {
      ...oferta,
      dataCriacao: oferta.dataCriacao?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restOferta: RestOferta): IOferta {
    return {
      ...restOferta,
      dataCriacao: restOferta.dataCriacao ? dayjs(restOferta.dataCriacao) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestOferta>): HttpResponse<IOferta> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestOferta[]>): HttpResponse<IOferta[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
