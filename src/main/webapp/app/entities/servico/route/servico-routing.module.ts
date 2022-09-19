import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ServicoComponent } from '../list/servico.component';
import { ServicoDetailComponent } from '../detail/servico-detail.component';
import { ServicoUpdateComponent } from '../update/servico-update.component';
import { ServicoRoutingResolveService } from './servico-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const servicoRoute: Routes = [
  {
    path: '',
    component: ServicoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ServicoDetailComponent,
    resolve: {
      servico: ServicoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ServicoUpdateComponent,
    resolve: {
      servico: ServicoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ServicoUpdateComponent,
    resolve: {
      servico: ServicoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(servicoRoute)],
  exports: [RouterModule],
})
export class ServicoRoutingModule {}
