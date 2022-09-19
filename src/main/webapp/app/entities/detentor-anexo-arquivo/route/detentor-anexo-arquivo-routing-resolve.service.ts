import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDetentorAnexoArquivo } from '../detentor-anexo-arquivo.model';
import { DetentorAnexoArquivoService } from '../service/detentor-anexo-arquivo.service';

@Injectable({ providedIn: 'root' })
export class DetentorAnexoArquivoRoutingResolveService implements Resolve<IDetentorAnexoArquivo | null> {
  constructor(protected service: DetentorAnexoArquivoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDetentorAnexoArquivo | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((detentorAnexoArquivo: HttpResponse<IDetentorAnexoArquivo>) => {
          if (detentorAnexoArquivo.body) {
            return of(detentorAnexoArquivo.body);
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
