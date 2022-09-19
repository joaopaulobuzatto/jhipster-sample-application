import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoDeDocumentoAnexavel } from '../tipo-de-documento-anexavel.model';
import { TipoDeDocumentoAnexavelService } from '../service/tipo-de-documento-anexavel.service';

@Injectable({ providedIn: 'root' })
export class TipoDeDocumentoAnexavelRoutingResolveService implements Resolve<ITipoDeDocumentoAnexavel | null> {
  constructor(protected service: TipoDeDocumentoAnexavelService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoDeDocumentoAnexavel | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tipoDeDocumentoAnexavel: HttpResponse<ITipoDeDocumentoAnexavel>) => {
          if (tipoDeDocumentoAnexavel.body) {
            return of(tipoDeDocumentoAnexavel.body);
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
