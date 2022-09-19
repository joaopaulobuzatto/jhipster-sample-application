import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHorarioTrabalhoPeriodo } from '../horario-trabalho-periodo.model';
import { HorarioTrabalhoPeriodoService } from '../service/horario-trabalho-periodo.service';

@Injectable({ providedIn: 'root' })
export class HorarioTrabalhoPeriodoRoutingResolveService implements Resolve<IHorarioTrabalhoPeriodo | null> {
  constructor(protected service: HorarioTrabalhoPeriodoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHorarioTrabalhoPeriodo | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((horarioTrabalhoPeriodo: HttpResponse<IHorarioTrabalhoPeriodo>) => {
          if (horarioTrabalhoPeriodo.body) {
            return of(horarioTrabalhoPeriodo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
