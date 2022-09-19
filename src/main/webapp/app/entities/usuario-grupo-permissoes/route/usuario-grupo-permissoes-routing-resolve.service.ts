import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUsuarioGrupoPermissoes } from '../usuario-grupo-permissoes.model';
import { UsuarioGrupoPermissoesService } from '../service/usuario-grupo-permissoes.service';

@Injectable({ providedIn: 'root' })
export class UsuarioGrupoPermissoesRoutingResolveService implements Resolve<IUsuarioGrupoPermissoes | null> {
  constructor(protected service: UsuarioGrupoPermissoesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUsuarioGrupoPermissoes | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((usuarioGrupoPermissoes: HttpResponse<IUsuarioGrupoPermissoes>) => {
          if (usuarioGrupoPermissoes.body) {
            return of(usuarioGrupoPermissoes.body);
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
