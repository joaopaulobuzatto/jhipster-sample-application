import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PessoaJuridicaComponent } from '../list/pessoa-juridica.component';
import { PessoaJuridicaDetailComponent } from '../detail/pessoa-juridica-detail.component';
import { PessoaJuridicaUpdateComponent } from '../update/pessoa-juridica-update.component';
import { PessoaJuridicaRoutingResolveService } from './pessoa-juridica-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const pessoaJuridicaRoute: Routes = [
  {
    path: '',
    component: PessoaJuridicaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PessoaJuridicaDetailComponent,
    resolve: {
      pessoaJuridica: PessoaJuridicaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PessoaJuridicaUpdateComponent,
    resolve: {
      pessoaJuridica: PessoaJuridicaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PessoaJuridicaUpdateComponent,
    resolve: {
      pessoaJuridica: PessoaJuridicaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pessoaJuridicaRoute)],
  exports: [RouterModule],
})
export class PessoaJuridicaRoutingModule {}
