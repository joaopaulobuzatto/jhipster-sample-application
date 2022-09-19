import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHorarioTrabalhoPeriodo, NewHorarioTrabalhoPeriodo } from '../horario-trabalho-periodo.model';

export type PartialUpdateHorarioTrabalhoPeriodo = Partial<IHorarioTrabalhoPeriodo> & Pick<IHorarioTrabalhoPeriodo, 'id'>;

type RestOf<T extends IHorarioTrabalhoPeriodo | NewHorarioTrabalhoPeriodo> = Omit<
  T,
  | 'dataCriacao'
  | 'periodo1Inicio'
  | 'periodo1Fim'
  | 'periodo2Inicio'
  | 'periodo2Fim'
  | 'periodo3Inicio'
  | 'periodo3Fim'
  | 'periodo4Inicio'
  | 'periodo4Fim'
> & {
  dataCriacao?: string | null;
  periodo1Inicio?: string | null;
  periodo1Fim?: string | null;
  periodo2Inicio?: string | null;
  periodo2Fim?: string | null;
  periodo3Inicio?: string | null;
  periodo3Fim?: string | null;
  periodo4Inicio?: string | null;
  periodo4Fim?: string | null;
};

export type RestHorarioTrabalhoPeriodo = RestOf<IHorarioTrabalhoPeriodo>;

export type NewRestHorarioTrabalhoPeriodo = RestOf<NewHorarioTrabalhoPeriodo>;

export type PartialUpdateRestHorarioTrabalhoPeriodo = RestOf<PartialUpdateHorarioTrabalhoPeriodo>;

export type EntityResponseType = HttpResponse<IHorarioTrabalhoPeriodo>;
export type EntityArrayResponseType = HttpResponse<IHorarioTrabalhoPeriodo[]>;

