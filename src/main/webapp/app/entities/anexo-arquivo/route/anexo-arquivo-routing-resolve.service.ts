import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAnexoArquivo } from '../anexo-arquivo.model';
import { AnexoArquivoService } from '../service/anexo-arquivo.service';

@Injectable({ providedIn: 'root' })
export class AnexoArquivoRoutingResolveService implements Resolve<IAnexoArquivo | null> {
  constructor(protected service: AnexoArquivoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAnexoArquivo | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((anexoArquivo: HttpResponse<IAnexoArquivo>) => {
          if (anexoArquivo.body) {
            return of(anexoArquivo.body);
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
