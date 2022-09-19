import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IArrCep } from '../arr-cep.model';
import { ArrCepService } from '../service/arr-cep.service';

@Injectable({ providedIn: 'root' })
export class ArrCepRoutingResolveService implements Resolve<IArrCep | null> {
  constructor(protected service: ArrCepService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IArrCep | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((arrCep: HttpResponse<IArrCep>) => {
          if (arrCep.body) {
            return of(arrCep.body);
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
