import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAparelho } from '../aparelho.model';
import { AparelhoService } from '../service/aparelho.service';

@Injectable({ providedIn: 'root' })
export class AparelhoRoutingResolveService implements Resolve<IAparelho | null> {
  constructor(protected service: AparelhoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAparelho | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((aparelho: HttpResponse<IAparelho>) => {
          if (aparelho.body) {
            return of(aparelho.body);
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
