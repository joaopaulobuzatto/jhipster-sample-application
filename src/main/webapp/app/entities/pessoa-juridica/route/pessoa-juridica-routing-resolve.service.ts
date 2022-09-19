import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPessoaJuridica } from '../pessoa-juridica.model';
import { PessoaJuridicaService } from '../service/pessoa-juridica.service';

@Injectable({ providedIn: 'root' })
export class PessoaJuridicaRoutingResolveService implements Resolve<IPessoaJuridica | null> {
  constructor(protected service: PessoaJuridicaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPessoaJuridica | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((pessoaJuridica: HttpResponse<IPessoaJuridica>) => {
          if (pessoaJuridica.body) {
            return of(pessoaJuridica.body);
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
