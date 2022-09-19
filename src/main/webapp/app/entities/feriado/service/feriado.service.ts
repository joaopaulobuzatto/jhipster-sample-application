import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFeriado, NewFeriado } from '../feriado.model';

export type PartialUpdateFeriado = Partial<IFeriado> & Pick<IFeriado, 'id'>;

type RestOf<T extends IFeriado | NewFeriado> = Omit<T, 'dataCriacao' | 'data'> & {
  dataCriacao?: string | null;
  data?: string | null;
};

export type RestFeriado = RestOf<IFeriado>;

export type NewRestFeriado = RestOf<NewFeriado>;

export type PartialUpdateRestFeriado = RestOf<PartialUpdateFeriado>;

export type EntityResponseType = HttpResponse<IFeriado>;
export type EntityArrayResponseType = HttpResponse<IFeriado[]>;

@Injectable({ providedIn: 'root' })
export class FeriadoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/feriados');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(feriado: NewFeriado): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(feriado);
    return this.http
      .post<RestFeriado>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(feriado: IFeriado): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(feriado);
    return this.http
      .put<RestFeriado>(`${this.resourceUrl}/${this.getFeriadoIdentifier(feriado)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(feriado: PartialUpdateFeriado): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(feriado);
    return this.http
      .patch<RestFeriado>(`${this.resourceUrl}/${this.getFeriadoIdentifier(feriado)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestFeriado>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFeriado[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFeriadoIdentifier(feriado: Pick<IFeriado, 'id'>): number {
    return feriado.id;
  }

  compareFeriado(o1: Pick<IFeriado, 'id'> | null, o2: Pick<IFeriado, 'id'> | null): boolean {
    return o1 && o2 ? this.getFeriadoIdentifier(o1) === this.getFeriadoIdentifier(o2) : o1 === o2;
  }

  addFeriadoToCollectionIfMissing<Type extends Pick<IFeriado, 'id'>>(
    feriadoCollection: Type[],
    ...feriadosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const feriados: Type[] = feriadosToCheck.filter(isPresent);
    if (feriados.length > 0) {
      const feriadoCollectionIdentifiers = feriadoCollection.map(feriadoItem => this.getFeriadoIdentifier(feriadoItem)!);
      const feriadosToAdd = feriados.filter(feriadoItem => {
        const feriadoIdentifier = this.getFeriadoIdentifier(feriadoItem);
        if (feriadoCollectionIdentifiers.includes(feriadoIdentifier)) {
          return false;
        }
        feriadoCollectionIdentifiers.push(feriadoIdentifier);
        return true;
      });
      return [...feriadosToAdd, ...feriadoCollection];
    }
    return feriadoCollection;
  }

  protected convertDateFromClient<T extends IFeriado | NewFeriado | PartialUpdateFeriado>(feriado: T): RestOf<T> {
    return {
      ...feriado,
      dataCriacao: feriado.dataCriacao?.toJSON() ?? null,
      data: feriado.data?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restFeriado: RestFeriado): IFeriado {
    return {
      ...restFeriado,
      dataCriacao: restFeriado.dataCriacao ? dayjs(restFeriado.dataCriacao) : undefined,
      data: restFeriado.data ? dayjs(restFeriado.data) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFeriado>): HttpResponse<IFeriado> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFeriado[]>): HttpResponse<IFeriado[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
