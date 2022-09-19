import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IGrupoPermissoes } from '../grupo-permissoes.model';
import { GrupoPermissoesService } from '../service/grupo-permissoes.service';

@Injectable({ providedIn: 'root' })
export class GrupoPermissoesRoutingResolveService implements Resolve<IGrupoPermissoes | null> {
  constructor(protected service: GrupoPermissoesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGrupoPermissoes | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((grupoPermissoes: HttpResponse<IGrupoPermissoes>) => {
          if (grupoPermissoes.body) {
            return of(grupoPermissoes.body);
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
