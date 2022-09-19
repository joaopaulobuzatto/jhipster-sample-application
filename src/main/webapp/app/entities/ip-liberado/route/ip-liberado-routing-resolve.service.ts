import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IIpLiberado } from '../ip-liberado.model';
import { IpLiberadoService } from '../service/ip-liberado.service';

@Injectable({ providedIn: 'root' })
export class IpLiberadoRoutingResolveService implements Resolve<IIpLiberado | null> {
  constructor(protected service: IpLiberadoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IIpLiberado | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ipLiberado: HttpResponse<IIpLiberado>) => {
          if (ipLiberado.body) {
            return of(ipLiberado.body);
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
