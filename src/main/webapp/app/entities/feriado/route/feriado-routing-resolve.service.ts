import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFeriado } from '../feriado.model';
import { FeriadoService } from '../service/feriado.service';

@Injectable({ providedIn: 'root' })
export class FeriadoRoutingResolveService implements Resolve<IFeriado | null> {
  constructor(protected service: FeriadoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFeriado | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((feriado: HttpResponse<IFeriado>) => {
          if (feriado.body) {
            return of(feriado.body);
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
