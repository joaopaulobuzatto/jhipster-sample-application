import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOrigem } from '../origem.model';
import { OrigemService } from '../service/origem.service';

@Injectable({ providedIn: 'root' })
export class OrigemRoutingResolveService implements Resolve<IOrigem | null> {
  constructor(protected service: OrigemService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrigem | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((origem: HttpResponse<IOrigem>) => {
          if (origem.body) {
            return of(origem.body);
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
