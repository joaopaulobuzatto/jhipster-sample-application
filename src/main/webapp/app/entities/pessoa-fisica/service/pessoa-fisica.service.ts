import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPessoaFisica, NewPessoaFisica } from '../pessoa-fisica.model';

export type PartialUpdatePessoaFisica = Partial<IPessoaFisica> & Pick<IPessoaFisica, 'id'>;

type RestOf<T extends IPessoaFisica | NewPessoaFisica> = Omit<T, 'dataNascimento'> & {
  dataNascimento?: string | null;
};

export type RestPessoaFisica = RestOf<IPessoaFisica>;

export type NewRestPessoaFisica = RestOf<NewPessoaFisica>;

export type PartialUpdateRestPessoaFisica = RestOf<PartialUpdatePessoaFisica>;

export type EntityResponseType = HttpResponse<IPessoaFisica>;
export type EntityArrayResponseType = HttpResponse<IPessoaFisica[]>;

@Injectable({ providedIn: 'root' })
export class PessoaFisicaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/pessoa-fisicas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(pessoaFisica: NewPessoaFisica): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pessoaFisica);
    return this.http
      .post<RestPessoaFisica>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(pessoaFisica: IPessoaFisica): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pessoaFisica);
    return this.http
      .put<RestPessoaFisica>(`${this.resourceUrl}/${this.getPessoaFisicaIdentifier(pessoaFisica)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(pessoaFisica: PartialUpdatePessoaFisica): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pessoaFisica);
    return this.http
      .patch<RestPessoaFisica>(`${this.resourceUrl}/${this.getPessoaFisicaIdentifier(pessoaFisica)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestPessoaFisica>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPessoaFisica[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPessoaFisicaIdentifier(pessoaFisica: Pick<IPessoaFisica, 'id'>): number {
    return pessoaFisica.id;
  }

  comparePessoaFisica(o1: Pick<IPessoaFisica, 'id'> | null, o2: Pick<IPessoaFisica, 'id'> | null): boolean {
    return o1 && o2 ? this.getPessoaFisicaIdentifier(o1) === this.getPessoaFisicaIdentifier(o2) : o1 === o2;
  }

  addPessoaFisicaToCollectionIfMissing<Type extends Pick<IPessoaFisica, 'id'>>(
    pessoaFisicaCollection: Type[],
    ...pessoaFisicasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const pessoaFisicas: Type[] = pessoaFisicasToCheck.filter(isPresent);
    if (pessoaFisicas.length > 0) {
      const pessoaFisicaCollectionIdentifiers = pessoaFisicaCollection.map(
        pessoaFisicaItem => this.getPessoaFisicaIdentifier(pessoaFisicaItem)!
      );
      const pessoaFisicasToAdd = pessoaFisicas.filter(pessoaFisicaItem => {
        const pessoaFisicaIdentifier = this.getPessoaFisicaIdentifier(pessoaFisicaItem);
        if (pessoaFisicaCollectionIdentifiers.includes(pessoaFisicaIdentifier)) {
          return false;
        }
        pessoaFisicaCollectionIdentifiers.push(pessoaFisicaIdentifier);
        return true;
      });
      return [...pessoaFisicasToAdd, ...pessoaFisicaCollection];
    }
    return pessoaFisicaCollection;
  }

  protected convertDateFromClient<T extends IPessoaFisica | NewPessoaFisica | PartialUpdatePessoaFisica>(pessoaFisica: T): RestOf<T> {
    return {
      ...pessoaFisica,
      dataNascimento: pessoaFisica.dataNascimento?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restPessoaFisica: RestPessoaFisica): IPessoaFisica {
    return {
      ...restPessoaFisica,
      dataNascimento: restPessoaFisica.dataNascimento ? dayjs(restPessoaFisica.dataNascimento) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPessoaFisica>): HttpResponse<IPessoaFisica> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPessoaFisica[]>): HttpResponse<IPessoaFisica[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
