import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IIpLiberado, NewIpLiberado } from '../ip-liberado.model';

export type PartialUpdateIpLiberado = Partial<IIpLiberado> & Pick<IIpLiberado, 'id'>;

type RestOf<T extends IIpLiberado | NewIpLiberado> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

export type RestIpLiberado = RestOf<IIpLiberado>;

export type NewRestIpLiberado = RestOf<NewIpLiberado>;

export type PartialUpdateRestIpLiberado = RestOf<PartialUpdateIpLiberado>;

export type EntityResponseType = HttpResponse<IIpLiberado>;
export type EntityArrayResponseType = HttpResponse<IIpLiberado[]>;

@Injectable({ providedIn: 'root' })
export class IpLiberadoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ip-liberados');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(ipLiberado: NewIpLiberado): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ipLiberado);
    return this.http
      .post<RestIpLiberado>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(ipLiberado: IIpLiberado): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ipLiberado);
    return this.http
      .put<RestIpLiberado>(`${this.resourceUrl}/${this.getIpLiberadoIdentifier(ipLiberado)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(ipLiberado: PartialUpdateIpLiberado): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ipLiberado);
    return this.http
      .patch<RestIpLiberado>(`${this.resourceUrl}/${this.getIpLiberadoIdentifier(ipLiberado)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestIpLiberado>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestIpLiberado[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getIpLiberadoIdentifier(ipLiberado: Pick<IIpLiberado, 'id'>): number {
    return ipLiberado.id;
  }

  compareIpLiberado(o1: Pick<IIpLiberado, 'id'> | null, o2: Pick<IIpLiberado, 'id'> | null): boolean {
    return o1 && o2 ? this.getIpLiberadoIdentifier(o1) === this.getIpLiberadoIdentifier(o2) : o1 === o2;
  }

  addIpLiberadoToCollectionIfMissing<Type extends Pick<IIpLiberado, 'id'>>(
    ipLiberadoCollection: Type[],
    ...ipLiberadosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const ipLiberados: Type[] = ipLiberadosToCheck.filter(isPresent);
    if (ipLiberados.length > 0) {
      const ipLiberadoCollectionIdentifiers = ipLiberadoCollection.map(ipLiberadoItem => this.getIpLiberadoIdentifier(ipLiberadoItem)!);
      const ipLiberadosToAdd = ipLiberados.filter(ipLiberadoItem => {
        const ipLiberadoIdentifier = this.getIpLiberadoIdentifier(ipLiberadoItem);
        if (ipLiberadoCollectionIdentifiers.includes(ipLiberadoIdentifier)) {
          return false;
        }
        ipLiberadoCollectionIdentifiers.push(ipLiberadoIdentifier);
        return true;
      });
      return [...ipLiberadosToAdd, ...ipLiberadoCollection];
    }
    return ipLiberadoCollection;
  }

  protected convertDateFromClient<T extends IIpLiberado | NewIpLiberado | PartialUpdateIpLiberado>(ipLiberado: T): RestOf<T> {
    return {
      ...ipLiberado,
      dataCriacao: ipLiberado.dataCriacao?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restIpLiberado: RestIpLiberado): IIpLiberado {
    return {
      ...restIpLiberado,
      dataCriacao: restIpLiberado.dataCriacao ? dayjs(restIpLiberado.dataCriacao) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestIpLiberado>): HttpResponse<IIpLiberado> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestIpLiberado[]>): HttpResponse<IIpLiberado[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
