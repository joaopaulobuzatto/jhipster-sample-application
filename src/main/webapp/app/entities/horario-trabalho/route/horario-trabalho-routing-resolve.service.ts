import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHorarioTrabalho } from '../horario-trabalho.model';
import { HorarioTrabalhoService } from '../service/horario-trabalho.service';

@Injectable({ providedIn: 'root' })
export class HorarioTrabalhoRoutingResolveService implements Resolve<IHorarioTrabalho | null> {
  constructor(protected service: HorarioTrabalhoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHorarioTrabalho | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((horarioTrabalho: HttpResponse<IHorarioTrabalho>) => {
          if (horarioTrabalho.body) {
            return of(horarioTrabalho.body);
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
