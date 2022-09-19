import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOperadora } from '../operadora.model';
import { OperadoraService } from '../service/operadora.service';

@Injectable({ providedIn: 'root' })
export class OperadoraRoutingResolveService implements Resolve<IOperadora | null> {
  constructor(protected service: OperadoraService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOperadora | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((operadora: HttpResponse<IOperadora>) => {
          if (operadora.body) {
            return of(operadora.body);
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
