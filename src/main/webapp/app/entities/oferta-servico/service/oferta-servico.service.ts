import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOfertaServico, NewOfertaServico } from '../oferta-servico.model';

export type PartialUpdateOfertaServico = Partial<IOfertaServico> & Pick<IOfertaServico, 'id'>;

export type EntityResponseType = HttpResponse<IOfertaServico>;
export type EntityArrayResponseType = HttpResponse<IOfertaServico[]>;

@Injectable({ providedIn: 'root' })
export class OfertaServicoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/oferta-servicos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(ofertaServico: NewOfertaServico): Observable<EntityResponseType> {
    return this.http.post<IOfertaServico>(this.resourceUrl, ofertaServico, { observe: 'response' });
  }

  update(ofertaServico: IOfertaServico): Observable<EntityResponseType> {
    return this.http.put<IOfertaServico>(`${this.resourceUrl}/${this.getOfertaServicoIdentifier(ofertaServico)}`, ofertaServico, {
      observe: 'response',
    });
  }

  partialUpdate(ofertaServico: PartialUpdateOfertaServico): Observable<EntityResponseType> {
    return this.http.patch<IOfertaServico>(`${this.resourceUrl}/${this.getOfertaServicoIdentifier(ofertaServico)}`, ofertaServico, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOfertaServico>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOfertaServico[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getOfertaServicoIdentifier(ofertaServico: Pick<IOfertaServico, 'id'>): number {
    return ofertaServico.id;
  }

  compareOfertaServico(o1: Pick<IOfertaServico, 'id'> | null, o2: Pick<IOfertaServico, 'id'> | null): boolean {
    return o1 && o2 ? this.getOfertaServicoIdentifier(o1) === this.getOfertaServicoIdentifier(o2) : o1 === o2;
  }

  addOfertaServicoToCollectionIfMissing<Type extends Pick<IOfertaServico, 'id'>>(
    ofertaServicoCollection: Type[],
    ...ofertaServicosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const ofertaServicos: Type[] = ofertaServicosToCheck.filter(isPresent);
    if (ofertaServicos.length > 0) {
      const ofertaServicoCollectionIdentifiers = ofertaServicoCollection.map(
        ofertaServicoItem => this.getOfertaServicoIdentifier(ofertaServicoItem)!
      );
      const ofertaServicosToAdd = ofertaServicos.filter(ofertaServicoItem => {
        const ofertaServicoIdentifier = this.getOfertaServicoIdentifier(ofertaServicoItem);
        if (ofertaServicoCollectionIdentifiers.includes(ofertaServicoIdentifier)) {
          return false;
        }
        ofertaServicoCollectionIdentifiers.push(ofertaServicoIdentifier);
        return true;
      });
      return [...ofertaServicosToAdd, ...ofertaServicoCollection];
    }
    return ofertaServicoCollection;
  }
}
