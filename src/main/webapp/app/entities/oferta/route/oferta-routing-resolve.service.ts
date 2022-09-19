import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOferta } from '../oferta.model';
import { OfertaService } from '../service/oferta.service';

@Injectable({ providedIn: 'root' })
export class OfertaRoutingResolveService implements Resolve<IOferta | null> {
  constructor(protected service: OfertaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOferta | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((oferta: HttpResponse<IOferta>) => {
          if (oferta.body) {
            return of(oferta.body);
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
