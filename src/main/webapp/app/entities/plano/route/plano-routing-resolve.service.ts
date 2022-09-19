import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPlano } from '../plano.model';
import { PlanoService } from '../service/plano.service';

@Injectable({ providedIn: 'root' })
export class PlanoRoutingResolveService implements Resolve<IPlano | null> {
  constructor(protected service: PlanoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlano | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((plano: HttpResponse<IPlano>) => {
          if (plano.body) {
            return of(plano.body);
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
