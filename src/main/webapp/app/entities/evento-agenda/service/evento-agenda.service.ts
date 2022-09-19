import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEventoAgenda, NewEventoAgenda } from '../evento-agenda.model';

export type PartialUpdateEventoAgenda = Partial<IEventoAgenda> & Pick<IEventoAgenda, 'id'>;

type RestOf<T extends IEventoAgenda | NewEventoAgenda> = Omit<T, 'dataCriacao' | 'data'> & {
  dataCriacao?: string | null;
  data?: string | null;
};

export type RestEventoAgenda = RestOf<IEventoAgenda>;

export type NewRestEventoAgenda = RestOf<NewEventoAgenda>;

export type PartialUpdateRestEventoAgenda = RestOf<PartialUpdateEventoAgenda>;

export type EntityResponseType = HttpResponse<IEventoAgenda>;
export type EntityArrayResponseType = HttpResponse<IEventoAgenda[]>;

@Injectable({ providedIn: 'root' })
export class EventoAgendaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/evento-agenda');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(eventoAgenda: NewEventoAgenda): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(eventoAgenda);
    return this.http
      .post<RestEventoAgenda>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(eventoAgenda: IEventoAgenda): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(eventoAgenda);
    return this.http
      .put<RestEventoAgenda>(`${this.resourceUrl}/${this.getEventoAgendaIdentifier(eventoAgenda)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(eventoAgenda: PartialUpdateEventoAgenda): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(eventoAgenda);
    return this.http
      .patch<RestEventoAgenda>(`${this.resourceUrl}/${this.getEventoAgendaIdentifier(eventoAgenda)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestEventoAgenda>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestEventoAgenda[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEventoAgendaIdentifier(eventoAgenda: Pick<IEventoAgenda, 'id'>): number {
    return eventoAgenda.id;
  }

  compareEventoAgenda(o1: Pick<IEventoAgenda, 'id'> | null, o2: Pick<IEventoAgenda, 'id'> | null): boolean {
    return o1 && o2 ? this.getEventoAgendaIdentifier(o1) === this.getEventoAgendaIdentifier(o2) : o1 === o2;
  }

  addEventoAgendaToCollectionIfMissing<Type extends Pick<IEventoAgenda, 'id'>>(
    eventoAgendaCollection: Type[],
    ...eventoAgendaToCheck: (Type | null | undefined)[]
  ): Type[] {
    const eventoAgenda: Type[] = eventoAgendaToCheck.filter(isPresent);
    if (eventoAgenda.length > 0) {
      const eventoAgendaCollectionIdentifiers = eventoAgendaCollection.map(
        eventoAgendaItem => this.getEventoAgendaIdentifier(eventoAgendaItem)!
      );
      const eventoAgendaToAdd = eventoAgenda.filter(eventoAgendaItem => {
        const eventoAgendaIdentifier = this.getEventoAgendaIdentifier(eventoAgendaItem);
        if (eventoAgendaCollectionIdentifiers.includes(eventoAgendaIdentifier)) {
          return false;
        }
        eventoAgendaCollectionIdentifiers.push(eventoAgendaIdentifier);
        return true;
      });
      return [...eventoAgendaToAdd, ...eventoAgendaCollection];
    }
    return eventoAgendaCollection;
  }

  protected convertDateFromClient<T extends IEventoAgenda | NewEventoAgenda | PartialUpdateEventoAgenda>(eventoAgenda: T): RestOf<T> {
    return {
      ...eventoAgenda,
      dataCriacao: eventoAgenda.dataCriacao?.toJSON() ?? null,
      data: eventoAgenda.data?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restEventoAgenda: RestEventoAgenda): IEventoAgenda {
    return {
      ...restEventoAgenda,
      dataCriacao: restEventoAgenda.dataCriacao ? dayjs(restEventoAgenda.dataCriacao) : undefined,
      data: restEventoAgenda.data ? dayjs(restEventoAgenda.data) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestEventoAgenda>): HttpResponse<IEventoAgenda> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestEventoAgenda[]>): HttpResponse<IEventoAgenda[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