@Injectable({ providedIn: 'root' })
export class HorarioTrabalhoPeriodoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/horario-trabalho-periodos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(horarioTrabalhoPeriodo: NewHorarioTrabalhoPeriodo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(horarioTrabalhoPeriodo);
    return this.http
      .post<RestHorarioTrabalhoPeriodo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(horarioTrabalhoPeriodo: IHorarioTrabalhoPeriodo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(horarioTrabalhoPeriodo);
    return this.http
      .put<RestHorarioTrabalhoPeriodo>(`${this.resourceUrl}/${this.getHorarioTrabalhoPeriodoIdentifier(horarioTrabalhoPeriodo)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(horarioTrabalhoPeriodo: PartialUpdateHorarioTrabalhoPeriodo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(horarioTrabalhoPeriodo);
    return this.http
      .patch<RestHorarioTrabalhoPeriodo>(`${this.resourceUrl}/${this.getHorarioTrabalhoPeriodoIdentifier(horarioTrabalhoPeriodo)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestHorarioTrabalhoPeriodo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestHorarioTrabalhoPeriodo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getHorarioTrabalhoPeriodoIdentifier(horarioTrabalhoPeriodo: Pick<IHorarioTrabalhoPeriodo, 'id'>): number {
    return horarioTrabalhoPeriodo.id;
  }

  compareHorarioTrabalhoPeriodo(o1: Pick<IHorarioTrabalhoPeriodo, 'id'> | null, o2: Pick<IHorarioTrabalhoPeriodo, 'id'> | null): boolean {
    return o1 && o2 ? this.getHorarioTrabalhoPeriodoIdentifier(o1) === this.getHorarioTrabalhoPeriodoIdentifier(o2) : o1 === o2;
  }

  addHorarioTrabalhoPeriodoToCollectionIfMissing<Type extends Pick<IHorarioTrabalhoPeriodo, 'id'>>(
    horarioTrabalhoPeriodoCollection: Type[],
    ...horarioTrabalhoPeriodosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const horarioTrabalhoPeriodos: Type[] = horarioTrabalhoPeriodosToCheck.filter(isPresent);
    if (horarioTrabalhoPeriodos.length > 0) {
      const horarioTrabalhoPeriodoCollectionIdentifiers = horarioTrabalhoPeriodoCollection.map(
        horarioTrabalhoPeriodoItem => this.getHorarioTrabalhoPeriodoIdentifier(horarioTrabalhoPeriodoItem)!
      );
      const horarioTrabalhoPeriodosToAdd = horarioTrabalhoPeriodos.filter(horarioTrabalhoPeriodoItem => {
        const horarioTrabalhoPeriodoIdentifier = this.getHorarioTrabalhoPeriodoIdentifier(horarioTrabalhoPeriodoItem);
        if (horarioTrabalhoPeriodoCollectionIdentifiers.includes(horarioTrabalhoPeriodoIdentifier)) {
          return false;
        }
        horarioTrabalhoPeriodoCollectionIdentifiers.push(horarioTrabalhoPeriodoIdentifier);
        return true;
      });
      return [...horarioTrabalhoPeriodosToAdd, ...horarioTrabalhoPeriodoCollection];
    }
    return horarioTrabalhoPeriodoCollection;
  }

  protected convertDateFromClient<T extends IHorarioTrabalhoPeriodo | NewHorarioTrabalhoPeriodo | PartialUpdateHorarioTrabalhoPeriodo>(
    horarioTrabalhoPeriodo: T
  ): RestOf<T> {
    return {
      ...horarioTrabalhoPeriodo,
      dataCriacao: horarioTrabalhoPeriodo.dataCriacao?.toJSON() ?? null,
      periodo1Inicio: horarioTrabalhoPeriodo.periodo1Inicio?.toJSON() ?? null,
      periodo1Fim: horarioTrabalhoPeriodo.periodo1Fim?.toJSON() ?? null,
      periodo2Inicio: horarioTrabalhoPeriodo.periodo2Inicio?.toJSON() ?? null,
      periodo2Fim: horarioTrabalhoPeriodo.periodo2Fim?.toJSON() ?? null,
      periodo3Inicio: horarioTrabalhoPeriodo.periodo3Inicio?.toJSON() ?? null,
      periodo3Fim: horarioTrabalhoPeriodo.periodo3Fim?.toJSON() ?? null,
      periodo4Inicio: horarioTrabalhoPeriodo.periodo4Inicio?.toJSON() ?? null,
      periodo4Fim: horarioTrabalhoPeriodo.periodo4Fim?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restHorarioTrabalhoPeriodo: RestHorarioTrabalhoPeriodo): IHorarioTrabalhoPeriodo {
    return {
      ...restHorarioTrabalhoPeriodo,
      dataCriacao: restHorarioTrabalhoPeriodo.dataCriacao ? dayjs(restHorarioTrabalhoPeriodo.dataCriacao) : undefined,
      periodo1Inicio: restHorarioTrabalhoPeriodo.periodo1Inicio ? dayjs(restHorarioTrabalhoPeriodo.periodo1Inicio) : undefined,
      periodo1Fim: restHorarioTrabalhoPeriodo.periodo1Fim ? dayjs(restHorarioTrabalhoPeriodo.periodo1Fim) : undefined,
      periodo2Inicio: restHorarioTrabalhoPeriodo.periodo2Inicio ? dayjs(restHorarioTrabalhoPeriodo.periodo2Inicio) : undefined,
      periodo2Fim: restHorarioTrabalhoPeriodo.periodo2Fim ? dayjs(restHorarioTrabalhoPeriodo.periodo2Fim) : undefined,
      periodo3Inicio: restHorarioTrabalhoPeriodo.periodo3Inicio ? dayjs(restHorarioTrabalhoPeriodo.periodo3Inicio) : undefined,
      periodo3Fim: restHorarioTrabalhoPeriodo.periodo3Fim ? dayjs(restHorarioTrabalhoPeriodo.periodo3Fim) : undefined,
      periodo4Inicio: restHorarioTrabalhoPeriodo.periodo4Inicio ? dayjs(restHorarioTrabalhoPeriodo.periodo4Inicio) : undefined,
      periodo4Fim: restHorarioTrabalhoPeriodo.periodo4Fim ? dayjs(restHorarioTrabalhoPeriodo.periodo4Fim) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestHorarioTrabalhoPeriodo>): HttpResponse<IHorarioTrabalhoPeriodo> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestHorarioTrabalhoPeriodo[]>): HttpResponse<IHorarioTrabalhoPeriodo[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
