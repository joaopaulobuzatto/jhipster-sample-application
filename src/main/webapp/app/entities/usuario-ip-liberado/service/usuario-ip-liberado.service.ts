import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUsuarioIpLiberado, NewUsuarioIpLiberado } from '../usuario-ip-liberado.model';

export type PartialUpdateUsuarioIpLiberado = Partial<IUsuarioIpLiberado> & Pick<IUsuarioIpLiberado, 'id'>;

export type EntityResponseType = HttpResponse<IUsuarioIpLiberado>;
export type EntityArrayResponseType = HttpResponse<IUsuarioIpLiberado[]>;

@Injectable({ providedIn: 'root' })
export class UsuarioIpLiberadoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/usuario-ip-liberados');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(usuarioIpLiberado: NewUsuarioIpLiberado): Observable<EntityResponseType> {
    return this.http.post<IUsuarioIpLiberado>(this.resourceUrl, usuarioIpLiberado, { observe: 'response' });
  }

  update(usuarioIpLiberado: IUsuarioIpLiberado): Observable<EntityResponseType> {
    return this.http.put<IUsuarioIpLiberado>(
      `${this.resourceUrl}/${this.getUsuarioIpLiberadoIdentifier(usuarioIpLiberado)}`,
      usuarioIpLiberado,
      { observe: 'response' }
    );
  }

  partialUpdate(usuarioIpLiberado: PartialUpdateUsuarioIpLiberado): Observable<EntityResponseType> {
    return this.http.patch<IUsuarioIpLiberado>(
      `${this.resourceUrl}/${this.getUsuarioIpLiberadoIdentifier(usuarioIpLiberado)}`,
      usuarioIpLiberado,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUsuarioIpLiberado>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUsuarioIpLiberado[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getUsuarioIpLiberadoIdentifier(usuarioIpLiberado: Pick<IUsuarioIpLiberado, 'id'>): number {
    return usuarioIpLiberado.id;
  }

  compareUsuarioIpLiberado(o1: Pick<IUsuarioIpLiberado, 'id'> | null, o2: Pick<IUsuarioIpLiberado, 'id'> | null): boolean {
    return o1 && o2 ? this.getUsuarioIpLiberadoIdentifier(o1) === this.getUsuarioIpLiberadoIdentifier(o2) : o1 === o2;
  }

  addUsuarioIpLiberadoToCollectionIfMissing<Type extends Pick<IUsuarioIpLiberado, 'id'>>(
    usuarioIpLiberadoCollection: Type[],
    ...usuarioIpLiberadosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const usuarioIpLiberados: Type[] = usuarioIpLiberadosToCheck.filter(isPresent);
    if (usuarioIpLiberados.length > 0) {
      const usuarioIpLiberadoCollectionIdentifiers = usuarioIpLiberadoCollection.map(
        usuarioIpLiberadoItem => this.getUsuarioIpLiberadoIdentifier(usuarioIpLiberadoItem)!
      );
      const usuarioIpLiberadosToAdd = usuarioIpLiberados.filter(usuarioIpLiberadoItem => {
        const usuarioIpLiberadoIdentifier = this.getUsuarioIpLiberadoIdentifier(usuarioIpLiberadoItem);
        if (usuarioIpLiberadoCollectionIdentifiers.includes(usuarioIpLiberadoIdentifier)) {
          return false;
        }
        usuarioIpLiberadoCollectionIdentifiers.push(usuarioIpLiberadoIdentifier);
        return true;
      });
      return [...usuarioIpLiberadosToAdd, ...usuarioIpLiberadoCollection];
    }
    return usuarioIpLiberadoCollection;
  }
}
