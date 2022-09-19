import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEventoAgenda } from '../evento-agenda.model';
import { EventoAgendaService } from '../service/evento-agenda.service';

@Injectable({ providedIn: 'root' })
export class EventoAgendaRoutingResolveService implements Resolve<IEventoAgenda | null> {
  constructor(protected service: EventoAgendaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEventoAgenda | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((eventoAgenda: HttpResponse<IEventoAgenda>) => {
          if (eventoAgenda.body) {
            return of(eventoAgenda.body);
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
