import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOfertaServico } from '../oferta-servico.model';
import { OfertaServicoService } from '../service/oferta-servico.service';

@Injectable({ providedIn: 'root' })
export class OfertaServicoRoutingResolveService implements Resolve<IOfertaServico | null> {
  constructor(protected service: OfertaServicoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOfertaServico | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ofertaServico: HttpResponse<IOfertaServico>) => {
          if (ofertaServico.body) {
            return of(ofertaServico.body);
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
