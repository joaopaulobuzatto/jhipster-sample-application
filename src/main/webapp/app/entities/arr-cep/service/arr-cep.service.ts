import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IArrCep, NewArrCep } from '../arr-cep.model';

export type PartialUpdateArrCep = Partial<IArrCep> & Pick<IArrCep, 'id'>;

export type EntityResponseType = HttpResponse<IArrCep>;
export type EntityArrayResponseType = HttpResponse<IArrCep[]>;

@Injectable({ providedIn: 'root' })
export class ArrCepService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/arr-ceps');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(arrCep: NewArrCep): Observable<EntityResponseType> {
    return this.http.post<IArrCep>(this.resourceUrl, arrCep, { observe: 'response' });
  }

  update(arrCep: IArrCep): Observable<EntityResponseType> {
    return this.http.put<IArrCep>(`${this.resourceUrl}/${this.getArrCepIdentifier(arrCep)}`, arrCep, { observe: 'response' });
  }

  partialUpdate(arrCep: PartialUpdateArrCep): Observable<EntityResponseType> {
    return this.http.patch<IArrCep>(`${this.resourceUrl}/${this.getArrCepIdentifier(arrCep)}`, arrCep, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IArrCep>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IArrCep[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getArrCepIdentifier(arrCep: Pick<IArrCep, 'id'>): number {
    return arrCep.id;
  }

  compareArrCep(o1: Pick<IArrCep, 'id'> | null, o2: Pick<IArrCep, 'id'> | null): boolean {
    return o1 && o2 ? this.getArrCepIdentifier(o1) === this.getArrCepIdentifier(o2) : o1 === o2;
  }

  addArrCepToCollectionIfMissing<Type extends Pick<IArrCep, 'id'>>(
    arrCepCollection: Type[],
    ...arrCepsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const arrCeps: Type[] = arrCepsToCheck.filter(isPresent);
    if (arrCeps.length > 0) {
      const arrCepCollectionIdentifiers = arrCepCollection.map(arrCepItem => this.getArrCepIdentifier(arrCepItem)!);
      const arrCepsToAdd = arrCeps.filter(arrCepItem => {
        const arrCepIdentifier = this.getArrCepIdentifier(arrCepItem);
        if (arrCepCollectionIdentifiers.includes(arrCepIdentifier)) {
          return false;
        }
        arrCepCollectionIdentifiers.push(arrCepIdentifier);
        return true;
      });
      return [...arrCepsToAdd, ...arrCepCollection];
    }
    return arrCepCollection;
  }
}
