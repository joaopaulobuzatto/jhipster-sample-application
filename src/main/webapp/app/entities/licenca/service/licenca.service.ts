import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILicenca, NewLicenca } from '../licenca.model';

export type PartialUpdateLicenca = Partial<ILicenca> & Pick<ILicenca, 'id'>;

type RestOf<T extends ILicenca | NewLicenca> = Omit<
  T,
  'dataCriacao' | 'dataInicioUtilizacao' | 'dataInicioFaturamento' | 'dataPrimeiroVencimentoBoleto' | 'dataBloqueioAcesso'
> & {
  dataCriacao?: string | null;
  dataInicioUtilizacao?: string | null;
  dataInicioFaturamento?: string | null;
  dataPrimeiroVencimentoBoleto?: string | null;
  dataBloqueioAcesso?: string | null;
};

export type RestLicenca = RestOf<ILicenca>;

export type NewRestLicenca = RestOf<NewLicenca>;

export type PartialUpdateRestLicenca = RestOf<PartialUpdateLicenca>;

export type EntityResponseType = HttpResponse<ILicenca>;
export type EntityArrayResponseType = HttpResponse<ILicenca[]>;

@Injectable({ providedIn: 'root' })
export class LicencaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/licencas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(licenca: NewLicenca): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(licenca);
    return this.http
      .post<RestLicenca>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(licenca: ILicenca): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(licenca);
    return this.http
      .put<RestLicenca>(`${this.resourceUrl}/${this.getLicencaIdentifier(licenca)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(licenca: PartialUpdateLicenca): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(licenca);
    return this.http
      .patch<RestLicenca>(`${this.resourceUrl}/${this.getLicencaIdentifier(licenca)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestLicenca>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestLicenca[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getLicencaIdentifier(licenca: Pick<ILicenca, 'id'>): number {
    return licenca.id;
  }

  compareLicenca(o1: Pick<ILicenca, 'id'> | null, o2: Pick<ILicenca, 'id'> | null): boolean {
    return o1 && o2 ? this.getLicencaIdentifier(o1) === this.getLicencaIdentifier(o2) : o1 === o2;
  }

  addLicencaToCollectionIfMissing<Type extends Pick<ILicenca, 'id'>>(
    licencaCollection: Type[],
    ...licencasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const licencas: Type[] = licencasToCheck.filter(isPresent);
    if (licencas.length > 0) {
      const licencaCollectionIdentifiers = licencaCollection.map(licencaItem => this.getLicencaIdentifier(licencaItem)!);
      const licencasToAdd = licencas.filter(licencaItem => {
        const licencaIdentifier = this.getLicencaIdentifier(licencaItem);
        if (licencaCollectionIdentifiers.includes(licencaIdentifier)) {
          return false;
        }
        licencaCollectionIdentifiers.push(licencaIdentifier);
        return true;
      });
      return [...licencasToAdd, ...licencaCollection];
    }
    return licencaCollection;
  }

  protected convertDateFromClient<T extends ILicenca | NewLicenca | PartialUpdateLicenca>(licenca: T): RestOf<T> {
    return {
      ...licenca,
      dataCriacao: licenca.dataCriacao?.toJSON() ?? null,
      dataInicioUtilizacao: licenca.dataInicioUtilizacao?.toJSON() ?? null,
      dataInicioFaturamento: licenca.dataInicioFaturamento?.toJSON() ?? null,
      dataPrimeiroVencimentoBoleto: licenca.dataPrimeiroVencimentoBoleto?.toJSON() ?? null,
      dataBloqueioAcesso: licenca.dataBloqueioAcesso?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restLicenca: RestLicenca): ILicenca {
    return {
      ...restLicenca,
      dataCriacao: restLicenca.dataCriacao ? dayjs(restLicenca.dataCriacao) : undefined,
      dataInicioUtilizacao: restLicenca.dataInicioUtilizacao ? dayjs(restLicenca.dataInicioUtilizacao) : undefined,
      dataInicioFaturamento: restLicenca.dataInicioFaturamento ? dayjs(restLicenca.dataInicioFaturamento) : undefined,
      dataPrimeiroVencimentoBoleto: restLicenca.dataPrimeiroVencimentoBoleto ? dayjs(restLicenca.dataPrimeiroVencimentoBoleto) : undefined,
      dataBloqueioAcesso: restLicenca.dataBloqueioAcesso ? dayjs(restLicenca.dataBloqueioAcesso) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestLicenca>): HttpResponse<ILicenca> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestLicenca[]>): HttpResponse<ILicenca[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
