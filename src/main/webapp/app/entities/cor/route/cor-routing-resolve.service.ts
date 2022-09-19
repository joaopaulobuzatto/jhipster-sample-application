import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICor } from '../cor.model';
import { CorService } from '../service/cor.service';

@Injectable({ providedIn: 'root' })
export class CorRoutingResolveService implements Resolve<ICor | null> {
  constructor(protected service: CorService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICor | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cor: HttpResponse<ICor>) => {
          if (cor.body) {
            return of(cor.body);
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
