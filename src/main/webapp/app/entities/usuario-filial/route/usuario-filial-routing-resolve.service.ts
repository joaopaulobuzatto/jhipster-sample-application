import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUsuarioFilial } from '../usuario-filial.model';
import { UsuarioFilialService } from '../service/usuario-filial.service';

@Injectable({ providedIn: 'root' })
export class UsuarioFilialRoutingResolveService implements Resolve<IUsuarioFilial | null> {
  constructor(protected service: UsuarioFilialService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUsuarioFilial | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((usuarioFilial: HttpResponse<IUsuarioFilial>) => {
          if (usuarioFilial.body) {
            return of(usuarioFilial.body);
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
