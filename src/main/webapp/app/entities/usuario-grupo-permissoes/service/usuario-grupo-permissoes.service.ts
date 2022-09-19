import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUsuarioGrupoPermissoes, NewUsuarioGrupoPermissoes } from '../usuario-grupo-permissoes.model';

export type PartialUpdateUsuarioGrupoPermissoes = Partial<IUsuarioGrupoPermissoes> & Pick<IUsuarioGrupoPermissoes, 'id'>;

export type EntityResponseType = HttpResponse<IUsuarioGrupoPermissoes>;
export type EntityArrayResponseType = HttpResponse<IUsuarioGrupoPermissoes[]>;

@Injectable({ providedIn: 'root' })
export class UsuarioGrupoPermissoesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/usuario-grupo-permissoes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(usuarioGrupoPermissoes: NewUsuarioGrupoPermissoes): Observable<EntityResponseType> {
    return this.http.post<IUsuarioGrupoPermissoes>(this.resourceUrl, usuarioGrupoPermissoes, { observe: 'response' });
  }

  update(usuarioGrupoPermissoes: IUsuarioGrupoPermissoes): Observable<EntityResponseType> {
    return this.http.put<IUsuarioGrupoPermissoes>(
      `${this.resourceUrl}/${this.getUsuarioGrupoPermissoesIdentifier(usuarioGrupoPermissoes)}`,
      usuarioGrupoPermissoes,
      { observe: 'response' }
    );
  }

  partialUpdate(usuarioGrupoPermissoes: PartialUpdateUsuarioGrupoPermissoes): Observable<EntityResponseType> {
    return this.http.patch<IUsuarioGrupoPermissoes>(
      `${this.resourceUrl}/${this.getUsuarioGrupoPermissoesIdentifier(usuarioGrupoPermissoes)}`,
      usuarioGrupoPermissoes,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUsuarioGrupoPermissoes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUsuarioGrupoPermissoes[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getUsuarioGrupoPermissoesIdentifier(usuarioGrupoPermissoes: Pick<IUsuarioGrupoPermissoes, 'id'>): number {
    return usuarioGrupoPermissoes.id;
  }

  compareUsuarioGrupoPermissoes(o1: Pick<IUsuarioGrupoPermissoes, 'id'> | null, o2: Pick<IUsuarioGrupoPermissoes, 'id'> | null): boolean {
    return o1 && o2 ? this.getUsuarioGrupoPermissoesIdentifier(o1) === this.getUsuarioGrupoPermissoesIdentifier(o2) : o1 === o2;
  }

  addUsuarioGrupoPermissoesToCollectionIfMissing<Type extends Pick<IUsuarioGrupoPermissoes, 'id'>>(
    usuarioGrupoPermissoesCollection: Type[],
    ...usuarioGrupoPermissoesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const usuarioGrupoPermissoes: Type[] = usuarioGrupoPermissoesToCheck.filter(isPresent);
    if (usuarioGrupoPermissoes.length > 0) {
      const usuarioGrupoPermissoesCollectionIdentifiers = usuarioGrupoPermissoesCollection.map(
        usuarioGrupoPermissoesItem => this.getUsuarioGrupoPermissoesIdentifier(usuarioGrupoPermissoesItem)!
      );
      const usuarioGrupoPermissoesToAdd = usuarioGrupoPermissoes.filter(usuarioGrupoPermissoesItem => {
        const usuarioGrupoPermissoesIdentifier = this.getUsuarioGrupoPermissoesIdentifier(usuarioGrupoPermissoesItem);
        if (usuarioGrupoPermissoesCollectionIdentifiers.includes(usuarioGrupoPermissoesIdentifier)) {
          return false;
        }
        usuarioGrupoPermissoesCollectionIdentifiers.push(usuarioGrupoPermissoesIdentifier);
        return true;
      });
      return [...usuarioGrupoPermissoesToAdd, ...usuarioGrupoPermissoesCollection];
    }
    return usuarioGrupoPermissoesCollection;
  }
}
