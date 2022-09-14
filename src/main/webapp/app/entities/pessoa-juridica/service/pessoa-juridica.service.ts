import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPessoaJuridica, NewPessoaJuridica } from '../pessoa-juridica.model';

export type PartialUpdatePessoaJuridica = Partial<IPessoaJuridica> & Pick<IPessoaJuridica, 'id'>;

type RestOf<T extends IPessoaJuridica | NewPessoaJuridica> = Omit<T, 'dataAbertura'> & {
  dataAbertura?: string | null;
};

export type RestPessoaJuridica = RestOf<IPessoaJuridica>;

export type NewRestPessoaJuridica = RestOf<NewPessoaJuridica>;

export type PartialUpdateRestPessoaJuridica = RestOf<PartialUpdatePessoaJuridica>;

export type EntityResponseType = HttpResponse<IPessoaJuridica>;
export type EntityArrayResponseType = HttpResponse<IPessoaJuridica[]>;

@Injectable({ providedIn: 'root' })
export class PessoaJuridicaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/pessoa-juridicas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(pessoaJuridica: NewPessoaJuridica): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pessoaJuridica);
    return this.http
      .post<RestPessoaJuridica>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(pessoaJuridica: IPessoaJuridica): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pessoaJuridica);
    return this.http
      .put<RestPessoaJuridica>(`${this.resourceUrl}/${this.getPessoaJuridicaIdentifier(pessoaJuridica)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(pessoaJuridica: PartialUpdatePessoaJuridica): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pessoaJuridica);
    return this.http
      .patch<RestPessoaJuridica>(`${this.resourceUrl}/${this.getPessoaJuridicaIdentifier(pessoaJuridica)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestPessoaJuridica>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPessoaJuridica[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPessoaJuridicaIdentifier(pessoaJuridica: Pick<IPessoaJuridica, 'id'>): number {
    return pessoaJuridica.id;
  }

  comparePessoaJuridica(o1: Pick<IPessoaJuridica, 'id'> | null, o2: Pick<IPessoaJuridica, 'id'> | null): boolean {
    return o1 && o2 ? this.getPessoaJuridicaIdentifier(o1) === this.getPessoaJuridicaIdentifier(o2) : o1 === o2;
  }

  addPessoaJuridicaToCollectionIfMissing<Type extends Pick<IPessoaJuridica, 'id'>>(
    pessoaJuridicaCollection: Type[],
    ...pessoaJuridicasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const pessoaJuridicas: Type[] = pessoaJuridicasToCheck.filter(isPresent);
    if (pessoaJuridicas.length > 0) {
      const pessoaJuridicaCollectionIdentifiers = pessoaJuridicaCollection.map(
        pessoaJuridicaItem => this.getPessoaJuridicaIdentifier(pessoaJuridicaItem)!
      );
      const pessoaJuridicasToAdd = pessoaJuridicas.filter(pessoaJuridicaItem => {
        const pessoaJuridicaIdentifier = this.getPessoaJuridicaIdentifier(pessoaJuridicaItem);
        if (pessoaJuridicaCollectionIdentifiers.includes(pessoaJuridicaIdentifier)) {
          return false;
        }
        pessoaJuridicaCollectionIdentifiers.push(pessoaJuridicaIdentifier);
        return true;
      });
      return [...pessoaJuridicasToAdd, ...pessoaJuridicaCollection];
    }
    return pessoaJuridicaCollection;
  }

  protected convertDateFromClient<T extends IPessoaJuridica | NewPessoaJuridica | PartialUpdatePessoaJuridica>(
    pessoaJuridica: T
  ): RestOf<T> {
    return {
      ...pessoaJuridica,
      dataAbertura: pessoaJuridica.dataAbertura?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restPessoaJuridica: RestPessoaJuridica): IPessoaJuridica {
    return {
      ...restPessoaJuridica,
      dataAbertura: restPessoaJuridica.dataAbertura ? dayjs(restPessoaJuridica.dataAbertura) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPessoaJuridica>): HttpResponse<IPessoaJuridica> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPessoaJuridica[]>): HttpResponse<IPessoaJuridica[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
