import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IServico } from '../servico.model';
import { ServicoService } from '../service/servico.service';

@Injectable({ providedIn: 'root' })
export class ServicoRoutingResolveService implements Resolve<IServico | null> {
  constructor(protected service: ServicoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IServico | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((servico: HttpResponse<IServico>) => {
          if (servico.body) {
            return of(servico.body);
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
