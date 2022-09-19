import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDetentorAnexoArquivo, NewDetentorAnexoArquivo } from '../detentor-anexo-arquivo.model';

export type PartialUpdateDetentorAnexoArquivo = Partial<IDetentorAnexoArquivo> & Pick<IDetentorAnexoArquivo, 'id'>;

type RestOf<T extends IDetentorAnexoArquivo | NewDetentorAnexoArquivo> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

export type RestDetentorAnexoArquivo = RestOf<IDetentorAnexoArquivo>;

export type NewRestDetentorAnexoArquivo = RestOf<NewDetentorAnexoArquivo>;

export type PartialUpdateRestDetentorAnexoArquivo = RestOf<PartialUpdateDetentorAnexoArquivo>;

export type EntityResponseType = HttpResponse<IDetentorAnexoArquivo>;
export type EntityArrayResponseType = HttpResponse<IDetentorAnexoArquivo[]>;

@Injectable({ providedIn: 'root' })
export class DetentorAnexoArquivoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/detentor-anexo-arquivos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(detentorAnexoArquivo: NewDetentorAnexoArquivo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(detentorAnexoArquivo);
    return this.http
      .post<RestDetentorAnexoArquivo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(detentorAnexoArquivo: IDetentorAnexoArquivo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(detentorAnexoArquivo);
    return this.http
      .put<RestDetentorAnexoArquivo>(`${this.resourceUrl}/${this.getDetentorAnexoArquivoIdentifier(detentorAnexoArquivo)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(detentorAnexoArquivo: PartialUpdateDetentorAnexoArquivo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(detentorAnexoArquivo);
    return this.http
      .patch<RestDetentorAnexoArquivo>(`${this.resourceUrl}/${this.getDetentorAnexoArquivoIdentifier(detentorAnexoArquivo)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDetentorAnexoArquivo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDetentorAnexoArquivo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDetentorAnexoArquivoIdentifier(detentorAnexoArquivo: Pick<IDetentorAnexoArquivo, 'id'>): number {
    return detentorAnexoArquivo.id;
  }

  compareDetentorAnexoArquivo(o1: Pick<IDetentorAnexoArquivo, 'id'> | null, o2: Pick<IDetentorAnexoArquivo, 'id'> | null): boolean {
    return o1 && o2 ? this.getDetentorAnexoArquivoIdentifier(o1) === this.getDetentorAnexoArquivoIdentifier(o2) : o1 === o2;
  }

  addDetentorAnexoArquivoToCollectionIfMissing<Type extends Pick<IDetentorAnexoArquivo, 'id'>>(
    detentorAnexoArquivoCollection: Type[],
    ...detentorAnexoArquivosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const detentorAnexoArquivos: Type[] = detentorAnexoArquivosToCheck.filter(isPresent);
    if (detentorAnexoArquivos.length > 0) {
      const detentorAnexoArquivoCollectionIdentifiers = detentorAnexoArquivoCollection.map(
        detentorAnexoArquivoItem => this.getDetentorAnexoArquivoIdentifier(detentorAnexoArquivoItem)!
      );
      const detentorAnexoArquivosToAdd = detentorAnexoArquivos.filter(detentorAnexoArquivoItem => {
        const detentorAnexoArquivoIdentifier = this.getDetentorAnexoArquivoIdentifier(detentorAnexoArquivoItem);
        if (detentorAnexoArquivoCollectionIdentifiers.includes(detentorAnexoArquivoIdentifier)) {
          return false;
        }
        detentorAnexoArquivoCollectionIdentifiers.push(detentorAnexoArquivoIdentifier);
        return true;
      });
      return [...detentorAnexoArquivosToAdd, ...detentorAnexoArquivoCollection];
    }
    return detentorAnexoArquivoCollection;
  }

  protected convertDateFromClient<T extends IDetentorAnexoArquivo | NewDetentorAnexoArquivo | PartialUpdateDetentorAnexoArquivo>(
    detentorAnexoArquivo: T
  ): RestOf<T> {
    return {
      ...detentorAnexoArquivo,
      dataCriacao: detentorAnexoArquivo.dataCriacao?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restDetentorAnexoArquivo: RestDetentorAnexoArquivo): IDetentorAnexoArquivo {
    return {
      ...restDetentorAnexoArquivo,
      dataCriacao: restDetentorAnexoArquivo.dataCriacao ? dayjs(restDetentorAnexoArquivo.dataCriacao) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDetentorAnexoArquivo>): HttpResponse<IDetentorAnexoArquivo> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDetentorAnexoArquivo[]>): HttpResponse<IDetentorAnexoArquivo[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
