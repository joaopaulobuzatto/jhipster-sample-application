import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFilial } from '../filial.model';
import { FilialService } from '../service/filial.service';

@Injectable({ providedIn: 'root' })
export class FilialRoutingResolveService implements Resolve<IFilial | null> {
  constructor(protected service: FilialService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFilial | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((filial: HttpResponse<IFilial>) => {
          if (filial.body) {
            return of(filial.body);
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
