import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUsuarioIpLiberado } from '../usuario-ip-liberado.model';
import { UsuarioIpLiberadoService } from '../service/usuario-ip-liberado.service';

@Injectable({ providedIn: 'root' })
export class UsuarioIpLiberadoRoutingResolveService implements Resolve<IUsuarioIpLiberado | null> {
  constructor(protected service: UsuarioIpLiberadoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUsuarioIpLiberado | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((usuarioIpLiberado: HttpResponse<IUsuarioIpLiberado>) => {
          if (usuarioIpLiberado.body) {
            return of(usuarioIpLiberado.body);
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
