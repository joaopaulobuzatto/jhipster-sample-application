import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { OfertaComponent } from '../list/oferta.component';
import { OfertaDetailComponent } from '../detail/oferta-detail.component';
import { OfertaUpdateComponent } from '../update/oferta-update.component';
import { OfertaRoutingResolveService } from './oferta-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const ofertaRoute: Routes = [
  {
    path: '',
    component: OfertaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OfertaDetailComponent,
    resolve: {
      oferta: OfertaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OfertaUpdateComponent,
    resolve: {
      oferta: OfertaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OfertaUpdateComponent,
    resolve: {
      oferta: OfertaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ofertaRoute)],
  exports: [RouterModule],
})
export class OfertaRoutingModule {}
