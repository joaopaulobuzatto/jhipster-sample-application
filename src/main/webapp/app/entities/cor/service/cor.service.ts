import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICor, NewCor } from '../cor.model';

export type PartialUpdateCor = Partial<ICor> & Pick<ICor, 'id'>;

export type EntityResponseType = HttpResponse<ICor>;
export type EntityArrayResponseType = HttpResponse<ICor[]>;

@Injectable({ providedIn: 'root' })
export class CorService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cors');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cor: NewCor): Observable<EntityResponseType> {
    return this.http.post<ICor>(this.resourceUrl, cor, { observe: 'response' });
  }

  update(cor: ICor): Observable<EntityResponseType> {
    return this.http.put<ICor>(`${this.resourceUrl}/${this.getCorIdentifier(cor)}`, cor, { observe: 'response' });
  }

  partialUpdate(cor: PartialUpdateCor): Observable<EntityResponseType> {
    return this.http.patch<ICor>(`${this.resourceUrl}/${this.getCorIdentifier(cor)}`, cor, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCorIdentifier(cor: Pick<ICor, 'id'>): number {
    return cor.id;
  }

  compareCor(o1: Pick<ICor, 'id'> | null, o2: Pick<ICor, 'id'> | null): boolean {
    return o1 && o2 ? this.getCorIdentifier(o1) === this.getCorIdentifier(o2) : o1 === o2;
  }

  addCorToCollectionIfMissing<Type extends Pick<ICor, 'id'>>(corCollection: Type[], ...corsToCheck: (Type | null | undefined)[]): Type[] {
    const cors: Type[] = corsToCheck.filter(isPresent);
    if (cors.length > 0) {
      const corCollectionIdentifiers = corCollection.map(corItem => this.getCorIdentifier(corItem)!);
      const corsToAdd = cors.filter(corItem => {
        const corIdentifier = this.getCorIdentifier(corItem);
        if (corCollectionIdentifiers.includes(corIdentifier)) {
          return false;
        }
        corCollectionIdentifiers.push(corIdentifier);
        return true;
      });
      return [...corsToAdd, ...corCollection];
    }
    return corCollection;
  }
}
