import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHorarioTrabalho, NewHorarioTrabalho } from '../horario-trabalho.model';

export type PartialUpdateHorarioTrabalho = Partial<IHorarioTrabalho> & Pick<IHorarioTrabalho, 'id'>;

type RestOf<T extends IHorarioTrabalho | NewHorarioTrabalho> = Omit<T, 'dataCriacao'> & {
  dataCriacao?: string | null;
};

export type RestHorarioTrabalho = RestOf<IHorarioTrabalho>;

export type NewRestHorarioTrabalho = RestOf<NewHorarioTrabalho>;

export type PartialUpdateRestHorarioTrabalho = RestOf<PartialUpdateHorarioTrabalho>;

export type EntityResponseType = HttpResponse<IHorarioTrabalho>;
export type EntityArrayResponseType = HttpResponse<IHorarioTrabalho[]>;

@Injectable({ providedIn: 'root' })
export class HorarioTrabalhoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/horario-trabalhos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(horarioTrabalho: NewHorarioTrabalho): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(horarioTrabalho);
    return this.http
      .post<RestHorarioTrabalho>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(horarioTrabalho: IHorarioTrabalho): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(horarioTrabalho);
    return this.http
      .put<RestHorarioTrabalho>(`${this.resourceUrl}/${this.getHorarioTrabalhoIdentifier(horarioTrabalho)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(horarioTrabalho: PartialUpdateHorarioTrabalho): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(horarioTrabalho);
    return this.http
      .patch<RestHorarioTrabalho>(`${this.resourceUrl}/${this.getHorarioTrabalhoIdentifier(horarioTrabalho)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestHorarioTrabalho>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestHorarioTrabalho[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getHorarioTrabalhoIdentifier(horarioTrabalho: Pick<IHorarioTrabalho, 'id'>): number {
    return horarioTrabalho.id;
  }

  compareHorarioTrabalho(o1: Pick<IHorarioTrabalho, 'id'> | null, o2: Pick<IHorarioTrabalho, 'id'> | null): boolean {
    return o1 && o2 ? this.getHorarioTrabalhoIdentifier(o1) === this.getHorarioTrabalhoIdentifier(o2) : o1 === o2;
  }

  addHorarioTrabalhoToCollectionIfMissing<Type extends Pick<IHorarioTrabalho, 'id'>>(
    horarioTrabalhoCollection: Type[],
    ...horarioTrabalhosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const horarioTrabalhos: Type[] = horarioTrabalhosToCheck.filter(isPresent);
    if (horarioTrabalhos.length > 0) {
      const horarioTrabalhoCollectionIdentifiers = horarioTrabalhoCollection.map(
        horarioTrabalhoItem => this.getHorarioTrabalhoIdentifier(horarioTrabalhoItem)!
      );
      const horarioTrabalhosToAdd = horarioTrabalhos.filter(horarioTrabalhoItem => {
        const horarioTrabalhoIdentifier = this.getHorarioTrabalhoIdentifier(horarioTrabalhoItem);
        if (horarioTrabalhoCollectionIdentifiers.includes(horarioTrabalhoIdentifier)) {
          return false;
        }
        horarioTrabalhoCollectionIdentifiers.push(horarioTrabalhoIdentifier);
        return true;
      });
      return [...horarioTrabalhosToAdd, ...horarioTrabalhoCollection];
    }
    return horarioTrabalhoCollection;
  }

  protected convertDateFromClient<T extends IHorarioTrabalho | NewHorarioTrabalho | PartialUpdateHorarioTrabalho>(
    horarioTrabalho: T
  ): RestOf<T> {
    return {
      ...horarioTrabalho,
      dataCriacao: horarioTrabalho.dataCriacao?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restHorarioTrabalho: RestHorarioTrabalho): IHorarioTrabalho {
    return {
      ...restHorarioTrabalho,
      dataCriacao: restHorarioTrabalho.dataCriacao ? dayjs(restHorarioTrabalho.dataCriacao) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestHorarioTrabalho>): HttpResponse<IHorarioTrabalho> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestHorarioTrabalho[]>): HttpResponse<IHorarioTrabalho[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
