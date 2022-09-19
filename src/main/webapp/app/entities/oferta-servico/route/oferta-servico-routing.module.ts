import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { OfertaServicoComponent } from '../list/oferta-servico.component';
import { OfertaServicoDetailComponent } from '../detail/oferta-servico-detail.component';
import { OfertaServicoUpdateComponent } from '../update/oferta-servico-update.component';
import { OfertaServicoRoutingResolveService } from './oferta-servico-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const ofertaServicoRoute: Routes = [
  {
    path: '',
    component: OfertaServicoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OfertaServicoDetailComponent,
    resolve: {
      ofertaServico: OfertaServicoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OfertaServicoUpdateComponent,
    resolve: {
      ofertaServico: OfertaServicoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OfertaServicoUpdateComponent,
    resolve: {
      ofertaServico: OfertaServicoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ofertaServicoRoute)],
  exports: [RouterModule],
})
export class OfertaServicoRoutingModule {}
