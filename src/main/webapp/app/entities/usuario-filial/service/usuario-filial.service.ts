import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUsuarioFilial, NewUsuarioFilial } from '../usuario-filial.model';

export type PartialUpdateUsuarioFilial = Partial<IUsuarioFilial> & Pick<IUsuarioFilial, 'id'>;

export type EntityResponseType = HttpResponse<IUsuarioFilial>;
export type EntityArrayResponseType = HttpResponse<IUsuarioFilial[]>;

@Injectable({ providedIn: 'root' })
export class UsuarioFilialService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/usuario-filials');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(usuarioFilial: NewUsuarioFilial): Observable<EntityResponseType> {
    return this.http.post<IUsuarioFilial>(this.resourceUrl, usuarioFilial, { observe: 'response' });
  }

  update(usuarioFilial: IUsuarioFilial): Observable<EntityResponseType> {
    return this.http.put<IUsuarioFilial>(`${this.resourceUrl}/${this.getUsuarioFilialIdentifier(usuarioFilial)}`, usuarioFilial, {
      observe: 'response',
    });
  }

  partialUpdate(usuarioFilial: PartialUpdateUsuarioFilial): Observable<EntityResponseType> {
    return this.http.patch<IUsuarioFilial>(`${this.resourceUrl}/${this.getUsuarioFilialIdentifier(usuarioFilial)}`, usuarioFilial, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUsuarioFilial>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUsuarioFilial[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getUsuarioFilialIdentifier(usuarioFilial: Pick<IUsuarioFilial, 'id'>): number {
    return usuarioFilial.id;
  }

  compareUsuarioFilial(o1: Pick<IUsuarioFilial, 'id'> | null, o2: Pick<IUsuarioFilial, 'id'> | null): boolean {
    return o1 && o2 ? this.getUsuarioFilialIdentifier(o1) === this.getUsuarioFilialIdentifier(o2) : o1 === o2;
  }

  addUsuarioFilialToCollectionIfMissing<Type extends Pick<IUsuarioFilial, 'id'>>(
    usuarioFilialCollection: Type[],
    ...usuarioFilialsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const usuarioFilials: Type[] = usuarioFilialsToCheck.filter(isPresent);
    if (usuarioFilials.length > 0) {
      const usuarioFilialCollectionIdentifiers = usuarioFilialCollection.map(
        usuarioFilialItem => this.getUsuarioFilialIdentifier(usuarioFilialItem)!
      );
      const usuarioFilialsToAdd = usuarioFilials.filter(usuarioFilialItem => {
        const usuarioFilialIdentifier = this.getUsuarioFilialIdentifier(usuarioFilialItem);
        if (usuarioFilialCollectionIdentifiers.includes(usuarioFilialIdentifier)) {
          return false;
        }
        usuarioFilialCollectionIdentifiers.push(usuarioFilialIdentifier);
        return true;
      });
      return [...usuarioFilialsToAdd, ...usuarioFilialCollection];
    }
    return usuarioFilialCollection;
  }
}
